import fs from 'fs/promises';
import path from 'path';
import { z } from 'zod';

// Define types for our data structures
interface User {
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

interface Project {
  id: string;
  title: string;
  description: string;
  userId: string;
  targetRegion: string;
  aiComplexity: string;
  culturalScore: number;
  createdAt: string;
}

interface CommunityActivity {
  id: string;
  userId: string;
  activityType: string;
  description: string;
  karmaEarned: number;
  createdAt: string;
}

interface AiModel {
  id: string;
  name: string;
  region: string;
  accuracy: number;
}

// In-memory storage
let users: User[] = [];
let projects: Project[] = [];
let communityActivities: CommunityActivity[] = [];

// File paths
const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json');
const ACTIVITIES_FILE = path.join(DATA_DIR, 'activities.json');

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    // Directory already exists
  }
}

// Load data from files
async function loadData() {
  await ensureDataDir();
  
  try {
    const usersData = await fs.readFile(USERS_FILE, 'utf-8');
    users = JSON.parse(usersData);
  } catch (error) {
    users = [];
  }

  try {
    const projectsData = await fs.readFile(PROJECTS_FILE, 'utf-8');
    projects = JSON.parse(projectsData);
  } catch (error) {
    projects = [];
  }

  try {
    const activitiesData = await fs.readFile(ACTIVITIES_FILE, 'utf-8');
    communityActivities = JSON.parse(activitiesData);
  } catch (error) {
    communityActivities = [];
  }
}

// Save data to files
async function saveUsers() {
  await ensureDataDir();
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

async function saveProjects() {
  await ensureDataDir();
  await fs.writeFile(PROJECTS_FILE, JSON.stringify(projects, null, 2));
}

async function saveActivities() {
  await ensureDataDir();
  await fs.writeFile(ACTIVITIES_FILE, JSON.stringify(communityActivities, null, 2));
}

// Generate unique IDs
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export class FileStorage {
  constructor() {
    // Initialize data loading
    this.initializeData();
  }

  private async initializeData() {
    await loadData();
  }

  async getUser(id: string): Promise<User | null> {
    return users.find(user => user.id === id) || null;
  }
  async getUserByUsername(username: string): Promise<User | null> {
    return users.find(user => user.username === username) || null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return users.find(user => user.email === email) || null;
  }

  async createUser(userData: {
    username: string;
    email: string;
    passwordHash: string;
    region: string;
    language: string;
  }): Promise<User> {
    const newUser: User = {
      id: generateId(),
      username: userData.username,
      email: userData.email,
      passwordHash: userData.passwordHash,
      karmaPoints: 0,
      region: userData.region,
      language: userData.language,
      achievements: [],
      projectsCreated: 0,
      communityRank: 0,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    await saveUsers();
    return newUser;
  }

  async updateUserKarma(userId: string, karma: number): Promise<User | null> {
    const user = users.find(u => u.id === userId);
    if (user) {
      user.karmaPoints += karma;
      await saveUsers();
      return user;
    }
    return null;
  }

  async getProjects(limit: number = 20): Promise<Project[]> {
    return projects
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }

  async createProject(projectData: {
    title: string;
    description: string;
    userId: string;
    targetRegion: string;
    aiComplexity: string;
    culturalScore?: number;
  }): Promise<Project> {
    const newProject: Project = {
      id: generateId(),
      title: projectData.title,
      description: projectData.description,
      userId: projectData.userId,
      targetRegion: projectData.targetRegion,
      aiComplexity: projectData.aiComplexity,
      culturalScore: projectData.culturalScore || 0,
      createdAt: new Date().toISOString(),
    };

    projects.push(newProject);
    await saveProjects();

    // Update user's projectsCreated count
    const user = users.find(u => u.id === projectData.userId);
    if (user) {
      user.projectsCreated++;
      await saveUsers();
    }

    return newProject;
  }

  async getProjectsByUser(userId: string): Promise<Project[]> {
    return projects.filter(project => project.userId === userId);
  }

  async createCommunityActivity(activityData: {
    userId: string;
    activityType: string;
    description: string;
    karmaEarned?: number;
  }): Promise<CommunityActivity> {
    const newActivity: CommunityActivity = {
      id: generateId(),
      userId: activityData.userId,
      activityType: activityData.activityType,
      description: activityData.description,
      karmaEarned: activityData.karmaEarned || 0,
      createdAt: new Date().toISOString(),
    };

    communityActivities.push(newActivity);
    await saveActivities();

    // Update user's karma if specified
    if (activityData.karmaEarned) {
      await this.updateUserKarma(activityData.userId, activityData.karmaEarned);
    }

    return newActivity;
  }

  async getCommunityActivity(limit: number = 20): Promise<(CommunityActivity & { user?: { username: string } })[]> {
    return communityActivities
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit)
      .map(activity => {
        const user = users.find(u => u.id === activity.userId);
        return {
          ...activity,
          user: user ? { username: user.username } : undefined
        };
      });
  }

  async getActiveAiModels(): Promise<AiModel[]> {
    return [
      { id: 'model-1', name: 'Hindi-English Translator', region: 'North India', accuracy: 94 },
      { id: 'model-2', name: 'Cultural Sentiment Analyzer', region: 'All India', accuracy: 91 },
      { id: 'model-3', name: 'Tamil Language Understanding', region: 'South India', accuracy: 88 }
    ];
  }

  async getLeaderboard(limit: number = 10): Promise<User[]> {
    return users
      .sort((a, b) => {
        if (b.karmaPoints !== a.karmaPoints) {
          return b.karmaPoints - a.karmaPoints;
        }
        return a.communityRank - b.communityRank;
      })
      .slice(0, limit);
  }

  async getProjectMetrics(): Promise<{ totalProjects: number; averageCulturalScore: number }> {
    const totalProjects = projects.length;
    const averageCulturalScore = projects.length > 0 
      ? projects.reduce((sum, p) => sum + p.culturalScore, 0) / projects.length 
      : 0;
    
    return { totalProjects, averageCulturalScore };
  }

  async getActivityFeed(limit: number = 20): Promise<(CommunityActivity & { user?: { username: string } })[]> {
    return this.getCommunityActivity(limit);
  }

  async getAchievements(): Promise<any[]> {
    return [
      { id: 'ach1', name: 'First Project', description: 'Created your first project!' },
      { id: 'ach2', name: 'Community Star', description: 'Earned 100 karma points!' },
      { id: 'ach3', name: 'Cultural Expert', description: 'Created 5 projects with high cultural scores!' }
    ];
  }

  async getUserAchievements(userId: string): Promise<string[]> {
    const user = users.find(u => u.id === userId);
    return user ? user.achievements : [];
  }

  async getMetrics(): Promise<{ activeUsers: number; projectsToday: number; totalUsers: number; totalProjects: number }> {
    const today = new Date().toISOString().split('T')[0];
    const projectsToday = projects.filter(p => p.createdAt.startsWith(today)).length;
    
    return {
      activeUsers: users.length,
      projectsToday,
      totalUsers: users.length,
      totalProjects: projects.length
    };
  }
}

export const storage = new FileStorage();
