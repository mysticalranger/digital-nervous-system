import { 
  users, projects, aiModels, communityActivity, achievements,
  type User, type InsertUser,
  type Project, type InsertProject,
  type AiModel, type InsertAiModel,
  type CommunityActivity, type InsertCommunityActivity,
  type Achievement, type InsertAchievement,
  type MetricsUpdate,
  type ActivityFeedItem,
  type LeaderboardEntry,
  type UserEngagement,
  type DailyChallenge,
  type Notification,
  type SocialConnection,
  type UserPresence
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserKarma(userId: number, karma: number): Promise<User | undefined>;
  getLeaderboard(limit?: number): Promise<LeaderboardEntry[]>;

  // Projects
  getProject(id: number): Promise<Project | undefined>;
  getProjectsByUser(userId: number): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, updates: Partial<Project>): Promise<Project | undefined>;
  getProjectMetrics(): Promise<{ total: number; active: number; byRegion: Record<string, number> }>;

  // AI Models
  getAiModel(id: number): Promise<AiModel | undefined>;
  getActiveAiModels(): Promise<AiModel[]>;
  updateAiModelMetrics(id: number, accuracy: number, latency: number): Promise<AiModel | undefined>;

  // Community
  getCommunityActivity(limit?: number): Promise<CommunityActivity[]>;
  createCommunityActivity(activity: InsertCommunityActivity): Promise<CommunityActivity>;
  
  // Achievements
  getAchievements(): Promise<Achievement[]>;
  getUserAchievements(userId: number): Promise<string[]>;
  unlockAchievement(userId: number, achievementId: string): Promise<boolean>;

  // Real-time metrics
  getMetrics(): Promise<MetricsUpdate>;
  getActivityFeed(): Promise<ActivityFeedItem[]>;

  // User Engagement
  getUserEngagement(userId: number): Promise<UserEngagement | undefined>;
  updateUserEngagement(userId: number, engagement: Partial<UserEngagement>): Promise<UserEngagement>;
  incrementUserStreak(userId: number): Promise<UserEngagement>;
  addUserPoints(userId: number, points: number): Promise<UserEngagement>;
  
  // Daily Challenges
  getDailyChallenges(): Promise<DailyChallenge[]>;
  getActiveChallenges(): Promise<DailyChallenge[]>;
  createDailyChallenge(challenge: Omit<DailyChallenge, 'id' | 'participants' | 'completedBy'>): Promise<DailyChallenge>;
  completeChallenge(challengeId: string, userId: number): Promise<boolean>;
  
  // Notifications
  getUserNotifications(userId: number): Promise<Notification[]>;
  createNotification(notification: Omit<Notification, 'id' | 'createdAt'>): Promise<Notification>;
  markNotificationRead(notificationId: string): Promise<boolean>;
  
  // Social Features
  getFriends(userId: number): Promise<User[]>;
  sendFriendRequest(userId: number, friendId: number): Promise<SocialConnection>;
  acceptFriendRequest(connectionId: number): Promise<boolean>;
  getUserPresence(userId: number): Promise<UserPresence | undefined>;
  updateUserPresence(userId: number, presence: Partial<UserPresence>): Promise<UserPresence>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private aiModels: Map<number, AiModel>;
  private communityActivities: Map<number, CommunityActivity>;
  private achievementsList: Map<number, Achievement>;
  private userEngagements: Map<number, UserEngagement>;
  private dailyChallenges: Map<string, DailyChallenge>;
  private notifications: Map<string, Notification>;
  private socialConnections: Map<number, SocialConnection>;
  private userPresences: Map<number, UserPresence>;
  private currentUserId: number;
  private currentProjectId: number;
  private currentActivityId: number;
  private currentNotificationId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.aiModels = new Map();
    this.communityActivities = new Map();
    this.achievementsList = new Map();
    this.currentUserId = 1;
    this.currentProjectId = 1;
    this.currentActivityId = 1;

    this.initializeData();
  }

  private initializeData() {
    // Initialize sample AI models
    const jarvisModel: AiModel = {
      id: 1,
      name: "Jarvis-For-Bharat",
      type: "jarvis",
      accuracy: 97,
      latency: 24,
      regionalCoverage: ["Hindi", "English", "Tamil", "Telugu", "Bengali"],
      isActive: true,
      lastUpdated: new Date(),
    };

    const karmaModel: AiModel = {
      id: 2,
      name: "Karma Engine",
      type: "karma-engine",
      accuracy: 94,
      latency: 18,
      regionalCoverage: ["All India"],
      isActive: true,
      lastUpdated: new Date(),
    };

    this.aiModels.set(1, jarvisModel);
    this.aiModels.set(2, karmaModel);

    // Initialize achievements
    const sampleAchievements: Achievement[] = [
      {
        id: 1,
        name: "Cultural Bridge Builder",
        description: "Deploy AI solutions in 5+ regional languages",
        karmaReward: 500,
        requirements: { languages: 5 },
        icon: "fas fa-bridge",
        category: "culture",
      },
      {
        id: 2,
        name: "Community Catalyst",
        description: "Help 100+ developers with AI implementations",
        karmaReward: 1000,
        requirements: { helpCount: 100 },
        icon: "fas fa-users",
        category: "community",
      },
      {
        id: 3,
        name: "Rural Innovation Pioneer",
        description: "Create impactful AI solutions for rural communities",
        karmaReward: 2000,
        requirements: { ruralProjects: 5 },
        icon: "fas fa-seedling",
        category: "innovation",
      },
    ];

    sampleAchievements.forEach(achievement => {
      this.achievementsList.set(achievement.id, achievement);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = {
      id,
      username: insertUser.username,
      email: insertUser.email,
      karmaPoints: insertUser.karmaPoints || 0,
      region: insertUser.region,
      language: insertUser.language || "en",
      achievements: Array.isArray(insertUser.achievements) ? insertUser.achievements : [],
      projectsCreated: insertUser.projectsCreated || 0,
      communityRank: insertUser.communityRank || 0,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserKarma(userId: number, karma: number): Promise<User | undefined> {
    const user = this.users.get(userId);
    if (user) {
      user.karmaPoints += karma;
      this.users.set(userId, user);
      return user;
    }
    return undefined;
  }

  async getLeaderboard(limit: number = 10): Promise<LeaderboardEntry[]> {
    const users = Array.from(this.users.values())
      .sort((a, b) => b.karmaPoints - a.karmaPoints)
      .slice(0, limit);

    return users.map((user, index) => ({
      id: user.id,
      username: user.username,
      region: user.region,
      karmaPoints: user.karmaPoints,
      rank: index + 1,
    }));
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getProjectsByUser(userId: number): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(project => project.userId === userId);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = {
      id,
      userId: insertProject.userId,
      title: insertProject.title,
      description: insertProject.description,
      targetRegion: insertProject.targetRegion,
      aiComplexity: insertProject.aiComplexity,
      status: insertProject.status || "active",
      culturalScore: insertProject.culturalScore || 0,
      languages: Array.isArray(insertProject.languages) ? insertProject.languages : [],
      metrics: insertProject.metrics || {},
      createdAt: new Date(),
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: number, updates: Partial<Project>): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (project) {
      const updatedProject = { ...project, ...updates };
      this.projects.set(id, updatedProject);
      return updatedProject;
    }
    return undefined;
  }

  async getProjectMetrics(): Promise<{ total: number; active: number; byRegion: Record<string, number> }> {
    const projects = Array.from(this.projects.values());
    const active = projects.filter(p => p.status === "active").length;
    const byRegion: Record<string, number> = {};

    projects.forEach(project => {
      byRegion[project.targetRegion] = (byRegion[project.targetRegion] || 0) + 1;
    });

    return {
      total: projects.length,
      active,
      byRegion,
    };
  }

  async getAiModel(id: number): Promise<AiModel | undefined> {
    return this.aiModels.get(id);
  }

  async getActiveAiModels(): Promise<AiModel[]> {
    return Array.from(this.aiModels.values()).filter(model => model.isActive);
  }

  async updateAiModelMetrics(id: number, accuracy: number, latency: number): Promise<AiModel | undefined> {
    const model = this.aiModels.get(id);
    if (model) {
      model.accuracy = accuracy;
      model.latency = latency;
      model.lastUpdated = new Date();
      this.aiModels.set(id, model);
      return model;
    }
    return undefined;
  }

  async getCommunityActivity(limit: number = 20): Promise<CommunityActivity[]> {
    return Array.from(this.communityActivities.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  async createCommunityActivity(insertActivity: InsertCommunityActivity): Promise<CommunityActivity> {
    const id = this.currentActivityId++;
    const activity: CommunityActivity = {
      id,
      userId: insertActivity.userId,
      activityType: insertActivity.activityType,
      description: insertActivity.description,
      karmaEarned: insertActivity.karmaEarned || 0,
      createdAt: new Date(),
    };
    this.communityActivities.set(id, activity);
    return activity;
  }

  async getAchievements(): Promise<Achievement[]> {
    return Array.from(this.achievementsList.values());
  }

  async getUserAchievements(userId: number): Promise<string[]> {
    const user = this.users.get(userId);
    return user?.achievements || [];
  }

  async unlockAchievement(userId: number, achievementId: string): Promise<boolean> {
    const user = this.users.get(userId);
    if (user && !user.achievements.includes(achievementId)) {
      user.achievements.push(achievementId);
      this.users.set(userId, user);
      return true;
    }
    return false;
  }

  async getMetrics(): Promise<MetricsUpdate> {
    const userCount = this.users.size;
    const projectCount = this.projects.size;
    const totalKarma = Array.from(this.users.values()).reduce((sum, user) => sum + user.karmaPoints, 0);
    const regionCount = new Set(Array.from(this.users.values()).map(user => user.region)).size;
    const avgAccuracy = Array.from(this.aiModels.values()).reduce((sum, model) => sum + model.accuracy, 0) / this.aiModels.size;

    return {
      activeUsers: userCount,
      projectsCreated: projectCount,
      karmaPoints: totalKarma,
      regionalImpact: regionCount,
      aiAccuracy: Math.round(avgAccuracy),
      timestamp: new Date().toISOString(),
    };
  }

  async getActivityFeed(): Promise<ActivityFeedItem[]> {
    const activities = await this.getCommunityActivity(10);
    return activities.map((activity, index) => ({
      id: activity.id.toString(),
      type: activity.activityType as 'deployment' | 'challenge' | 'milestone',
      message: activity.description,
      timestamp: activity.createdAt.toISOString(),
      color: ['blue', 'purple', 'orange'][index % 3] as 'blue' | 'purple' | 'orange',
    }));
  }
}

import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUserKarma(userId: number, karma: number): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ karmaPoints: karma })
      .where(eq(users.id, userId))
      .returning();
    return user || undefined;
  }

  async getLeaderboard(limit: number = 10): Promise<LeaderboardEntry[]> {
    const result = await db
      .select({
        id: users.id,
        username: users.username,
        region: users.region,
        karmaPoints: users.karmaPoints,
        rank: users.communityRank
      })
      .from(users)
      .orderBy(desc(users.karmaPoints))
      .limit(limit);

    return result.map((user, index) => ({
      ...user,
      rank: index + 1
    }));
  }

  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project || undefined;
  }

  async getProjectsByUser(userId: number): Promise<Project[]> {
    return await db.select().from(projects).where(eq(projects.userId, userId));
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db
      .insert(projects)
      .values(insertProject)
      .returning();
    return project;
  }

  async updateProject(id: number, updates: Partial<Project>): Promise<Project | undefined> {
    const [project] = await db
      .update(projects)
      .set(updates)
      .where(eq(projects.id, id))
      .returning();
    return project || undefined;
  }

  async getProjectMetrics(): Promise<{ total: number; active: number; byRegion: Record<string, number> }> {
    const allProjects = await db.select().from(projects);
    const total = allProjects.length;
    const active = allProjects.filter(p => p.status === 'active').length;
    
    const byRegion: Record<string, number> = {};
    for (const project of allProjects) {
      const user = await this.getUser(project.userId);
      if (user) {
        byRegion[user.region] = (byRegion[user.region] || 0) + 1;
      }
    }

    return { total, active, byRegion };
  }

  async getAiModel(id: number): Promise<AiModel | undefined> {
    const [model] = await db.select().from(aiModels).where(eq(aiModels.id, id));
    return model || undefined;
  }

  async getActiveAiModels(): Promise<AiModel[]> {
    return await db.select().from(aiModels).where(eq(aiModels.isActive, true));
  }

  async updateAiModelMetrics(id: number, accuracy: number, latency: number): Promise<AiModel | undefined> {
    const [model] = await db
      .update(aiModels)
      .set({ accuracy, responseTime: latency, lastUpdated: new Date() })
      .where(eq(aiModels.id, id))
      .returning();
    return model || undefined;
  }

  async getCommunityActivity(limit: number = 20): Promise<CommunityActivity[]> {
    return await db
      .select()
      .from(communityActivity)
      .orderBy(desc(communityActivity.createdAt))
      .limit(limit);
  }

  async createCommunityActivity(insertActivity: InsertCommunityActivity): Promise<CommunityActivity> {
    const [activity] = await db
      .insert(communityActivity)
      .values(insertActivity)
      .returning();
    return activity;
  }

  async getAchievements(): Promise<Achievement[]> {
    return await db.select().from(achievements);
  }

  async getUserAchievements(userId: number): Promise<string[]> {
    const user = await this.getUser(userId);
    return user?.achievements || [];
  }

  async unlockAchievement(userId: number, achievementId: string): Promise<boolean> {
    const user = await this.getUser(userId);
    if (!user) return false;

    const currentAchievements = user.achievements || [];
    if (currentAchievements.includes(achievementId)) return false;

    const updatedAchievements = [...currentAchievements, achievementId];
    await db
      .update(users)
      .set({ achievements: updatedAchievements })
      .where(eq(users.id, userId));

    return true;
  }

  async getUserEngagement(userId: number): Promise<UserEngagement | undefined> {
    const [engagement] = await db
      .select()
      .from(userEngagements)
      .where(eq(userEngagements.userId, userId));
    return engagement || undefined;
  }

  async updateUserEngagement(userId: number, engagement: Partial<UserEngagement>): Promise<UserEngagement> {
    const existing = await this.getUserEngagement(userId);
    
    if (existing) {
      const [updated] = await db
        .update(userEngagements)
        .set({ ...engagement, updatedAt: new Date() })
        .where(eq(userEngagements.userId, userId))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(userEngagements)
        .values({ userId, ...engagement })
        .returning();
      return created;
    }
  }

  async incrementUserStreak(userId: number): Promise<UserEngagement> {
    const existing = await this.getUserEngagement(userId);
    const today = new Date().toDateString();
    const lastActive = existing?.lastActiveDate ? new Date(existing.lastActiveDate).toDateString() : null;
    
    let newStreak = 1;
    if (existing && lastActive === today) {
      return existing; // Already incremented today
    } else if (existing && lastActive === new Date(Date.now() - 24*60*60*1000).toDateString()) {
      newStreak = existing.dailyStreak + 1;
    }

    return this.updateUserEngagement(userId, {
      dailyStreak: newStreak,
      lastActiveDate: new Date()
    });
  }

  async addUserPoints(userId: number, points: number): Promise<UserEngagement> {
    const existing = await this.getUserEngagement(userId);
    const currentPoints = existing?.totalPoints || 0;
    
    return this.updateUserEngagement(userId, {
      totalPoints: currentPoints + points
    });
  }

  async getDailyChallenges(): Promise<DailyChallenge[]> {
    return await db.select().from(dailyChallenges).where(eq(dailyChallenges.isActive, true));
  }

  async getActiveChallenges(): Promise<DailyChallenge[]> {
    const now = new Date();
    return await db
      .select()
      .from(dailyChallenges)
      .where(and(
        eq(dailyChallenges.isActive, true),
        // Add proper timestamp comparison when needed
      ));
  }

  async createDailyChallenge(challenge: Omit<DailyChallenge, 'id' | 'participants' | 'completedBy'>): Promise<DailyChallenge> {
    const [created] = await db
      .insert(dailyChallenges)
      .values({
        id: `challenge-${Date.now()}`,
        participants: 0,
        completedBy: [],
        ...challenge
      })
      .returning();
    return created;
  }

  async completeChallenge(challengeId: string, userId: number): Promise<boolean> {
    const [challenge] = await db
      .select()
      .from(dailyChallenges)
      .where(eq(dailyChallenges.id, challengeId));
    
    if (!challenge || challenge.completedBy.includes(userId)) return false;

    const updatedCompletedBy = [...challenge.completedBy, userId];
    await db
      .update(dailyChallenges)
      .set({
        completedBy: updatedCompletedBy,
        participants: challenge.participants + 1
      })
      .where(eq(dailyChallenges.id, challengeId));

    return true;
  }

  async getUserNotifications(userId: number): Promise<Notification[]> {
    return await db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, userId))
      .orderBy(desc(notifications.createdAt));
  }

  async createNotification(notification: Omit<Notification, 'id' | 'createdAt'>): Promise<Notification> {
    const [created] = await db
      .insert(notifications)
      .values({
        id: `notif-${Date.now()}-${Math.random()}`,
        createdAt: new Date(),
        ...notification
      })
      .returning();
    return created;
  }

  async markNotificationRead(notificationId: string): Promise<boolean> {
    const [updated] = await db
      .update(notifications)
      .set({ isRead: true })
      .where(eq(notifications.id, notificationId))
      .returning();
    return !!updated;
  }

  async getFriends(userId: number): Promise<User[]> {
    const connections = await db
      .select({ friendId: socialConnections.friendId })
      .from(socialConnections)
      .where(and(
        eq(socialConnections.userId, userId),
        eq(socialConnections.status, 'accepted')
      ));

    const friendIds = connections.map(c => c.friendId);
    if (friendIds.length === 0) return [];

    return await db
      .select()
      .from(users)
      .where(eq(users.id, friendIds[0])); // Simplified for now
  }

  async sendFriendRequest(userId: number, friendId: number): Promise<SocialConnection> {
    const [connection] = await db
      .insert(socialConnections)
      .values({ userId, friendId, status: 'pending' })
      .returning();
    return connection;
  }

  async acceptFriendRequest(connectionId: number): Promise<boolean> {
    const [updated] = await db
      .update(socialConnections)
      .set({ status: 'accepted' })
      .where(eq(socialConnections.id, connectionId))
      .returning();
    return !!updated;
  }

  async getUserPresence(userId: number): Promise<UserPresence | undefined> {
    const [presence] = await db
      .select()
      .from(userPresences)
      .where(eq(userPresences.userId, userId));
    return presence || undefined;
  }

  async updateUserPresence(userId: number, presence: Partial<UserPresence>): Promise<UserPresence> {
    const existing = await this.getUserPresence(userId);
    
    if (existing) {
      const [updated] = await db
        .update(userPresences)
        .set({ ...presence, updatedAt: new Date() })
        .where(eq(userPresences.userId, userId))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(userPresences)
        .values({ userId, ...presence })
        .returning();
      return created;
    }
  }

  async getMetrics(): Promise<MetricsUpdate> {
    const totalUsers = await db.select().from(users);
    const totalProjects = await db.select().from(projects);
    const activeModels = await db.select().from(aiModels).where(eq(aiModels.isActive, true));
    
    const totalKarma = totalUsers.reduce((sum, user) => sum + (user.karmaPoints || 0), 0);
    const avgAccuracy = activeModels.reduce((sum, model) => sum + (model.accuracy || 0), 0) / (activeModels.length || 1);

    return {
      activeUsers: totalUsers.length,
      projectsCreated: totalProjects.length,
      karmaPoints: totalKarma,
      regionalImpact: Math.floor(Math.random() * 100), // Placeholder calculation
      aiAccuracy: avgAccuracy,
      timestamp: new Date().toISOString()
    };
  }

  async getActivityFeed(): Promise<ActivityFeedItem[]> {
    const activities = await this.getCommunityActivity(10);
    
    return activities.map(activity => ({
      id: activity.id.toString(),
      type: activity.activityType as any,
      message: activity.description,
      timestamp: activity.createdAt.toISOString(),
      color: 'blue' as const,
      userId: activity.userId
    }));
  }
}

export const storage = new DatabaseStorage();
