import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface EngagementFeedProps {
  userId?: number;
}

interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  type: 'coding' | 'cultural' | 'community' | 'learning';
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  expiresAt: string;
  participants: number;
  isCompleted?: boolean;
}

interface Notification {
  id: string;
  type: 'achievement' | 'challenge' | 'social' | 'streak' | 'limited_offer';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  expiresAt?: string;
}

interface UserStreak {
  current: number;
  longest: number;
  todayCompleted: boolean;
}

export default function EngagementFeed({ userId = 1 }: EngagementFeedProps) {
  const [activeTab, setActiveTab] = useState<'challenges' | 'notifications' | 'leaderboard'>('challenges');
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: string }>({});
  const queryClient = useQueryClient();

  // Fetch daily challenges with FOMO urgency
  const { data: challenges = [], isLoading: challengesLoading } = useQuery({
    queryKey: ['/api/engagement/challenges'],
    refetchInterval: 30000, // Refresh every 30 seconds for real-time updates
  });

  // Fetch notifications with variable reward timing
  const { data: notifications = [], isLoading: notificationsLoading } = useQuery({
    queryKey: ['/api/engagement/notifications', userId],
    refetchInterval: 15000, // Frequent updates to trigger notification checking behavior
  });

  // Fetch user streak for social proof and achievement tracking
  const { data: streak } = useQuery<UserStreak>({
    queryKey: ['/api/engagement/streak', userId],
    refetchInterval: 60000,
  });

  // Challenge completion mutation with variable rewards
  const completeChallengeMutation = useMutation({
    mutationFn: (challengeId: string) => 
      apiRequest(`/api/engagement/challenges/${challengeId}/complete`, 'POST', { userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/engagement/challenges'] });
      queryClient.invalidateQueries({ queryKey: ['/api/engagement/streak', userId] });
      queryClient.invalidateQueries({ queryKey: ['/api/metrics'] });
    },
  });

  // Real-time countdown for ephemeral content (FOMO trigger)
  useEffect(() => {
    const updateCountdowns = () => {
      const now = new Date().getTime();
      const newTimeLeft: { [key: string]: string } = {};
      
      challenges.forEach((challenge: DailyChallenge) => {
        const expiresAt = new Date(challenge.expiresAt).getTime();
        const timeRemaining = expiresAt - now;
        
        if (timeRemaining > 0) {
          const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
          const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
          newTimeLeft[challenge.id] = `${hours}h ${minutes}m`;
        } else {
          newTimeLeft[challenge.id] = 'Expired';
        }
      });
      
      setTimeLeft(newTimeLeft);
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [challenges]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 border-green-400';
      case 'medium': return 'text-yellow-400 border-yellow-400';
      case 'hard': return 'text-red-400 border-red-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return '🔥';
      case 'medium': return '⚡';
      case 'low': return '💡';
      default: return '📢';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Streak Display with Social Proof */}
      {streak && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-morphism rounded-xl p-6 border border-cyan-500/20"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div 
                className="text-4xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🔥
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-orange-400">
                  {streak.current} Day Streak!
                </h3>
                <p className="text-gray-400">
                  Longest: {streak.longest} days • Keep it going!
                </p>
              </div>
            </div>
            <motion.div 
              className="text-right"
              animate={streak.todayCompleted ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              <Badge variant={streak.todayCompleted ? "default" : "secondary"}>
                {streak.todayCompleted ? "Today Complete ✅" : "Complete Today"}
              </Badge>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Tab Navigation */}
      <div className="flex space-x-1 glass-morphism rounded-xl p-1">
        {[
          { key: 'challenges', label: 'Daily Challenges', count: challenges.length },
          { key: 'notifications', label: 'Updates', count: notifications.filter((n: Notification) => n.priority === 'high').length },
          { key: 'leaderboard', label: 'Leaderboard', count: 0 }
        ].map((tab) => (
          <motion.button
            key={tab.key}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === tab.key 
                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab(tab.key as any)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {tab.label}
            {tab.count > 0 && (
              <motion.span 
                className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {tab.count}
              </motion.span>
            )}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Daily Challenges Tab - Primary Engagement Driver */}
        {activeTab === 'challenges' && (
          <motion.div
            key="challenges"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold gradient-text">Today's Challenges</h2>
              <motion.div
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-sm text-yellow-400"
              >
                ⏰ Resets in {timeLeft['daily'] || '24h'}
              </motion.div>
            </div>

            {challengesLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="glass-morphism rounded-xl p-6 animate-pulse">
                    <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {challenges.map((challenge: DailyChallenge, index: number) => (
                  <motion.div
                    key={challenge.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-morphism rounded-xl p-6 border border-purple-500/20"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">
                            {challenge.title}
                          </h3>
                          <Badge className={`${getDifficultyColor(challenge.difficulty)} bg-transparent`}>
                            {challenge.difficulty.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-gray-300 mb-3">{challenge.description}</p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span>💎 {challenge.points} points</span>
                          <span>👥 {challenge.participants} participating</span>
                          <span className="text-orange-400">
                            ⏰ {timeLeft[challenge.id] || 'Loading...'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <Badge variant="secondary" className="text-xs">
                          {challenge.type}
                        </Badge>
                      </div>
                      
                      <Button
                        onClick={() => completeChallengeMutation.mutate(challenge.id)}
                        disabled={completeChallengeMutation.isPending || challenge.isCompleted}
                        className={`interactive-button ${
                          challenge.isCompleted 
                            ? 'bg-green-600 hover:bg-green-700' 
                            : 'pulse-glow'
                        }`}
                      >
                        <span>
                          {challenge.isCompleted ? '✅ Completed' : 'Start Challenge'}
                        </span>
                      </Button>
                    </div>

                    {/* Progress bar for urgency */}
                    <motion.div 
                      className="mt-4 h-1 bg-gray-700 rounded-full overflow-hidden"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    >
                      <motion.div
                        className="h-full bg-gradient-to-r from-orange-500 to-red-500"
                        style={{
                          width: `${Math.max(10, 100 - ((new Date().getTime() - new Date(challenge.expiresAt).getTime() + 24*60*60*1000) / (24*60*60*1000)) * 100)}%`
                        }}
                        animate={{ opacity: [1, 0.7, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Notifications Tab - Variable Rewards */}
        {activeTab === 'notifications' && (
          <motion.div
            key="notifications"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold gradient-text">Latest Updates</h2>
            
            {notificationsLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="glass-morphism rounded-lg p-4 animate-pulse">
                    <div className="h-3 bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-2 bg-gray-700 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {notifications.map((notification: Notification, index: number) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`glass-morphism rounded-lg p-4 border-l-4 ${
                      notification.priority === 'high' ? 'border-red-500' :
                      notification.priority === 'medium' ? 'border-yellow-500' : 'border-blue-500'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-lg">
                        {getPriorityIcon(notification.priority)}
                      </span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-1">
                          {notification.title}
                        </h4>
                        <p className="text-gray-300 text-sm">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">
                            {new Date(notification.createdAt).toLocaleTimeString()}
                          </span>
                          {notification.expiresAt && (
                            <Badge variant="destructive" className="text-xs">
                              Expires Soon
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Leaderboard Tab - Social Proof */}
        {activeTab === 'leaderboard' && (
          <motion.div
            key="leaderboard"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold gradient-text">Community Leaders</h2>
            
            <Card className="glass-morphism border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-center text-yellow-400">
                  🏆 Top Performers This Week
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center text-gray-400">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <p>Connect with friends to see leaderboards!</p>
                    <Button className="mt-4 interactive-button">
                      <span>Invite Friends</span>
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}