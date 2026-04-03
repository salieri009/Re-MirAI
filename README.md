# Re:MirAI

> **"다른 사람의 눈을 통해 자신을 발견하는 플랫폼"**
> **"A platform where you discover yourself through the eyes of others"**

![Status](https://img.shields.io/badge/status-in%20development-yellow)
![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-brightgreen?logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript&logoColor=white)

**Project Type:** AI-Powered Personality Discovery Platform  
**Status:** In Development (Phase 1: MVP - ver2 Design Complete)  
**Last Updated:** 2025-11-28

---

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- OpenAI API Key

### Installation

```bash
# Clone the repository
git clone https://github.com/salieri009/Re-MirAI.git
cd Re-MirAI

# Install dependencies (Frontend)
cd frontend
npm install

# Install dependencies (Backend)
cd ../backend
npm install
```

### Running Locally

```bash
# Start Backend (NestJS)
cd backend
npm run start:dev
# Server running at http://localhost:3000

# Start Frontend (Next.js) - in a separate terminal
cd frontend
npm run dev
# Client running at http://localhost:3001 (or next available port)
```

**Note:** Make sure PostgreSQL is running and `DATABASE_URL` is configured in `backend/.env`. For details, see [docs/README.md](docs/README.md).

---

## Architecture

### High-Level Diagram

```mermaid
graph TD
    Client["Client<br/>Next.js"] -->|HTTPS| API["API Gateway<br/>NestJS"]
    API -->|Auth| Auth["Google OAuth"]
    API -->|Read/Write| DB[("PostgreSQL")]
    API -->|Generate| AI["OpenAI API"]
```

### Core Components

#### Frontend (Next.js)
- **App Router:** Server Components for performance.
- **Design System:** ver2 "Digital Mirror" system (Dark theme, 3-color palette).
- **State Management:** React Context + Hooks, Zustand.

#### Backend (NestJS)
- **API:** RESTful endpoints for Surveys, Personas, and Chat.
- **Database:** Prisma ORM with PostgreSQL.
- **AI Service:** Integration with OpenAI GPT-4 for persona synthesis.

---

## Project Structure

```
Re-MirAI/
├── frontend/          # Next.js Application
│   ├── src/
│   │   ├── app/       # App Router Pages
│   │   ├── components/# Reusable UI Components (atoms, molecules, organisms)
│   │   ├── lib/       # Utilities & API Clients
│   │   └── styles/    # Global styles & design tokens
├── backend/           # NestJS API Server
│   ├── src/
│   │   ├── modules/   # Feature Modules (Auth, Survey, Persona, Chat)
│   │   ├── prisma/    # Database Schema & Migrations
│   │   └── main.ts    # Application entry point
│   └── prisma/
│       └── schema.prisma  # Prisma schema definition
├── docs/              # Project Documentation (minimal structure)
│   ├── PRD.md
│   ├── USER_FLOW.md
│   ├── FRONTEND_ARCHITECTURE.md
│   ├── BACKEND_ARCHITECTURE.md
│   ├── DATABASE_MODEL.md
│   ├── DESIGN_SYSTEM.md
│   └── api/
└── README.md          # This file
```

---

## Key Features

### Survey System (F-001)
- Create personalized "Survey" links.
- Collect anonymous feedback from friends.
- Real-time response tracking.

### Persona Synthesis (F-002)
- Transform feedback into a unique AI Persona.
- "Fated" (Automatic) or "Alchemic" (Guided) creation modes.
- Generates distinct personality traits and archetypes.

### AI Chat Interface (F-003)
- Chat with your synthesized persona.
- Context-aware responses based on survey data.
- Deepen the bond through interaction.

### Persona Card (F-004)
- Beautiful, shareable summary of your persona.
- Includes AI-generated illustration and key stats.
- Optimized for social media sharing.

---

## Tech Stack

### Frontend
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** CSS Modules + Tailwind CSS (ver2 Digital Mirror Design System)
- **Animations:** GSAP 3.x + Canvas API
- **State Management:** React Context + Hooks, Zustand (planned)

### Backend
- **Framework:** NestJS
- **Database:** PostgreSQL 15+
- **ORM:** Prisma
- **Authentication:** JWT (Access + Refresh tokens), Google OAuth 2.0
- **API:** RESTful endpoints with Swagger documentation

### AI & Cloud
- **LLM:** OpenAI GPT-4 / GPT-3.5
- **Image Gen:** DALL-E 3 (Planned)
- **Hosting:** Vercel (Frontend), Railway (Backend)

---

## Documentation

All detailed documentation is located in the `docs/` directory.

### Core Documentation

- **PRD:** [docs/PRD.md](docs/PRD.md)
- **User Flow:** [docs/USER_FLOW.md](docs/USER_FLOW.md)
- **Frontend Architecture:** [docs/FRONTEND_ARCHITECTURE.md](docs/FRONTEND_ARCHITECTURE.md)
- **Backend Architecture:** [docs/BACKEND_ARCHITECTURE.md](docs/BACKEND_ARCHITECTURE.md)
- **Database Model:** [docs/DATABASE_MODEL.md](docs/DATABASE_MODEL.md)
- **Design System:** [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md)

### API Documentation

- **API Index:** [docs/api/API_COMMON.md](docs/api/API_COMMON.md)
- **Auth:** [docs/api/API_AUTH.md](docs/api/API_AUTH.md)
- **Survey:** [docs/api/API_SURVEY.md](docs/api/API_SURVEY.md)
- **Persona:** [docs/api/API_PERSONA.md](docs/api/API_PERSONA.md)
- **Chat:** [docs/api/API_CHAT.md](docs/api/API_CHAT.md)
- **Social (Planned):** [docs/api/API_SOCIAL.md](docs/api/API_SOCIAL.md)
- **Gamification (Planned):** [docs/api/API_GAMIFICATION.md](docs/api/API_GAMIFICATION.md)

For complete documentation index, see [docs/README.md](docs/README.md).

---

## Team & License

**Re:MirAI Team**
- **Contact:** kordalek@naver.com
