import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Zap, 
  TrendingUp, 
  Globe, 
  Users, 
  Sparkles,
  Target,
  Award,
  Coins,
  Activity,
  BarChart3,
  MessageCircle,
  Mic,
  Eye,
  ArrowRight,
  Star,
  ChevronRight,
  Calendar,
  Clock,
  Flame
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import FuturisticNavigation from '@/components/futuristic-navigation';

const FuturisticHome = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');

  const { data: metrics } = useQuery({
    queryKey: ['/api/metrics'],
    refetchInterval: 30000
  });

  const { data: userStats } = useQuery({
    queryKey: ['/api/gamification/stats']
  });

  const { data: culturalPulse } = useQuery({
    queryKey: ['/api/cultural-pulse']
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    return () => clearInterval(timer);
  }, []);

  const quickActions = [
    {
      icon: Brain,
      title: 'AI Analysis',
      description: 'Analyze cultural sentiment',
      href: '/analyze',
      color: 'bg-gradient-to-r from-purple-500 to-blue-500',
      iconColor: 'text-white'
    },
    {
      icon: Mic,
      title: 'Voice Assistant',
      description: 'Talk to AI companions',
      href: '/voice-assistant',
      color: 'bg-gradient-to-r from-green-500 to-teal-500',
      iconColor: 'text-white'
    },
    {
      icon: Activity,
      title: 'Live Pulse',
      description: 'Cultural trends now',
      href: '/cultural-pulse',
      color: 'bg-gradient-to-r from-orange-500 to-red-500',
      iconColor: 'text-white'
    },
    {
      icon: Award,
      title: 'Rewards',
      description: 'Earn cultural coins',
      href: '/gamification',
      color: 'bg-gradient-to-r from-yellow-500 to-orange-500',
      iconColor: 'text-white'
    }
  ];

  const trendingInsights = [
    {
      title: 'Diwali Sentiment Rising',
      change: '+24%',
      trend: 'up',
      region: 'North India',
      score: 94
    },
    {
      title: 'Cricket Fever Peak',
      change: '+18%',
      trend: 'up',
      region: 'Pan India',
      score: 89
    },
    {
      title: 'Tech Innovation Buzz',
      change: '+12%',
      trend: 'up',
      region: 'Bangalore',
      score: 76
    }
  ];

  const recentAchievements = [
    { icon: Flame, title: 'Cultural Explorer', desc: '10-day streak!' },
    { icon: Star, title: 'Hinglish Master', desc: 'Expert analysis' },
    { icon: Target, title: 'Trend Spotter', desc: 'Viral prediction' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      <FuturisticNavigation />
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-10 opacity-30">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div className="relative z-10 pt-20 p-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-2">
                {greeting}, Cultural Explorer
              </h1>
              <p className="text-lg lg:text-xl text-gray-300">
                Ready to decode India's digital heartbeat?
              </p>
            </div>
            
            <div className="flex flex-col xl:items-end gap-2 xl:flex-shrink-0">
              <div className="text-xl lg:text-2xl font-mono bg-black/30 px-3 lg:px-4 py-2 rounded-lg backdrop-blur-sm border border-purple-500/30">
                {currentTime.toLocaleTimeString()}
              </div>
              <div className="text-xs lg:text-sm text-gray-400 text-center xl:text-right">
                {currentTime.toLocaleDateString('en-IN', { 
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-8"
        >
          <Card className="bg-black/20 backdrop-blur-md border-purple-500/30 hover:border-purple-400/50 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Coins className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-yellow-400">
                {userStats?.culturalCoins?.toLocaleString() || '1,247'}
              </div>
              <div className="text-sm text-gray-400">Cultural Coins</div>
            </CardContent>
          </Card>

          <Card className="bg-black/20 backdrop-blur-md border-orange-500/30 hover:border-orange-400/50 transition-all duration-300">
            <CardContent className="p-4 lg:p-6 text-center">
              <Flame className="h-6 w-6 lg:h-8 lg:w-8 text-orange-400 mx-auto mb-2" />
              <div className="text-xl lg:text-3xl font-bold text-orange-400">
                {userStats?.currentStreak || '12'}
              </div>
              <div className="text-xs lg:text-sm text-gray-400">Day Streak</div>
            </CardContent>
          </Card>

          <Card className="bg-black/20 backdrop-blur-md border-green-500/30 hover:border-green-400/50 transition-all duration-300">
            <CardContent className="p-4 lg:p-6 text-center">
              <Target className="h-6 w-6 lg:h-8 lg:w-8 text-green-400 mx-auto mb-2" />
              <div className="text-xl lg:text-3xl font-bold text-green-400">
                {userStats?.masteryLevel || '7'}
              </div>
              <div className="text-xs lg:text-sm text-gray-400">Mastery Level</div>
            </CardContent>
          </Card>

          <Card className="bg-black/20 backdrop-blur-md border-pink-500/30 hover:border-pink-400/50 transition-all duration-300">
            <CardContent className="p-4 lg:p-6 text-center">
              <Brain className="h-6 w-6 lg:h-8 lg:w-8 text-pink-400 mx-auto mb-2" />
              <div className="text-xl lg:text-3xl font-bold text-pink-400">
                {userStats?.totalAnalyses || '284'}
              </div>
              <div className="text-xs lg:text-sm text-gray-400">Analyses Done</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-yellow-400" />
            Quick Actions
          </h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={action.href}>
                  <Card className="bg-black/20 backdrop-blur-md border-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer group overflow-hidden">
                    <CardContent className="p-6 text-center relative">
                      <div className={`absolute inset-0 ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                      <div className={`w-16 h-16 ${action.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <action.icon className={`h-8 w-8 ${action.iconColor}`} />
                      </div>
                      <h3 className="font-bold text-lg mb-2 group-hover:text-white transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-400 group-hover:text-gray-300">
                        {action.description}
                      </p>
                      <ArrowRight className="h-4 w-4 ml-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          
          {/* Trending Insights */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="xl:col-span-2"
          >
            <Card className="bg-black/20 backdrop-blur-md border-white/10 h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <TrendingUp className="h-6 w-6 text-green-400" />
                  Live Cultural Insights
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    LIVE
                  </Badge>
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Real-time sentiment analysis across India
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trendingInsights.map((insight, index) => (
                    <motion.div
                      key={insight.title}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
                    >
                      <div>
                        <h4 className="font-semibold text-white">{insight.title}</h4>
                        <p className="text-sm text-gray-400">{insight.region}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-green-400 font-bold">{insight.change}</span>
                          <TrendingUp className="h-4 w-4 text-green-400" />
                        </div>
                        <div className="text-sm text-gray-400">Score: {insight.score}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <Link href="/cultural-pulse">
                  <Button className="w-full mt-6 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 border-0">
                    View Full Cultural Pulse
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Achievements & Progress */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            {/* Progress Card */}
            <Card className="bg-black/20 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-400" />
                  Level Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-400">Cultural Mastery</span>
                      <span className="text-sm font-bold text-yellow-400">Level 7</span>
                    </div>
                    <Progress value={72} className="h-3 bg-white/10" />
                    <p className="text-xs text-gray-500 mt-1">280 XP to next level</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-400">Weekly Goal</span>
                      <span className="text-sm font-bold text-blue-400">85%</span>
                    </div>
                    <Progress value={85} className="h-3 bg-white/10" />
                    <p className="text-xs text-gray-500 mt-1">17 more analyses needed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements Card */}
            <Card className="bg-black/20 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-purple-400" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentAchievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <achievement.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{achievement.title}</h4>
                        <p className="text-xs text-gray-400">{achievement.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <Link href="/gamification">
                  <Button variant="outline" className="w-full mt-4 border-purple-500/30 text-purple-400 hover:bg-purple-500/10">
                    View All Achievements
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Community Activity Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="bg-black/20 backdrop-blur-md border-white/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-cyan-400" />
                  Community Pulse
                </CardTitle>
                <Link href="/community">
                  <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300">
                    Join Community
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <div className="text-3xl font-bold text-cyan-400 mb-1">
                    {metrics?.activeUsers || '1,234'}
                  </div>
                  <div className="text-sm text-gray-400">Active Users</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <div className="text-3xl font-bold text-green-400 mb-1">
                    {metrics?.projectsToday || '89'}
                  </div>
                  <div className="text-sm text-gray-400">Analyses Today</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <div className="text-3xl font-bold text-purple-400 mb-1">156</div>
                  <div className="text-sm text-gray-400">Challenges Active</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default FuturisticHome;