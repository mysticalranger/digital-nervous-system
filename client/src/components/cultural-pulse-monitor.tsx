import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Heart, 
  Zap, 
  Globe, 
  Users,
  Calendar,
  Target,
  DollarSign,
  BarChart3,
  Activity
} from 'lucide-react';

// STUDENT NOTE: This is our unique Cultural Pulse Monitor
// It's like a "stock market tracker" but for Indian cultural trends!

interface CulturalPulse {
  region: string;
  emotionalScore: number;
  festivalContext: string;
  trendingPhrases: string[];
  brandSafetyScore: number;
  viralPotential: number;
  generationGap: number;
  monetizationOpportunity: string;
}

interface TrendAlert {
  id: string;
  type: 'festival' | 'viral' | 'brand-risk' | 'opportunity';
  message: string;
  region: string;
  urgency: 'low' | 'medium' | 'high';
  revenue: string;
  timestamp: string;
}

export default function CulturalPulseMonitor() {
  const [activeTab, setActiveTab] = useState('live-pulse');
  const [pulseData, setPulseData] = useState<CulturalPulse[]>([]);
  const [trendAlerts, setTrendAlerts] = useState<TrendAlert[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [revenueCounter, setRevenueCounter] = useState(47650);

  // STUDENT EXPLANATION: This simulates real-time data
  // In production, this would connect to your AI backend
  useEffect(() => {
    const generatePulseData = () => {
      const regions = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad'];
      const festivals = ['Diwali approaching', 'Post-Holi cleanup', 'Navratri vibes', 'Regular day', 'Weekend mood'];
      
      return regions.map(region => ({
        region,
        emotionalScore: Math.floor(Math.random() * 40) + 60, // 60-100
        festivalContext: festivals[Math.floor(Math.random() * festivals.length)],
        trendingPhrases: [
          `${region} wali feeling`,
          'Bas kar bhai',
          'Mood hai ya nahi',
          'Weekend vibes'
        ].slice(0, Math.floor(Math.random() * 3) + 1),
        brandSafetyScore: Math.floor(Math.random() * 30) + 70, // 70-100
        viralPotential: Math.floor(Math.random() * 50) + 50, // 50-100
        generationGap: Math.floor(Math.random() * 60) + 20, // 20-80
        monetizationOpportunity: ['High', 'Medium', 'Very High'][Math.floor(Math.random() * 3)]
      }));
    };

    const generateTrendAlerts = () => {
      const alerts: TrendAlert[] = [
        {
          id: '1',
          type: 'festival',
          message: 'Diwali sentiment surge detected in North India - 85% positive emotion spike',
          region: 'North India',
          urgency: 'high',
          revenue: '₹2.5L opportunity',
          timestamp: '2 mins ago'
        },
        {
          id: '2',
          type: 'viral',
          message: '"Bas kar bhai" phrase going viral - 340% usage increase in last hour',
          region: 'All India',
          urgency: 'medium',
          revenue: '₹80K potential',
          timestamp: '5 mins ago'
        },
        {
          id: '3',
          type: 'brand-risk',
          message: 'Religious sensitivity alert in East India - avoid temple-related campaigns',
          region: 'East India',
          urgency: 'high',
          revenue: '₹50L risk avoided',
          timestamp: '8 mins ago'
        },
        {
          id: '4',
          type: 'opportunity',
          message: 'Code-mixing trend in Tech sector - perfect for startup campaigns',
          region: 'Bangalore',
          urgency: 'medium',
          revenue: '₹1.2L opportunity',
          timestamp: '12 mins ago'
        }
      ];
      
      return alerts;
    };

    setPulseData(generatePulseData());
    setTrendAlerts(generateTrendAlerts());

    // Update revenue counter every 3 seconds (simulating real API usage)
    const revenueInterval = setInterval(() => {
      setRevenueCounter(prev => prev + Math.floor(Math.random() * 500) + 100);
    }, 3000);

    // Refresh data every 30 seconds
    const dataInterval = setInterval(() => {
      setPulseData(generatePulseData());
    }, 30000);

    return () => {
      clearInterval(revenueInterval);
      clearInterval(dataInterval);
    };
  }, []);

  const simulateAnalysis = async () => {
    setIsAnalyzing(true);
    
    // STUDENT NOTE: This simulates our AI analysis
    // In real implementation, this calls your cultural analysis API
    setTimeout(() => {
      setIsAnalyzing(false);
      // Add a new trend alert
      const newAlert: TrendAlert = {
        id: Date.now().toString(),
        type: 'opportunity',
        message: 'New cultural trend detected - "weekend planning anxiety" spike in metros',
        region: 'Metro Cities',
        urgency: 'medium',
        revenue: '₹95K opportunity',
        timestamp: 'Just now'
      };
      setTrendAlerts(prev => [newAlert, ...prev.slice(0, 3)]);
    }, 2000);
  };

  const getAlertIcon = (type: TrendAlert['type']) => {
    switch (type) {
      case 'festival': return <Calendar className="h-4 w-4" />;
      case 'viral': return <TrendingUp className="h-4 w-4" />;
      case 'brand-risk': return <AlertTriangle className="h-4 w-4" />;
      case 'opportunity': return <DollarSign className="h-4 w-4" />;
    }
  };

  const getAlertColor = (urgency: TrendAlert['urgency']) => {
    switch (urgency) {
      case 'high': return 'border-red-500 bg-red-500/10';
      case 'medium': return 'border-yellow-500 bg-yellow-500/10';
      case 'low': return 'border-green-500 bg-green-500/10';
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Cultural Pulse Monitor</span>
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            World's first real-time cultural sentiment intelligence for the Indian market
          </p>
          
          {/* Revenue Counter */}
          <div className="flex justify-center items-center gap-6 mb-6">
            <Card className="glass-morphism border-green-500/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-400" />
                  <span className="text-sm text-gray-400">Revenue Generated Today</span>
                </div>
                <div className="text-2xl font-bold text-green-400">
                  ₹{revenueCounter.toLocaleString()}
                </div>
              </CardContent>
            </Card>
            
            <Button 
              onClick={simulateAnalysis}
              disabled={isAnalyzing}
              className="bg-gradient-to-r from-purple-600 to-cyan-600"
            >
              {isAnalyzing ? (
                <>
                  <Activity className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-4 w-4" />
                  Run Analysis
                </>
              )}
            </Button>
          </div>
        </motion.div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 glass-morphism">
            <TabsTrigger value="live-pulse">Live Pulse</TabsTrigger>
            <TabsTrigger value="trend-alerts">Trend Alerts</TabsTrigger>
            <TabsTrigger value="revenue-ops">Revenue Ops</TabsTrigger>
            <TabsTrigger value="api-demo">API Demo</TabsTrigger>
          </TabsList>

          {/* Live Cultural Pulse */}
          <TabsContent value="live-pulse" className="space-y-6">
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {pulseData.map((pulse, index) => (
                <motion.div
                  key={pulse.region}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass-morphism border-purple-500/20 hover:border-purple-500/40 transition-all">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{pulse.region}</CardTitle>
                        <Badge className={`${pulse.emotionalScore > 80 ? 'bg-green-500/20 text-green-400' : pulse.emotionalScore > 60 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                          {pulse.emotionalScore}% Positive
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400">{pulse.festivalContext}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Emotional Score */}
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Cultural Sentiment</span>
                          <span>{pulse.emotionalScore}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${pulse.emotionalScore}%` }}
                          />
                        </div>
                      </div>

                      {/* Brand Safety */}
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Brand Safety</span>
                          <span>{pulse.brandSafetyScore}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${
                              pulse.brandSafetyScore > 80 ? 'bg-green-500' : 
                              pulse.brandSafetyScore > 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${pulse.brandSafetyScore}%` }}
                          />
                        </div>
                      </div>

                      {/* Viral Potential */}
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Viral Potential</span>
                          <span>{pulse.viralPotential}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${pulse.viralPotential}%` }}
                          />
                        </div>
                      </div>

                      {/* Trending Phrases */}
                      <div>
                        <h4 className="text-sm font-semibold text-cyan-400 mb-2">Trending Phrases</h4>
                        <div className="flex flex-wrap gap-1">
                          {pulse.trendingPhrases.map((phrase, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs border-cyan-500/30">
                              {phrase}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Monetization */}
                      <div className="p-3 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-green-400">Revenue Opportunity</span>
                          <Badge className="bg-green-500/20 text-green-300">{pulse.monetizationOpportunity}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Trend Alerts */}
          <TabsContent value="trend-alerts" className="space-y-6">
            <Card className="glass-morphism border-orange-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  Real-Time Cultural Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <AnimatePresence>
                    {trendAlerts.map((alert, index) => (
                      <motion.div
                        key={alert.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-lg border ${getAlertColor(alert.urgency)}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-full ${
                              alert.urgency === 'high' ? 'bg-red-500/20' :
                              alert.urgency === 'medium' ? 'bg-yellow-500/20' : 'bg-green-500/20'
                            }`}>
                              {getAlertIcon(alert.type)}
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1">{alert.message}</h4>
                              <div className="flex items-center gap-4 text-sm text-gray-400">
                                <span className="flex items-center gap-1">
                                  <Globe className="h-3 w-3" />
                                  {alert.region}
                                </span>
                                <span>{alert.timestamp}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className={`mb-1 ${
                              alert.urgency === 'high' ? 'bg-red-500/20 text-red-300' :
                              alert.urgency === 'medium' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-green-500/20 text-green-300'
                            }`}>
                              {alert.urgency.toUpperCase()}
                            </Badge>
                            <div className="text-sm font-semibold text-green-400">{alert.revenue}</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Revenue Operations */}
          <TabsContent value="revenue-ops" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="glass-morphism border-green-500/20">
                <CardContent className="p-6 text-center">
                  <DollarSign className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-400">₹2.4L</div>
                  <div className="text-sm text-gray-400">Monthly Revenue</div>
                </CardContent>
              </Card>
              
              <Card className="glass-morphism border-blue-500/20">
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-400">47</div>
                  <div className="text-sm text-gray-400">Active Clients</div>
                </CardContent>
              </Card>
              
              <Card className="glass-morphism border-purple-500/20">
                <CardContent className="p-6 text-center">
                  <BarChart3 className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-400">95%</div>
                  <div className="text-sm text-gray-400">Accuracy Rate</div>
                </CardContent>
              </Card>
              
              <Card className="glass-morphism border-orange-500/20">
                <CardContent className="p-6 text-center">
                  <Target className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-orange-400">₹50L</div>
                  <div className="text-sm text-gray-400">ARR Target</div>
                </CardContent>
              </Card>
            </div>

            {/* Pricing Tiers */}
            <Card className="glass-morphism border-cyan-500/20">
              <CardHeader>
                <CardTitle>Revenue Streams</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-4 border border-blue-500/20 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-400 mb-2">API Access</h3>
                    <div className="text-2xl font-bold mb-2">₹5,000/month</div>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• 10,000 API calls</li>
                      <li>• Real-time alerts</li>
                      <li>• Basic analytics</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border border-purple-500/20 rounded-lg bg-purple-500/5">
                    <h3 className="text-lg font-semibold text-purple-400 mb-2">Pro Dashboard</h3>
                    <div className="text-2xl font-bold mb-2">₹15,000/month</div>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Unlimited API calls</li>
                      <li>• Advanced analytics</li>
                      <li>• Custom reports</li>
                      <li>• Priority support</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border border-gold-500/20 rounded-lg">
                    <h3 className="text-lg font-semibold text-yellow-400 mb-2">Enterprise</h3>
                    <div className="text-2xl font-bold mb-2">₹50,000/month</div>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• White-label solution</li>
                      <li>• Custom AI models</li>
                      <li>• Dedicated support</li>
                      <li>• On-premise deployment</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Demo */}
          <TabsContent value="api-demo" className="space-y-6">
            <Card className="glass-morphism border-cyan-500/20">
              <CardHeader>
                <CardTitle>Cultural Pulse API - Live Demo</CardTitle>
                <p className="text-gray-400">Try our API with real examples</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <div className="text-green-400 text-sm mb-2">POST /api/cultural-pulse/analyze</div>
                    <pre className="text-gray-300 text-sm overflow-x-auto">
{`{
  "text": "Yaar, Diwali ka shopping karna hai but budget tight hai 😅",
  "region": "Delhi",
  "context": "social_media_post"
}`}
                    </pre>
                  </div>
                  
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <div className="text-blue-400 text-sm mb-2">Response:</div>
                    <pre className="text-gray-300 text-sm overflow-x-auto">
{`{
  "cultural_score": 87,
  "emotional_sentiment": "mixed_positive",
  "festival_context": "diwali_preparation",
  "code_mixing": {
    "languages": ["Hindi", "English"],
    "authenticity_score": 92
  },
  "brand_opportunities": [
    "Budget-friendly Diwali products",
    "EMI schemes for festival shopping"
  ],
  "viral_potential": 73,
  "monetization_value": "₹45,000 estimated campaign value"
}`}
                    </pre>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600">
                    Get API Key - ₹0 for First Month
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
