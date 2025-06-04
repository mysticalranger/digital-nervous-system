import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { Mistral } from "@mistralai/mistralai";
import { storage } from "./storage";
import { insertProjectSchema, insertUserSchema, insertCommunityActivitySchema } from "@shared/schema";
import { z } from "zod";

// Using Mistral AI for free tier compatibility
const mistral = new Mistral({ 
  apiKey: process.env.MISTRAL_API_KEY || "default_key" 
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

      // Check if Mistral API key is available
      if (!process.env.MISTRAL_API_KEY || process.env.MISTRAL_API_KEY === "default_key") {
        // Fallback to structured response based on input
        const generatedProject = {
          title: `AI-Powered ${description.split(' ').slice(0, 3).join(' ')} Solution`,
          enhancedDescription: `A culturally-aware ${aiComplexity.toLowerCase()} solution for ${targetRegion} that ${description}. This project integrates regional language support, local payment systems, and cultural considerations for maximum impact.`,
          culturalScore: Math.floor(Math.random() * 20) + 80, // 80-99
          recommendedLanguages: targetRegion === "South India" ? ["Tamil", "Telugu", "English"] : 
                                targetRegion === "North India" ? ["Hindi", "Punjabi", "English"] :
                                targetRegion === "East India" ? ["Bengali", "English"] :
                                targetRegion === "West India" ? ["Marathi", "Gujarati", "English"] :
                                ["Hindi", "English", "Tamil"],
          technicalStack: aiComplexity === "Deep Learning" ? ["Python", "TensorFlow", "FastAPI", "React", "MongoDB"] :
                         aiComplexity === "Advanced ML" ? ["Python", "Scikit-learn", "Node.js", "React", "PostgreSQL"] :
                         ["JavaScript", "React", "Node.js", "Express", "MongoDB"],
          culturalConsiderations: [
            "Regional festival calendar integration",
            "Local payment method preferences",
            "Cultural sensitivity in UI/UX design",
            "Regional language optimization"
          ],
          implementationSteps: [
            "Research and cultural analysis phase",
            "MVP development with core features",
            "Regional language integration",
            "Cultural testing and validation",
            "Full deployment and monitoring"
          ],
          estimatedTimeline: aiComplexity === "Deep Learning" ? "10-12 weeks" :
                           aiComplexity === "Advanced ML" ? "8-10 weeks" : "6-8 weeks",
          karmaReward: Math.floor(Math.random() * 200) + 100 // 100-299
        };
        
        return res.json(generatedProject);
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

      const response = await mistral.chat.complete({
        model: "mistral-small",
        messages: [{ role: "user", content: prompt }]
      });

      const content = typeof response.choices[0].message.content === 'string' 
        ? response.choices[0].message.content 
        : JSON.stringify(response.choices[0].message.content);
      const generatedProject = JSON.parse(content || "{}");
      
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

      // Check if Mistral API key is available
      if (!process.env.MISTRAL_API_KEY || process.env.MISTRAL_API_KEY === "default_key") {
        // Fallback to structured analysis based on region and content
        const analysis = {
          culturalScore: Math.floor(Math.random() * 20) + 80, // 80-99
          sentimentAnalysis: text.toLowerCase().includes('good') || text.toLowerCase().includes('great') ? "positive" :
                           text.toLowerCase().includes('bad') || text.toLowerCase().includes('poor') ? "negative" : "neutral",
          culturalInsights: region === "South India" ? [
            "Strong emphasis on traditional values and education",
            "Technology adoption varies by state and urban-rural divide",
            "Regional language preferences are crucial for engagement"
          ] : region === "North India" ? [
            "Family-oriented decision making patterns",
            "Festival seasons significantly impact business cycles",
            "Hindi language dominance with English for business"
          ] : [
            "Diverse cultural landscape requires localized approach",
            "Regional languages essential for authentic connection",
            "Cultural sensitivity paramount for acceptance"
          ],
          recommendations: [
            "Incorporate regional language support",
            "Consider local festival calendars for timing",
            "Test with regional focus groups",
            "Ensure cultural appropriateness in messaging"
          ],
          riskFactors: [],
          confidence: 0.85
        };
        
        return res.json(analysis);
      }

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

      const response = await mistral.chat.complete({
        model: "mistral-small",
        messages: [{ role: "user", content: prompt }]
      });

      const content = typeof response.choices[0].message.content === 'string' 
        ? response.choices[0].message.content 
        : JSON.stringify(response.choices[0].message.content);
      const analysis = JSON.parse(content || "{}");
      res.json(analysis);
    } catch (error) {
      console.error("Cultural analysis error:", error);
      res.status(500).json({ error: "Failed to analyze cultural context" });
    }
  });

  // Engagement API routes for addictive features
  app.get("/api/engagement/challenges", async (req, res) => {
    try {
      const challenges = [
        {
          id: "daily-1",
          title: "Build a Cultural AI Feature",
          description: "Create an AI feature that incorporates Indian cultural elements or regional language support",
          type: "coding",
          difficulty: "medium",
          points: 150,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          participants: Math.floor(Math.random() * 500) + 100,
          isCompleted: false
        },
        {
          id: "daily-2", 
          title: "Community Knowledge Share",
          description: "Share a tech tip or cultural insight with the community",
          type: "community",
          difficulty: "easy",
          points: 75,
          expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
          participants: Math.floor(Math.random() * 300) + 50,
          isCompleted: false
        },
        {
          id: "daily-3",
          title: "Regional Impact Project",
          description: "Start a project that addresses a local Indian community need",
          type: "cultural",
          difficulty: "hard", 
          points: 300,
          expiresAt: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString(),
          participants: Math.floor(Math.random() * 150) + 25,
          isCompleted: false
        }
      ];
      res.json(challenges);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch challenges" });
    }
  });

  app.get("/api/engagement/notifications/:userId", async (req, res) => {
    try {
      const notifications = [
        {
          id: "notif-1",
          type: "streak",
          title: "Streak Milestone!",
          message: "You're on a 7-day streak! Keep going to unlock the Cultural Pioneer badge",
          priority: "high",
          createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString()
        },
        {
          id: "notif-2",
          type: "limited_offer",
          title: "Limited Time: Premium Features",
          message: "Unlock advanced AI models for free - only 2 hours left!",
          priority: "high",
          createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString()
        },
        {
          id: "notif-3",
          type: "social",
          title: "Friend Achievement",
          message: "Rajesh just completed the AI Ethics challenge! Join them?",
          priority: "medium",
          createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString()
        },
        {
          id: "notif-4",
          type: "achievement",
          title: "New Badge Earned!",
          message: "Congratulations! You've earned the 'Community Builder' badge",
          priority: "medium",
          createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString()
        }
      ];
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch notifications" });
    }
  });

  app.get("/api/engagement/streak/:userId", async (req, res) => {
    try {
      const streak = {
        current: Math.floor(Math.random() * 15) + 3,
        longest: Math.floor(Math.random() * 30) + 10,
        todayCompleted: Math.random() > 0.5
      };
      res.json(streak);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch streak" });
    }
  });

  app.post("/api/engagement/challenges/:challengeId/complete", async (req, res) => {
    try {
      const { challengeId } = req.params;
      const { userId } = req.body;
      
      // Variable reward system - random bonus points
      const baseReward = 100;
      const bonusMultiplier = Math.random() > 0.7 ? (Math.random() * 2 + 1) : 1;
      const totalPoints = Math.floor(baseReward * bonusMultiplier);
      
      const result = {
        success: true,
        points: totalPoints,
        bonus: bonusMultiplier > 1,
        message: bonusMultiplier > 1 ? `Amazing! Bonus reward: ${totalPoints} points!` : `Great job! Earned ${totalPoints} points`,
        streakIncreased: true,
        newBadge: Math.random() > 0.8 ? "Cultural Pioneer" : null
      };
      
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to complete challenge" });
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
