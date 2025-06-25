# Digital Nervous System - Cultural Intelligence Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)

## Overview

Digital Nervous System is a revolutionary AI-powered Cultural Sentiment Analysis platform specifically designed for the Indian market. Built as a full-stack web application, it leverages Google's free Gemini 1.5 Flash model to provide sophisticated cultural intelligence, sentiment analysis, and regional insights for Indian businesses, developers, and content creators.

## Key Features

### 🧠 AI Cultural Intelligence
- Advanced sentiment analysis tailored for Indian cultural context
- Code-mixing detection (Hinglish, Tanglish, etc.)
- Regional cultural nuance analysis across 28+ Indian states
- Festival and seasonal context integration
- Brand safety scoring for Indian market

### 🚀 Real-time Analytics
- Live cultural pulse monitoring
- Trending topics and viral predictions
- Regional sentiment tracking
- Festival context awareness
- Multi-language support

### 💼 Business API Integration
- Enterprise-grade authentication with API keys
- Rate limiting and usage tracking
- Credit-based billing system
- Comprehensive business endpoints
- SDKs and integration guides

### 🎮 Gamification System
- Cultural mastery levels and achievements
- Daily challenges and streaks
- Community leaderboards
- Cultural coins reward system
- Social engagement features

## Technology Stack

### Frontend
- **React 18+** with TypeScript
- **Vite** for fast development and optimized builds
- **Tailwind CSS** with custom design system
- **Framer Motion** for smooth animations
- **TanStack Query** for efficient data fetching
- **Wouter** for lightweight routing
- **Radix UI** + **shadcn/ui** component library

### Backend
- **Node.js** with Express.js
- **TypeScript** with ES modules
- **PostgreSQL** with Drizzle ORM
- **JWT** authentication with bcrypt
- **WebSocket** for real-time features
- **Razorpay** integration for payments

### AI Integration
- **Google Gemini 1.5 Flash** (Primary - FREE tier)
- **Mistral AI** (Secondary integration)
- Custom cultural analysis engine
- Multi-language processing pipeline

## Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database (optional for development)
- API keys for AI services (optional)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/digital-nervous-system.git
cd digital-nervous-system
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment setup**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Database setup (optional)**
```bash
# For PostgreSQL (production)
npm run db:push

# For development, the app uses file-based storage
```

5. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

### Environment Variables

Create a `.env` file with the following variables:

```env
# Database (optional for development)
DATABASE_URL=postgresql://username:password@localhost:5432/cultural_ai

# AI Services (optional)
GEMINI_API_KEY=your_gemini_api_key
MISTRAL_API_KEY=your_mistral_api_key

# Session Security
SESSION_SECRET=your_secure_session_secret

# Payment Integration (optional)
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret

# Replit Integration (for deployment)
REPL_ID=your_repl_id
ISSUER_URL=https://replit.com/oidc
REPLIT_DOMAINS=your-domain.replit.dev
```

## API Documentation

### Business API Endpoints

The platform provides enterprise-ready API endpoints:

- `POST /v1/analyze` - Cultural sentiment analysis
- `POST /v1/batch-analyze` - Batch processing
- `POST /v1/voice-analyze` - Voice sentiment analysis
- `GET /v1/cultural-pulse` - Live cultural trends
- `GET /v1/viral-prediction` - Viral content prediction
- `GET /v1/usage-stats` - API usage analytics
- `GET /v1/account` - Account information
- `GET /health` - Health check

### Authentication

All API endpoints require authentication via API keys:

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{"text": "Yaar this startup idea is fantastic!", "region": "North India"}' \
     https://your-domain.com/v1/analyze
```

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/          # Utilities and configurations
├── server/                # Express backend
│   ├── ai-engine/        # AI processing modules
│   ├── db.ts             # Database configuration
│   ├── storage.ts        # Data storage layer
│   ├── routes.ts         # API routes
│   └── index.ts          # Server entry point
├── shared/               # Shared types and schemas
│   └── schema.ts         # Database schemas
└── data/                # Development data storage
```

## Deployment

### Replit Deployment (Recommended)

1. **Import to Replit**
   - Go to Replit.com
   - Click "Import from GitHub"
   - Enter your repository URL

2. **Configure environment**
   - Set environment variables in Replit Secrets
   - The `.replit` file is pre-configured

3. **Deploy**
   - Click "Deploy" in Replit
   - Your app will be available at `your-repl.replit.app`

### Manual Deployment

1. **Build the application**
```bash
npm run build
```

2. **Start production server**
```bash
npm run start
```

3. **Database migration**
```bash
npm run db:push
```

## Features in Detail

### Cultural Intelligence Engine
- **Code-mixing Detection**: Understands Hinglish, Tanglish, and other Indian language combinations
- **Regional Analysis**: Tailored insights for different Indian states and cultures
- **Festival Context**: Seasonal and festival-aware sentiment analysis
- **Brand Safety**: Comprehensive safety scoring for marketing content

### Gamification System
- **Mastery Levels**: Progress through cultural understanding levels
- **Daily Challenges**: Engaging daily tasks with variable rewards
- **Achievement System**: Unlock badges and milestones
- **Community Features**: Leaderboards and social engagement

### Business Integration
- **Enterprise API**: Robust authentication and rate limiting
- **Usage Analytics**: Comprehensive tracking and reporting
- **Credit System**: Flexible pricing with ₹1 = 10 credits
- **Documentation**: Complete API documentation and SDKs

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- **Documentation**: Full API documentation available in `/docs`
- **Issues**: Report bugs and feature requests on GitHub Issues
- **Community**: Join our Discord community for support

## Roadmap

- [ ] Mobile app development
- [ ] Additional AI model integrations
- [ ] Advanced analytics dashboard
- [ ] Multi-tenant business features
- [ ] Custom model training capabilities

---

Built with ❤️ for the Indian digital ecosystem