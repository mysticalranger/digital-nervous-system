import { useState } from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Award, Languages, LineChart, ShieldCheck, Users, Zap, Brain, GitFork, Scale, ArrowRight, Play, Code2, Database, Cloud } from "lucide-react";
import CulturalSentimentDemo from "./cultural-sentiment-demo";

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'live' | 'beta' | 'coming-soon';
  category: 'ai' | 'platform' | 'developer' | 'analytics';
  marketRelevance: string;
  indianUseCase: string;
  demoComponent?: React.ComponentType;
}

const features: Feature[] = [
  {
    id: 'cultural-sentiment',
    title: "Cultural Sentiment Analysis",
    description: "AI-powered analysis that understands emotions, cultural nuances, and sentiment in Indian communication patterns across multiple languages",
    icon: <Brain className="h-8 w-8 text-purple-500" />,
    status: 'live',
    category: 'ai',
    marketRelevance: "Social media companies save 60% on content moderation costs with cultural-aware sentiment analysis",
    indianUseCase: "Detects festival-related sentiment, regional pride, cultural sensitivities, and helps brands communicate better with Indian audiences",
    demoComponent: () => <div>Cultural Sentiment Demo Component</div>
  }
];

interface FeaturesGridProps {
  selectedCategory: string;
  onFeatureSelect: (feature: Feature) => void;
}

function FeaturesGrid({ selectedCategory, onFeatureSelect }: FeaturesGridProps) {
  const filteredFeatures = selectedCategory === 'all' 
    ? features 
    : features.filter(f => f.category === selectedCategory);

  const getStatusColor = (status: Feature['status']) => {
    switch (status) {
      case 'live': return 'bg-green-500/20 text-green-400 border-green-500/20';
      case 'beta': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/20';
      case 'coming-soon': return 'bg-gray-500/20 text-gray-400 border-gray-500/20';
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {filteredFeatures.map((feature, index) => (
        <motion.div
          key={feature.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="glass-morphism border-cyber-cyan/20 hover:border-cyber-cyan/40 transition-all duration-300 h-full">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {feature.icon}
                  <div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="mt-2">{feature.description}</CardDescription>
                  </div>
                </div>
                <Badge className={getStatusColor(feature.status)}>
                  {feature.status.replace('-', ' ')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm font-medium text-cyber-cyan">💰 Market Impact</div>
                <div className="text-sm text-gray-300">{feature.marketRelevance}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium text-royal-purple">🇮🇳 Indian Use Case</div>
                <div className="text-sm text-gray-300">{feature.indianUseCase}</div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button 
                  className="flex-1"
                  onClick={() => onFeatureSelect(feature)}
                  disabled={feature.status === 'coming-soon'}
                >
                  {feature.status === 'coming-soon' ? 'Coming Soon' : 'Try Demo'}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                {feature.status !== 'coming-soon' && (
                  <Button variant="outline" size="icon">
                    <Code2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

export default function FeaturesSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  const categories = [
    { id: 'all', label: 'All Features', icon: <Scale className="h-4 w-4" /> },
    { id: 'ai', label: 'AI Models', icon: <Brain className="h-4 w-4" /> },
    { id: 'platform', label: 'Platform', icon: <Database className="h-4 w-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <LineChart className="h-4 w-4" /> },
    { id: 'developer', label: 'Developer Tools', icon: <Code2 className="h-4 w-4" /> },
  ];

  // If a feature is selected, show its demo
  if (selectedFeature) {
    return (
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 bg-background/80 backdrop-blur border-b border-gray-800 z-10">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <Button 
              variant="outline" 
              onClick={() => setSelectedFeature(null)}
              className="glass-morphism"
            >
              ← Back to Features
            </Button>
          </div>
        </div>
        
        <div className="py-10">
          {selectedFeature.id === 'cultural-sentiment' && <CulturalSentimentDemo />}
          {selectedFeature.id !== 'cultural-sentiment' && (
            <div className="max-w-4xl mx-auto text-center p-20">
              <h2 className="text-3xl font-bold mb-4">{selectedFeature.title}</h2>
              <p className="text-xl text-gray-300 mb-8">{selectedFeature.description}</p>
              <Badge className="bg-yellow-500/20 text-yellow-400">Demo Coming Soon</Badge>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6">
            Platform <span className="gradient-text">Features</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive AI solutions designed specifically for the Indian market. 
            Each feature is built with cultural understanding and regional needs in mind.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={`glass-morphism ${
                selectedCategory === category.id 
                  ? 'bg-cyber-cyan/20 border-cyber-cyan text-cyber-cyan' 
                  : 'hover:border-cyber-cyan/40'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.icon}
              {category.label}
            </Button>
          ))}
        </motion.div>

        {/* Features Grid */}
        <FeaturesGrid 
          selectedCategory={selectedCategory}
          onFeatureSelect={setSelectedFeature}
        />

        {/* Market Insights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-20 text-center"
        >
          <Card className="glass-morphism border-royal-purple/20 bg-gradient-to-r from-royal-purple/5 to-cyber-cyan/5">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">🇮🇳 Built for Bharat's Digital Future</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-cyber-cyan">₹2,000Cr+</div>
                  <div className="text-sm text-gray-400">AI Market Opportunity in India</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-royal-purple">22+</div>
                  <div className="text-sm text-gray-400">Official Languages Supported</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-vibrant-orange">1.4B</div>
                  <div className="text-sm text-gray-400">People Ready for Digital AI</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
