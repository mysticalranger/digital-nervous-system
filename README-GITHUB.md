# 🚀 Digital Nervous System - Cultural Sentiment AI

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue.svg)](https://www.typescriptlang.org)
[![Google Gemini](https://img.shields.io/badge/Powered%20by-Google%20Gemini-4285F4.svg)](https://ai.google.dev)

## 🎯 Revolutionary AI-Powered Cultural Sentiment Analysis for Indian Market

This is the **world's first AI-powered Cultural Sentiment Analysis system** specifically designed for the Indian market, using Google's **completely FREE** Gemini 1.5 Flash model.

### 🌟 What Makes This Project Revolutionary?

- **🆓 FREE AI POWER**: Uses Google Gemini 1.5 Flash (FREE tier) - Zero API costs
- **🇮🇳 HINDI-ENGLISH CODE-MIXING**: Understands "Hinglish" perfectly 
- **🏛️ REGIONAL INTELLIGENCE**: Detects cultural nuances across 28+ Indian states
- **🎉 FESTIVAL-AWARE**: Contextualizes content based on Indian festivals and seasons
- **🛡️ BRAND SAFETY**: Advanced brand safety analysis for Indian corporate environment
- **🚀 VIRAL PREDICTION**: Predicts social media virality for Indian audience

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- A free Google API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/digital-nervous-system.git
cd digital-nervous-system

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your Gemini API key to .env file

# Start the development server
npm run dev

# Open your browser to http://localhost:5000
```

## 📖 API Usage

### Cultural Sentiment Analysis

```javascript
// POST /api/ai/analyze-cultural-context
{
  "text": "Yaar this Diwali is going to be lit! 🪔✨",
  "region": "Maharashtra",
  "language": "en"
}

// Response
{
  "culturalScore": 89,
  "sentimentAnalysis": "positive",
  "confidence": 0.94,
  "culturalInsights": [
    "High cultural alignment with festival context",
    "Code-mixing indicates urban millennial audience",
    "Strong viral potential detected"
  ],
  "codeMixingDetection": {
    "languages": [
      {"language": "English", "percentage": 70},
      {"language": "Hindi", "percentage": 30}
    ],
    "mixingPattern": "hinglish",
    "authenticityScore": 92
  },
  "viralPotential": 78,
  "brandSafety": 95
}
```

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, TypeScript
- **AI**: Google Gemini 1.5 Flash (FREE), Fallback to Mistral AI
- **Storage**: File-based JSON storage (no database required)
- **Real-time**: WebSocket connections
- **UI**: Shadcn/ui components

## 🌐 Features

### ✅ Completed Features

- **Advanced Cultural Analysis**: Multi-dimensional cultural sentiment scoring
- **Real-time Processing**: WebSocket-based real-time updates
- **Code-mixing Detection**: Supports 10+ Indian languages
- **Regional Intelligence**: State-wise cultural markers
- **Festival Context**: Seasonal and festival-aware analysis
- **Brand Safety**: Corporate-grade content safety scoring
- **Viral Prediction**: Social media virality forecasting
- **User Management**: Registration, authentication, and profiles
- **Project Management**: Create and manage AI analysis projects
- **Community Features**: Activity feeds and karma system
- **Analytics Dashboard**: Real-time metrics and insights

## 🏗️ Project Structure

```
digital-nervous-system/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── pages/         # Route pages
│   │   ├── hooks/         # React hooks
│   │   └── lib/           # Utilities
├── server/                # Express backend
│   ├── ai-engine/         # AI analysis engine
│   ├── routes.ts          # API routes
│   └── index.ts           # Server entry
├── shared/                # Shared types
├── data/                  # JSON file storage
└── README.md
```

## 💰 Business Model & Monetization

### 🎯 Revenue Streams

1. **API Subscriptions**: ₹99-₹999/month for businesses
2. **Enterprise Solutions**: ₹10,000-₹50,000/month for large corporations
3. **White-label Solutions**: ₹1,00,000+ for custom implementations
4. **Consulting Services**: ₹5,000/hour for AI strategy consulting

### 📊 Market Opportunity

- **Indian Content Marketing**: ₹2,000 crore market
- **Social Media Analytics**: ₹500 crore market
- **Brand Safety Tools**: ₹300 crore market
- **Cultural Intelligence**: Untapped ₹1,000+ crore opportunity

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# Google Gemini API Key (Get from https://makersuite.google.com/app/apikey)
GEMINI_API_KEY=your_gemini_api_key_here

# Session Secret (Change for production)
SESSION_SECRET=your_random_secret_string_here

# Optional - Fallback Mistral API Key
MISTRAL_API_KEY=your_mistral_key_here

# Optional - Razorpay for payments
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - Type checking

## 🔒 Security

- Environment variables are properly secured
- API keys are never committed to the repository
- Input validation and sanitization implemented
- Rate limiting and error handling in place

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for providing free, powerful AI capabilities
- **Indian Developer Community** for inspiration and feedback
- **Shadcn/ui** for beautiful UI components
- **React** and **Node.js** communities for excellent frameworks

## 📞 Contact

- **Issues**: Please use GitHub Issues for bug reports and feature requests
- **Discussions**: Use GitHub Discussions for questions and ideas
- **Email**: [Create an issue](https://github.com/yourusername/digital-nervous-system/issues) for private matters

## 🌟 Show Your Support

If this project helped you, please give it a ⭐️ on GitHub!

---

**Made with ❤️ for the Indian tech community**

**#MadeInIndia #AIForIndia #CulturalTech #GeminiAI**
