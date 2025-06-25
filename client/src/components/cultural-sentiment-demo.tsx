import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Brain, Heart, TrendingUp, Globe, Sparkles, AlertTriangle, CheckCircle, Users, Target, Calendar, Shield, DollarSign, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SentimentResult {
  culturalScore: number;
  sentimentAnalysis: 'positive' | 'neutral' | 'negative';
  culturalInsights: string[];
  recommendations: string[];
  riskFactors: string[];
  confidence: number;
  regionalContext?: string;
  festivalRelevance?: string;
  emotionalTone?: string;
  
  // Advanced features that make us unique in Indian market
  advancedFeatures?: {
    codeMixingDetection?: {
      languages: { language: string; percentage: number; script: string }[];
      mixingPattern: string;
      authenticityScore: number;
      urbanRuralIndicator: string;
    };
    regionalNuances?: {
      primaryRegion: string;
      culturalMarkers: string[];
      localSlangDetected: string[];
      dialectVariation: string;
      religionNeutrality: number;
      casteNeutrality: number;
      genderSensitivity: number;
    };
    festivalContext?: {
      activeFestival: string | null;
      seasonalRelevance: number;
      commercialOpportunity: string;
      festivalSentimentBoost: number;
      giftingIntent: boolean;
      familyGatheringIntent: boolean;
    };
    socialMediaVirality?: {
      viralPotential: number;
      shareabilityFactors: string[];
      emotionalTriggers: string[];
      memePotential: number;
      influencerAppeal: number;
      crossPlatformScore: number;
    };
    brandSafetyScore?: {
      overallSafety: number;
      religiousConflicts: string[];
      politicalSensitivity: string[];
      socialTaboos: string[];
      ageAppropriate: boolean;
      corporateRisk: string;
    };
    generationalSegment?: {
      primaryGeneration: string;
      communicationStyle: string;
      valueSystem: string[];
      digitalSavviness: number;
      consumptionPattern: string;
    };
    economicSentiment?: {
      purchaseIntent: number;
      priceConsciousness: number;
      brandLoyalty: number;
      disposableIncomeIndicator: string;
      economicAnxiety: number;
    };
    politicalNeutrality?: {
      politicalLean: string;
      governmentSentiment: number;
      nationalPride: number;
      socialCause: string[];
      activismLevel: number;
    };
  };
}

const sampleTexts = {
  positive: "Diwali ki hardik shubhkamnayein! This festival brings so much joy and prosperity to our families. The rangoli looks absolutely beautiful and the sweets are amazing!",
  negative: "Traffic in Mumbai during monsoon is absolutely terrible. The roads are flooded and nobody seems to care about the infrastructure.",
  neutral: "The new policy regarding GST implementation will be effective from next month. All businesses need to comply with the updated regulations.",
  cultural: "Namaste! We are organizing a community event for Ganesh Chaturthi in our society. Everyone is invited to participate in the celebrations.",
  regional: "Chennai mein super weather aa gaya hai. Rain aane ke baad pollution kam ho gaya hai aur atmosphere fresh feel kar raha hai.",
  business: "Yaar, this new iPhone is quite expensive but the features are amazing. Should I buy it during the sale?",
  viral: "OMG guys, this video is going viral! Please share and tag your friends. Let's make it trend on Instagram!",
  festival: "Holi ke rang, khushiyon ke sang! Family ke saath celebrate kar rahe hai. Bura na maano Holi hai!",
  
  // Advanced samples showcasing unique capabilities
  codeMixing: "Bhai seriously yaar, ye product toh mast hai! Main definitely buy karunga during the festival sale. My mom will be so happy!",
  generational: "This is literally fire! No cap, this brand totally understands Gen Z vibes. Gonna flex this on my stories for sure!",
  commercial: "Planning to buy gold for my wife during Dhanteras. The rates are good and it's an auspicious time for investment.",
  political: "Very proud of our Indian achievements in space technology. Chandrayaan mission shows we can compete globally!",
  economic: "With these discounts, I can finally afford that premium smartphone. Perfect timing before the festival season!",
  brandSafety: "This advertisement respects all communities and celebrates unity in diversity. Great inclusive messaging!",
  risky: "Some religious communities are creating problems in our locality. The government should take strict action against them."
};

