# Re:MirAI

> **"A platform where you discover yourself through the eyes of others"**

**Project Type:** AI-Powered Personality Discovery Platform  
**Platform:** Web Application  
**Architecture:** Full-Stack Modern Web Application

---

## 📋 Project Information

Re:MirAI is an innovative AI-powered platform that transforms how people understand themselves through the perspectives of their friends. By collecting anonymous feedback through shareable surveys (called "Rituals"), the platform synthesizes a unique AI persona that reflects how others perceive you—creating an interactive chatbot you can engage with to explore your external personality.

## 🚀 Overview

### Core Value Propositions

**Self-Discovery Through Social Feedback**
- Generate personality insights based on collective friend feedback
- Interact with an AI representation of your public persona
- Explore the gap between self-perception and external perception

**Engaging Social Experience**
- Shareable persona cards optimized for social media
- Compatibility matching between personas
- Gamified interaction system with quests and rewards

**Privacy-First Design**
- Friends provide anonymous feedback
- Control over persona visibility (public/private)
- No personal data sold or shared with third parties

## ✨ Key Features

### 🔮 Ritual System (Survey Generation)
- Create personalized survey links to share with friends
- Custom questions designed to capture personality dimensions
- Anonymous response collection
- Minimum threshold system (3+ responses for summoning)

### 🎭 Persona Synthesis
- AI-powered personality profile generation from survey responses
- Multiple summoning modes:
  - **Fated:** Let the AI decide based on responses
  - **Alchemic:** Filter by desired archetype (Yandere, Kuudere, etc.)
- Rarity system (SSR, SR, R) reflecting persona uniqueness
- Practice mode for self-perception comparison

### 💬 AI Chat Interface
- Real-time conversation with your generated persona
- Context-aware responses based on personality profile
- Bond level progression through interaction
- Chat history preservation

### 🎨 Persona Cards & Illustrations
- AI-generated character illustrations representing your persona
- Detailed stat system (Charisma, Intellect, Kindness, Instability, Spirit)
- Shareable persona cards for social media
- Gender toggle feature (future enhancement)

### 👥 Social Features
- **Compatibility Matching:** Discover chemistry scores with friends' personas
- **Public Profiles:** Share your persona with the community
- **Friend Persona Access:** Time-limited rental passes to chat with friends' personas

### 🎮 Gamification
- Quest system with rewards (Memory Crystals)
- Bond level progression
- Achievement badges and streaks
- Leaderboards (future enhancement)

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** CSS Modules with Design Tokens
- **State Management:** React Context + Hooks
- **UI Components:** Custom Atomic Design System
- **Design Philosophy:** Blonix Branch (Light Theme First)

### Backend
- **Framework:** NestJS
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** TypeORM / Prisma
- **Authentication:** Google OAuth 2.0 + JWT
- **API:** RESTful with versioning

### AI & Data
- **LLM:** OpenAI GPT-4 / GPT-3.5-turbo
- **Image Generation:** DALL-E 3 / Stable Diffusion (future)
- **Embeddings:** OpenAI Embeddings (for compatibility matching)

### Infrastructure
- **Hosting:** Vercel (Frontend) + Railway/Render (Backend)
- **Database Hosting:** Supabase / Railway
- **File Storage:** Cloudinary / AWS S3
- **Monitoring:** Sentry + LogRocket

## 🏃 Quick Start

### Prerequisites

- **Node.js:** 18.0.0 or higher
- **Package Manager:** npm or yarn
- **Database:** PostgreSQL 14+
- **API Keys:**
  - OpenAI API key
  - Google OAuth credentials

### Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-org/Re-MirAI.git
cd Re-MirAI

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Copy environment files
cp .env.example .env

# Configure your environment variables
# Edit .env with your API keys and database credentials

# Run database migrations
npm run migration:run

# Start development servers
# Terminal 1 - Frontend
cd frontend
npm run dev

# Terminal 2 - Backend
cd backend
npm run start:dev
```

Access the application at `http://localhost:3000`

## 📁 Project Structure

