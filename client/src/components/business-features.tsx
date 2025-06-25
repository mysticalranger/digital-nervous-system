import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, TrendingUp, DollarSign, Users, Globe, Target, BarChart3, Zap, Shield, Award, ArrowRight, CheckCircle } from 'lucide-react';

export default function BusinessFeaturesPage() {
  const businessFeatures = [
    {
      title: "Multi-Language Code-Mixing Detection",
      description: "Understands Hinglish, Tanglish, and other Indian language combinations",
      icon: <Globe className="h-8 w-8 text-blue-500" />,
      revenue: "₹15-25L ARR",
      clients: "Social Media Platforms, News Apps",
      impact: "60% improvement in content moderation accuracy"
    },
    {
      title: "Regional Business Intelligence",
      description: "Targeted insights for North, South, East, West Indian markets",
      icon: <Target className="h-8 w-8 text-green-500" />,
      revenue: "₹20-40L ARR", 
      clients: "E-commerce, FMCG Brands",
      impact: "35% increase in regional campaign effectiveness"
    },
    {
      title: "Festival & Seasonal Context",
      description: "Real-time cultural event analysis with business recommendations",
      icon: <Award className="h-8 w-8 text-purple-500" />,
      revenue: "₹10-20L ARR",
      clients: "Retail, Banking, Telecom",
      impact: "45% boost in seasonal marketing ROI"
    },
    {
      title: "Brand Safety & Risk Assessment",
      description: "Prevents cultural conflicts and brand reputation damage",
      icon: <Shield className="h-8 w-8 text-red-500" />,
      revenue: "₹25-50L ARR",
      clients: "MNCs, Media Houses",
      impact: "90% reduction in cultural sensitivity issues"
    },
    {
      title: "Viral Content Prediction",
      description: "Identifies social sharing potential and viral marketing opportunities",
      icon: <TrendingUp className="h-8 w-8 text-orange-500" />,
      revenue: "₹30-60L ARR",
      clients: "Digital Agencies, Influencer Platforms",
      impact: "3x improvement in content engagement rates"
    },
    {
      title: "Commercial Intent Analysis",
      description: "Detects purchase intent and conversion opportunities",
      icon: <DollarSign className="h-8 w-8 text-yellow-500" />,
      revenue: "₹40-80L ARR",
      clients: "E-commerce, FinTech, EdTech",
      impact: "25% increase in conversion rates"
    }
  ];

  const marketOpportunities = [
    {
      segment: "Social Media Platforms",
      market: "₹500Cr+",
      painPoint: "Content moderation at scale with cultural sensitivity",
      solution: "Automated cultural sentiment analysis API",
      pricing: "₹2-5 per 1000 API calls"
    },
    {
      segment: "E-commerce Brands",
      market: "₹300Cr+", 
      painPoint: "Regional marketing effectiveness and local relevance",
      solution: "Regional sentiment and cultural insights dashboard",
      pricing: "₹50K-2L per month subscription"
    },
    {
      segment: "Digital Marketing Agencies",
      market: "₹200Cr+",
      painPoint: "Creating culturally relevant campaigns for diverse audiences",
      solution: "Campaign optimization and cultural alignment tools",
      pricing: "₹25K-1L per month per client"
    },
    {
      segment: "News & Media Companies",
      market: "₹150Cr+",
      painPoint: "Real-time sentiment tracking and risk assessment",
      solution: "Live cultural sentiment monitoring and alerts",
      pricing: "₹1-5L per month enterprise license"
    }
  ];

  const competitiveAdvantages = [
    "Deep understanding of Indian cultural nuances and regional variations",
    "Real-time festival and seasonal context integration",
    "Code-mixing detection for authentic Indian communication patterns",
    "Business-focused insights beyond basic sentiment analysis",
    "Free tier compatibility with scalable premium features",
    "Local data processing ensuring privacy compliance"
  ];

  return (
    <div className="min-h-screen bg-background py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6">
            Cultural Sentiment Analysis
            <span className="gradient-text block mt-2">Business Intelligence Platform</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
            The first AI platform specifically built for Indian cultural context understanding. 
            Transform how your business communicates with 1.4B+ Indian consumers.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge className="bg-green-500/20 text-green-400 px-4 py-2">
              ₹100Cr+ Market Opportunity
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-400 px-4 py-2">
              22+ Languages Supported
            </Badge>
            <Badge className="bg-purple-500/20 text-purple-400 px-4 py-2">
              95% Cultural Accuracy
            </Badge>
          </div>

          <Button size="lg" className="interactive-button">
            Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>

        {/* Business Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Revenue-Generating Features</h2>
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {businessFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-morphism border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      {feature.icon}
                      <div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                        <CardDescription className="mt-2">{feature.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Revenue Potential:</span>
                        <span className="text-sm font-semibold text-green-400">{feature.revenue}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Target Clients:</span>
                        <span className="text-sm text-blue-400">{feature.clients}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Business Impact:</span>
                        <span className="text-sm text-purple-400">{feature.impact}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Market Opportunities */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Market Opportunities</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {marketOpportunities.map((market, index) => (
              <motion.div
                key={market.segment}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-morphism border-cyan-500/20">
                  <CardHeader>
                    <CardTitle className="text-cyan-400">{market.segment}</CardTitle>
                    <Badge className="bg-green-500/20 text-green-400 w-fit">
                      {market.market} Market Size
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-red-400 mb-2">Pain Point:</h4>
                      <p className="text-sm text-gray-300">{market.painPoint}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-400 mb-2">Our Solution:</h4>
                      <p className="text-sm text-gray-300">{market.solution}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-yellow-400 mb-2">Pricing Model:</h4>
                      <p className="text-sm text-gray-300">{market.pricing}</p>
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
          transition={{ delay: 0.6 }}
          className="mb-20"
        >
          <Card className="glass-morphism border-royal-purple/20 bg-gradient-to-r from-royal-purple/5 to-cyber-cyan/5">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Why We Win in Indian Market</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {competitiveAdvantages.map((advantage, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{advantage}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Revenue Projections */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <Card className="glass-morphism border-vibrant-orange/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">📈 Revenue Projections (Year 1-3)</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <div className="text-3xl font-bold text-vibrant-orange">₹50L+</div>
                  <div className="text-sm text-gray-400">Year 1 ARR</div>
                  <div className="text-xs text-gray-500 mt-1">10-15 Enterprise Clients</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-cyber-cyan">₹2Cr+</div>
                  <div className="text-sm text-gray-400">Year 2 ARR</div>
                  <div className="text-xs text-gray-500 mt-1">50+ Clients, API Revenue</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-royal-purple">₹10Cr+</div>
                  <div className="text-sm text-gray-400">Year 3 ARR</div>
                  <div className="text-xs text-gray-500 mt-1">Market Leadership Position</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
