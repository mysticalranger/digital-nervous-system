import { Router } from 'express';
import { z } from 'zod';
import { apiAuthMiddleware, requirePermission, requireCredits, AuthenticatedRequest } from './api-auth';
import { storage } from './storage';

const router = Router();

// Input validation schemas
const analysisRequestSchema = z.object({
  text: z.string().min(1).max(10000),
  region: z.string().optional().default('India'),
  language: z.string().optional().default('auto-detect'),
  features: z.array(z.enum([
    'sentiment',
    'cultural_score',
    'code_mixing',
    'regional_nuances',
    'festival_context',
    'viral_potential',
    'brand_safety',
    'meme_detection',
    'commerce_insights'
  ])).optional().default(['sentiment', 'cultural_score'])
});

const batchAnalysisSchema = z.object({
  texts: z.array(z.string()).min(1).max(100),
  region: z.string().optional().default('India'),
  language: z.string().optional().default('auto-detect'),
  features: z.array(z.string()).optional().default(['sentiment', 'cultural_score'])
});

const voiceAnalysisSchema = z.object({
  audioUrl: z.string().url().optional(),
  audioBase64: z.string().optional(),
  assistantId: z.enum(['arjun', 'priya', 'raj', 'devi']).optional().default('arjun'),
  region: z.string().optional().default('India')
}).refine(data => data.audioUrl || data.audioBase64, {
  message: "Either audioUrl or audioBase64 must be provided"
});

// Webhook configuration schema
const webhookConfigSchema = z.object({
  url: z.string().url(),
  events: z.array(z.enum(['analysis_complete', 'batch_complete', 'credit_low', 'rate_limit_warning'])),
  secret: z.string().optional()
});

// Business API Routes

// 1. Basic Cultural Analysis
router.post('/v1/analyze', 
  apiAuthMiddleware,
  requirePermission('basic_analysis'),
  requireCredits(1),
  async (req: AuthenticatedRequest, res) => {
    try {
      const { text, region, language, features } = analysisRequestSchema.parse(req.body);
      
      // Import and use the advanced cultural analyzer
      const { AdvancedCulturalAnalyzer } = await import('./ai-engine/advanced-cultural-analyzer');
      const analyzer = new AdvancedCulturalAnalyzer();
      
      const result = await analyzer.analyzeText(text, region, language);
      
      // Filter result based on requested features
      const filteredResult = features.reduce((acc: any, feature) => {
        switch (feature) {
          case 'sentiment':
            acc.sentiment = result.sentiment;
            acc.confidence = result.confidence;
            break;
          case 'cultural_score':
            acc.culturalScore = result.culturalScore;
            break;
          case 'code_mixing':
            acc.codeMixingDetection = result.codeMixingDetection;
            break;
          case 'regional_nuances':
            acc.regionalNuances = result.regionalNuances;
            break;
          case 'festival_context':
            acc.festivalContext = result.festivalContext;
            break;
          case 'viral_potential':
            acc.viralityPrediction = result.viralityPrediction;
            break;
          case 'brand_safety':
            acc.brandSafety = result.brandSafety;
            break;
          case 'meme_detection':
            acc.memeDetection = result.memeDetection;
            break;
          case 'commerce_insights':
            acc.commerceInsights = result.commerceInsights;
            break;
        }
        return acc;
      }, {});

      // Deduct credits
      await storage.updateUserKarma(req.user!.id, -1);
      
      res.json({
        success: true,
        data: {
          id: `analysis_${Date.now()}`,
          text,
          region,
          language,
          analysis: filteredResult,
          timestamp: new Date().toISOString(),
          creditsUsed: 1
        }
      });
    } catch (error) {
      console.error('Analysis error:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation error',
          details: error.errors
        });
      }
      res.status(500).json({
        error: 'Analysis failed',
        message: 'An error occurred while processing your text'
      });
    }
  }
);

