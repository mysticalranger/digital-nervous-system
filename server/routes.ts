import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import OpenAI from "openai";
import { storage } from "./storage";
import { insertProjectSchema, insertUserSchema, insertCommunityActivitySchema } from "@shared/schema";
import { z } from "zod";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key" 
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Users endpoints
  app.get("/api/users/leaderboard", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const leaderboard = await storage.getLeaderboard(limit);
      res.json(leaderboard);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch leaderboard" });
    }
  });

  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid user data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create user" });
      }
    }
  });

  // Projects endpoints
  app.get("/api/projects/metrics", async (req, res) => {
    try {
      const metrics = await storage.getProjectMetrics();
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch project metrics" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const projectData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(projectData);
      
      // Create community activity
      await storage.createCommunityActivity({
        userId: project.userId,
        activityType: "project_created",
        description: `New project created: ${project.title}`,
        karmaEarned: 50,
      });

      res.status(201).json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid project data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create project" });
      }
    }
  });

  app.get("/api/projects/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const projects = await storage.getProjectsByUser(userId);
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user projects" });
    }
  });

  // AI Models endpoints
  app.get("/api/ai-models", async (req, res) => {
    try {
      const models = await storage.getActiveAiModels();
      res.json(models);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch AI models" });
    }
  });

  // AI Project Generation endpoint
  app.post("/api/ai/generate-project", async (req, res) => {
    try {
      const { description, targetRegion, aiComplexity } = req.body;
      
      if (!description) {
        return res.status(400).json({ error: "Project description is required" });
      }

      const prompt = `You are Jarvis-For-Bharat, an AI assistant specialized in creating culturally-aware solutions for India. 

Generate a detailed project plan based on the following requirements:
- Description: ${description}
- Target Region: ${targetRegion}
- AI Complexity: ${aiComplexity}

Consider:
1. Regional cultural context and linguistic preferences
2. Local infrastructure and connectivity patterns
3. Regulatory compliance (PDPL, GST, RBI)
4. UPI and digital payment integration
5. Festival-aware scaling requirements

Respond with JSON in this exact format:
{
  "title": "Project title",
  "enhancedDescription": "Detailed description with cultural considerations",
  "culturalScore": 85,
  "recommendedLanguages": ["Hindi", "English"],
  "technicalStack": ["React", "Node.js", "MongoDB"],
  "culturalConsiderations": ["Festival awareness", "Regional preferences"],
  "implementationSteps": ["Step 1", "Step 2", "Step 3"],
  "estimatedTimeline": "6-8 weeks",
  "karmaReward": 150
}`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
      });

      const generatedProject = JSON.parse(response.choices[0].message.content || "{}");
      
      res.json(generatedProject);
    } catch (error) {
      console.error("AI generation error:", error);
      res.status(500).json({ error: "Failed to generate project with AI" });
    }
  });

  // Community endpoints
  app.get("/api/community/activity", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 20;
      const activities = await storage.getCommunityActivity(limit);
      res.json(activities);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch community activity" });
    }
  });

  app.get("/api/community/activity-feed", async (req, res) => {
    try {
      const activityFeed = await storage.getActivityFeed();
      res.json(activityFeed);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch activity feed" });
    }
  });

  // Achievements endpoints
  app.get("/api/achievements", async (req, res) => {
    try {
      const achievements = await storage.getAchievements();
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch achievements" });
    }
  });

  app.get("/api/achievements/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const userAchievements = await storage.getUserAchievements(userId);
      res.json(userAchievements);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user achievements" });
    }
  });

  // Real-time metrics endpoint
  app.get("/api/metrics", async (req, res) => {
    try {
      const metrics = await storage.getMetrics();
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch metrics" });
    }
  });

  // Cultural analysis endpoint
  app.post("/api/ai/analyze-cultural-context", async (req, res) => {
    try {
      const { text, region, language } = req.body;

      const prompt = `Analyze the cultural context and sentiment of the following text for the ${region} region in ${language}:

"${text}"

Provide analysis considering:
1. Regional cultural sensitivities
2. Language-specific nuances
3. Religious and social considerations
4. Local business practices
5. Regulatory implications

Respond with JSON:
{
  "culturalScore": 92,
  "sentimentAnalysis": "positive/neutral/negative",
  "culturalInsights": ["insight1", "insight2"],
  "recommendations": ["rec1", "rec2"],
  "riskFactors": ["risk1", "risk2"],
  "confidence": 0.95
}`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
      });

      const analysis = JSON.parse(response.choices[0].message.content || "{}");
      res.json(analysis);
    } catch (error) {
      console.error("Cultural analysis error:", error);
      res.status(500).json({ error: "Failed to analyze cultural context" });
    }
  });

  const httpServer = createServer(app);

  // WebSocket server for real-time updates
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

  const connectedClients = new Set<WebSocket>();

  wss.on('connection', (ws) => {
    connectedClients.add(ws);
    console.log('WebSocket client connected');

    // Send initial metrics
    storage.getMetrics().then(metrics => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
          type: 'metrics_update',
          data: metrics
        }));
      }
    });

    // Send initial activity feed
    storage.getActivityFeed().then(feed => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
          type: 'activity_feed',
          data: feed
        }));
      }
    });

    ws.on('close', () => {
      connectedClients.delete(ws);
      console.log('WebSocket client disconnected');
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
      connectedClients.delete(ws);
    });
  });

  // Broadcast updates to all connected clients
  const broadcastUpdate = (type: string, data: any) => {
    const message = JSON.stringify({ type, data });
    connectedClients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  };

  // Simulate real-time updates every 10 seconds
  setInterval(async () => {
    try {
      const metrics = await storage.getMetrics();
      broadcastUpdate('metrics_update', metrics);

      const activityFeed = await storage.getActivityFeed();
      broadcastUpdate('activity_feed', activityFeed);

      const leaderboard = await storage.getLeaderboard(10);
      broadcastUpdate('leaderboard_update', leaderboard);
    } catch (error) {
      console.error('Error broadcasting updates:', error);
    }
  }, 10000);

  return httpServer;
}
