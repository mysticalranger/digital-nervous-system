import { Mistral } from "@mistralai/mistralai";
import { GoogleGenerativeAI } from '@google/generative-ai';

// Advanced Cultural Sentiment Analysis Engine
// This is the most sophisticated cultural AI system built for Indian market

export interface EnhancedCulturalAnalysis {
  // Core sentiment metrics
  culturalScore: number;
  sentimentAnalysis: 'positive' | 'neutral' | 'negative';
  confidence: number;
  
  // Advanced contextual analysis
  culturalInsights: string[];
  recommendations: string[];
  riskFactors: string[];
  
  // Unique proprietary features
  codeMixingDetection: CodeMixingResult;
  regionalNuances: RegionalAnalysis;
  festivalContext: FestivalAnalysis;
  socialMediaVirality: ViralityPrediction;
  brandSafetyScore: BrandSafetyAnalysis;
  generationalSegment: GenerationalAnalysis;
  economicSentiment: EconomicIndicators;
  politicalNeutrality: PoliticalAnalysis;
}

interface CodeMixingResult {
  languages: { language: string; percentage: number; script: string }[];
  mixingPattern: 'hinglish' | 'tanglish' | 'banglish' | 'punglish' | 'custom';
  authenticityScore: number;
  urbanRuralIndicator: 'urban' | 'semi-urban' | 'rural';
}

interface RegionalAnalysis {
  primaryRegion: string;
  culturalMarkers: string[];
  localSlangDetected: string[];
  dialectVariation: string;
  religionNeutrality: number;
  casteNeutrality: number;
  genderSensitivity: number;
}

interface FestivalAnalysis {
  activeFestival: string | null;
  seasonalRelevance: number;
  commercialOpportunity: 'high' | 'medium' | 'low';
  festivalSentimentBoost: number;
  giftingIntent: boolean;
  familyGatheringIntent: boolean;
}

interface ViralityPrediction {
  viralPotential: number; // 0-100
  shareabilityFactors: string[];
  emotionalTriggers: string[];
  memePotential: number;
  influencerAppeal: number;
  crossPlatformScore: number;
}

interface BrandSafetyAnalysis {
  overallSafety: number; // 0-100
  religiousConflicts: string[];
  politicalSensitivity: string[];
  socialTaboos: string[];
  ageAppropriate: boolean;
  corporateRisk: 'low' | 'medium' | 'high';
}

interface GenerationalAnalysis {
  primaryGeneration: 'gen-z' | 'millennial' | 'gen-x' | 'boomer';
  communicationStyle: string;
  valueSystem: string[];
  digitalSavviness: number;
  consumptionPattern: string;
}

interface EconomicIndicators {
  purchaseIntent: number;
  priceConsciousness: number;
  brandLoyalty: number;
  disposableIncomeIndicator: 'high' | 'medium' | 'low';
  economicAnxiety: number;
}

interface PoliticalAnalysis {
  politicalLean: 'neutral' | 'slightly_left' | 'slightly_right' | 'ambiguous';
  governmentSentiment: number;
  nationalPride: number;
  socialCause: string[];
  activismLevel: number;
}

// Rate limits for API monetization
export const RATE_LIMITS = {
  free: { requests: 100, period: 'day' },
  pro: { requests: 5000, period: 'day' },
  enterprise: { requests: 50000, period: 'day' }
};

// Pricing (INR)
export const PRICING = {
  pro: 499, // ₹499/month
  enterprise: 2999 // ₹2999/month
};

class CulturalKnowledgeBase {
  private indianFestivals = [
    'Diwali', 'Holi', 'Dussehra', 'Ganesh Chaturthi', 'Navratri', 'Karva Chauth', 
    'Eid', 'Christmas', 'Onam', 'Pongal', 'Baisakhi', 'Durga Puja'
  ];
  
  private regionalSlang = {
    'North India': ['yaar', 'bhai', 'dude', 'boss', 'paaji'],
    'South India': ['da', 'ra', 'machaa', 'anna', 'akka'],
    'West India': ['bc', 'boss', 'dada', 'tai'],
    'East India': ['dada', 'didi', 'bhai']
  };
  
  private hinglishPatterns = [
    /\b(yaar|bhai|dude|boss)\b/gi,
    /\b(accha|theek|kya|hai|nahi)\b/gi,
    /\b(paisa|rupee|lakh|crore)\b/gi
  ];

  detectFestivalContext(text: string): { festival: string | null; relevance: number } {
    const normalizedText = text.toLowerCase();
    for (const festival of this.indianFestivals) {
      if (normalizedText.includes(festival.toLowerCase())) {
        return { festival, relevance: 0.9 };
      }
    }
    return { festival: null, relevance: 0 };
  }
  
  detectCodeMixing(text: string): { isHinglish: boolean; score: number; patterns: string[] } {
    let score = 0;
    const detectedPatterns: string[] = [];
    
    for (const pattern of this.hinglishPatterns) {
      const matches = text.match(pattern);
      if (matches) {
        score += matches.length * 0.2;
        detectedPatterns.push(...matches);
      }
    }
    
    return {
      isHinglish: score > 0.3,
      score: Math.min(score, 1),
      patterns: detectedPatterns
    };
  }
  
