import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Globe, 
  Calendar, 
  Zap, 
  Heart, 
  ThumbsUp,
  MessageCircle,
  Share2,
  AlertCircle,
  Timer
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface TrendingTopic {
  topic: string;
  sentiment: number;
  volume: number;
  regions: string[];
  viralPotential: number;
  change24h: number;
}

interface RegionalMood {
  region: string;
  overallSentiment: 'positive' | 'neutral' | 'negative';
  dominantEmotions: string[];
  confidenceLevel: number;
  trendingContent: string[];
}

interface FestivalMood {
  activeFestivals: string[];
  anticipationLevel: number;
  commercialActivity: number;
  socialEngagement: number;
  peakRegions: string[];
}

interface ViralPrediction {
  content: string;
  viralPotential: number;
  peakTime: string;
  targetAudience: string[];
  category: string;
  estimatedReach: number;
}

const CulturalPulsePage = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [autoRefresh, setAutoRefresh] = useState(true);

  const { data: pulseData, isLoading } = useQuery({
    queryKey: ['/api/cultural-pulse', selectedTimeRange],
    refetchInterval: autoRefresh ? 30000 : false,
  });

  // Mock data for demonstration
  const mockTrendingTopics: TrendingTopic[] = [
    {
      topic: 'Diwali Preparations',
      sentiment: 85,
      volume: 12500,
      regions: ['North India', 'West India', 'Central India'],
      viralPotential: 92,
      change24h: 23
    },
    {
      topic: 'Cricket World Cup',
      sentiment: 78,
      volume: 8900,
      regions: ['All India'],
      viralPotential: 88,
      change24h: 15
    },
    {
      topic: 'Mumbai Street Food',
      sentiment: 82,
      volume: 4200,
      regions: ['West India'],
      viralPotential: 76,
      change24h: -5
    },
    {
      topic: 'Bollywood Music',
      sentiment: 74,
      volume: 6800,
      regions: ['North India', 'West India'],
      viralPotential: 71,
      change24h: 8
    }
  ];

  const mockRegionalMoods: RegionalMood[] = [
    {
      region: 'North India',
      overallSentiment: 'positive',
      dominantEmotions: ['excitement', 'anticipation', 'joy'],
      confidenceLevel: 87,
      trendingContent: ['Festival preparations', 'Family gatherings', 'Shopping deals']
    },
    {
      region: 'South India',
      overallSentiment: 'positive',
      dominantEmotions: ['cultural pride', 'traditional values', 'celebration'],
      confidenceLevel: 83,
      trendingContent: ['Classical music', 'Traditional recipes', 'Temple festivals']
    },
    {
      region: 'West India',
      overallSentiment: 'positive',
      dominantEmotions: ['business optimism', 'entertainment', 'urban lifestyle'],
      confidenceLevel: 85,
      trendingContent: ['Stock market', 'New movies', 'Food trends']
    },
    {
      region: 'East India',
      overallSentiment: 'neutral',
      dominantEmotions: ['intellectual curiosity', 'artistic expression', 'social awareness'],
      confidenceLevel: 79,
      trendingContent: ['Literature', 'Political discussions', 'Art exhibitions']
    }
  ];

  const mockFestivalMood: FestivalMood = {
    activeFestivals: ['Diwali', 'Karva Chauth', 'Dhanteras'],
    anticipationLevel: 91,
    commercialActivity: 87,
    socialEngagement: 94,
    peakRegions: ['Delhi', 'Mumbai', 'Pune', 'Jaipur']
  };

  const mockViralPredictions: ViralPrediction[] = [
    {
      content: 'Diwali rangoli competition video goes viral',
      viralPotential: 94,
      peakTime: '6:00 PM',
      targetAudience: ['Women 25-45', 'Traditional families'],
      category: 'Festival Content',
      estimatedReach: 2500000
    },
    {
      content: 'Regional food fusion experiment',
      viralPotential: 87,
      peakTime: '12:30 PM',
      targetAudience: ['Food enthusiasts', 'Urban millennials'],
      category: 'Food & Culture',
      estimatedReach: 1800000
    },
    {
      content: 'Cricket celebration meme template',
      viralPotential: 91,
      peakTime: '9:15 PM',
      targetAudience: ['Sports fans', 'Meme creators'],
      category: 'Sports Meme',
      estimatedReach: 3200000
    }
  ];

  const sentimentData = [
    { time: '00:00', positive: 65, neutral: 25, negative: 10 },
    { time: '06:00', positive: 72, neutral: 22, negative: 6 },
    { time: '12:00', positive: 78, neutral: 18, negative: 4 },
    { time: '18:00', positive: 85, neutral: 12, negative: 3 },
    { time: '24:00', positive: 82, neutral: 15, negative: 3 }
  ];

  const viralityData = [
    { hour: '06:00', potential: 45 },
    { hour: '09:00', potential: 62 },
    { hour: '12:00', potential: 78 },
    { hour: '15:00', potential: 71 },
    { hour: '18:00', potential: 89 },
    { hour: '21:00', potential: 94 },
    { hour: '24:00', potential: 67 }
  ];

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-50 border-green-200';
      case 'negative': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    }
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Live Cultural Pulse
              </h1>
              <p className="text-gray-600">
                Real-time insights into India's digital emotions and cultural trends
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button
                variant={autoRefresh ? "default" : "outline"}
                size="sm"
                onClick={() => setAutoRefresh(!autoRefresh)}
              >
                <Timer className="h-4 w-4 mr-2" />
                Auto Refresh
              </Button>
              
              <div className="flex gap-2">
                {['1h', '6h', '24h', '7d'].map((range) => (
                  <Button
                    key={range}
                    variant={selectedTimeRange === range ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedTimeRange(range)}
                  >
                    {range}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Real-time Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-orange-200 bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Overall Mood</p>
                    <p className="text-2xl font-bold text-green-600">Positive</p>
                    <p className="text-xs text-gray-500">78% across India</p>
                  </div>
                  <Heart className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-orange-200 bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Viral Activity</p>
                    <p className="text-2xl font-bold text-purple-600">High</p>
                    <p className="text-xs text-gray-500">Peak at 9 PM</p>
                  </div>
                  <Zap className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-orange-200 bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Festival Buzz</p>
                    <p className="text-2xl font-bold text-orange-600">91%</p>
                    <p className="text-xs text-gray-500">Diwali excitement</p>
                  </div>
                  <Calendar className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-orange-200 bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Trending Now</p>
                    <p className="text-2xl font-bold text-blue-600">42</p>
                    <p className="text-xs text-gray-500">Active topics</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="trending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/70 backdrop-blur-sm">
            <TabsTrigger value="trending">Trending Topics</TabsTrigger>
            <TabsTrigger value="regional">Regional Mood</TabsTrigger>
            <TabsTrigger value="festival">Festival Pulse</TabsTrigger>
            <TabsTrigger value="viral">Viral Predictions</TabsTrigger>
          </TabsList>

          <TabsContent value="trending" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Trending Topics List */}
              <Card className="border-orange-200 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-orange-600" />
                    Trending Topics
                  </CardTitle>
                  <CardDescription>Real-time cultural trends across India</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockTrendingTopics.map((topic, index) => (
                      <motion.div
                        key={topic.topic}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 border border-gray-200 rounded-lg bg-white/50"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-900">{topic.topic}</h3>
                          <div className="flex items-center gap-1">
                            {topic.change24h > 0 ? (
                              <TrendingUp className="h-4 w-4 text-green-600" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-600" />
                            )}
                            <span className={`text-sm font-medium ${getChangeColor(topic.change24h)}`}>
                              {topic.change24h > 0 ? '+' : ''}{topic.change24h}%
                            </span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Sentiment:</span>
                            <span className="ml-2 font-medium">{topic.sentiment}/100</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Volume:</span>
                            <span className="ml-2 font-medium">{topic.volume.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Viral Potential:</span>
                            <span className="ml-2 font-medium text-purple-600">{topic.viralPotential}%</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Regions:</span>
                            <span className="ml-2 font-medium">{topic.regions.length}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mt-3">
                          {topic.regions.map(region => (
                            <Badge key={region} variant="outline" className="text-xs">
                              {region}
                            </Badge>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Sentiment Timeline */}
              <Card className="border-orange-200 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-orange-600" />
                    Sentiment Timeline
                  </CardTitle>
                  <CardDescription>24-hour sentiment distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={sentimentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Area type="monotone" dataKey="positive" stackId="1" stroke="#10B981" fill="#10B981" />
                      <Area type="monotone" dataKey="neutral" stackId="1" stroke="#F59E0B" fill="#F59E0B" />
                      <Area type="monotone" dataKey="negative" stackId="1" stroke="#EF4444" fill="#EF4444" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="regional" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockRegionalMoods.map((mood, index) => (
                <motion.div
                  key={mood.region}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-orange-200 bg-white/70 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5 text-orange-600" />
                            {mood.region}
                          </CardTitle>
                          <CardDescription>Cultural sentiment analysis</CardDescription>
                        </div>
                        <Badge 
                          className={`${getSentimentColor(mood.overallSentiment)} border`}
                        >
                          {mood.overallSentiment}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Dominant Emotions</h4>
                          <div className="flex flex-wrap gap-2">
                            {mood.dominantEmotions.map(emotion => (
                              <Badge key={emotion} variant="secondary" className="text-xs">
                                {emotion}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Trending Content</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {mood.trendingContent.map((content, i) => (
                              <li key={i}>• {content}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex justify-between items-center pt-2 border-t">
                          <span className="text-sm text-gray-600">Confidence Level</span>
                          <span className="font-medium">{mood.confidenceLevel}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="festival" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-orange-200 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-orange-600" />
                    Festival Atmosphere
                  </CardTitle>
                  <CardDescription>Current festival sentiment and activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Active Festivals</h4>
                      <div className="flex flex-wrap gap-2">
                        {mockFestivalMood.activeFestivals.map(festival => (
                          <Badge key={festival} className="bg-orange-100 text-orange-800 border-orange-200">
                            {festival}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Anticipation Level</span>
                        <span className="font-bold text-2xl text-orange-600">{mockFestivalMood.anticipationLevel}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Commercial Activity</span>
                        <span className="font-bold text-2xl text-green-600">{mockFestivalMood.commercialActivity}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Social Engagement</span>
                        <span className="font-bold text-2xl text-blue-600">{mockFestivalMood.socialEngagement}%</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Peak Activity Regions</h4>
                      <div className="flex flex-wrap gap-2">
                        {mockFestivalMood.peakRegions.map(region => (
                          <Badge key={region} variant="outline">
                            {region}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-200 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-orange-600" />
                    Viral Potential Timeline
                  </CardTitle>
                  <CardDescription>Hourly viral activity prediction</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={viralityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Line 
                        type="monotone" 
                        dataKey="potential" 
                        stroke="#8B5CF6" 
                        strokeWidth={3}
                        dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="viral" className="space-y-6">
            <div className="space-y-4">
              {mockViralPredictions.map((prediction, index) => (
                <motion.div
                  key={prediction.content}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-orange-200 bg-white/70 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2">{prediction.content}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Timer className="h-4 w-4" />
                              Peak at {prediction.peakTime}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {(prediction.estimatedReach / 1000000).toFixed(1)}M reach
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-purple-600">{prediction.viralPotential}%</div>
                          <div className="text-sm text-gray-600">Viral Potential</div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <Badge variant="outline" className="mr-2">{prediction.category}</Badge>
                          {prediction.targetAudience.map(audience => (
                            <Badge key={audience} variant="secondary" className="mr-1 text-xs">
                              {audience}
                            </Badge>
                          ))}
                        </div>
                        <Button size="sm" variant="outline">
                          <AlertCircle className="h-4 w-4 mr-2" />
                          Set Alert
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CulturalPulsePage;