const regions = [
  { value: 'North India', label: 'North India (Delhi, Punjab, UP)' },
  { value: 'South India', label: 'South India (Tamil Nadu, Karnataka, Kerala)' },
  { value: 'West India', label: 'West India (Maharashtra, Gujarat, Rajasthan)' },
  { value: 'East India', label: 'East India (West Bengal, Odisha, Jharkhand)' },
  { value: 'All India', label: 'All India (General)' }
];

export default function CulturalSentimentAnalysisDemo() {
  const [text, setText] = useState('');
  const [region, setRegion] = useState('All India');
  const [language, setLanguage] = useState('en');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<SentimentResult | null>(null);
  const { toast } = useToast();

  const analyzeSentiment = async () => {
    if (!text.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter some text to analyze",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const response = await fetch('/api/ai/analyze-cultural-context', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text,
          region,
          language
        })
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const analysis = await response.json();
      
      // Enhance the analysis with additional insights
      const enhancedResult: SentimentResult = {
        ...analysis,
        regionalContext: getRegionalContext(region, text),
        festivalRelevance: getFestivalRelevance(text),
        emotionalTone: getEmotionalTone(analysis.sentimentAnalysis, analysis.culturalScore)
      };

      setResult(enhancedResult);
      
      toast({
        title: "Analysis Complete",
        description: `Cultural sentiment analyzed with ${Math.round(enhancedResult.confidence * 100)}% confidence`,
      });

    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze sentiment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getRegionalContext = (region: string, text: string): string => {
    const lowerText = text.toLowerCase();
    
    if (region === 'South India') {
      if (lowerText.includes('chennai') || lowerText.includes('bangalore') || lowerText.includes('kerala')) {
        return 'Strong regional identification detected';
      }
      return 'South Indian cultural context applicable';
    } else if (region === 'North India') {
      if (lowerText.includes('delhi') || lowerText.includes('punjab') || lowerText.includes('namaste')) {
        return 'North Indian cultural markers identified';
      }
      return 'North Indian cultural context applicable';
    }
    
    return 'General Indian cultural context';
  };

  const getFestivalRelevance = (text: string): string => {
    const lowerText = text.toLowerCase();
    const festivals = ['diwali', 'holi', 'ganesh', 'durga', 'eid', 'christmas', 'navratri', 'karwa'];
    
    for (const festival of festivals) {
      if (lowerText.includes(festival)) {
        return `High relevance to ${festival.charAt(0).toUpperCase() + festival.slice(1)} celebrations`;
      }
    }
    
    if (lowerText.includes('festival') || lowerText.includes('celebration')) {
      return 'Festival context detected';
    }
    
    return 'No specific festival context';
  };

  const getEmotionalTone = (sentiment: string, culturalScore: number): string => {
    if (sentiment === 'positive' && culturalScore > 85) {
      return 'Highly positive with strong cultural appreciation';
    } else if (sentiment === 'positive') {
      return 'Positive with moderate cultural alignment';
    } else if (sentiment === 'negative' && culturalScore < 50) {
      return 'Negative with potential cultural conflicts';
    } else if (sentiment === 'negative') {
      return 'Negative but culturally sensitive';
    } else {
      return 'Neutral tone with cultural awareness';
    }
  };

  const loadSampleText = (type: keyof typeof sampleTexts) => {
    setText(sampleTexts[type]);
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-400 bg-green-500/20';
      case 'negative': return 'text-red-400 bg-red-500/20';
      default: return 'text-yellow-400 bg-yellow-500/20';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-4">
          Cultural <span className="gradient-text">Sentiment Analysis</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Advanced AI that understands Indian cultural nuances, emotions, and sentiment across regions and languages.
          Perfect for social media monitoring, brand communication, and content moderation.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-morphism border-purple-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Brain className="h-6 w-6" />
                Cultural Text Analysis
              </CardTitle>
              <CardDescription>
                Enter text to analyze cultural sentiment and emotional tone
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Sample Text Buttons */}
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-400">Try samples:</span>
                {Object.keys(sampleTexts).map((type) => (
                  <Button
                    key={type}
                    variant="outline"
                    size="sm"
                    onClick={() => loadSampleText(type as keyof typeof sampleTexts)}
                    className="text-xs"
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Button>
                ))}
              </div>

              {/* Text Input */}
              <Textarea
                placeholder="Enter your text here... (English, Hindi, or mixed language)"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-32 resize-none"
              />

              {/* Region Selection */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Target Region</label>
                  <Select value={region} onValueChange={setRegion}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map(r => (
                        <SelectItem key={r.value} value={r.value}>
                          {r.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Primary Language</label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="mixed">Mixed Language</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Analyze Button */}
              <Button
                onClick={analyzeSentiment}
                disabled={isAnalyzing || !text.trim()}
                className="w-full interactive-button"
              >
                {isAnalyzing ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-transparent border-t-white rounded-full mr-2"
                    />
                    Analyzing Cultural Context...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Analyze Sentiment
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          {result ? (
            <Card className="glass-morphism border-cyan-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-cyan-400">
                  <TrendingUp className="h-6 w-6" />
                  Analysis Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Main Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <div className={`text-2xl font-bold ${getScoreColor(result.culturalScore)}`}>
                      {result.culturalScore}%
                    </div>
                    <div className="text-sm text-gray-400">Cultural Score</div>
                  </div>
                  
                  <div className="text-center p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="text-2xl font-bold text-blue-400">
                      {Math.round(result.confidence * 100)}%
                    </div>
                    <div className="text-sm text-gray-400">Confidence</div>
                  </div>
                </div>

                {/* Sentiment & Emotional Tone */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Sentiment:</span>
                    <Badge className={getSentimentColor(result.sentimentAnalysis)}>
                      {result.sentimentAnalysis.toUpperCase()}
                    </Badge>
                  </div>
                  
                  {result.emotionalTone && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Emotional Tone:</span>
                      <span className="text-sm text-cyan-400">{result.emotionalTone}</span>
                    </div>
                  )}

                  {result.regionalContext && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Regional Context:</span>
                      <span className="text-sm text-purple-400">{result.regionalContext}</span>
                    </div>
                  )}

                  {result.festivalRelevance && result.festivalRelevance !== 'No specific festival context' && (
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-orange-400" />
                      <span className="text-sm text-orange-400">{result.festivalRelevance}</span>
                    </div>
                  )}
                </div>

                {/* Cultural Insights */}
                {result.culturalInsights && result.culturalInsights.length > 0 && (
                  <div>
                    <h4 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Cultural Insights
                    </h4>
                    <ul className="space-y-1">
                      {result.culturalInsights.map((insight, index) => (
                        <li key={index} className="text-sm text-gray-300 flex items-start gap-2">
                          <span className="text-green-400">•</span>
                          {insight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recommendations */}
                {result.recommendations && result.recommendations.length > 0 && (
                  <div>
                    <h4 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Recommendations
                    </h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, index) => (
                        <li key={index} className="text-sm text-gray-300 flex items-start gap-2">
                          <span className="text-blue-400">•</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Risk Factors */}
                {result.riskFactors && result.riskFactors.length > 0 && (
                  <div>
                    <h4 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Risk Factors
                    </h4>
                    <ul className="space-y-1">
                      {result.riskFactors.map((risk, index) => (
                        <li key={index} className="text-sm text-gray-300 flex items-start gap-2">
                          <span className="text-red-400">•</span>
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </div>                )}

                {/* Revolutionary Advanced Features Section */}
                {result.advancedFeatures && (
                  <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-lg border border-purple-500/20">
                    <h4 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-4 flex items-center gap-2">
                      <Sparkles className="h-6 w-6 text-purple-400" />
                      Advanced AI Analysis - Unique to Indian Market
                    </h4>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Code-Mixing Detection */}
                      {result.advancedFeatures.codeMixingDetection && (
                        <Card className="bg-blue-500/10 border-blue-500/20">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-blue-400 text-lg">🌐 Code-Mixing Analysis</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-400">Pattern:</span>
                              <Badge className="bg-blue-500/20 text-blue-400">
                                {result.advancedFeatures.codeMixingDetection.mixingPattern}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-400">Authenticity:</span>
                              <span className="text-blue-400 font-semibold">
                                {result.advancedFeatures.codeMixingDetection.authenticityScore}%
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-400">Context:</span>
                              <span className="text-blue-400 capitalize">
                                {result.advancedFeatures.codeMixingDetection.urbanRuralIndicator}
                              </span>
                            </div>
                            {result.advancedFeatures.codeMixingDetection.languages.map((lang, idx) => (
                              <div key={idx} className="flex justify-between text-sm">
                                <span className="text-gray-300">{lang.language}:</span>
                                <span className="text-blue-300">{lang.percentage}%</span>
                              </div>
                            ))}
                          </CardContent>
                        </Card>
                      )}

                      {/* Viral Potential */}
                      {result.advancedFeatures.socialMediaVirality && (
                        <Card className="bg-green-500/10 border-green-500/20">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-green-400 text-lg">🚀 Viral Potential Analysis</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-400">Viral Score:</span>
                              <span className="text-green-400 font-bold text-lg">
                                {result.advancedFeatures.socialMediaVirality.viralPotential}%
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-400">Meme Potential:</span>
                              <span className="text-green-400">{result.advancedFeatures.socialMediaVirality.memePotential}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-400">Influencer Appeal:</span>
                              <span className="text-green-400">{result.advancedFeatures.socialMediaVirality.influencerAppeal}%</span>
                            </div>
                            {result.advancedFeatures.socialMediaVirality.shareabilityFactors.length > 0 && (
                              <div className="mt-2">
                                <div className="text-xs text-gray-500 mb-1">Shareability Factors:</div>
                                {result.advancedFeatures.socialMediaVirality.shareabilityFactors.slice(0, 2).map((factor, idx) => (
                                  <div key={idx} className="text-xs text-green-300">• {factor}</div>
                                ))}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      )}

                      {/* Brand Safety */}
                      {result.advancedFeatures.brandSafetyScore && (
                        <Card className="bg-orange-500/10 border-orange-500/20">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-orange-400 text-lg">🛡️ Brand Safety Analysis</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-400">Safety Score:</span>
                              <span className={`font-bold text-lg ${result.advancedFeatures.brandSafetyScore.overallSafety >= 80 ? 'text-green-400' : result.advancedFeatures.brandSafetyScore.overallSafety >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                                {result.advancedFeatures.brandSafetyScore.overallSafety}%
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-400">Corporate Risk:</span>
                              <Badge className={`${result.advancedFeatures.brandSafetyScore.corporateRisk === 'low' ? 'bg-green-500/20 text-green-400' : result.advancedFeatures.brandSafetyScore.corporateRisk === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                                {result.advancedFeatures.brandSafetyScore.corporateRisk.toUpperCase()}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-400">Age Appropriate:</span>
                              <span className={result.advancedFeatures.brandSafetyScore.ageAppropriate ? 'text-green-400' : 'text-red-400'}>
                                {result.advancedFeatures.brandSafetyScore.ageAppropriate ? 'Yes' : 'No'}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* Generational Analysis */}
                      {result.advancedFeatures.generationalSegment && (
                        <Card className="bg-purple-500/10 border-purple-500/20">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-purple-400 text-lg">👥 Generational Analysis</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-400">Generation:</span>
                              <Badge className="bg-purple-500/20 text-purple-400 capitalize">
                                {result.advancedFeatures.generationalSegment.primaryGeneration}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-400">Digital Savviness:</span>
                              <span className="text-purple-400">{result.advancedFeatures.generationalSegment.digitalSavviness}%</span>
                            </div>
                            <div className="mt-2">
                              <div className="text-xs text-gray-500 mb-1">Communication Style:</div>
                              <div className="text-xs text-purple-300">{result.advancedFeatures.generationalSegment.communicationStyle}</div>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* Economic Analysis */}
                      {result.advancedFeatures.economicSentiment && (
                        <Card className="bg-yellow-500/10 border-yellow-500/20">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-yellow-400 text-lg">💰 Economic Analysis</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-400">Purchase Intent:</span>
                              <span className="text-yellow-400">{result.advancedFeatures.economicSentiment.purchaseIntent}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-400">Price Consciousness:</span>
                              <span className="text-yellow-400">{result.advancedFeatures.economicSentiment.priceConsciousness}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-400">Income Indicator:</span>
                              <Badge className="bg-yellow-500/20 text-yellow-400 capitalize">
                                {result.advancedFeatures.economicSentiment.disposableIncomeIndicator}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* Festival Context */}
                      {result.advancedFeatures.festivalContext && result.advancedFeatures.festivalContext.seasonalRelevance > 20 && (
                        <Card className="bg-pink-500/10 border-pink-500/20">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-pink-400 text-lg">🎉 Festival Context</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            {result.advancedFeatures.festivalContext.activeFestival && (
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-400">Active Festival:</span>
                                <span className="text-pink-400 font-semibold">{result.advancedFeatures.festivalContext.activeFestival}</span>
                              </div>
                            )}
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-400">Seasonal Relevance:</span>
                              <span className="text-pink-400">{result.advancedFeatures.festivalContext.seasonalRelevance}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-400">Commercial Opportunity:</span>
                              <Badge className="bg-pink-500/20 text-pink-400 capitalize">
                                {result.advancedFeatures.festivalContext.commercialOpportunity}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-400">Gifting Intent:</span>
                              <span className={result.advancedFeatures.festivalContext.giftingIntent ? 'text-green-400' : 'text-gray-400'}>
                                {result.advancedFeatures.festivalContext.giftingIntent ? 'Detected' : 'None'}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>

                    {/* Unique Value Proposition */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg">
                      <h5 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mb-2">
                        🚀 Why This Analysis is Revolutionary for India
                      </h5>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                        <div>
                          <strong className="text-green-400">• Code-Mixing Mastery:</strong> World's first AI to understand Hinglish, Tanglish, and 50+ Indian language combinations
                        </div>
                        <div>
                          <strong className="text-blue-400">• Cultural Context:</strong> Deep understanding of Indian festivals, traditions, and regional nuances
                        </div>
                        <div>
                          <strong className="text-purple-400">• Business Intelligence:</strong> Predicts viral potential and commercial opportunities specific to Indian markets
                        </div>
                        <div>
                          <strong className="text-orange-400">• Brand Safety:</strong> Prevents cultural conflicts before they damage your brand reputation
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="glass-morphism border-gray-500/20">
              <CardContent className="flex flex-col items-center justify-center py-20 text-gray-400">
                <Brain className="h-16 w-16 mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">Ready to Analyze</h3>
                <p className="text-center">
                  Enter your text and click "Analyze Sentiment" to see detailed cultural and emotional insights.
                </p>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>

      {/* Feature Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid md:grid-cols-3 gap-6"
      >
        <Card className="glass-morphism border-green-500/20">
          <CardContent className="p-6 text-center">
            <Users className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-400 mb-2">Social Media Monitoring</h3>
            <p className="text-sm text-gray-300">
              Monitor brand sentiment across Indian social platforms with cultural context understanding.
            </p>
          </CardContent>
        </Card>

        <Card className="glass-morphism border-blue-500/20">
          <CardContent className="p-6 text-center">
            <Globe className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-blue-400 mb-2">Content Localization</h3>
            <p className="text-sm text-gray-300">
              Adapt global content for Indian audiences with cultural sensitivity analysis.
            </p>
          </CardContent>
        </Card>

        <Card className="glass-morphism border-purple-500/20">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-purple-400 mb-2">Risk Mitigation</h3>
            <p className="text-sm text-gray-300">
              Identify potential cultural conflicts before content goes live across Indian markets.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
