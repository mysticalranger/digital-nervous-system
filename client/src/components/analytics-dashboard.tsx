import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { useQuery } from "@tanstack/react-query";

interface AnalyticsData {
  dau: number;
  mau: number;
  arpu: number;
  churnRate: number;
  avgSessionTime: number;
  conversionRate: number;
  engagementScore: number;
  retentionD1: number;
  retentionD7: number;
  retentionD30: number;
  featureUsage: {
    challenges: number;
    aiGeneration: number;
    socialFeatures: number;
    notifications: number;
  };
  regionalBreakdown: {
    region: string;
    users: number;
    revenue: number;
  }[];
}

export default function AnalyticsDashboard() {
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d'>('30d');
  
  const { data: analytics, isLoading } = useQuery<AnalyticsData>({
    queryKey: ['/api/analytics', timeframe],
    refetchInterval: 300000, // 5 minutes
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="glass-morphism rounded-xl p-6 animate-pulse">
            <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-8 bg-gray-700 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!analytics) return null;

  const getScoreColor = (score: number, thresholds: [number, number]) => {
    if (score >= thresholds[1]) return 'text-green-400';
    if (score >= thresholds[0]) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Timeframe Selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold gradient-text">Platform Analytics</h2>
        <div className="flex space-x-2">
          {(['7d', '30d', '90d'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-4 py-2 rounded-lg transition-all ${
                timeframe === period 
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white' 
                  : 'glass-morphism text-gray-400 hover:text-white'
              }`}
            >
              {period.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
        <motion.div 
          className="glass-morphism rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-400">Daily Active Users</h3>
            <span className="text-2xl">👥</span>
          </div>
          <div className="text-3xl font-bold text-cyan-400 mb-1">
            {analytics.dau.toLocaleString()}
          </div>
          <Badge className="bg-green-500/20 text-green-400">
            +{Math.round((analytics.dau / analytics.mau) * 100)}% of MAU
          </Badge>
        </motion.div>

        <motion.div 
          className="glass-morphism rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-400">ARPU (₹)</h3>
            <span className="text-2xl">💰</span>
          </div>
          <div className="text-3xl font-bold text-green-400 mb-1">
            ₹{analytics.arpu.toFixed(2)}
          </div>
          <Badge className={`${getScoreColor(analytics.arpu, [50, 100])} bg-opacity-20`}>
            Monthly Revenue
          </Badge>
        </motion.div>

        <motion.div 
          className="glass-morphism rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-400">Engagement Score</h3>
            <span className="text-2xl">🎯</span>
          </div>
          <div className={`text-3xl font-bold mb-1 ${getScoreColor(analytics.engagementScore, [70, 85])}`}>
            {analytics.engagementScore}/100
          </div>
          <Badge className="bg-purple-500/20 text-purple-400">
            User Activity
          </Badge>
        </motion.div>

        <motion.div 
          className="glass-morphism rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-400">Churn Rate</h3>
            <span className="text-2xl">📉</span>
          </div>
          <div className={`text-3xl font-bold mb-1 ${getScoreColor(100 - analytics.churnRate, [80, 90])}`}>
            {analytics.churnRate.toFixed(1)}%
          </div>
          <Badge className="bg-orange-500/20 text-orange-400">
            Monthly Churn
          </Badge>
        </motion.div>
      </div>

      {/* Retention Analysis */}
      <Card className="glass-morphism border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-purple-400">User Retention Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">
                {analytics.retentionD1.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-400">Day 1 Retention</div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div 
                  className="bg-green-400 h-2 rounded-full" 
                  style={{ width: `${analytics.retentionD1}%` }}
                />
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-1">
                {analytics.retentionD7.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-400">Day 7 Retention</div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div 
                  className="bg-yellow-400 h-2 rounded-full" 
                  style={{ width: `${analytics.retentionD7}%` }}
                />
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400 mb-1">
                {analytics.retentionD30.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-400">Day 30 Retention</div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div 
                  className="bg-cyan-400 h-2 rounded-full" 
                  style={{ width: `${analytics.retentionD30}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feature Usage */}
      <Card className="glass-morphism border-cyan-500/20">
        <CardHeader>
          <CardTitle className="text-cyan-400">Feature Usage Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(analytics.featureUsage).map(([feature, usage], index) => (
              <motion.div 
                key={feature}
                className="text-center p-4 rounded-lg border border-gray-700"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-xl mb-2">
                  {feature === 'challenges' ? '🎯' :
                   feature === 'aiGeneration' ? '🤖' :
                   feature === 'socialFeatures' ? '👥' : '🔔'}
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {usage.toFixed(1)}%
                </div>
                <div className="text-xs text-gray-400 capitalize">
                  {feature.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Regional Performance */}
      <Card className="glass-morphism border-orange-500/20">
        <CardHeader>
          <CardTitle className="text-orange-400">Regional Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.regionalBreakdown.map((region, index) => (
              <motion.div 
                key={region.region}
                className="flex items-center justify-between p-4 rounded-lg border border-gray-700"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div>
                  <div className="font-semibold text-white">{region.region}</div>
                  <div className="text-sm text-gray-400">{region.users.toLocaleString()} users</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-400">₹{region.revenue.toLocaleString()}</div>
                  <div className="text-xs text-gray-400">Monthly Revenue</div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Session Metrics */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="glass-morphism border-green-500/20">
          <CardHeader>
            <CardTitle className="text-green-400">Session Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Average Session Time</span>
                <span className="font-bold text-white">{Math.round(analytics.avgSessionTime / 60)} min</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Conversion Rate</span>
                <span className={`font-bold ${getScoreColor(analytics.conversionRate, [2, 5])}`}>
                  {analytics.conversionRate.toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Monthly Active Users</span>
                <span className="font-bold text-cyan-400">{analytics.mau.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-purple-400">Performance Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="text-green-400 font-semibold mb-1">Strength</div>
                <div className="text-sm text-gray-300">High user engagement and daily activity</div>
              </div>
              <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <div className="text-yellow-400 font-semibold mb-1">Opportunity</div>
                <div className="text-sm text-gray-300">Improve conversion rates in tier-2 cities</div>
              </div>
              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <div className="text-blue-400 font-semibold mb-1">Focus Area</div>
                <div className="text-sm text-gray-300">Expand social features usage</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}