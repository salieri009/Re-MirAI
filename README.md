# Re:MirAI

> **"다른 사람의 눈을 통해 자신을 발견하는 플랫폼"**
> **"A platform where you discover yourself through the eyes of others"**

**Project Type:** AI-Powered Personality Discovery Platform
**Status:** In Development (Phase 1: MVP)

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

# Start Frontend (Next.js)
cd frontend
npm run dev
# Client running at http://localhost:3000
```

---

## Architecture

### High-Level Diagram

```mermaid
graph TD
    Client[Client (Next.js)] -->|HTTPS| API[API Gateway (NestJS)]
    API -->|Auth| Auth[Google OAuth]
    API -->|Read/Write| DB[(PostgreSQL)]
    API -->|Generate| AI[OpenAI API]
```

### Core Components

#### Frontend (Next.js)
- **App Router:** Server Components for performance.
- **Design System:** Custom "Blonix" system (Light theme, Fuchsia/Pink).
- **State Management:** React Context + Hooks.

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
│   │   ├── components/# Reusable UI Components
│   │   └── lib/       # Utilities & API Clients
├── backend/           # NestJS API Server
│   ├── src/
│   │   ├── modules/   # Feature Modules (Auth, Survey, Persona)
│   │   └── prisma/    # Database Schema
├── docs/              # Project Documentation
│   ├── 01-concept/    # PRD & Concepts
│   ├── 02-project-overview/ # Features & Roadmap
│   ├── 03-planning/   # Technical Specs & UI/UX
│   ├── 07-Enhancement/# ver1 / ver2 enhancement packs
│   └── 08-Connectivity-and-Deployment/ # FE-BE connectivity & pipeline
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
- **Framework:** Next.js 14+
- **Language:** TypeScript
- **Styling:** CSS Modules (Blonix Design System)

### Backend
- **Framework:** NestJS
- **Database:** PostgreSQL
- **ORM:** Prisma

### AI & Cloud
- **LLM:** OpenAI GPT-4 / GPT-3.5
- **Image Gen:** DALL-E 3 (Planned)
- **Hosting:** Vercel (Frontend), Railway (Backend)

---

## Documentation

All detailed documentation is located in the `docs/` directory.

- **Product Requirements:** [PRD (Project Plan)](docs/01-concept/02-Project-Plan.md)
- **Technical Spec:** [Technical Specification](docs/03-planning/05-Technical-Specification.md)
- **Design System:** [Design Philosophy](docs/02-project-overview/03-Design-Philosophy.md)
- **Roadmap:** [Development Roadmap](docs/02-project-overview/04-Roadmap.md)
- **Feature Specs:** [Core Features Index](docs/02-project-overview/02-Core-Features.md)
- **Connectivity & Pipeline:**  
  - [Frontend ↔ Backend Connectivity Test Plan](docs/08-Connectivity-and-Deployment/01-Frontend-Backend-Connectivity-Test-Plan.md) — maps directly to F-001~F-006 requirements listed in `docs/02-project-overview/02-Core-Features.md`.  
  - [Pipeline Strategy](docs/08-Connectivity-and-Deployment/02-Pipeline-Strategy.md) — ensures rollouts follow the growth goals quoted in `docs/02-project-overview/01-Project-Goals.md` (“Create an engaging and shareable experience…”).

---

## Team & License

**Re:MirAI Team**
- **Contact:** kordalek@naver.com

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
