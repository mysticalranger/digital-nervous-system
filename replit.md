# Digital Nervous System - Cultural Sentiment AI Platform

## Overview

Digital Nervous System is a revolutionary AI-powered Cultural Sentiment Analysis platform specifically designed for the Indian market. Built as a full-stack web application, it leverages Google's free Gemini 1.5 Flash model to provide sophisticated cultural intelligence, sentiment analysis, and regional insights for Indian businesses, developers, and content creators.

The platform addresses the unique challenges of understanding multi-lingual, culturally-rich Indian communication patterns including Hindi-English code-mixing (Hinglish), regional dialects, festival contexts, and cultural nuances that traditional AI models fail to capture.

## System Architecture

### Frontend Architecture
- **Framework**: React 18+ with TypeScript
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Animations**: Framer Motion for smooth, engaging user interactions
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Session Management**: Express sessions with connect-pg-simple for PostgreSQL session store
- **Authentication**: JWT-based with bcrypt for password hashing
- **API Design**: RESTful endpoints with WebSocket support for real-time features

### AI Integration Strategy
- **Primary AI**: Google Gemini 1.5 Flash (FREE tier) - chosen for zero cost and superior Indian language support
- **Secondary AI**: Mistral AI integration for specialized tasks
- **Cultural Analysis Engine**: Custom-built advanced cultural analyzer leveraging Gemini's multimodal capabilities
- **Unique Features**: Code-mixing detection, festival context awareness, regional sentiment analysis, viral prediction

## Key Components

### 1. Cultural Intelligence Engine
Located in `server/ai-engine/advanced-cultural-analyzer.ts`, this is the core differentiator featuring:
- Multi-language code-mixing detection (Hinglish, Tanglish, etc.)
- Regional cultural nuance analysis across 28+ Indian states
- Festival and seasonal context integration
- Brand safety scoring for Indian market
- Viral content prediction with cultural amplification factors

### 2. Real-time Engagement System
- WebSocket-based real-time updates for metrics and community activity
- Gamification with karma points, streaks, and achievement systems
- Daily challenges with variable reward schedules
- FOMO-driven limited-time offers and notifications

### 3. File-based Data Storage
The application uses a hybrid approach:
- **Development**: JSON file storage in `data/` directory for zero-setup development
- **Production Ready**: Drizzle ORM configuration for PostgreSQL with migration support
- **Session Storage**: PostgreSQL session store for scalable authentication

### 4. Component Architecture
- **UI Components**: Located in `client/src/components/ui/` using Radix primitives
- **Feature Components**: Domain-specific components in `client/src/components/`
- **Pages**: Route-based page components in `client/src/pages/`
- **Shared Types**: TypeScript interfaces in `shared/schema.ts`

## Data Flow

### 1. Authentication Flow
```
Client → Express Session → JWT Token → Local Storage → API Authorization
```

### 2. AI Analysis Pipeline
```
User Input → Regional Context → Gemini API → Cultural Analysis → Response Enhancement → UI Display
```

### 3. Real-time Updates
```
Server Events → WebSocket Manager → Client Subscriptions → UI State Updates
```

### 4. Engagement System
```
User Actions → Karma Calculation → Achievement Check → Real-time Broadcast → Community Updates
```

## External Dependencies

### AI Services
- **Google Gemini 1.5 Flash**: Primary AI for cultural sentiment analysis (FREE tier)
- **Mistral AI**: Secondary AI service for specialized tasks
- **Custom Prompting**: India-specific prompt engineering for cultural accuracy

### Third-party Integrations
- **Razorpay**: Payment processing for premium features (optional)
- **WebSocket**: Real-time communication for live updates
- **TanStack Query**: Efficient data fetching and caching

### Infrastructure Dependencies
- **Node.js 18+**: Runtime environment
- **PostgreSQL**: Production database (with Drizzle ORM)
- **Neon Database**: Serverless PostgreSQL integration ready

## Deployment Strategy

### Development Environment
- **Replit Configuration**: Optimized for Replit deployment with `.replit` configuration
- **Port Configuration**: Development on port 5000, production auto-scaling
- **Build Process**: Vite build → ESBuild server bundling → Production ready

### Production Deployment
- **Build Command**: `npm run build` - creates optimized client and server bundles
- **Start Command**: `npm run start` - runs production server
- **Auto-scaling**: Configured for Replit's autoscale deployment target
- **Environment Variables**: Secure API key management via environment configuration

### Database Strategy
- **Development**: File-based storage requiring no database setup
- **Production**: PostgreSQL with Drizzle migrations (`npm run db:push`)
- **Scaling**: Connection pooling and indexing optimizations ready

### Security Considerations
- HTTPS enforcement for production
- Secure session management with random secret generation
- Input validation and sanitization
- Authentication token expiration and refresh handling
- Environment variable security for API keys

## Recent Changes
- December 19, 2024: Successfully migrated from Replit Agent to Replit environment
- December 19, 2024: Verified all dependencies and packages working correctly
- December 19, 2024: Confirmed server startup and API endpoints functional
- December 19, 2024: WebSocket connections established and working
- December 19, 2024: Frontend loading with proper React/Vite setup

## Changelog
- December 19, 2024: Migration to Replit completed
- June 25, 2025: Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.