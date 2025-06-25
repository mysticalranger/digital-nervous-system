# Cultural Intelligence Business API Documentation

## Overview

The Cultural Intelligence Business API provides enterprise-grade access to advanced AI-powered cultural sentiment analysis, specifically designed for the Indian market. Our API helps businesses understand multi-lingual communication patterns, cultural nuances, and viral potential of content.

## Base URL
```
https://your-domain.com/api/business
```

## Authentication

All API requests require authentication via API key. Include your API key in the request header:

```bash
X-API-Key: your_api_key_here
# OR
Authorization: Bearer your_api_key_here
```

## Rate Limits

- **Free Plan**: 100 requests/hour
- **Pro Plan**: 5,000 requests/hour  
- **Enterprise Plan**: 10,000 requests/hour

When rate limits are exceeded, you'll receive a `429 Too Many Requests` response.

## Credit System

- **Exchange Rate**: ₹1 = 10 Cultural Credits
- **Basic Analysis**: 1 credit
- **Voice Analysis**: 3 credits
- **Cultural Pulse**: 2 credits
- **Viral Prediction**: 4 credits
- **Batch Analysis**: 1 credit per text

## Endpoints

### 1. Health Check
```
GET /health
```
Check API service status.

**Response:**
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "timestamp": "2025-06-25T18:30:00Z",
  "services": {
    "database": "connected",
    "ai_engine": "operational",
    "cultural_pulse": "active"
  }
}
```

### 2. Basic Cultural Analysis
```
POST /v1/analyze
```

Analyze text for cultural sentiment, code-mixing patterns, and regional insights.

**Request Body:**
```json
{
  "text": "Yaar ye movie bahut accha hai! Must watch for sure.",
  "region": "India",
  "language": "auto-detect",
  "features": [
    "sentiment",
    "cultural_score", 
    "code_mixing",
    "regional_nuances",
    "festival_context",
    "viral_potential",
    "brand_safety",
    "meme_detection",
    "commerce_insights"
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "analysis_1735151400000",
    "text": "Yaar ye movie bahut accha hai! Must watch for sure.",
    "region": "India",
    "language": "hinglish",
    "analysis": {
      "sentiment": "positive",
      "confidence": 0.92,
      "culturalScore": 87,
      "codeMixingDetection": {
        "languages": ["hindi", "english"],
        "mixingPattern": "hinglish",
        "authenticityScore": 0.89,
        "urbanRuralIndicator": "urban"
      },
      "regionalNuances": {
        "primaryRegion": "North India",
        "culturalMarkers": ["informal_tone", "peer_recommendation"],
        "localSlang": ["yaar"],
        "religionNeutrality": 1.0,
        "casteNeutrality": 1.0
      },
      "viralityPrediction": {
        "viralPotential": 72,
        "shareabilityFactors": ["enthusiasm", "recommendation"],
        "memePotential": 34,
        "influencerAppeal": 68,
        "optimalShareTime": "19:00-21:00 IST"
      }
    },
    "timestamp": "2025-06-25T18:30:00Z",
    "creditsUsed": 1
  }
}
```

### 3. Batch Analysis
```
POST /v1/batch-analyze
```

Process multiple texts in a single request.

**Request Body:**
```json
{
  "texts": [
    "Aaj ka weather kitna accha hai!",
    "Office mein meeting cancel ho gaya, woohoo!",
    "Lunch time - time for some delicious biryani"
  ],
  "region": "India",
  "language": "auto-detect",
  "features": ["sentiment", "cultural_score"]
}
```

### 4. Voice Analysis
```
POST /v1/voice-analyze
```

Analyze audio content with regional AI assistants.

**Request Body:**
```json
{
  "audioUrl": "https://example.com/audio.mp3",
  "assistantId": "priya",
  "region": "South India"
}
```

### 5. Cultural Pulse
```
GET /v1/cultural-pulse?region=India
```

Get real-time cultural trends and insights.

**Response:**
```json
{
  "success": true,
  "data": {
    "region": "India",
    "pulse": {
      "timestamp": "2025-06-25T18:30:00Z",
      "trendingTopics": [
        {
          "topic": "Cricket World Cup",
          "sentiment": 0.89,
          "volume": 15420,
          "regions": ["Mumbai", "Delhi", "Kolkata"]
        }
      ],
      "regionalMood": [
        {
          "region": "North India",
          "overallSentiment": "positive",
          "dominantEmotions": ["excitement", "anticipation"],
          "confidenceLevel": 0.87
        }
      ],
      "festivalMood": {
        "activeFestivals": ["Diwali Preparation"],
        "anticipationLevel": 0.92,
        "commercialActivity": 0.84,
        "socialEngagement": 0.91
      }
    },
    "creditsUsed": 2,
    "timestamp": "2025-06-25T18:30:00Z"
  }
}
```

### 6. Viral Prediction
```
POST /v1/viral-prediction
```

Predict content's viral potential with cultural context.

**Request Body:**
```json
{
  "text": "Cricket World Cup final ka excitement! India vs Australia 🇮🇳",
  "category": "sports",
  "region": "India"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "viral_1735151400000",
    "text": "Cricket World Cup final ka excitement! India vs Australia 🇮🇳",
    "category": "sports",
    "region": "India",
    "viralScore": 94,
    "peakTime": "2025-06-30T15:30:00Z",
    "factors": [
      "Cultural relevance",
      "Emotional appeal", 
      "Timing appropriateness",
      "National pride element"
    ],
    "recommendations": [
      "Post between 7-9 PM for maximum engagement",
      "Include regional hashtags",
      "Add video content for higher reach",
      "Target cricket enthusiast demographics"
    ],
    "creditsUsed": 4,
    "timestamp": "2025-06-25T18:30:00Z"
  }
}
```

### 7. Usage Statistics
```
GET /v1/usage-stats?days=30
```

Get API usage analytics for your account.

### 8. Account Information
```
GET /v1/account
```

Retrieve account details and API key information.

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - Invalid parameters |
| 401 | Unauthorized - Invalid/missing API key |
| 402 | Payment Required - Insufficient credits |
| 403 | Forbidden - Insufficient permissions |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error - Service issue |

## Error Response Format
```json
{
  "error": "Insufficient credits",
  "message": "This operation requires 4 cultural credits",
  "currentBalance": 150,
  "code": 402
}
```

## SDKs and Libraries

### Node.js Example
```javascript
const CulturalIntelligenceAPI = require('@dns/cultural-intelligence');

