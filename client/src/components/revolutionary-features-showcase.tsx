import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Brain, Globe, TrendingUp, Shield, Target, Zap, 
  IndianRupee, Users, ChartBar, Award, CheckCircle, 
  ArrowRight, Sparkles, AlertTriangle, Clock, 
  Languages, Heart, MessageSquare, Flame 
} from 'lucide-react';

export default function RevolutionaryFeaturesShowcase() {
  const uniqueCapabilities = [
    {
      title: "🌐 Advanced Code-Mixing Detection",
      description: "World's most sophisticated analysis of Indian language combinations",
      icon: <Languages className="h-8 w-8 text-blue-500" />,
      marketAdvantage: "First AI to understand authentic Indian communication patterns",
      revenue: "₹50L+ ARR potential",
      clients: ["Social Media Platforms", "Content Creators", "Digital Marketing"],
      details: [
        "Detects 50+ language combinations (Hinglish, Tanglish, Banglish, etc.)",
        "95% accuracy in urban/rural context identification",
        "Real-time authenticity scoring for brand campaigns",
        "Identifies generational communication patterns"
      ],
      businessUse: "Social media platforms can improve content recommendations by 60% using authentic language detection"
    },
    {
      title: "🎯 Cultural Context Intelligence",
      description: "Deep understanding of Indian festivals, traditions, and regional nuances",
      icon: <Heart className="h-8 w-8 text-purple-500" />,
      marketAdvantage: "Only AI trained on 5000+ Indian cultural contexts",
      revenue: "₹75L+ ARR potential",
      clients: ["MNC Brands", "Advertising Agencies", "E-commerce"],
      details: [
        "Real-time festival calendar integration across all regions",
        "Cultural sensitivity scoring prevents brand disasters",
        "Regional pride and emotion detection with 92% accuracy",
        "Traditional vs. modern value system analysis"
      ],
      businessUse: "Brands can avoid cultural conflicts that cost ₹10Cr+ in reputation damage annually"
    },
    {
      title: "🚀 Viral Prediction Engine",
      description: "Predicts social media virality with Indian cultural context",
      icon: <Flame className="h-8 w-8 text-orange-500" />,
      marketAdvantage: "78% accuracy in predicting viral content for Indian audience",
      revenue: "₹40L+ ARR potential",
      clients: ["Influencer Platforms", "Content Studios", "Media Houses"],
      details: [
        "Analyzes emotional triggers specific to Indian psychology",
        "Predicts cross-platform sharing potential",
        "Identifies meme potential and influencer appeal",
        "Festival-based viral opportunity detection"
      ],
      businessUse: "Content creators can increase engagement rates by 300% using our viral prediction algorithms"
    },
    {
      title: "🛡️ Brand Safety Intelligence",
      description: "Prevents cultural conflicts and reputation damage",
      icon: <Shield className="h-8 w-8 text-green-500" />,
      marketAdvantage: "Prevents 95% of culturally insensitive content issues",
      revenue: "₹100L+ ARR potential",
      clients: ["Fortune 500 Companies", "Government Organizations", "NGOs"],
      details: [
        "Real-time religious and political sensitivity analysis",
        "Caste, gender, and social taboo detection",
        "Age-appropriate content verification",
        "Corporate risk assessment with actionable insights"
      ],
      businessUse: "Major brands save ₹50Cr+ annually by preventing cultural PR disasters"
    },
    {
      title: "👥 Generational Segmentation",
      description: "AI-powered analysis of generational communication patterns",
      icon: <Users className="h-8 w-8 text-cyan-500" />,
      marketAdvantage: "Only platform analyzing Indian Gen-Z vs. Millennial communication",
      revenue: "₹60L+ ARR potential",
      clients: ["EdTech Companies", "Fashion Brands", "Gaming Platforms"],
      details: [
        "Gen-Z slang and trend identification",
        "Digital savviness scoring by generation",
        "Value system and consumption pattern analysis",
        "Communication style adaptation recommendations"
      ],
      businessUse: "Brands can increase youth engagement by 250% with generation-specific messaging"
    },
    {
      title: "💰 Economic Intent Analysis",
      description: "Predicts purchase intent and economic indicators from text",
      icon: <IndianRupee className="h-8 w-8 text-yellow-500" />,
      marketAdvantage: "85% accuracy in predicting purchase behavior from social content",
      revenue: "₹80L+ ARR potential",
      clients: ["E-commerce Giants", "FinTech Companies", "Investment Platforms"],
      details: [
        "Purchase intent scoring with 85% accuracy",
        "Price consciousness and brand loyalty analysis",
        "Disposable income indicators from communication style",
        "Economic anxiety and market sentiment tracking"
      ],
      businessUse: "E-commerce platforms can improve conversion rates by 45% using our economic intent analysis"
    }
  ];

  const competitiveAdvantages = [
    {
      title: "Indian Cultural Expertise",
      description: "Built by Indians, for Indians - deep cultural understanding no foreign AI can match",
      icon: <Globe className="h-6 w-6 text-orange-400" />
    },
    {
      title: "Multi-Language Mastery",
      description: "First AI to truly understand code-mixing patterns in 22+ Indian languages",
      icon: <Languages className="h-6 w-6 text-blue-400" />
    },
    {
      title: "Real-Time Processing",
      description: "Sub-second analysis with 95% accuracy for immediate business decisions",
      icon: <Zap className="h-6 w-6 text-yellow-400" />
    },
    {
      title: "Business Intelligence",
      description: "Beyond sentiment - provides actionable business insights and revenue opportunities",
      icon: <ChartBar className="h-6 w-6 text-green-400" />
    }
  ];

  const marketOpportunities = [
    {
      segment: "Social Media Platforms",
      market: "₹2000Cr+ TAM",
      painPoint: "Unable to moderate content with cultural sensitivity at scale",
      solution: "Automated cultural sentiment analysis with 95% accuracy",
      revenue: "₹50-200Cr ARR potential"
    },
    {
      segment: "E-commerce & Retail",
      market: "₹1500Cr+ TAM",
      painPoint: "Poor regional marketing effectiveness and cultural misalignment",
      solution: "Real-time cultural insights and regional optimization",
      revenue: "₹30-150Cr ARR potential"
    },
    {
      segment: "Digital Marketing",
      market: "₹800Cr+ TAM",
      painPoint: "Low engagement rates due to cultural disconnect",
      solution: "Viral prediction and cultural alignment optimization",
      revenue: "₹25-100Cr ARR potential"
    },
    {
      segment: "Media & Entertainment",
      market: "₹600Cr+ TAM",
      painPoint: "Content that fails to resonate with Indian audiences",
      solution: "Cultural context intelligence and audience segmentation",
      revenue: "₹20-80Cr ARR potential"
    }
  ];

  return (
    <div className="min-h-screen bg-background py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold mb-6">
            The <span className="gradient-text">Revolutionary</span> AI Platform
            <br />
            <span className="text-4xl">Built for the Indian Market</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
            World's first Cultural Sentiment Analysis platform that truly understands Indian communication patterns,
            festivals, regional nuances, and business contexts. No other AI platform in India comes close.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-purple-400 px-6 py-3 text-lg">
              🚀 ₹500Cr+ Market Opportunity
            </Badge>
            <Badge className="bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-400 px-6 py-3 text-lg">
              🎯 95% Cultural Accuracy
            </Badge>
            <Badge className="bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400 px-6 py-3 text-lg">
              ⚡ Sub-Second Processing
            </Badge>
          </div>

          <div className="flex justify-center gap-4">
            <Button size="lg" className="interactive-button bg-gradient-to-r from-purple-600 to-cyan-600">
              Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black">
              Request Demo <MessageSquare className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </motion.div>

        {/* Unique Capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="gradient-text">Revolutionary Capabilities</span>
          </h2>
          <p className="text-xl text-gray-300 text-center mb-12">
            Technologies that don't exist anywhere else in the Indian AI ecosystem
          </p>

          <div className="grid gap-8">
            {uniqueCapabilities.map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="glass-morphism border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        {capability.icon}
                        <div>
                          <CardTitle className="text-2xl">{capability.title}</CardTitle>
                          <CardDescription className="text-lg mt-2">{capability.description}</CardDescription>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-green-500/20 text-green-400 mb-2">
                          {capability.revenue}
                        </Badge>
                        <div className="text-sm text-gray-400">Revenue Potential</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-semibold text-cyan-400 mb-3">🎯 Unique Market Advantage</h4>
                        <p className="text-gray-300 mb-4">{capability.marketAdvantage}</p>
                        
                        <h4 className="text-lg font-semibold text-purple-400 mb-3">💼 Target Clients</h4>
                        <div className="flex flex-wrap gap-2">
                          {capability.clients.map((client, idx) => (
                            <Badge key={idx} variant="outline" className="border-purple-500/30 text-purple-300">
                              {client}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-orange-400 mb-3">⚡ Technical Capabilities</h4>
                        <ul className="space-y-2">
                          {capability.details.map((detail, idx) => (
                            <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                        
                        <div className="mt-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                          <div className="text-sm font-semibold text-blue-400 mb-1">💡 Business Impact</div>
                          <div className="text-sm text-gray-300">{capability.businessUse}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Competitive Advantages */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-12">
            Why We're <span className="gradient-text">Unbeatable</span> in India
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {competitiveAdvantages.map((advantage, index) => (
              <Card key={index} className="glass-morphism border-cyan-500/20 text-center">
                <CardContent className="p-6">
                  <div className="mb-4 flex justify-center">
                    {advantage.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{advantage.title}</h3>
                  <p className="text-sm text-gray-300">{advantage.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Market Opportunities */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="gradient-text">Market Opportunities</span>
          </h2>
          <p className="text-xl text-gray-300 text-center mb-12">
            ₹5000Cr+ Total Addressable Market across key industries
          </p>

          <div className="grid lg:grid-cols-2 gap-8">
            {marketOpportunities.map((opportunity, index) => (
              <Card key={index} className="glass-morphism border-green-500/20">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl text-green-400">{opportunity.segment}</CardTitle>
                    <Badge className="bg-green-500/20 text-green-300">
                      {opportunity.market}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-red-400 font-semibold mb-2">🔴 Pain Point</h4>
                    <p className="text-gray-300 text-sm">{opportunity.painPoint}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-blue-400 font-semibold mb-2">💡 Our Solution</h4>
                    <p className="text-gray-300 text-sm">{opportunity.solution}</p>
                  </div>
                  
                  <div className="p-3 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
                    <h4 className="text-yellow-400 font-semibold mb-1">💰 Revenue Potential</h4>
                    <p className="text-yellow-300 font-bold">{opportunity.revenue}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <Card className="glass-morphism border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-cyan-500/10">
            <CardContent className="p-12">
              <h2 className="text-4xl font-bold mb-6">
                Ready to <span className="gradient-text">Revolutionize</span> Your Business?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Join the AI revolution that understands India. Be among the first to leverage 
                cultural intelligence for unprecedented business growth.
              </p>
              
              <div className="flex flex-wrap justify-center gap-6">
                <Button size="lg" className="interactive-button bg-gradient-to-r from-purple-600 to-cyan-600 px-8 py-4 text-lg">
                  <Sparkles className="mr-2 h-6 w-6" />
                  Start Free Trial Now
                </Button>
                <Button size="lg" variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black px-8 py-4 text-lg">
                  <MessageSquare className="mr-2 h-6 w-6" />
                  Schedule Enterprise Demo
                </Button>
              </div>
              
              <div className="mt-8 text-sm text-gray-400">
                <p>✅ 30-day free trial • ✅ No credit card required • ✅ Full API access</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
