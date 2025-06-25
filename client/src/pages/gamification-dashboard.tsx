import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, 
  Flame, 
  Coins, 
  Target, 
  Crown, 
  Star, 
  Zap, 
  Gift,
  TrendingUp,
  Users,
  Calendar
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface UserStats {
  culturalCoins: number;
  masteryLevel: number;
  currentStreak: number;
  longestStreak: number;
  totalAnalyses: number;
  communityRank: number;
  achievements: Achievement[];
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  unlocked: boolean;
  progress: number;
  target: number;
  reward: {
    culturalCoins: number;
    masteryXP: number;
  };
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: string;
  startDate: string;
  endDate: string;
  participants: number;
  prize: number;
  userParticipating: boolean;
}

const GamificationDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('overview');

  const { data: userStats, isLoading: statsLoading } = useQuery({
    queryKey: ['/api/gamification/stats'],
    refetchInterval: 30000,
  });

  const { data: challenges, isLoading: challengesLoading } = useQuery({
    queryKey: ['/api/gamification/challenges'],
    refetchInterval: 60000,
  });

  const { data: leaderboard, isLoading: leaderboardLoading } = useQuery({
    queryKey: ['/api/gamification/leaderboard'],
    refetchInterval: 60000,
  });

  const getMasteryLevelName = (level: number) => {
    if (level < 5) return 'Cultural Novice';
    if (level < 15) return 'Regional Explorer';
    if (level < 30) return 'Cultural Analyst';
    if (level < 50) return 'Sentiment Sage';
    if (level < 75) return 'Cultural Guru';
    return 'Bharat Expert';
  };

  const getStreakColor = (streak: number) => {
    if (streak < 3) return 'text-gray-600';
    if (streak < 7) return 'text-orange-600';
    if (streak < 30) return 'text-red-600';
    return 'text-purple-600';
  };

  const mockStats: UserStats = {
    culturalCoins: 2450,
    masteryLevel: 12,
    currentStreak: 8,
    longestStreak: 23,
    totalAnalyses: 156,
    communityRank: 847,
    achievements: [
      {
        id: '1',
        name: 'Hinglish Hero',
        description: 'Analyze 50 Hinglish texts',
        icon: '🎯',
        category: 'analysis',
        unlocked: true,
        progress: 50,
        target: 50,
        reward: { culturalCoins: 100, masteryXP: 50 }
      },
      {
        id: '2',
        name: 'Festival Fanatic',
        description: 'Participate in 5 festival analyses',
        icon: '🪔',
        category: 'festival',
        unlocked: false,
        progress: 3,
        target: 5,
        reward: { culturalCoins: 200, masteryXP: 100 }
      },
      {
        id: '3',
        name: 'Streak Master',
        description: 'Maintain 30-day streak',
        icon: '🔥',
        category: 'streak',
        unlocked: false,
        progress: 8,
        target: 30,
        reward: { culturalCoins: 500, masteryXP: 250 }
      }
    ]
  };

  const mockChallenges: Challenge[] = [
    {
      id: '1',
      title: 'Diwali Sentiment Prediction',
      description: 'Predict which Diwali campaign will perform best',
      type: 'prediction',
      startDate: '2024-10-15',
      endDate: '2024-11-05',
      participants: 1247,
      prize: 5000,
      userParticipating: true
    },
    {
      id: '2',
      title: 'Regional Meme Analysis',
      description: 'Analyze viral potential of regional memes',
      type: 'meme',
      startDate: '2024-10-20',
      endDate: '2024-10-27',
      participants: 892,
      prize: 2500,
      userParticipating: false
    }
  ];

  const stats = userStats || mockStats;
  const activeChallenges = challenges || mockChallenges;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Cultural Mastery Hub
          </h1>
          <p className="text-gray-600">
            Level up your cultural intelligence and earn rewards
          </p>
        </motion.div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-orange-200 bg-white/70 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Cultural Coins
                </CardTitle>
                <Coins className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stats.culturalCoins}</div>
                <p className="text-xs text-green-600">
                  +250 this week
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-orange-200 bg-white/70 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Current Streak
                </CardTitle>
                <Flame className={`h-4 w-4 ${getStreakColor(stats.currentStreak)}`} />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getStreakColor(stats.currentStreak)}`}>
                  {stats.currentStreak} days
                </div>
                <p className="text-xs text-gray-500">
                  Best: {stats.longestStreak} days
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-orange-200 bg-white/70 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Mastery Level
                </CardTitle>
                <Crown className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stats.masteryLevel}</div>
                <p className="text-xs text-purple-600">
                  {getMasteryLevelName(stats.masteryLevel)}
                </p>
                <Progress value={(stats.masteryLevel % 5) * 20} className="mt-2" />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-orange-200 bg-white/70 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Community Rank
                </CardTitle>
                <Trophy className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">#{stats.communityRank}</div>
                <p className="text-xs text-green-600">
                  ↑ 12 this week
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/70 backdrop-blur-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="shop">Coin Shop</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Achievements */}
              <Card className="border-orange-200 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-600" />
                    Recent Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {stats.achievements.filter(a => a.unlocked).slice(0, 3).map((achievement) => (
                      <div key={achievement.id} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-green-900">{achievement.name}</h4>
                          <p className="text-sm text-green-700">{achievement.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-green-900">
                            +{achievement.reward.culturalCoins} coins
                          </div>
                          <div className="text-xs text-green-600">
                            +{achievement.reward.masteryXP} XP
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Active Challenges */}
              <Card className="border-orange-200 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    Active Challenges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {activeChallenges.slice(0, 2).map((challenge) => (
                      <div key={challenge.id} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-blue-900">{challenge.title}</h4>
                          <Badge variant={challenge.userParticipating ? "default" : "outline"}>
                            {challenge.userParticipating ? "Joined" : "Available"}
                          </Badge>
                        </div>
                        <p className="text-sm text-blue-700 mb-3">{challenge.description}</p>
                        <div className="flex justify-between items-center text-xs text-blue-600">
                          <span>{challenge.participants} participants</span>
                          <span>Prize: {challenge.prize} coins</span>
                        </div>
                        {!challenge.userParticipating && (
                          <Button size="sm" className="w-full mt-2">Join Challenge</Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.achievements.map((achievement) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg border ${
                    achievement.unlocked 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`text-3xl ${achievement.unlocked ? '' : 'opacity-50'}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${
                        achievement.unlocked ? 'text-green-900' : 'text-gray-600'
                      }`}>
                        {achievement.name}
                      </h3>
                      <p className={`text-sm ${
                        achievement.unlocked ? 'text-green-700' : 'text-gray-500'
                      }`}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                  
                  {!achievement.unlocked && (
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{achievement.progress}/{achievement.target}</span>
                      </div>
                      <Progress 
                        value={(achievement.progress / achievement.target) * 100} 
                        className="h-2"
                      />
                    </div>
                  )}
                  
                  <div className="flex justify-between text-xs">
                    <span className={achievement.unlocked ? 'text-green-600' : 'text-gray-500'}>
                      +{achievement.reward.culturalCoins} coins
                    </span>
                    <span className={achievement.unlocked ? 'text-green-600' : 'text-gray-500'}>
                      +{achievement.reward.masteryXP} XP
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="challenges" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {activeChallenges.map((challenge) => (
                <Card key={challenge.id} className="border-orange-200 bg-white/70 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{challenge.title}</CardTitle>
                        <CardDescription>{challenge.description}</CardDescription>
                      </div>
                      <Badge variant={challenge.userParticipating ? "default" : "outline"}>
                        {challenge.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-gray-600">Participants:</span>
                        <span className="ml-2 font-medium">{challenge.participants}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Prize Pool:</span>
                        <span className="ml-2 font-medium text-yellow-600">{challenge.prize} coins</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Starts:</span>
                        <span className="ml-2 font-medium">{new Date(challenge.startDate).toLocaleDateString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Ends:</span>
                        <span className="ml-2 font-medium">{new Date(challenge.endDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    {challenge.userParticipating ? (
                      <Button variant="outline" className="w-full" disabled>
                        <Users className="h-4 w-4 mr-2" />
                        Already Participating
                      </Button>
                    ) : (
                      <Button className="w-full">
                        <Zap className="h-4 w-4 mr-2" />
                        Join Challenge
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="shop" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Shop Items */}
              <Card className="border-orange-200 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Premium Insights Pack</CardTitle>
                  <CardDescription>Unlock advanced cultural analysis features</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600 mb-4">500 coins</div>
                  <ul className="text-sm text-gray-600 space-y-1 mb-4">
                    <li>• Advanced meme detection</li>
                    <li>• Viral prediction insights</li>
                    <li>• Festival timing optimization</li>
                  </ul>
                  <Button className="w-full">
                    <Gift className="h-4 w-4 mr-2" />
                    Purchase
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-orange-200 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Streak Shield</CardTitle>
                  <CardDescription>Protect your streak for 3 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600 mb-4">200 coins</div>
                  <p className="text-sm text-gray-600 mb-4">
                    Don't lose your streak! This shield protects you from missing up to 3 days.
                  </p>
                  <Button className="w-full">
                    <Gift className="h-4 w-4 mr-2" />
                    Purchase
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-orange-200 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Voice Assistant Pro</CardTitle>
                  <CardDescription>Unlock all 4 regional AI assistants</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600 mb-4">1000 coins</div>
                  <ul className="text-sm text-gray-600 space-y-1 mb-4">
                    <li>• Arjun (Delhi)</li>
                    <li>• Priya (Chennai)</li>
                    <li>• Raj (Mumbai)</li>
                    <li>• Devi (Bengaluru)</li>
                  </ul>
                  <Button className="w-full">
                    <Gift className="h-4 w-4 mr-2" />
                    Purchase
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GamificationDashboard;