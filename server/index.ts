import express, { type Request, Response, NextFunction } from "express";
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv/config';
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { storage } from './fileStorage';

const SECRET = process.env.SESSION_SECRET || 'default_secret_change_me';
const EXPIRES_IN = '7d';

// Interface for user registration data
interface UserRegistrationData {
  username: string;
  password?: string;
  email?: string;
  region?: string;
  language?: string;
  [key: string]: any; // For any other fields that might be in userData
}

export async function registerUser(userData: UserRegistrationData): Promise<any> {
  // Hash password if it exists
  if (userData.password) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const user = await storage.createUser({
      username: userData.username,
      email: userData.email || '',
      passwordHash: hashedPassword,
      region: userData.region || 'India',
      language: userData.language || 'en'
    });
    return user;
  }
  throw new Error('Password is required');
}

// Interface for user token generation
interface TokenUser {
  _id: string | any; // MongoDB ObjectId or string
  username: string;
  [key: string]: any; // Allow other properties
}

export function generateToken(user: TokenUser): string {
  return jwt.sign(
    { id: user._id, username: user.username }, 
    SECRET, 
    { expiresIn: EXPIRES_IN }
  );
}

// Interface for decoded JWT token
interface DecodedToken {
  id: string | any; // MongoDB ObjectId or string
  username: string;
  iat?: number; // Issued at timestamp (added by JWT)
  exp?: number; // Expiration timestamp (added by JWT)
  [key: string]: any; // Allow other properties
}

export async function verifyToken(token: string): Promise<DecodedToken | null> {
  try {
    return jwt.verify(token, SECRET) as DecodedToken;
  } catch (error) {
    return null;
  }
}

// Interface for authenticated request
interface AuthRequest extends Request {
  user: DecodedToken;
}

export const authMiddleware = async (
  req: Request, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }
  
  const decoded = await verifyToken(token);
  if (!decoded) {
    res.status(401).json({ error: 'Invalid token' });
    return;
  }
  
  (req as AuthRequest).user = decoded;
  next();
};

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "ws:", "wss:"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
}));
app.use(express.json());

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  try {
    // Initialize file storage (no database connection needed)
    console.log('File storage initialized');
    const server = await registerRoutes(app);

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      res.status(status).json({ message });
      throw err;
    });

    // importantly only setup vite in development and after
    // setting up all the other routes so the catch-all route
    // doesn't interfere with the other routes
    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }

    // ALWAYS serve the app on port 5000
    // this serves both the API and the client.
    // It is the only port that is not firewalled.
    const port = 5000;
    server.listen(port, () => {
      log(`serving on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
})();
