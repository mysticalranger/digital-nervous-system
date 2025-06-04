// Client-side OpenAI utilities for Digital Swameshtra

export interface AIGenerationRequest {
  description: string;
  targetRegion: string;
  aiComplexity: string;
}

export interface AIGenerationResponse {
  title: string;
  enhancedDescription: string;
  culturalScore: number;
  recommendedLanguages: string[];
  technicalStack: string[];
  culturalConsiderations: string[];
  implementationSteps: string[];
  estimatedTimeline: string;
  karmaReward: number;
}

export interface CulturalAnalysisRequest {
  text: string;
  region: string;
  language: string;
}

export interface CulturalAnalysisResponse {
  culturalScore: number;
  sentimentAnalysis: "positive" | "neutral" | "negative";
  culturalInsights: string[];
  recommendations: string[];
  riskFactors: string[];
  confidence: number;
}

export class AIService {
  private baseUrl = "/api/ai";

  async generateProject(request: AIGenerationRequest): Promise<AIGenerationResponse> {
    const response = await fetch(`${this.baseUrl}/generate-project`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`AI generation failed: ${error}`);
    }

    return response.json();
  }

  async analyzeCulturalContext(request: CulturalAnalysisRequest): Promise<CulturalAnalysisResponse> {
    const response = await fetch(`${this.baseUrl}/analyze-cultural-context`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Cultural analysis failed: ${error}`);
    }

    return response.json();
  }

  // Helper method to get cultural suggestions based on region
  getCulturalSuggestions(region: string): string[] {
    const suggestions: Record<string, string[]> = {
      "North India": [
        "Consider Hindi and Punjabi language support",
        "Integrate with local payment systems like Paytm",
        "Account for festival seasons like Diwali and Holi",
        "Respect for family hierarchy in UI design"
      ],
      "South India": [
        "Prioritize Tamil, Telugu, Kannada, and Malayalam",
        "Regional banking preferences consideration",
        "Harvest festival awareness (Pongal, Onam)",
        "Technology adoption patterns differ by state"
      ],
      "East India": [
        "Bengali language integration essential",
        "Durga Puja and Kali Puja cultural events",
        "Traditional art forms in visual design",
        "Education-focused solution preferences"
      ],
      "West India": [
        "Marathi and Gujarati language support",
        "Business-oriented feature preferences",
        "Ganesh Chaturthi and Navratri considerations",
        "Trade and commerce integration opportunities"
      ],
      "Northeast India": [
        "Multiple tribal language considerations",
        "Unique cultural diversity requirements",
        "Internet connectivity adaptations",
        "Community-based social structures"
      ],
      "All India": [
        "Multi-language support across 22+ languages",
        "Pan-Indian festival calendar integration",
        "Diverse payment method support",
        "Regional customization capabilities"
      ]
    };

    return suggestions[region] || suggestions["All India"];
  }

  // Helper method to get complexity recommendations
  getComplexityRecommendations(complexity: string): string[] {
    const recommendations: Record<string, string[]> = {
      "Basic NLP": [
        "Text processing and language detection",
        "Simple sentiment analysis",
        "Basic chatbot functionality",
        "Content categorization"
      ],
      "Advanced ML": [
        "Predictive analytics and forecasting",
        "User behavior analysis",
        "Recommendation systems",
        "Pattern recognition"
      ],
      "Deep Learning": [
        "Neural network architectures",
        "Computer vision applications",
        "Advanced language models",
        "Autonomous decision making"
      ],
      "Neural Networks": [
        "Custom model architectures",
        "Real-time learning systems",
        "Complex data processing",
        "Advanced AI capabilities"
      ]
    };

    return recommendations[complexity] || recommendations["Basic NLP"];
  }

  // Method to validate cultural appropriateness
  async validateCulturalAppropriateness(content: string, targetRegion: string): Promise<boolean> {
    try {
      const analysis = await this.analyzeCulturalContext({
        text: content,
        region: targetRegion,
        language: "en" // Default to English for validation
      });

      // Consider content appropriate if cultural score is above 70 and no high-risk factors
      return analysis.culturalScore >= 70 && analysis.riskFactors.length === 0;
    } catch (error) {
      console.error("Cultural validation failed:", error);
      return false; // Err on the side of caution
    }
  }
}

// Singleton instance
export const aiService = new AIService();

// Export utility functions for cultural awareness
export const culturalUtils = {
  getRegionalColors: (region: string) => {
    const colors: Record<string, string[]> = {
      "North India": ["#FF6B35", "#FFD700", "#FF4500"], // Warm colors
      "South India": ["#4ECDC4", "#45B7D1", "#96CEB4"], // Cool blues and greens
      "East India": ["#9B59B6", "#E74C3C", "#F39C12"], // Rich purples and reds
      "West India": ["#E67E22", "#D35400", "#F1C40F"], // Earth tones
      "Northeast India": ["#27AE60", "#16A085", "#2ECC71"], // Natural greens
      "All India": ["#FF6B35", "#4ECDC4", "#9B59B6"] // Tricolor inspired
    };
    return colors[region] || colors["All India"];
  },

  getRegionalFonts: (region: string) => {
    const fonts: Record<string, string[]> = {
      "North India": ["Noto Sans Devanagari", "Lohit Devanagari"],
      "South India": ["Noto Sans Tamil", "Noto Sans Telugu", "Noto Sans Kannada"],
      "East India": ["Noto Sans Bengali", "Mukti Narrow"],
      "West India": ["Noto Sans Devanagari", "Noto Sans Gujarati"],
      "Northeast India": ["Noto Sans", "Open Sans"],
      "All India": ["Inter", "Noto Sans", "Open Sans"]
    };
    return fonts[region] || fonts["All India"];
  },

  getFestivalCalendar: (region: string) => {
    const festivals: Record<string, string[]> = {
      "North India": ["Diwali", "Holi", "Dussehra", "Karva Chauth"],
      "South India": ["Pongal", "Onam", "Ugadi", "Dussehra"],
      "East India": ["Durga Puja", "Kali Puja", "Poila Boishakh"],
      "West India": ["Ganesh Chaturthi", "Navratri", "Gudi Padwa"],
      "Northeast India": ["Bihu", "Losar", "Chapchar Kut"],
      "All India": ["Diwali", "Holi", "Eid", "Christmas", "Independence Day"]
    };
    return festivals[region] || festivals["All India"];
  }
};
