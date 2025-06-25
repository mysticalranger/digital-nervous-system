import React from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Heart, Rocket, Medal, Activity, MessageSquare, Users, Brain, GitFork, Star, TrendingUp, Zap } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useWebSocket } from "@/hooks/use-websocket";

// Define interfaces for the data structures
interface User {
  id: string;
  username: string;
  region: string;
  karmaPoints: number;
  // Add other relevant fields if necessary, e.g., avatarUrl
}

interface AchievementFromAPI { // Renamed to avoid conflict with local recentAchievementsDisplay
  id: string;
  name: string;
  description: string;
  // Add other relevant fields
}

export default function CommunitySection() {
  const { data: leaderboardData } = useQuery<{ users: User[] }>({ 
    queryKey: ["/api/users/leaderboard"],
    // queryFn: async () => fetch("/api/users/leaderboard").then(res => res.json()) // Example queryFn
  });
  const leaderboard: User[] = leaderboardData?.users || []; 

  const { data: achievementsAPIData } = useQuery<{ achievements: AchievementFromAPI[] }>({ 
    queryKey: ["/api/achievements"],
    // queryFn: async () => fetch("/api/achievements").then(res => res.json()) // Example queryFn
  });
  // const achievementsFromAPI: AchievementFromAPI[] = achievementsAPIData?.achievements || []; // If you need to use this

  // Subscribe to real-time updates
  const { isConnected } = useWebSocket();

  const communityStats = {
    collaborations: 847,
    culturalSolutions: 1203,
    knowledgeShared: 3456,
  };

  const recentAchievementsDisplay = [ 
    {
      icon: <Trophy className="h-8 w-8 text-[hsl(var(--cyber-cyan))]" />,
      name: "Cultural Bridge Builder",
      description: "Created solutions for 5+ regional languages",
      color: "text-yellow-400"
    },
    {
      icon: <Heart className="h-8 w-8 text-[hsl(var(--royal-purple))]" />,
      name: "Community Champion",
      description: "Helped 100+ developers this month",
      color: "text-red-400"
    },
    {
      icon: <Rocket className="h-8 w-8 text-[hsl(var(--vibrant-orange))]" />,
      name: "Innovation Pioneer",
      description: "First to implement new AI features",
      color: "text-blue-400"
    }
  ];

  const timeFilters = ["Daily", "Weekly", "Monthly"];

  return (
    <section id="community" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-5xl font-bold mb-6">
            <span className="gradient-text">Community</span> Leaderboard
          </h3>
          <p className="text-xl text-gray-300">
            Celebrating developers who are building India's digital future
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Leaderboard */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="holographic-card border-[hsl(var(--border))]">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl font-bold">Top Contributors</CardTitle>
                  <div className="flex items-center space-x-1">
                    {isConnected && (
                      <div className="flex items-center space-x-2 text-sm text-green-400">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span>Live</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  {timeFilters.map((filter, index) => (
                    <Button
                      key={filter}
                      variant={index === 1 ? "default" : "outline"}
                      size="sm"
                      className={index === 1 ? "interactive-button" : "glass-morphism hover:bg-white hover:bg-opacity-20"}
                    >
                      {filter}
                    </Button>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboard.length > 0 ? (
                    leaderboard.slice(0, 5).map((user: User, index: number) => ( 
                      <motion.div 
                        key={user.id}
                        className="leaderboard-entry"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                            index === 0 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                            index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-600' :
                            index === 2 ? 'bg-gradient-to-r from-amber-600 to-orange-700' :
                            'bg-gradient-to-r from-[hsl(var(--cyber-cyan))] to-[hsl(var(--royal-purple))]'
                          }`}>
                            {index + 1}
                          </div>
                          <div className="flex items-center space-x-3">
                            <img 
                              src={`https://images.unsplash.com/photo-${
                                index === 0 ? '1507003211169-0a1dd7228f2d' :
                                index === 1 ? '1494790108755-2616b169912d' :
                                index === 2 ? '1472099645785-5658abf4ff4e' :
                                '1519244703995-f4e0f30006d5'
                              }?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&face`}
                              alt={`${user.username} avatar`}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                              <div className="font-semibold">{user.username}</div>
                              <div className="text-sm text-gray-400">{user.region}</div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-xl font-bold ${
                            index === 0 ? 'text-[hsl(var(--cyber-cyan))]' :
                            index === 1 ? 'text-[hsl(var(--royal-purple))]' :
                            'text-[hsl(var(--vibrant-orange))]'
                          }`}>
                            {user.karmaPoints.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-400">Karma Points</div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="space-y-4">
                      {/* Fallback display when no leaderboard data */}
                      <div className="leaderboard-entry">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center font-bold text-lg">1</div>
                          <div className="flex items-center space-x-3">
                            <img 
                              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&face" 
                              alt="Top developer avatar" 
                              className="w-12 h-12 rounded-full object-cover" 
                            />
                            <div>
                              <div className="font-semibold">Rajesh Kumar</div>
                              <div className="text-sm text-gray-400">Mumbai, Maharashtra</div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-[hsl(var(--cyber-cyan))]">15,420</div>
                          <div className="text-sm text-gray-400">Karma Points</div>
                        </div>
                      </div>

                      <div className="leaderboard-entry">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center font-bold text-lg">2</div>
                          <div className="flex items-center space-x-3">
                            <img 
                              src="https://images.unsplash.com/photo-1494790108755-2616b169912d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&face" 
                              alt="Second place developer" 
                              className="w-12 h-12 rounded-full object-cover" 
                            />
                            <div>
                              <div className="font-semibold">Priya Sharma</div>
                              <div className="text-sm text-gray-400">Bangalore, Karnataka</div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-[hsl(var(--royal-purple))]">12,890</div>
                          <div className="text-sm text-gray-400">Karma Points</div>
                        </div>
                      </div>

                      <div className="leaderboard-entry">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-orange-700 rounded-full flex items-center justify-center font-bold text-lg">3</div>
                          <div className="flex items-center space-x-3">
                            <img 
                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&face" 
                              alt="Third place developer" 
                              className="w-12 h-12 rounded-full object-cover" 
                            />
                            <div>
                              <div className="font-semibold">Amit Patel</div>
                              <div className="text-sm text-gray-400">Pune, Maharashtra</div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-[hsl(var(--vibrant-orange))]">11,230</div>
                          <div className="text-sm text-gray-400">Karma Points</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 text-center">
                  <Button className="glass-morphism hover:bg-white hover:bg-opacity-20 transition-all duration-300">
                    View Full Leaderboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Achievement Showcase */}
          <div className="space-y-6">
            {/* Recent Achievements */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="holographic-card border-[hsl(var(--border))]">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Medal className="text-yellow-400 mr-3 h-6 w-6" />
                    Recent Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentAchievementsDisplay.map((achievement, index) => ( 
                      <motion.div 
                        key={achievement.name} 
                        className="p-4 glass-morphism rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          {achievement.icon}
                          <span className="font-semibold">{achievement.name}</span>
                        </div>
                        <p className="text-sm text-gray-400">{achievement.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Community Stats */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="holographic-card border-[hsl(var(--border))]">
                <CardHeader>
                  <CardTitle>Community Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Active Collaborations</span>
                      <span className="font-bold text-[hsl(var(--cyber-cyan))]">{communityStats.collaborations}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Cultural Solutions</span>
                      <span className="font-bold text-[hsl(var(--royal-purple))]">{communityStats.culturalSolutions}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Knowledge Shared</span>
                      <span className="font-bold text-[hsl(var(--vibrant-orange))]">{communityStats.knowledgeShared}</span>
                    </div>
                  </div>

                  <Button className="w-full mt-6 interactive-button">
                    Join Community
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Live Activity */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="holographic-card border-[hsl(var(--border))]">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="text-[hsl(var(--cyber-cyan))] mr-3 h-6 w-6" />
                    Live Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="activity-item">
                      <div className="w-2 h-2 bg-[hsl(var(--cyber-cyan))] rounded-full animate-pulse"></div>
                      <span className="text-gray-300 text-sm">New AI model deployed in Mumbai region</span>
                      <span className="text-gray-500 text-xs ml-auto">2m ago</span>
                    </div>
                    <div className="activity-item">
                      <div className="w-2 h-2 bg-[hsl(var(--royal-purple))] rounded-full animate-pulse"></div>
                      <span className="text-gray-300 text-sm">Challenge completed: "Rural Education AI"</span>
                      <span className="text-gray-500 text-xs ml-auto">5m ago</span>
                    </div>
                    <div className="activity-item">
                      <div className="w-2 h-2 bg-[hsl(var(--vibrant-orange))] rounded-full animate-pulse"></div>
                      <span className="text-gray-300 text-sm">Karma milestone reached by @developer_raj</span>
                      <span className="text-gray-500 text-xs ml-auto">8m ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
