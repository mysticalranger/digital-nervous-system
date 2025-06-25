import mongoose from 'mongoose';
import { User, Project, CommunityActivity, insertUserSchema, insertProjectSchema, insertCommunityActivitySchema } from '../shared/schema';
import { z } from 'zod';

// Define types for the data used in creation methods, inferring from Zod schemas
// We add `password` to UserCreateData as it's often handled separately before hashing
type UserCreateData = z.infer<typeof insertUserSchema> & { passwordHash: string }; // Ensure passwordHash is expected
type ProjectCreateData = z.infer<typeof insertProjectSchema>;
type CommunityActivityCreateData = z.infer<typeof insertCommunityActivitySchema>;

// Define types for Mongoose documents
type UserDocument = InstanceType<typeof User>;
type ProjectDocument = InstanceType<typeof Project>;
type CommunityActivityDocument = InstanceType<typeof CommunityActivity>;

// Interface for the AI Model structure returned by getActiveAiModels
interface AiModel {
  id: string;
  name: string;
  region: string;
  accuracy: number;
}

export class MongoStorage {
  async getUser(id: string): Promise<UserDocument | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null; // Or throw an error
    }
    return User.findById(id);
  }

  async getUserByUsername(username: string): Promise<UserDocument | null> {
    return User.findOne({ username });
  }

  async createUser(userData: UserCreateData): Promise<UserDocument> {
    // userData now directly includes passwordHash, username, email, region, language
    const user = new User(userData);
    return user.save();
  }

  async updateUserKarma(userId: string, karma: number): Promise<UserDocument | null> {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return null;
    }
    return User.findByIdAndUpdate(
      userId,
      { $inc: { karmaPoints: karma } },
      { new: true }
    );
  }

  async getProjects(limit: number = 20): Promise<ProjectDocument[]> {
    return Project.find().sort({ createdAt: -1 }).limit(limit);
  }

  async createProject(projectData: ProjectCreateData): Promise<ProjectDocument> {
    const project = new Project({
      ...projectData,
      userId: new mongoose.Types.ObjectId(projectData.userId), // Ensure userId is ObjectId
    });
    await project.save();

    // Update user's projectsCreated count
    if (mongoose.Types.ObjectId.isValid(projectData.userId)) {
      await User.findByIdAndUpdate(
        projectData.userId,
        { $inc: { projectsCreated: 1 } }
      );
    }
    return project;
  }

  async getProjectsByUser(userId: string): Promise<ProjectDocument[]> {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return []; // Or throw an error
    }
    return Project.find({ userId: new mongoose.Types.ObjectId(userId) });
  }

  async createCommunityActivity(activityData: CommunityActivityCreateData): Promise<CommunityActivityDocument> {
    const activity = new CommunityActivity({
      ...activityData,
      userId: new mongoose.Types.ObjectId(activityData.userId), // Ensure userId is ObjectId
    });
    await activity.save();

    // Update user's karma if specified
    if (activityData.karmaEarned && mongoose.Types.ObjectId.isValid(activityData.userId)) {
      await this.updateUserKarma(activityData.userId, activityData.karmaEarned);
    }
    return activity;
  }

  async getCommunityActivity(limit: number = 20): Promise<CommunityActivityDocument[]> {
    return CommunityActivity.find<CommunityActivityDocument>()
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('userId', 'username')
      .lean<CommunityActivityDocument[]>();
  }

  async getActiveAiModels(): Promise<AiModel[]> {
    // This is placeholder data as in the original file.
    // In a real application, this would fetch from a database or configuration.
    return [
      { id: 'model-1', name: 'Hindi-English Translator', region: 'North India', accuracy: 94 },
      { id: 'model-2', name: 'Cultural Sentiment Analyzer', region: 'All India', accuracy: 91 },
      { id: 'model-3', name: 'Tamil Language Understanding', region: 'South India', accuracy: 88 }
    ];
  }

  // Example of other methods you might need from your routes.ts analysis:
  async getLeaderboard(limit: number = 10): Promise<UserDocument[]> {
    return User.find().sort({ karmaPoints: -1, communityRank: 1 }).limit(limit);
  }

  async getProjectMetrics(): Promise<any> { // Define a proper interface for ProjectMetrics
    // Placeholder: Implement actual metrics aggregation
    const totalProjects = await Project.countDocuments();
    return { totalProjects, averageCulturalScore: 0 /* calculate actual */ };
  }

  async getActivityFeed(limit: number = 20): Promise<CommunityActivityDocument[]> {
     // Similar to getCommunityActivity, but could have different sorting or filtering
    return CommunityActivity.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('userId', 'username') as Promise<CommunityActivityDocument[]>;
  }

  async getAchievements(): Promise<any[]> { // Define a proper interface for Achievement
    // Placeholder: Implement fetching achievements
    return [{ id: 'ach1', name: 'First Project', description: 'Created your first project!' }];
  }

  async getUserAchievements(userId: string): Promise<any[]> { // Define a proper interface for UserAchievement
     if (!mongoose.Types.ObjectId.isValid(userId)) return [];
    // Placeholder: Implement fetching user-specific achievements
    const user = await User.findById(userId).select('achievements');
    return user ? user.achievements : [];
  }

  async getMetrics(): Promise<any> { // Define a proper interface for general Metrics
     // Placeholder for the /api/metrics endpoint
    return { activeUsers: 0, projectsToday: 0 };
  }
}

export const storage = new MongoStorage();
