import { FileStorage } from './fileStorage';
import { User, Achievement, CulturalChallenge } from '../shared/schema';

export class GamificationService {
  private storage: FileStorage;

  constructor(storage: FileStorage) {
    this.storage = storage;
  }

  // Achievements system
  private achievements: Achievement[] = [
    {
      id: 'hinglish_hero',
      name: 'Hinglish Hero',
      description: 'Analyze 50 Hinglish texts',
      icon: '🎯',
      category: 'analysis',
      requirements: { type: 'hinglish_analysis', target: 50 },
      reward: { culturalCoins: 100, masteryXP: 50 }
    },
    {
      id: 'festival_fanatic',
      name: 'Festival Fanatic',
      description: 'Participate in 5 festival analyses',
      icon: '🪔',
      category: 'festival',
      requirements: { type: 'festival_analysis', target: 5 },
      reward: { culturalCoins: 200, masteryXP: 100 }
    },
    {
      id: 'streak_master',
      name: 'Streak Master',
      description: 'Maintain 30-day streak',
      icon: '🔥',
      category: 'streak',
      requirements: { type: 'daily_streak', target: 30 },
      reward: { culturalCoins: 500, masteryXP: 250 }
    },
    {
      id: 'viral_predictor',
      name: 'Viral Predictor',
      description: 'Successfully predict 10 viral contents',
      icon: '⚡',
      category: 'mastery',
      requirements: { type: 'viral_prediction', target: 10 },
      reward: { culturalCoins: 300, masteryXP: 200 }
    },
    {
      id: 'community_leader',
      name: 'Community Leader',
      description: 'Help 25 community members',
      icon: '👑',
      category: 'social',
      requirements: { type: 'community_help', target: 25 },
      reward: { culturalCoins: 400, masteryXP: 300 }
    }
  ];

  private challenges: CulturalChallenge[] = [
    {
      id: 'diwali_prediction',
      title: 'Diwali Sentiment Prediction',
      description: 'Predict which Diwali campaign will perform best across different regions',
      type: 'prediction',
      startDate: '2024-10-15T00:00:00Z',
      endDate: '2024-11-05T23:59:59Z',
      participants: [],
      prizes: { first: 5000, second: 3000, third: 1000 },
      status: 'active'
    },
    {
      id: 'regional_meme_analysis',
      title: 'Regional Meme Analysis',
      description: 'Analyze viral potential of regional memes and predict their spread',
      type: 'meme',
      startDate: '2024-10-20T00:00:00Z',
      endDate: '2024-10-27T23:59:59Z',
      participants: [],
      prizes: { first: 2500, second: 1500, third: 500 },
      status: 'active'
    },
    {
      id: 'festival_automation',
      title: 'Festival Campaign Automation',
      description: 'Create automated festival campaign suggestions for businesses',
      type: 'festival',
      startDate: '2024-11-01T00:00:00Z',
      endDate: '2024-11-15T23:59:59Z',
      participants: [],
      prizes: { first: 7500, second: 4500, third: 2000 },
      status: 'upcoming'
    }
  ];

  async getUserStats(userId: string) {
    const user = await this.storage.getUser(userId);
    if (!user) return null;

    // Calculate user achievements progress
    const userAchievements = this.achievements.map(achievement => {
      const progress = this.calculateAchievementProgress(userId, achievement);
      return {
        ...achievement,
        unlocked: progress >= achievement.requirements.target,
        progress: Math.min(progress, achievement.requirements.target),
        target: achievement.requirements.target
      };
    });

    return {
      culturalCoins: user.culturalCoins || 0,
      masteryLevel: user.masteryLevel || 1,
      currentStreak: user.currentStreak || 0,
      longestStreak: user.longestStreak || 0,
      totalAnalyses: user.totalAnalyses || 0,
      communityRank: user.communityRank || 1000,
      achievements: userAchievements
    };
  }

  async getChallenges() {
    return this.challenges.map(challenge => ({
      ...challenge,
      participants: challenge.participants.length
    }));
  }

  async joinChallenge(userId: string, challengeId: string) {
    const challenge = this.challenges.find(c => c.id === challengeId);
    if (!challenge || challenge.status !== 'active') {
      throw new Error('Challenge not available');
    }

    if (!challenge.participants.includes(userId)) {
      challenge.participants.push(userId);
    }

    return challenge;
  }

  async getLeaderboard(limit: number = 10) {
    // In a real implementation, this would query the database
    // For now, return mock leaderboard data
    return [
      { username: 'CulturalMaster', culturalCoins: 15420, masteryLevel: 47, region: 'Delhi' },
      { username: 'BharatExpert', culturalCoins: 12890, masteryLevel: 42, region: 'Mumbai' },
      { username: 'FestivalGuru', culturalCoins: 11650, masteryLevel: 38, region: 'Chennai' },
      { username: 'MemePredictor', culturalCoins: 10300, masteryLevel: 35, region: 'Bangalore' },
      { username: 'HinglishHero', culturalCoins: 9750, masteryLevel: 32, region: 'Pune' }
    ].slice(0, limit);
  }

