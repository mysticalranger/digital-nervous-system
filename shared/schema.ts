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
  createdAt: string;
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