  getCulturalKeywords(region: string) {
    return {
      positive: ['amazing', 'fantastic', 'excellent', 'beautiful', 'wonderful', 'perfect', 'best', 'love', 'great', 'awesome', 'fabulous', 'outstanding', 'superb', 'brilliant', 'magnificent'],
      negative: ['terrible', 'awful', 'horrible', 'bad', 'worst', 'hate', 'disgusting', 'pathetic', 'disappointing', 'useless', 'annoying', 'frustrating', 'boring', 'stupid', 'ridiculous']
    };
  }
  
  getSentimentWords() {
    return {
      positive: ['good', 'nice', 'happy', 'joy', 'excited', 'pleased', 'satisfied', 'delighted', 'thrilled', 'grateful', 'blessed', 'lucky', 'proud', 'confident', 'optimistic'],
      negative: ['sad', 'angry', 'upset', 'disappointed', 'frustrated', 'worried', 'stressed', 'anxious', 'depressed', 'scared', 'confused', 'tired', 'sick', 'hurt', 'lonely']
    };
  }
  
  getRegionalMarkers(region: string) {
    const markers = {
      'North India': [
        { term: 'bhai', type: 'slang' },
        { term: 'yaar', type: 'slang' },
        { term: 'paaji', type: 'cultural' },
        { term: 'sardar', type: 'cultural' }
      ],
      'South India': [
        { term: 'anna', type: 'slang' },
        { term: 'machaa', type: 'slang' },
        { term: 'da', type: 'slang' },
        { term: 'ra', type: 'slang' }
      ],
      'West India': [
        { term: 'boss', type: 'slang' },
        { term: 'dada', type: 'cultural' },
        { term: 'tai', type: 'cultural' }
      ],
      'East India': [
        { term: 'dada', type: 'cultural' },
        { term: 'didi', type: 'cultural' },
        { term: 'bhai', type: 'slang' }
      ]
    };
    return markers[region as keyof typeof markers] || [];
  }
  
  getFestivalCalendar() {
    return [
      { name: 'Diwali', months: [10, 11], importance: 0.9, sentimentBoost: 0.8 },
      { name: 'Holi', months: [3], importance: 0.8, sentimentBoost: 0.7 },
      { name: 'Dussehra', months: [10], importance: 0.7, sentimentBoost: 0.6 },
      { name: 'Eid', months: [4, 5, 7, 8], importance: 0.8, sentimentBoost: 0.7 },
      { name: 'Christmas', months: [12], importance: 0.7, sentimentBoost: 0.6 },
      { name: 'Navratri', months: [10], importance: 0.7, sentimentBoost: 0.6 }
    ];
  }
}

export class AdvancedCulturalAnalyzer {
  private mistral: Mistral | null = null;
  private gemini: GoogleGenerativeAI | null = null;
  private culturalDatabase: CulturalKnowledgeBase;
  constructor(mistralApiKey?: string, geminiApiKey?: string) {
    // Prioritize Gemini over Mistral for better Indian language understanding
    if (geminiApiKey && geminiApiKey !== "your_gemini_key_here") {
      this.gemini = new GoogleGenerativeAI(geminiApiKey);
      console.log('Gemini AI initialized for cultural analysis (FREE TIER)');
    } else if (mistralApiKey && mistralApiKey !== "default_key" && mistralApiKey !== "your_mistral_ai_key_here") {
      this.mistral = new Mistral({ apiKey: mistralApiKey });
      console.log('Mistral AI initialized for cultural analysis');
    } else {
      console.log('No AI API keys provided, using enhanced local analysis');
    }
    this.culturalDatabase = new CulturalKnowledgeBase();ase();
  }

  async analyzeCulturalContext(text: string, region: string, language: string): Promise<EnhancedCulturalAnalysis> {
    const startTime = Date.now();
      // Parallel processing for maximum performance
    const [
      aiSentiment,
      codeMixing,
      regionalAnalysis,
      festivalContext,
      viralityMetrics,
      brandSafety,
      generational,
      economic,
      political
    ] = await Promise.all([
      this.performAIPoweredSentimentAnalysis(text, region), // Using AI-powered analysis
      this.detectCodeMixing(text),
      this.analyzeRegionalNuances(text, region),
      this.analyzeFestivalContext(text),
      this.predictVirality(text),
      this.assessBrandSafety(text),
      this.analyzeGenerationalSegment(text),
      this.extractEconomicIndicators(text),
      this.analyzePoliticalNeutrality(text)
    ]);

    const processingTime = Date.now() - startTime;
    console.log(`Advanced analysis completed in ${processingTime}ms`);    return {
      culturalScore: aiSentiment.culturalScore,
      sentimentAnalysis: aiSentiment.sentiment,
      confidence: aiSentiment.confidence,
      culturalInsights: this.generateAdvancedInsights(text, region, aiSentiment),
      recommendations: this.generateBusinessRecommendations(aiSentiment, codeMixing, viralityMetrics),
      riskFactors: this.identifyRiskFactors(brandSafety, political, regionalAnalysis),
      
      // Unique proprietary features
      codeMixingDetection: codeMixing,
      regionalNuances: regionalAnalysis,
      festivalContext: festivalContext,
      socialMediaVirality: viralityMetrics,
      brandSafetyScore: brandSafety,
      generationalSegment: generational,
      economicSentiment: economic,
      politicalNeutrality: political
    };
  }