  async awardCoins(userId: string, amount: number, reason: string) {
    const user = await this.storage.getUser(userId);
    if (!user) return null;

    const newBalance = (user.culturalCoins || 0) + amount;
    
    // Update user coins and check for level up
    const updatedUser = {
      ...user,
      culturalCoins: newBalance,
      masteryLevel: this.calculateMasteryLevel(newBalance)
    };

    // In a real implementation, save to database
    console.log(`Awarded ${amount} coins to ${user.username} for: ${reason}`);
    
    return updatedUser;
  }

  async spendCoins(userId: string, amount: number, item: string) {
    const user = await this.storage.getUser(userId);
    if (!user) return null;

    const currentBalance = user.culturalCoins || 0;
    if (currentBalance < amount) {
      throw new Error('Insufficient cultural coins');
    }

    const newBalance = currentBalance - amount;
    
    // Update user coins
    const updatedUser = {
      ...user,
      culturalCoins: newBalance
    };

    console.log(`${user.username} spent ${amount} coins on: ${item}`);
    
    return updatedUser;
  }

  async updateStreak(userId: string) {
    const user = await this.storage.getUser(userId);
    if (!user) return null;

    const today = new Date().toDateString();
    const lastActive = user.lastActiveDate ? new Date(user.lastActiveDate).toDateString() : null;
    
    let newStreak = user.currentStreak || 0;
    
    if (lastActive === today) {
      // Already active today, no change
      return user;
    }
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();
    
    if (lastActive === yesterdayStr) {
      // Continuing streak
      newStreak += 1;
    } else if (lastActive !== today) {
      // Streak broken or starting new
      newStreak = 1;
    }

    const updatedUser = {
      ...user,
      currentStreak: newStreak,
      longestStreak: Math.max(user.longestStreak || 0, newStreak),
      lastActiveDate: new Date().toISOString()
    };

    // Award streak bonus coins
    if (newStreak > 0 && newStreak % 7 === 0) {
      await this.awardCoins(userId, newStreak * 10, `${newStreak}-day streak bonus`);
    }

    return updatedUser;
  }

  private calculateAchievementProgress(userId: string, achievement: Achievement): number {
    // In a real implementation, this would query user's actual activity
    // For demo purposes, return mock progress
    switch (achievement.requirements.type) {
      case 'hinglish_analysis':
        return Math.floor(Math.random() * 60); // 0-59
      case 'festival_analysis':
        return Math.floor(Math.random() * 8); // 0-7
      case 'daily_streak':
        return Math.floor(Math.random() * 35); // 0-34
      case 'viral_prediction':
        return Math.floor(Math.random() * 12); // 0-11
      case 'community_help':
        return Math.floor(Math.random() * 30); // 0-29
      default:
        return 0;
    }
  }

  private calculateMasteryLevel(culturalCoins: number): number {
    // Level progression: 100 coins per level initially, increasing by 50 each level
    let level = 1;
    let coinsNeeded = 100;
    let totalNeeded = 0;

    while (culturalCoins >= totalNeeded + coinsNeeded) {
      totalNeeded += coinsNeeded;
      level++;
      coinsNeeded += 50;
    }

    return level;
  }

  // Shop items
  getShopItems() {
    return [
      {
        id: 'premium_insights',
        name: 'Premium Insights Pack',
        description: 'Unlock advanced cultural analysis features',
        price: 500,
        benefits: ['Advanced meme detection', 'Viral prediction insights', 'Festival timing optimization']
      },
      {
        id: 'streak_shield',
        name: 'Streak Shield',
        description: 'Protect your streak for 3 days',
        price: 200,
        benefits: ['3-day streak protection', 'Peace of mind', 'Maintain momentum']
      },
      {
        id: 'voice_assistant_pro',
        name: 'Voice Assistant Pro',
        description: 'Unlock all 4 regional AI assistants',
        price: 1000,
        benefits: ['Arjun (Delhi)', 'Priya (Chennai)', 'Raj (Mumbai)', 'Devi (Bengaluru)']
      },
      {
        id: 'festival_automation',
        name: 'Festival Automation Suite',
        description: 'Automated campaign suggestions for all festivals',
        price: 1500,
        benefits: ['Auto campaign generation', 'Regional customization', 'ROI tracking']
      },
      {
        id: 'meme_intelligence_pro',
        name: 'Meme Intelligence Pro',
        description: 'Advanced meme detection and viral prediction',
        price: 750,
        benefits: ['Emerging meme detection', 'Cultural reference analysis', 'Optimal timing suggestions']
      }
    ];
  }
}