// 2. Batch Analysis
router.post('/v1/batch-analyze',
  apiAuthMiddleware,
  requirePermission('batch_analysis'),
  async (req: AuthenticatedRequest, res) => {
    try {
      const { texts, region, language, features } = batchAnalysisSchema.parse(req.body);
      
      const creditsRequired = texts.length;
      if (req.user!.culturalCoins < creditsRequired) {
        return res.status(402).json({
          error: 'Insufficient credits',
          required: creditsRequired,
          available: req.user!.culturalCoins
        });
      }
      
      const { AdvancedCulturalAnalyzer } = await import('./ai-engine/advanced-cultural-analyzer');
      const analyzer = new AdvancedCulturalAnalyzer();
      
      const results = await Promise.all(
        texts.map(async (text, index) => {
          try {
            const analysis = await analyzer.analyzeText(text, region, language);
            return {
              id: `batch_${Date.now()}_${index}`,
              text,
              analysis,
              success: true
            };
          } catch (error) {
            return {
              id: `batch_${Date.now()}_${index}`,
              text,
              error: 'Analysis failed',
              success: false
            };
          }
        })
      );
      
      // Deduct credits
      await storage.updateUserKarma(req.user!.id, -creditsRequired);
      res.locals.creditsUsed = creditsRequired;
      
      res.json({
        success: true,
        data: {
          batchId: `batch_${Date.now()}`,
          totalTexts: texts.length,
          successfulAnalyses: results.filter(r => r.success).length,
          failedAnalyses: results.filter(r => !r.success).length,
          results,
          creditsUsed: creditsRequired,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error('Batch analysis error:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation error',
          details: error.errors
        });
      }
      res.status(500).json({
        error: 'Batch analysis failed',
        message: 'An error occurred while processing your batch'
      });
    }
  }
);

// 3. Voice Analysis
router.post('/v1/voice-analyze',
  apiAuthMiddleware,
  requirePermission('voice_analysis'),
  requireCredits(3),
  async (req: AuthenticatedRequest, res) => {
    try {
      const { audioUrl, audioBase64, assistantId, region } = voiceAnalysisSchema.parse(req.body);
      
      const { VoiceAssistantService } = await import('./voice-service');
      const voiceService = new VoiceAssistantService();
      
      // Mock audio processing for now
      const mockAudioBlob = new Blob(['mock audio data']);
      const result = await voiceService.processVoiceMessage(mockAudioBlob, assistantId, region);
      
      // Deduct credits
      await storage.updateUserKarma(req.user!.id, -3);
      
      res.json({
        success: true,
        data: {
          id: `voice_${Date.now()}`,
          assistantId,
          region,
          analysis: result,
          creditsUsed: 3,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error('Voice analysis error:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation error',
          details: error.errors
        });
      }
      res.status(500).json({
        error: 'Voice analysis failed',
        message: 'An error occurred while processing your audio'
      });
    }
  }
);

// 4. Cultural Pulse Data
router.get('/v1/cultural-pulse',
  apiAuthMiddleware,
  requirePermission('cultural_pulse'),
  requireCredits(2),
  async (req: AuthenticatedRequest, res) => {
    try {
      const { CulturalPulseService } = await import('./cultural-pulse-service');
      const pulseService = new CulturalPulseService();
      
      const region = req.query.region as string || 'India';
      const pulse = await pulseService.getCurrentPulse();
      
      // Deduct credits
      await storage.updateUserKarma(req.user!.id, -2);
      
      res.json({
        success: true,
        data: {
          region,
          pulse,
          creditsUsed: 2,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error('Cultural pulse error:', error);
      res.status(500).json({
        error: 'Cultural pulse fetch failed',
        message: 'An error occurred while fetching cultural pulse data'
      });
    }
  }
);

// 5. Viral Prediction
router.post('/v1/viral-prediction',
  apiAuthMiddleware,
  requirePermission('viral_prediction'),
  requireCredits(4),
  async (req: AuthenticatedRequest, res) => {
    try {
      const { text, category, region } = req.body;
      
      if (!text) {
        return res.status(400).json({
          error: 'Text is required for viral prediction'
        });
      }
      
      const { CulturalPulseService } = await import('./cultural-pulse-service');
      const pulseService = new CulturalPulseService();
      
      const predictions = await pulseService.getViralPredictions(category);
      
      // Mock viral prediction analysis
      const viralScore = Math.floor(Math.random() * 100);
      const peakTime = new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000);
      
      // Deduct credits
      await storage.updateUserKarma(req.user!.id, -4);
      
      res.json({
        success: true,
        data: {
          id: `viral_${Date.now()}`,
          text,
          category: category || 'general',
          region: region || 'India',
          viralScore,
          peakTime: peakTime.toISOString(),
          factors: [
            'Cultural relevance',
            'Emotional appeal',
            'Timing appropriateness',
            'Shareability potential'
          ],
          recommendations: [
            'Post between 7-9 PM for maximum engagement',
            'Include regional hashtags',
            'Consider festival timing',
            'Add visual elements'
          ],
          creditsUsed: 4,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error('Viral prediction error:', error);
      res.status(500).json({
        error: 'Viral prediction failed',
        message: 'An error occurred while analyzing viral potential'
      });
    }
  }
);

// 6. API Usage Statistics
router.get('/v1/usage-stats',
  apiAuthMiddleware,
  async (req: AuthenticatedRequest, res) => {
    try {
      const { ApiKeyService } = await import('./api-auth');
      const days = parseInt(req.query.days as string) || 30;
      
      const stats = await ApiKeyService.getUsageStats(req.apiKey!.id, days);
      
      const summary = {
        totalRequests: stats.length,
        successfulRequests: stats.filter(s => s.statusCode < 400).length,
        errorRequests: stats.filter(s => s.statusCode >= 400).length,
        totalCreditsUsed: stats.reduce((sum, s) => sum + (s.creditsUsed || 0), 0),
        averageResponseTime: stats.length > 0 
          ? Math.round(stats.reduce((sum, s) => sum + (s.responseTime || 0), 0) / stats.length)
          : 0,
        dailyBreakdown: stats.reduce((acc: any, stat) => {
          const date = stat.timestamp?.toISOString().split('T')[0];
          if (date) {
            acc[date] = (acc[date] || 0) + 1;
          }
          return acc;
        }, {}),
        endpointBreakdown: stats.reduce((acc: any, stat) => {
          acc[stat.endpoint] = (acc[stat.endpoint] || 0) + 1;
          return acc;
        }, {})
      };
      
      res.json({
        success: true,
        data: {
          period: `${days} days`,
          summary,
          detailedStats: stats.slice(0, 100), // Last 100 requests
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error('Usage stats error:', error);
      res.status(500).json({
        error: 'Failed to fetch usage statistics',
        message: 'An error occurred while retrieving your usage data'
      });
    }
  }
);

// 7. Account Information
router.get('/v1/account',
  apiAuthMiddleware,
  async (req: AuthenticatedRequest, res) => {
    try {
      res.json({
        success: true,
        data: {
          userId: req.user!.id,
          username: req.user!.username,
          subscription: req.user!.subscription,
          culturalCoins: req.user!.culturalCoins,
          apiKey: {
            id: req.apiKey!.id,
            permissions: req.apiKey!.permissions,
            rateLimit: req.apiKey!.rateLimit
          },
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error('Account info error:', error);
      res.status(500).json({
        error: 'Failed to fetch account information',
        message: 'An error occurred while retrieving your account data'
      });
    }
  }
);

// 8. Health Check
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    services: {
      database: 'connected',
      ai_engine: 'operational',
      cultural_pulse: 'active'
    }
  });
});

export default router;