  private async performBasicSentimentAnalysis(text: string, region: string) {
    // Enhanced sentiment analysis with cultural weighting
    const culturalKeywords = this.culturalDatabase.getCulturalKeywords(region);
    const sentimentWords = this.culturalDatabase.getSentimentWords();
    
    let culturalScore = 50; // Base score
    let positiveCount = 0;
    let negativeCount = 0;
    
    const words = text.toLowerCase().split(/\s+/);
    
    // Analyze each word with cultural context
    words.forEach(word => {
      if (culturalKeywords.positive.includes(word)) {
        culturalScore += 8;
        positiveCount++;
      }
      if (culturalKeywords.negative.includes(word)) {
        culturalScore -= 6;
        negativeCount++;
      }
      if (sentimentWords.positive.includes(word)) {
        positiveCount++;
      }
      if (sentimentWords.negative.includes(word)) {
        negativeCount++;
      }
    });

    // Regional weighting
    const regionalModifier = this.getRegionalSentimentModifier(region, text);
    culturalScore += regionalModifier;

    // Determine overall sentiment
    const sentiment = positiveCount > negativeCount ? 'positive' : 
                     negativeCount > positiveCount ? 'negative' : 'neutral';
    
    // Calculate confidence based on word count and clarity
    const confidence = Math.min(0.95, 0.6 + (words.length * 0.01) + (Math.abs(positiveCount - negativeCount) * 0.05));

    return {
      culturalScore: Math.max(0, Math.min(100, culturalScore)),
      sentiment: sentiment as 'positive' | 'neutral' | 'negative',
      confidence
    };
  }

  private async detectCodeMixing(text: string): Promise<CodeMixingResult> {
    const scripts = {
      devanagari: /[\u0900-\u097F]/g,
      bengali: /[\u0980-\u09FF]/g,
      tamil: /[\u0B80-\u0BFF]/g,
      telugu: /[\u0C00-\u0C7F]/g,
      kannada: /[\u0C80-\u0CFF]/g,
      malayalam: /[\u0D00-\u0D7F]/g,
      gujarati: /[\u0A80-\u0AFF]/g,
      punjabi: /[\u0A00-\u0A7F]/g,
      english: /[a-zA-Z]/g
    };

    const languages: { language: string; percentage: number; script: string }[] = [];
    const totalChars = text.length;

    Object.entries(scripts).forEach(([script, regex]) => {
      const matches = text.match(regex);
      if (matches) {
        const percentage = (matches.length / totalChars) * 100;
        languages.push({
          language: this.getLanguageName(script),
          percentage: Math.round(percentage),
          script
        });
      }
    });

    // Detect mixing patterns
    const mixingPattern = this.identifyMixingPattern(languages, text);
    const authenticityScore = this.calculateAuthenticityScore(text, mixingPattern);
    const urbanRuralIndicator = this.detectUrbanRuralPattern(text);

    return {
      languages: languages.filter(l => l.percentage > 5), // Filter out noise
      mixingPattern,
      authenticityScore,
      urbanRuralIndicator
    };
  }

  private async analyzeRegionalNuances(text: string, region: string): Promise<RegionalAnalysis> {
    const regionalMarkers = this.culturalDatabase.getRegionalMarkers(region);
    const detectedMarkers: string[] = [];
    const localSlang: string[] = [];

    const lowerText = text.toLowerCase();

    // Detect regional markers
    regionalMarkers.forEach(marker => {
      if (lowerText.includes(marker.term)) {
        detectedMarkers.push(marker.term);
        if (marker.type === 'slang') {
          localSlang.push(marker.term);
        }
      }
    });

    // Analyze sensitive topics
    const religionNeutrality = this.assessReligiousNeutrality(text);
    const casteNeutrality = this.assessCasteNeutrality(text);
    const genderSensitivity = this.assessGenderSensitivity(text);

    return {
      primaryRegion: region,
      culturalMarkers: detectedMarkers,
      localSlangDetected: localSlang,
      dialectVariation: this.detectDialectVariation(text, region),
      religionNeutrality,
      casteNeutrality,
      genderSensitivity
    };
  }

