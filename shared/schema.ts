import { z } from "zod";

// TypeScript interface definitions for file storage
export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  karmaPoints: number;
  region: string;
  language: string;
  achievements: string[];
  projectsCreated: number;
  communityRank: number;
  subscription: 'free' | 'pro' | 'enterprise';
  apiUsage: {
    monthly: number;
    limit: number;
  };
  
  // Gamification System
  culturalCoins: number;
  masteryLevel: number;
  currentStreak: number;
  longestStreak: number;
  totalAnalyses: number;
  lastActiveDate: string;
  
  // User Preferences
  preferredVoiceAssistant: 'arjun' | 'priya' | 'raj' | 'devi';
  notificationSettings: {
    dailyReminders: boolean;
    weeklyDigest: boolean;
    trendingAlerts: boolean;
    festivalNotifications: boolean;
  };
  
  createdAt: string;
}

// Gamification Interfaces
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'analysis' | 'streak' | 'social' | 'festival' | 'mastery';
  requirements: {
    type: string;
    target: number;
  };
  reward: {
    culturalCoins: number;
    masteryXP: number;
  };
}

export interface UserStreak {
  userId: string;
  currentStreak: number;
  lastActiveDate: string;
  streakType: 'daily_analysis' | 'festival_participation' | 'community_engagement';
}

export interface CulturalChallenge {
  id: string;
  title: string;
  description: string;
  type: 'prediction' | 'analysis' | 'meme' | 'festival';
  startDate: string;
  endDate: string;
  participants: string[];
  prizes: {
    first: number;
    second: number;
    third: number;
  };
  status: 'upcoming' | 'active' | 'completed';
}

// Cultural Analysis specific interfaces
export interface CulturalAnalysis {
  culturalScore: number; // 0-100
  sentiment: 'positive' | 'neutral' | 'negative';
  confidence: number; // 0-1
  
  // UNIQUE FEATURES (competitors don't have these)
  codeMixingDetection: {
    languages: string[];
    mixingPattern: 'hinglish' | 'tanglish' | 'banglish' | 'punglish' | 'other';
    authenticityScore: number;
    urbanRuralIndicator: 'urban' | 'semi-urban' | 'rural';
  };
  
  regionalNuances: {
    primaryRegion: string;
    culturalMarkers: string[];
    localSlang: string[];
    religionNeutrality: number;
    casteNeutrality: number;
  };
  
  festivalContext: {
    activeFestival: string | null;
    seasonalRelevance: number;
    commercialOpportunity: 'high' | 'medium' | 'low';
    giftingIntent: boolean;
  };
  
  viralityPrediction: {
    viralPotential: number; // 0-100
    shareabilityFactors: string[];
    memePotential: number;
    influencerAppeal: number;
    optimalShareTime: string;
  };
  
  brandSafety: {
    overallSafety: number;
    religiousConflicts: string[];
    politicalSensitivity: string[];
    corporateRisk: 'low' | 'medium' | 'high';
  };
  
  // Meme Intelligence
  memeDetection: {
    isMeme: boolean;
    memeType: string;
    culturalReferences: string[];
    generationalAppeal: 'gen-z' | 'millennial' | 'gen-x' | 'boomer';
    viralTrajectory: 'emerging' | 'trending' | 'peak' | 'declining';
  };
  
  // Social Commerce
  commerceInsights: {
    purchaseIntent: number;
    priceSegment: 'budget' | 'mid-range' | 'premium' | 'luxury';
    recommendedProducts: string[];
    seasonalDemand: number;
  };
}

// AI Voice Assistant Interfaces
export interface VoiceAssistant {
  id: 'arjun' | 'priya' | 'raj' | 'devi';
  name: string;
  city: string;
  personality: string;
  languageStrengths: string[];
  culturalExpertise: string[];
  voiceStyle: 'formal' | 'casual' | 'friendly' | 'professional';
}

export interface VoiceAnalysis {
  transcription: string;
  detectedLanguage: string;
  culturalContext: CulturalAnalysis;
  assistantResponse: {
    text: string;
    audioUrl?: string;
    insights: string[];
    suggestions: string[];
  };
}

// Live Cultural Pulse
export interface CulturalPulse {
  timestamp: string;
  trendingTopics: Array<{
    topic: string;
    sentiment: number;
    volume: number;
    regions: string[];
  }>;
  regionalMood: Array<{
    region: string;
    overallSentiment: 'positive' | 'neutral' | 'negative';
    dominantEmotions: string[];
    confidenceLevel: number;
  }>;
  festivalMood: {
    activeFestivals: string[];
    anticipationLevel: number;
    commercialActivity: number;
    socialEngagement: number;
  };
  viralPredictions: Array<{
    content: string;
    viralPotential: number;
    peakTime: string;
    targetAudience: string[];
  }>;
}

// Micro-transactions
export interface Transaction {
  id: string;
  userId: string;
  type: 'purchase' | 'earn' | 'spend';
  amount: number; // in cultural coins
  description: string;
  timestamp: string;
  metadata?: {
    subscriptionType?: string;
    featureUnlocked?: string;
    achievementId?: string;
  };
}

export interface Project {
  id: string;
  title: string;
  description: string;
  userId: string;
  targetRegion: string;
  aiComplexity: string;
  culturalScore: number;
  createdAt: string;
}

export interface AnalysisHistory {
  id: string;
  userId: string;
  text: string;
  result: CulturalAnalysis;
  region: string;
  language: string;
  timestamp: string;
}

export interface CommunityActivity {
  id: string;
  userId: string;
  activityType: string;
  description: string;
  karmaEarned: number;
  createdAt: string;
}

export interface AiModel {
  id: string;
  name: string;
  region: string;
  accuracy: number;
}

// WebSocket message types
export interface WebSocketMessage {
  type: 'metrics_update' | 'activity_feed' | 'leaderboard_update' | 'achievement_unlocked';
  data: any;
}

// Real-time data types for WebSocket
export interface MetricsUpdate {
  activeUsers: number;
  projectsToday: number;
  totalUsers: number;
  totalProjects: number;
  aiAccuracy?: number;
  karmaPoints?: number;
  projectsCreated?: number;
}

export interface ActivityFeedItem extends CommunityActivity {
  user?: { username: string };
}

export interface LeaderboardEntry extends User {
  rank?: number;
}

// Validation schemas using Zod for file storage
export const insertUserSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  region: z.string().min(1),
  language: z.string().default("en"),
  subscription: z.enum(['free', 'pro', 'enterprise']).default('free'),
});

export const insertAnalysisSchema = z.object({
  text: z.string().min(1),
  region: z.string(),
  language: z.string(),
  userId: z.string().optional(),
});

export const insertProjectSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10),
  userId: z.string(),
  targetRegion: z.string(),
  aiComplexity: z.string(),
  culturalScore: z.number().optional(),
});

export const insertCommunityActivitySchema = z.object({
  userId: z.string(),
  activityType: z.string(),
  description: z.string(),
  karmaEarned: z.number().default(0),
});

// No database connection needed for file storage
export async function connectDb() {
  console.log('Using file storage - no database connection required');
  return Promise.resolve();
}