const client = new CulturalIntelligenceAPI({
  apiKey: 'your_api_key_here',
  baseURL: 'https://your-domain.com/api/business'
});

// Analyze text
const result = await client.analyze({
  text: 'Aaj ka weather kitna accha hai!',
  features: ['sentiment', 'cultural_score', 'code_mixing']
});
```

### Python Example
```python
import requests

headers = {'X-API-Key': 'your_api_key_here'}
data = {
    'text': 'Yaar ye movie bahut accha hai!',
    'features': ['sentiment', 'cultural_score']
}

response = requests.post(
    'https://your-domain.com/api/business/v1/analyze',
    headers=headers,
    json=data
)
```

### cURL Example
```bash
curl -X POST \
  https://your-domain.com/api/business/v1/analyze \
  -H 'X-API-Key: your_api_key_here' \
  -H 'Content-Type: application/json' \
  -d '{
    "text": "Yaar ye movie bahut accha hai!",
    "features": ["sentiment", "cultural_score", "code_mixing"]
  }'
```

## Webhooks

Configure webhooks to receive real-time notifications:

- `analysis_complete` - Batch analysis finished
- `credit_low` - Credit balance below threshold
- `rate_limit_warning` - Approaching rate limit

## Support

- **Documentation**: https://docs.cultural-intelligence.com
- **API Status**: https://status.cultural-intelligence.com  
- **Support Email**: api-support@cultural-intelligence.com
- **Response Time**: < 24 hours

## Changelog

### v1.0.0 (2025-06-25)
- Initial API release
- Basic cultural analysis
- Batch processing
- Voice analysis integration
- Real-time cultural pulse
- Viral prediction engine
- Comprehensive rate limiting
- Credit-based billing system