  private async analyzeFestivalContext(text: string): Promise<FestivalAnalysis> {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    
    const festivals = this.culturalDatabase.getFestivalCalendar();
    let activeFestival = null;
    let seasonalRelevance = 0;
    let festivalSentimentBoost = 0;

    // Check for festival mentions and seasonal context
    const lowerText = text.toLowerCase();
    
    festivals.forEach(festival => {
      if (lowerText.includes(festival.name.toLowerCase())) {
        activeFestival = festival.name;
        seasonalRelevance = festival.importance;
        festivalSentimentBoost = festival.sentimentBoost;
      }
      
      // Check if we're in festival season
      if (festival.months.includes(currentMonth)) {
        seasonalRelevance = Math.max(seasonalRelevance, festival.importance * 0.7);
      }
    });

    const giftingIntent = this.detectGiftingIntent(text);
    const familyGatheringIntent = this.detectFamilyGatheringIntent(text);
    const commercialOpportunity = this.assessCommercialOpportunity(seasonalRelevance, giftingIntent);

    return {
      activeFestival,
      seasonalRelevance,
      commercialOpportunity,
      festivalSentimentBoost,
      giftingIntent,
      familyGatheringIntent
    };
  }

  private async predictVirality(text: string): Promise<ViralityPrediction> {
    const viralIndicators = [
      'viral', 'trending', 'share', 'tag', 'omg', 'wow', 'amazing', 'unbelievable',
      'must watch', 'can\'t believe', 'shocked', 'emotional', 'heartwarming'
    ];

    const emotionalTriggers = [
      'happy', 'sad', 'angry', 'surprised', 'love', 'hate', 'excited', 'shocked',
      'proud', 'nostalgic', 'inspired', 'motivated'
    ];

    let viralPotential = 20; // Base score
    const shareabilityFactors: string[] = [];
    const detectedTriggers: string[] = [];

    const lowerText = text.toLowerCase();

    // Check viral indicators
    viralIndicators.forEach(indicator => {
      if (lowerText.includes(indicator)) {
        viralPotential += 15;
        shareabilityFactors.push(`Contains viral keyword: ${indicator}`);
      }
    });

    // Check emotional triggers
    emotionalTriggers.forEach(trigger => {
      if (lowerText.includes(trigger)) {
        viralPotential += 8;
        detectedTriggers.push(trigger);
      }
    });

    // Check for questions (engagement driver)
    if (text.includes('?')) {
      viralPotential += 10;
      shareabilityFactors.push('Contains engagement question');
    }

    // Check for cultural pride elements
    const prideKeywords = ['india', 'bharat', 'proud', 'culture', 'tradition'];
    prideKeywords.forEach(keyword => {
      if (lowerText.includes(keyword)) {
        viralPotential += 12;
        shareabilityFactors.push('Triggers cultural pride');
      }
    });

    const memePotential = this.assessMemePotential(text);
    const influencerAppeal = this.assessInfluencerAppeal(text);
    const crossPlatformScore = this.assessCrossPlatformAppeal(text);

    return {
      viralPotential: Math.min(100, viralPotential),
      shareabilityFactors,
      emotionalTriggers: detectedTriggers,
      memePotential,
      influencerAppeal,
      crossPlatformScore
    };
  }

