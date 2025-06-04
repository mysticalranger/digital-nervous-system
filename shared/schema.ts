import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  karmaPoints: integer("karma_points").notNull().default(0),
  region: text("region").notNull(),
  language: text("language").notNull().default("en"),
  achievements: json("achievements").$type<string[]>().notNull().default([]),
  projectsCreated: integer("projects_created").notNull().default(0),
  communityRank: integer("community_rank").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  targetRegion: text("target_region").notNull(),
  aiComplexity: text("ai_complexity").notNull(),
  status: text("status").notNull().default("active"),
  culturalScore: integer("cultural_score").notNull().default(0),
  languages: json("languages").$type<string[]>().notNull().default([]),
  metrics: json("metrics").$type<Record<string, number>>().notNull().default({}),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const aiModels = pgTable("ai_models", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // "jarvis", "karma-engine"
  accuracy: integer("accuracy").notNull().default(0), // percentage
  latency: integer("latency").notNull().default(0), // milliseconds
  regionalCoverage: json("regional_coverage").$type<string[]>().notNull().default([]),
  isActive: boolean("is_active").notNull().default(true),
  lastUpdated: timestamp("last_updated").notNull().defaultNow(),
});

export const communityActivity = pgTable("community_activity", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  activityType: text("activity_type").notNull(), // "project_created", "collaboration", "achievement"
  description: text("description").notNull(),
  karmaEarned: integer("karma_earned").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  karmaReward: integer("karma_reward").notNull(),
  requirements: json("requirements").$type<Record<string, any>>().notNull(),
  icon: text("icon").notNull(),
  category: text("category").notNull(),
});

export const userEngagements = pgTable("user_engagements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  dailyStreak: integer("daily_streak").notNull().default(0),
  lastActiveDate: timestamp("last_active_date").notNull().defaultNow(),
  totalPoints: integer("total_points").notNull().default(0),
  level: integer("level").notNull().default(1),
  badges: json("badges").$type<string[]>().notNull().default([]),
  completedChallenges: json("completed_challenges").$type<string[]>().notNull().default([]),
  referralCount: integer("referral_count").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const dailyChallenges = pgTable("daily_challenges", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(),
  difficulty: text("difficulty").notNull(),
  points: integer("points").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  participants: integer("participants").notNull().default(0),
  completedBy: json("completed_by").$type<number[]>().notNull().default([]),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const notifications = pgTable("notifications", {
  id: text("id").primaryKey(),
  userId: integer("user_id").notNull(),
  type: text("type").notNull(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").notNull().default(false),
  priority: text("priority").notNull(),
  actionUrl: text("action_url"),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const socialConnections = pgTable("social_connections", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  friendId: integer("friend_id").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const userPresences = pgTable("user_presences", {
  userId: integer("user_id").primaryKey(),
  isOnline: boolean("is_online").notNull().default(false),
  lastSeen: timestamp("last_seen").notNull().defaultNow(),
  currentActivity: text("current_activity"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
});

export const insertAiModelSchema = createInsertSchema(aiModels).omit({
  id: true,
  lastUpdated: true,
});

export const insertCommunityActivitySchema = createInsertSchema(communityActivity).omit({
  id: true,
  createdAt: true,
});

export const insertAchievementSchema = createInsertSchema(achievements).omit({
  id: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;

export type AiModel = typeof aiModels.$inferSelect;
export type InsertAiModel = z.infer<typeof insertAiModelSchema>;

export type CommunityActivity = typeof communityActivity.$inferSelect;
export type InsertCommunityActivity = z.infer<typeof insertCommunityActivitySchema>;

export type Achievement = typeof achievements.$inferSelect;
export type InsertAchievement = z.infer<typeof insertAchievementSchema>;

// Real-time message types
export interface WebSocketMessage {
  type: 'metrics_update' | 'activity_feed' | 'leaderboard_update' | 'achievement_unlocked';
  data: any;
}

export interface MetricsUpdate {
  activeUsers: number;
  projectsCreated: number;
  karmaPoints: number;
  regionalImpact: number;
  aiAccuracy: number;
  timestamp: string;
}

export interface ActivityFeedItem {
  id: string;
  type: 'deployment' | 'challenge' | 'milestone' | 'achievement' | 'streak' | 'social' | 'limited_time';
  message: string;
  timestamp: string;
  color: 'blue' | 'purple' | 'orange' | 'green' | 'red' | 'yellow';
  userId?: number;
  urgency?: 'low' | 'medium' | 'high';
  expiresAt?: string;
}

export interface UserEngagement {
  id: number;
  userId: number;
  dailyStreak: number;
  lastActiveDate: string;
  totalPoints: number;
  level: number;
  badges: string[];
  completedChallenges: string[];
  referralCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  type: 'coding' | 'cultural' | 'community' | 'learning';
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  expiresAt: string;
  participants: number;
  completedBy: number[];
  isActive: boolean;
}

export interface Notification {
  id: string;
  userId: number;
  type: 'achievement' | 'challenge' | 'social' | 'streak' | 'limited_offer' | 'community';
  title: string;
  message: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
  actionUrl?: string;
  createdAt: string;
  expiresAt?: string;
}

export interface SocialConnection {
  id: number;
  userId: number;
  friendId: number;
  status: 'pending' | 'accepted' | 'blocked';
  createdAt: string;
}

export interface UserPresence {
  userId: number;
  isOnline: boolean;
  lastSeen: string;
  currentActivity?: string;
}

export interface LeaderboardEntry {
  id: number;
  username: string;
  region: string;
  karmaPoints: number;
  rank: number;
  avatar?: string;
}
