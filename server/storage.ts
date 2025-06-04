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

export const storage = new MemStorage();