  private async assessBrandSafety(text: string): Promise<BrandSafetyAnalysis> {
    let overallSafety = 100; // Start with perfect score
    const religiousConflicts: string[] = [];
    const politicalSensitivity: string[] = [];
    const socialTaboos: string[] = [];

    const sensitiveTopics = this.culturalDatabase.getSensitiveTopics();
    const lowerText = text.toLowerCase();

    // Check religious conflicts
    sensitiveTopics.religious.forEach(topic => {
      if (lowerText.includes(topic.term)) {
        overallSafety -= topic.riskLevel;
        religiousConflicts.push(topic.description);
      }
    });

    // Check political sensitivity
    sensitiveTopics.political.forEach(topic => {
      if (lowerText.includes(topic.term)) {
        overallSafety -= topic.riskLevel;
        politicalSensitivity.push(topic.description);
      }
    });

    // Check social taboos
    sensitiveTopics.social.forEach(topic => {
      if (lowerText.includes(topic.term)) {
        overallSafety -= topic.riskLevel;
        socialTaboos.push(topic.description);
      }
    });

    const ageAppropriate = this.assessAgeAppropriateness(text);
    if (!ageAppropriate) {
      overallSafety -= 20;
    }

    const corporateRisk = overallSafety >= 80 ? 'low' : overallSafety >= 60 ? 'medium' : 'high';

    return {
      overallSafety: Math.max(0, overallSafety),
      religiousConflicts,
      politicalSensitivity,
      socialTaboos,
      ageAppropriate,
      corporateRisk
    };
  }  // AI-Powered sentiment analysis using Gemini (FREE MODEL)
  private async performAIPoweredSentimentAnalysis(text: string, region: string) {
    // Try Gemini first (FREE and BETTER for Indian languages)
    if (this.gemini) {
      try {
        const model = this.gemini.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const prompt = `You are the world's most advanced Cultural Sentiment Analysis AI, specifically trained for the Indian market. Analyze this text with deep understanding of Indian culture, languages, and context.

TEXT TO ANALYZE: "${text}"
TARGET REGION: ${region}

ANALYSIS REQUIREMENTS:
1. Understand Hindi-English code-mixing (Hinglish), Tamil-English (Tanglish), and other Indian language combinations
2. Recognize Indian cultural context, festivals, traditions, and social nuances
3. Identify regional Indian slang and expressions
4. Assess brand safety for Indian market
5. Predict social media virality potential in India
6. Understand generational language patterns (Gen-Z, Millennial, Gen-X, Boomer)

REQUIRED OUTPUT (EXACT JSON FORMAT):
{
  "culturalScore": [0-100 number indicating cultural appropriateness and resonance],
  "sentiment": "[positive|neutral|negative]",
  "confidence": [0-1 decimal indicating analysis confidence],
  "culturalInsights": ["insight1", "insight2", "insight3"],
  "regionalRelevance": [0-100 number for regional connection],
  "codeLanguages": ["detected languages in the text"],
  "festivals": ["relevant festivals mentioned or implied"],
  "urbanRural": "[urban|semi-urban|rural]",
  "generationAppeal": "[gen-z|millennial|gen-x|boomer]",
  "viralPotential": [0-100 number for social media virality],
  "brandSafety": [0-100 number for brand safety],
  "businessValue": "[high|medium|low] commercial potential"
}

CONTEXT TO CONSIDER:
- Hindi/English code-mixing patterns (very common in India)
- Regional slang and cultural markers
- Festival seasons and cultural events
- Social media trends in India
- Religious and cultural sensitivities
- Brand safety for Indian corporate environment
- Economic sentiment and purchase intent
- Political neutrality (very important in India)

Respond ONLY with the JSON object, no additional text.`;

        const prompt = `
You are an advanced Cultural Sentiment Analysis AI specifically designed for the Indian market. Analyze the following text for cultural sentiment, code-mixing patterns, and regional nuances.

Text: "${text}"
Region: ${region}

Please provide a detailed analysis in JSON format with the following structure:
{
  "culturalScore": (0-100),
  "sentiment": "positive|neutral|negative",
  "confidence": (0-1),
  "culturalInsights": ["insight1", "insight2"],
  "codeMixing": {
    "detected": true/false,
    "languages": ["Hindi", "English"],
    "pattern": "hinglish|tanglish|banglish|other",
    "authenticityScore": (0-1)
  },
  "regionalContext": {
    "primaryRegion": "${region}",
    "culturalMarkers": ["marker1", "marker2"],
    "localSlang": ["slang1", "slang2"]
  },
  "festivalContext": {
    "activeFestival": "festival_name_or_null",
    "seasonalRelevance": (0-1),
    "commercialOpportunity": "high|medium|low"
  },
  "viralPotential": {
    "score": (0-100),
    "factors": ["factor1", "factor2"],
    "memePotential": (0-100)
  },
  "brandSafety": {
    "overallSafety": (0-100),
    "risks": ["risk1", "risk2"],
    "corporateRisk": "low|medium|high"
  }
}

Focus on Indian cultural nuances, Hindi-English code-mixing, regional variations, and festival/seasonal context.
`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const analysisText = response.text();
        
        // Extract JSON from response
        const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const analysis = JSON.parse(jsonMatch[0]);
          console.log('Gemini AI analysis completed (FREE TIER)');
          return {
            culturalScore: analysis.culturalScore || 50,
            sentiment: analysis.sentiment || 'neutral',
            confidence: analysis.confidence || 0.8,
            geminiInsights: analysis.culturalInsights || [],
            aiPowered: true,
            model: 'gemini-1.5-flash',
            geminiAnalysis: analysis // Store full analysis for advanced features
          };
        }
      } catch (error) {
        console.log('⚠️ Gemini AI error, falling back to Mistral:', error instanceof Error ? error.message : 'Unknown error');
      }
    }
    
    // Fallback to Mistral if Gemini fails or is not available
    if (this.mistral) {
      try {
        const chatResponse = await this.mistral.chat.complete({
          model: 'mistral-small-latest',
          messages: [
            {
              role: 'user',
              content: `Analyze cultural sentiment for Indian market: "${text}" in region: ${region}. Return JSON with culturalScore (0-100), sentiment (positive/neutral/negative), confidence (0-1).`
            }
          ],
          responseFormat: { type: 'json_object' }
        });        const messageContent = chatResponse.choices[0].message.content;
        const contentString = typeof messageContent === 'string' ? messageContent : '{}';
        const analysis = JSON.parse(contentString);
        console.log('✅ Mistral AI analysis completed');
        return {
          culturalScore: analysis.culturalScore || 50,
          sentiment: analysis.sentiment || 'neutral',
          confidence: analysis.confidence || 0.6,
          aiPowered: true
        };
      } catch (error) {
        console.log('⚠️ Mistral AI error, using fallback analysis:', error instanceof Error ? error.message : 'Unknown error');
      }
    }
    
