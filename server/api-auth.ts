import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import { db } from './db';
import { apiKeys, apiUsage, rateLimits, users } from '@shared/schema';
import { eq, and, gte, count } from 'drizzle-orm';

export interface AuthenticatedRequest extends Request {
  apiKey?: {
    id: string;
    userId: string;
    permissions: string[];
    rateLimit: number;
    creditsRemaining: number;
  };
  user?: {
    id: string;
    username: string;
    subscription: string;
    culturalCoins: number;
  };
}

export class ApiKeyService {
  // Generate a new API key
  static generateApiKey(): { key: string; hash: string } {
    const key = `dns_${crypto.randomBytes(32).toString('hex')}`;
    const hash = bcrypt.hashSync(key, 10);
    return { key, hash };
  }

  // Create new API key for user
  static async createApiKey(
    userId: string, 
    keyName: string, 
    permissions: string[] = ['basic_analysis'],
    rateLimit: number = 1000
  ) {
    const { key, hash } = this.generateApiKey();
    const id = crypto.randomUUID();
    
    const [apiKey] = await db.insert(apiKeys).values({
      id,
      userId,
      keyName,
      keyHash: hash,
      permissions: JSON.stringify(permissions),
      rateLimit,
      isActive: true,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year
    }).returning();

    return { ...apiKey, plainKey: key };
  }

  // Validate API key
  static async validateApiKey(providedKey: string) {
    if (!providedKey || !providedKey.startsWith('dns_')) {
      return null;
    }

    const allKeys = await db.select().from(apiKeys).where(eq(apiKeys.isActive, true));
    
    for (const apiKey of allKeys) {
      if (bcrypt.compareSync(providedKey, apiKey.keyHash)) {
        // Update last used timestamp
        await db.update(apiKeys)
          .set({ lastUsedAt: new Date() })
          .where(eq(apiKeys.id, apiKey.id));

        // Get user details
        const [user] = await db.select().from(users).where(eq(users.id, apiKey.userId));
        
        return {
          id: apiKey.id,
          userId: apiKey.userId,
          permissions: JSON.parse(apiKey.permissions as string),
          rateLimit: apiKey.rateLimit || 1000,
          user: user || null
        };
      }
    }
    
    return null;
  }

  // Check rate limits
  static async checkRateLimit(apiKeyId: string, endpoint: string): Promise<boolean> {
    const now = new Date();
    const hourAgo = new Date(now.getTime() - 60 * 60 * 1000);

    // Count requests in the last hour
    const [result] = await db
      .select({ count: count() })
      .from(apiUsage)
      .where(
        and(
          eq(apiUsage.apiKeyId, apiKeyId),
          eq(apiUsage.endpoint, endpoint),
          gte(apiUsage.timestamp, hourAgo)
        )
      );

    const requestCount = result?.count || 0;
    
    // Get rate limit for this API key
    const [apiKey] = await db.select().from(apiKeys).where(eq(apiKeys.id, apiKeyId));
    const limit = apiKey?.rateLimit || 1000;
    
    return requestCount < limit;
  }

  // Log API usage
  static async logUsage(
    apiKeyId: string,
    endpoint: string,
    method: string,
    statusCode: number,
    responseTime: number,
    creditsUsed: number = 0,
    ipAddress?: string,
    userAgent?: string
  ) {
    const id = crypto.randomUUID();
    
    await db.insert(apiUsage).values({
      id,
      apiKeyId,
      endpoint,
      method,
      statusCode,
      responseTime,
      creditsUsed,
      ipAddress,
      userAgent
    });
  }

  // Get API usage statistics
  static async getUsageStats(apiKeyId: string, days: number = 30) {
    const daysAgo = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    
    const usage = await db
      .select()
      .from(apiUsage)
      .where(
        and(
          eq(apiUsage.apiKeyId, apiKeyId),
          gte(apiUsage.timestamp, daysAgo)
        )
      )
      .orderBy(apiUsage.timestamp);

    return usage;
  }
}

// API Authentication middleware
export const apiAuthMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const startTime = Date.now();
  const apiKey = req.header('X-API-Key') || req.header('Authorization')?.replace('Bearer ', '');
  
  if (!apiKey) {
    return res.status(401).json({
      error: 'API key required',
      message: 'Please provide a valid API key in X-API-Key header or Authorization: Bearer header'
    });
  }

  try {
    const validatedKey = await ApiKeyService.validateApiKey(apiKey);
    
    if (!validatedKey) {
      await ApiKeyService.logUsage(
        'invalid',
        req.path,
        req.method,
        401,
        Date.now() - startTime,
        0,
        req.ip,
        req.get('User-Agent')
      );
      
      return res.status(401).json({
        error: 'Invalid API key',
        message: 'The provided API key is invalid or expired'
      });
    }

    // Check rate limits
    const rateLimitOk = await ApiKeyService.checkRateLimit(validatedKey.id, req.path);
    
    if (!rateLimitOk) {
      await ApiKeyService.logUsage(
        validatedKey.id,
        req.path,
        req.method,
        429,
        Date.now() - startTime,
        0,
        req.ip,
        req.get('User-Agent')
      );
      
      return res.status(429).json({
        error: 'Rate limit exceeded',
        message: 'You have exceeded your hourly rate limit. Please try again later.'
      });
    }

    // Attach API key info to request
    req.apiKey = {
      id: validatedKey.id,
      userId: validatedKey.userId,
      permissions: validatedKey.permissions,
      rateLimit: validatedKey.rateLimit,
      creditsRemaining: validatedKey.user?.culturalCoins || 0
    };

    req.user = validatedKey.user ? {
      id: validatedKey.user.id,
      username: validatedKey.user.username,
      subscription: validatedKey.user.subscription,
      culturalCoins: validatedKey.user.culturalCoins
    } : undefined;

    // Log successful authentication
    res.on('finish', () => {
      const responseTime = Date.now() - startTime;
      const creditsUsed = res.locals.creditsUsed || 0;
      
      ApiKeyService.logUsage(
        validatedKey.id,
        req.path,
        req.method,
        res.statusCode,
        responseTime,
        creditsUsed,
        req.ip,
        req.get('User-Agent')
      );
    });

    next();
  } catch (error) {
    console.error('API authentication error:', error);
    res.status(500).json({
      error: 'Authentication service error',
      message: 'An error occurred while validating your API key'
    });
  }
};

// Permission check middleware
export const requirePermission = (permission: string) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.apiKey?.permissions.includes(permission)) {
      return res.status(403).json({
        error: 'Insufficient permissions',
        message: `This endpoint requires '${permission}' permission`,
        yourPermissions: req.apiKey?.permissions || []
      });
    }
    next();
  };
};

// Credit usage middleware
export const requireCredits = (amount: number) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || req.user.culturalCoins < amount) {
      return res.status(402).json({
        error: 'Insufficient credits',
        message: `This operation requires ${amount} cultural credits`,
        currentBalance: req.user?.culturalCoins || 0
      });
    }
    
    // Mark credits for deduction
    res.locals.creditsUsed = amount;
    next();
  };
};