```
Re-MirAI/
├── frontend/              # Next.js frontend application
│   ├── app/              # App Router pages
│   │   ├── (auth)/       # Authentication pages
│   │   ├── dashboard/    # User dashboard
│   │   ├── ritual/       # Survey creation & management
│   │   ├── summoning/    # Persona summoning
│   │   └── persona/      # Persona interaction
│   ├── components/       # React components (Atomic Design)
│   │   ├── atoms/        # Basic building blocks
│   │   ├── molecules/    # Simple component combinations
│   │   ├── organisms/    # Complex UI sections
│   │   ├── templates/    # Page layouts
│   │   └── pages/        # Complete pages
│   ├── lib/              # Utilities and hooks
│   ├── styles/           # Global styles and design tokens
│   └── public/           # Static assets
│
├── backend/              # NestJS backend application
│   ├── src/
│   │   ├── modules/      # Feature modules
│   │   │   ├── auth/     # Authentication & authorization
│   │   │   ├── users/    # User management
│   │   │   ├── ritual/   # Survey/ritual system
│   │   │   ├── persona/  # Persona synthesis & chat
│   │   │   ├── social/   # Compatibility & profiles
│   │   │   └── quests/   # Gamification system
│   │   ├── common/       # Shared utilities
│   │   ├── config/       # Configuration
│   │   └── database/     # Database migrations & seeds
│   └── test/             # Test files
│
└── docs/                 # Documentation
    ├── 01-getting-started/
    ├── 02-project-overview/
    ├── 03-architecture/
    ├── 04-design-system/
    ├── 05-user-experience/
    ├── 06-development/
    ├── 07-deployment/
    ├── 08-marketing/
    └── 09-reference/
```

## 🎨 Design System

Re:MirAI features the **Blonix Branch** design philosophy:

- **🌟 Light Theme First:** Clean, bright interface optimized for accessibility
- **🎨 Modern Color Palette:** Fuchsia/Pink primary (#d946ef) with Blue secondary (#3b82f6)
- **✍️ Typography:** Inter + Poppins for friendly, modern feel
- **♿ Accessibility:** WCAG 2.1 AA compliant with high contrast
- **📱 Responsive Design:** Mobile-first approach
- **🎭 Component-Based:** Atomic Design methodology

[View Complete Design System →](docs/04-design-system/README.md)

## 📚 Documentation

### Comprehensive Guides

- **[Getting Started](docs/01-getting-started/README.md)** - Setup and installation
- **[Project Overview](docs/02-project-overview/README.md)** - Goals, features, roadmap
- **[Architecture](docs/03-architecture/README.md)** - System design and technical specs
- **[Design System](docs/04-design-system/README.md)** - UI components and design tokens
- **[User Experience](docs/05-user-experience/README.md)** - User flows and journeys
- **[Development Guides](docs/06-development/README.md)** - Frontend and backend development
- **[Deployment](docs/07-deployment/README.md)** - Deployment procedures
- **[Marketing](docs/08-marketing/README.md)** - Growth and viral strategies

### Multilingual Documentation

- **[한국어 README](README.ko.md)** - Korean documentation
- **[English README](README.en.md)** - English documentation
- **[日本語 README](README.ja.md)** - Japanese documentation

## 🗓️ Development Roadmap

### Phase 1: MVP (Months 1-3)

**Core Features**
- ✅ User authentication (Google OAuth)
- ✅ Survey generation and sharing
- ✅ Basic persona synthesis
- ✅ AI chat interface
- 🔄 Landing page and onboarding

**Goals:** Validate core concept, gather initial user feedback

### Phase 2: Enhancement (Months 4-6)

**Social & Visual Features**
- 📋 AI-generated persona illustrations
- 📋 Compatibility matching
- 📋 Public persona profiles
- 📋 Quest system and gamification
- 📋 Gender toggle feature

**Goals:** Increase engagement, enable viral sharing

### Phase 3: Scale (Months 7-12)

**Advanced Features**
- 📋 Premium persona packages
- 📋 Friend persona rental
- 📋 Detailed compatibility reports
- 📋 Group personas
- 📋 Advanced analytics dashboard
- 📋 Mobile app (React Native)

**Goals:** Monetization, scalability, market expansion

## 🎯 Project Objectives

1. **Primary Goal:** Create an engaging self-discovery experience through AI-powered social feedback
2. **Secondary Goals:**
   - Achieve viral growth through social sharing mechanics
   - Build a unique platform for AI-driven personality exploration
   - Establish sustainable monetization through premium features

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](docs/CONTRIBUTING.md) for details on:

- Code style and conventions
- Development workflow
- Pull request process
- Testing requirements

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation:** [docs/README.md](docs/README.md)
- **Issues:** [GitHub Issues](https://github.com/your-org/Re-MirAI/issues)
- **Email:** kordalek@naver.com

---

**Maintained by:** Re:MirAI Team  
**Last Updated:** 2025-11-23  
**Version:** 1.0.0

**Built with ❤️ for self-discovery and connection**