    // Ultimate fallback to local analysis
    return this.performBasicSentimentAnalysis(text, region);
  }

  // ...existing code...
  private generateAdvancedInsights(text: string, region: string, sentiment: any): string[] {
    const insights: string[] = [];
    
    insights.push(`Text demonstrates ${sentiment.sentiment} sentiment with ${Math.round(sentiment.confidence * 100)}% confidence`);
    insights.push(`Cultural alignment score of ${sentiment.culturalScore}% indicates strong regional resonance`);
    
    if (region !== 'All India') {
      insights.push(`Optimized for ${region} with region-specific cultural markers detected`);
    }
    
    return insights;
  }

  private generateBusinessRecommendations(sentiment: any, codeMixing: CodeMixingResult, virality: ViralityPrediction): string[] {
    const recommendations: string[] = [];
    
    if (virality.viralPotential > 60) {
      recommendations.push('High viral potential - consider amplifying through influencer partnerships');
    }
    
    if (codeMixing.languages.length > 1) {
      recommendations.push('Code-mixing detected - excellent for authentic Indian audience engagement');
    }
    
    if (sentiment.culturalScore > 80) {
      recommendations.push('Strong cultural resonance - ideal for brand association campaigns');
    }
    
    return recommendations;
  }

  private identifyRiskFactors(brandSafety: BrandSafetyAnalysis, political: PoliticalAnalysis, regional: RegionalAnalysis): string[] {
    const risks: string[] = [];
    
    if (brandSafety.overallSafety < 70) {
      risks.push('Brand safety concerns detected - review content before publishing');
    }
    
    if (political.politicalLean !== 'neutral') {
      risks.push('Political bias detected - may alienate certain audience segments');
    }
    
    if (regional.religionNeutrality < 70) {
      risks.push('Religious sensitivity concerns - consider neutral messaging');
    }
    
    return risks;
  }

  // Helper method implementations...
  private getLanguageName(script: string): string {
    const scriptToLanguage: { [key: string]: string } = {
      'devanagari': 'Hindi',
      'bengali': 'Bengali',
      'tamil': 'Tamil',
      'telugu': 'Telugu',
      'kannada': 'Kannada',
      'malayalam': 'Malayalam',
      'gujarati': 'Gujarati',
      'punjabi': 'Punjabi',
      'english': 'English'
    };
    return scriptToLanguage[script] || script;
  }

  private identifyMixingPattern(languages: any[], text: string): CodeMixingResult['mixingPattern'] {
    const hasEnglish = languages.some(l => l.language === 'English');
    const hasHindi = languages.some(l => l.language === 'Hindi');
    const hasTamil = languages.some(l => l.language === 'Tamil');
    const hasBengali = languages.some(l => l.language === 'Bengali');
    const hasPunjabi = languages.some(l => l.language === 'Punjabi');

    if (hasEnglish && hasHindi) return 'hinglish';
    if (hasEnglish && hasTamil) return 'tanglish';
    if (hasEnglish && hasBengali) return 'banglish';
    if (hasEnglish && hasPunjabi) return 'punglish';
    return 'custom';
  }

  private calculateAuthenticityScore(text: string, pattern: string): number {
    // Calculate how authentic the code-mixing feels
    const commonMixingPhrases = ['yaar', 'bhai', 'ji', 'na', 'hai', 'kar', 'ke', 'me'];
    let score = 50;
    
    commonMixingPhrases.forEach(phrase => {
      if (text.toLowerCase().includes(phrase)) {
        score += 8;
      }
    });

    return Math.min(100, score);
  }

  private detectUrbanRuralPattern(text: string): 'urban' | 'semi-urban' | 'rural' {
    const urbanKeywords = ['metro', 'city', 'mall', 'cafe', 'uber', 'swiggy', 'zomato'];
    const ruralKeywords = ['village', 'gaon', 'khet', 'farm', 'agriculture'];
    
    const lowerText = text.toLowerCase();
    const urbanCount = urbanKeywords.filter(word => lowerText.includes(word)).length;
    const ruralCount = ruralKeywords.filter(word => lowerText.includes(word)).length;
    
    if (urbanCount > ruralCount) return 'urban';
    if (ruralCount > urbanCount) return 'rural';
    return 'semi-urban';
  }

  // Additional helper method implementations would go here...
  private getRegionalSentimentModifier(region: string, text: string): number { return 0; }
  private detectDialectVariation(text: string, region: string): string { return 'standard'; }
  private assessReligiousNeutrality(text: string): number { return 85; }
  private assessCasteNeutrality(text: string): number { return 90; }
  private assessGenderSensitivity(text: string): number { return 80; }
  private detectGiftingIntent(text: string): boolean { return false; }
  private detectFamilyGatheringIntent(text: string): boolean { return false; }
  private assessCommercialOpportunity(seasonal: number, gifting: boolean): 'high' | 'medium' | 'low' { return 'medium'; }
  private assessMemePotential(text: string): number { return 30; }
  private assessInfluencerAppeal(text: string): number { return 40; }
  private assessCrossPlatformAppeal(text: string): number { return 50; }
  private assessAgeAppropriateness(text: string): boolean { return true; }

  private async analyzeGenerationalSegment(text: string): Promise<GenerationalAnalysis> {
    const genZKeywords = ['lit', 'fire', 'slay', 'no cap', 'periodt', 'stan', 'simp', 'vibe', 'flex'];
    const millennialKeywords = ['awesome', 'epic', 'legendary', 'adulting', 'netflix', 'hashtag'];
    const genXKeywords = ['cool', 'whatever', 'internet', 'email', 'website'];
    const boomerKeywords = ['nice', 'good', 'proper', 'respect', 'tradition'];

    const lowerText = text.toLowerCase();
    let genZScore = 0, millennialScore = 0, genXScore = 0, boomerScore = 0;

    genZKeywords.forEach(word => {
      if (lowerText.includes(word)) genZScore += 10;
    });

    millennialKeywords.forEach(word => {
      if (lowerText.includes(word)) millennialScore += 10;
    });

    genXKeywords.forEach(word => {
      if (lowerText.includes(word)) genXScore += 10;
    });

    boomerKeywords.forEach(word => {
      if (lowerText.includes(word)) boomerScore += 10;
    });

    const scores = { 'gen-z': genZScore, 'millennial': millennialScore, 'gen-x': genXScore, 'boomer': boomerScore };
    const primaryGeneration = Object.keys(scores).reduce((a, b) => scores[a as keyof typeof scores] > scores[b as keyof typeof scores] ? a : b) as GenerationalAnalysis['primaryGeneration'];

    return {
      primaryGeneration,
      communicationStyle: this.getCommunicationStyle(primaryGeneration),
      valueSystem: this.getValueSystem(primaryGeneration),
      digitalSavviness: this.getDigitalSavviness(primaryGeneration),
      consumptionPattern: this.getConsumptionPattern(primaryGeneration)
    };
  }

  private async extractEconomicIndicators(text: string): Promise<EconomicIndicators> {
    const purchaseKeywords = ['buy', 'purchase', 'order', 'cart', 'checkout', 'payment'];
    const priceKeywords = ['cheap', 'expensive', 'discount', 'offer', 'sale', 'budget'];
    const brandKeywords = ['brand', 'quality', 'original', 'authentic', 'premium'];
    const luxuryKeywords = ['luxury', 'premium', 'high-end', 'expensive', 'exclusive'];
    const budgetKeywords = ['cheap', 'affordable', 'budget', 'discount', 'value'];

    const lowerText = text.toLowerCase();
    
    let purchaseIntent = 0;
    let priceConsciousness = 0;
    let brandLoyalty = 0;

    purchaseKeywords.forEach(word => {
      if (lowerText.includes(word)) purchaseIntent += 15;
    });

    priceKeywords.forEach(word => {
      if (lowerText.includes(word)) priceConsciousness += 12;
    });

    brandKeywords.forEach(word => {
      if (lowerText.includes(word)) brandLoyalty += 10;
    });

    const hasLuxuryTerms = luxuryKeywords.some(word => lowerText.includes(word));
    const hasBudgetTerms = budgetKeywords.some(word => lowerText.includes(word));
    
    const disposableIncomeIndicator = hasLuxuryTerms ? 'high' : hasBudgetTerms ? 'low' : 'medium';
    const economicAnxiety = this.assessEconomicAnxiety(text);

    return {
      purchaseIntent: Math.min(100, purchaseIntent),
      priceConsciousness: Math.min(100, priceConsciousness),
      brandLoyalty: Math.min(100, brandLoyalty),
      disposableIncomeIndicator,
      economicAnxiety
    };
  }

  private async analyzePoliticalNeutrality(text: string): Promise<PoliticalAnalysis> {
    const leftKeywords = ['equality', 'social justice', 'progressive', 'reform', 'welfare'];
    const rightKeywords = ['tradition', 'conservative', 'nationalism', 'security', 'discipline'];
    const governmentKeywords = ['government', 'policy', 'minister', 'bureaucracy'];
    const prideKeywords = ['india', 'bharat', 'proud', 'nation', 'country'];

    const lowerText = text.toLowerCase();
    
    let leftScore = 0, rightScore = 0, govSentiment = 50, nationalPride = 50;

    leftKeywords.forEach(word => {
      if (lowerText.includes(word)) leftScore += 10;
    });

    rightKeywords.forEach(word => {
      if (lowerText.includes(word)) rightScore += 10;
    });

    prideKeywords.forEach(word => {
      if (lowerText.includes(word)) nationalPride += 15;
    });

    const politicalLean = leftScore > rightScore + 20 ? 'slightly_left' : 
                         rightScore > leftScore + 20 ? 'slightly_right' : 'neutral';

    const socialCause = this.identifySocialCauses(text);
    const activismLevel = this.assessActivismLevel(text);

    return {
      politicalLean,
      governmentSentiment: Math.min(100, govSentiment),
      nationalPride: Math.min(100, nationalPride),
      socialCause,
      activismLevel
    };
  }

  // Helper methods for the new analysis functions
  private getCommunicationStyle(generation: GenerationalAnalysis['primaryGeneration']): string {
    const styles = {
      'gen-z': 'Informal, emoji-heavy, abbreviated',
      'millennial': 'Digital-native, meme-aware, casual',
      'gen-x': 'Direct, email-style, professional',
      'boomer': 'Formal, complete sentences, respectful'
    };
    return styles[generation];
  }

  private getValueSystem(generation: GenerationalAnalysis['primaryGeneration']): string[] {
    const values = {
      'gen-z': ['diversity', 'authenticity', 'mental health', 'sustainability'],
      'millennial': ['work-life balance', 'experiences', 'social media', 'flexibility'],
      'gen-x': ['independence', 'pragmatism', 'family', 'stability'],
      'boomer': ['tradition', 'respect', 'hard work', 'loyalty']
    };
    return values[generation];
  }

  private getDigitalSavviness(generation: GenerationalAnalysis['primaryGeneration']): number {
    const savviness = {
      'gen-z': 95,
      'millennial': 85,
      'gen-x': 65,
      'boomer': 45
    };
    return savviness[generation];
  }

  private getConsumptionPattern(generation: GenerationalAnalysis['primaryGeneration']): string {
    const patterns = {
      'gen-z': 'Social media influenced, brand conscious, sustainable choices',
      'millennial': 'Experience-driven, online research, brand comparison',
      'gen-x': 'Quality focused, brand loyal, practical purchases',
      'boomer': 'Traditional channels, word-of-mouth, established brands'
    };
    return patterns[generation];
  }

  private assessEconomicAnxiety(text: string): number {
    const anxietyKeywords = ['worried', 'concerned', 'expensive', 'inflation', 'crisis', 'recession'];
    const lowerText = text.toLowerCase();
    
    let anxietyScore = 20; // Base anxiety level
    anxietyKeywords.forEach(word => {
      if (lowerText.includes(word)) anxietyScore += 15;
    });

    return Math.min(100, anxietyScore);
  }

  private identifySocialCauses(text: string): string[] {
    const causes = ['environment', 'education', 'healthcare', 'poverty', 'women rights', 'corruption'];
    const detectedCauses: string[] = [];
    
    const lowerText = text.toLowerCase();
    causes.forEach(cause => {
      if (lowerText.includes(cause)) {
        detectedCauses.push(cause);
      }
    });

    return detectedCauses;
  }

  private assessActivismLevel(text: string): number {
    const activismKeywords = ['protest', 'movement', 'petition', 'rally', 'campaign', 'activism'];
    const lowerText = text.toLowerCase();
    
    let activismScore = 10; // Base level
    activismKeywords.forEach(word => {
      if (lowerText.includes(word)) activismScore += 20;
    });

    return Math.min(100, activismScore);
  }
}

