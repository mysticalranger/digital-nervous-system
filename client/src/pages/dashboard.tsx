import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Users, Activity, Target, Globe, Brain, Shield, Zap } from 'lucide-react';

interface DashboardMetrics {
  activeUsers: number;
  projectsToday: number;
  totalUsers: number;
  totalAnalyses: number;
  avgCulturalScore: number;
  topRegions: { name: string; count: number; sentiment: string }[];
  recentAnalyses: Array<{
    id: string;
    text: string;
    culturalScore: number;
    sentiment: string;
    region: string;
    timestamp: string;
    viralPotential?: number;
    brandSafety?: number;
  }>;
}

const Dashboard = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    activeUsers: 0,
    projectsToday: 0,
    totalUsers: 0,
    totalAnalyses: 0,
    avgCulturalScore: 0,
    topRegions: [],
    recentAnalyses: []
  });

  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [selectedTimeRange]);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`/api/dashboard/metrics?timeRange=${selectedTimeRange}`);
      if (response.ok) {
        const data = await response.json();
        setMetrics(data);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    }
  };

  const sentimentColors = {
    positive: '#10B981',
    neutral: '#F59E0B', 
    negative: '#EF4444'
  };

  const regionalData = metrics.topRegions.map(region => ({
    name: region.name.replace(' India', ''),
    analyses: region.count,
    sentiment: region.sentiment
  }));

  const sentimentDistribution = [
    { name: 'Positive', value: 45, color: '#10B981' },
    { name: 'Neutral', value: 35, color: '#F59E0B' },
    { name: 'Negative', value: 20, color: '#EF4444' }
  ];

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
            Cultural Intelligence Dashboard
          </h1>
          <p className="text-gray-600">
            Real-time insights into India's digital emotions and cultural sentiment
          </p>
        </motion.div>

        {/* Time Range Selector */}
        <div className="mb-6">
          <div className="flex gap-2">
            {['1h', '24h', '7d', '30d'].map((range) => (
              <Button
                key={range}
                variant={selectedTimeRange === range ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedTimeRange(range)}
                className="text-xs"
              >
                {range}
              </Button>
            ))}
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-orange-200 bg-white/70 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Active Users
                </CardTitle>
                <Users className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{metrics.activeUsers}</div>
                <p className="text-xs text-green-600">
                  +12% from yesterday
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
                  Analyses Today
                </CardTitle>
                <Brain className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{metrics.totalAnalyses}</div>
                <p className="text-xs text-green-600">
                  +8% from yesterday
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
                  Avg Cultural Score
                </CardTitle>
                <Target className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{metrics.avgCulturalScore}</div>
                <Progress value={metrics.avgCulturalScore} className="mt-2" />
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
                  Total Users
                </CardTitle>
                <Globe className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{metrics.totalUsers}</div>
                <p className="text-xs text-green-600">
                  Growing steadily
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Analytics */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/70 backdrop-blur-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="regional">Regional</TabsTrigger>
            <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
            <TabsTrigger value="viral">Viral Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Regional Analysis */}
              <Card className="border-orange-200 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-orange-600" />
                    Regional Activity
                  </CardTitle>
                  <CardDescription>
                    Analysis distribution across Indian regions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={regionalData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Bar dataKey="analyses" fill="#F97316" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Sentiment Distribution */}
              <Card className="border-orange-200 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-orange-600" />
                    Sentiment Distribution
                  </CardTitle>
                  <CardDescription>
                    Overall sentiment across all analyses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={sentimentDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {sentimentDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Analyses */}
            <Card className="border-orange-200 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-orange-600" />
                  Recent Cultural Analyses
                </CardTitle>
                <CardDescription>
                  Latest sentiment analyses with cultural insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {metrics.recentAnalyses.slice(0, 5).map((analysis) => (
                    <motion.div
                      key={analysis.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="border border-orange-200 rounded-lg p-4 bg-white/50"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-sm text-gray-700 flex-1 mr-4">
                          "{analysis.text.substring(0, 100)}..."
                        </p>
                        <div className="flex gap-2">
                          <Badge 
                            variant="outline"
                            className={`border-${sentimentColors[analysis.sentiment as keyof typeof sentimentColors]}`}
                          >
                            {analysis.sentiment}
                          </Badge>
                          <Badge variant="secondary">
                            {analysis.region}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>Cultural Score: {analysis.culturalScore}/100</span>
                        {analysis.viralPotential && (
                          <span className="flex items-center gap-1">
                            <Zap className="h-3 w-3" />
                            Viral: {analysis.viralPotential}%
                          </span>
                        )}
                        {analysis.brandSafety && (
                          <span className="flex items-center gap-1">
                            <Shield className="h-3 w-3" />
                            Safety: {analysis.brandSafety}%
                          </span>
                        )}
                        <span>{new Date(analysis.timestamp).toLocaleTimeString()}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="regional">
            <Card className="border-orange-200 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Regional Cultural Insights</CardTitle>
                <CardDescription>
                  Deep dive into regional sentiment patterns and cultural markers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  Advanced regional analytics coming soon...
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sentiment">
            <Card className="border-orange-200 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Sentiment Trends</CardTitle>
                <CardDescription>
                  Temporal analysis of cultural sentiment patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  Sentiment trend analysis coming soon...
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="viral">
            <Card className="border-orange-200 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Viral Content Insights</CardTitle>
                <CardDescription>
                  Predictive analytics for viral potential and brand safety
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  Viral prediction analytics coming soon...
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;