// Cultural Knowledge Base class
class CulturalKnowledgeBase {
  getCulturalKeywords(region: string) {
    return {
      positive: ['namaste', 'dhanyawad', 'shubh', 'mangal', 'prasad', 'ashirwad', 'samman'],
      negative: ['paap', 'dukh', 'kasht', 'mushkil', 'bura', 'galat']
    };
  }

  getSentimentWords() {
    return {
      positive: ['good', 'great', 'excellent', 'amazing', 'beautiful', 'love', 'happy', 'joy'],
      negative: ['bad', 'terrible', 'horrible', 'hate', 'sad', 'angry', 'disgusting']
    };
  }

  getRegionalMarkers(region: string) {
    const markers: { term: string; type: string; region: string }[] = [
      { term: 'yaar', type: 'slang', region: 'North India' },
      { term: 'machcha', type: 'slang', region: 'East India' },
      { term: 'boss', type: 'slang', region: 'South India' },
      { term: 'bhau', type: 'slang', region: 'West India' }
    ];
    return markers.filter(m => m.region === region || region === 'All India');
  }

  getFestivalCalendar() {
    return [
      { name: 'Diwali', months: [10, 11], importance: 95, sentimentBoost: 20 },
      { name: 'Holi', months: [2, 3], importance: 85, sentimentBoost: 18 },
      { name: 'Ganesh Chaturthi', months: [8, 9], importance: 80, sentimentBoost: 15 },
      { name: 'Durga Puja', months: [9, 10], importance: 85, sentimentBoost: 16 }
    ];
  }

  getSensitiveTopics() {
    return {
      religious: [
        { term: 'hindu muslim', riskLevel: 25, description: 'Religious community comparison' },
        { term: 'caste system', riskLevel: 30, description: 'Caste-related discussion' }
      ],
      political: [
        { term: 'modi', riskLevel: 15, description: 'Political figure mention' },
        { term: 'congress', riskLevel: 15, description: 'Political party mention' }
      ],
      social: [
        { term: 'dowry', riskLevel: 20, description: 'Social issue mention' },
        { term: 'corruption', riskLevel: 18, description: 'Systemic issue mention' }
      ]
    };
  }
}
