# Technical Specification: Re:MirAI

**Version:** 1.1.0  
**Date:** 2025-11-25  
**Status:** Draft  

---

## 1. Introduction

This document outlines the technical architecture, data models, and implementation details for the Re:MirAI platform. It is intended for the development team to guide the implementation of the MVP and subsequent phases.

## 2. System Architecture

### 2.1. High-Level Diagram

```mermaid
graph TD
    Client[Client (Next.js)] -->|HTTPS| API[API Gateway (NestJS)]
    Client -->|WebSocket| Socket[Socket.io Gateway]
    API -->|Auth| Auth[Google OAuth]
    API -->|Read/Write| DB[(PostgreSQL)]
    API -->|Generate| AI[OpenAI API]
    API -->|Image| Satori[Vercel Satori]
    
    subgraph "Backend Services"
        API
        Socket
        Auth
        Worker[Async Job Queue]
    end
```

### 2.2. Tech Stack

| Component | Technology | Version | Reasoning |
| :--- | :--- | :--- | :--- |
| **Frontend** | Next.js | 14+ (App Router) | SEO, Server Components, React Ecosystem. |
| **Backend** | NestJS | 10+ | Structured, scalable, TypeScript support. |
| **Realtime** | Socket.io | 4+ | Robust WebSocket handling for Chat. |
| **Database** | PostgreSQL | 15+ | Relational data integrity, JSONB support for flexible survey data. |
| **ORM** | Prisma | 5+ | Type-safe database access. |
| **AI** | OpenAI API | GPT-4o / 3.5 | Best-in-class reasoning for persona synthesis. |
| **Image** | Satori | - | Fast, dynamic OG image generation for Persona Cards. |
| **Infra** | Vercel / Railway | - | Easy deployment, CI/CD integration. |

---

## 3. Data Models

### 3.1. Schema Overview (Prisma)

See [Database Schema](07-Database-Schema.md) for the full definition.

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  surveys   Survey[]
  personas  Persona[]
  wallet    Wallet?
}

model Survey {
  id          String     @id @default(uuid())
  userId      String
  status      String     // "ACTIVE", "COMPLETED"
  responses   Response[]
}

model Persona {
  id          String   @id @default(uuid())
  userId      String
  name        String
  archetype   String
  stats       Json     // { charisma: 80, kindness: 40 ... }
  modifiers   Json?    // { archetype: "TSUNDERE" }
}
```

---

## 4. API Design

### 4.1. Core Endpoints

#### Auth
*   `POST /v1/auth/google/login` - Exchange Google Token for JWT.

#### Surveys (F-001)
*   `POST /v1/surveys` - Create a new survey link.
*   `GET /v1/surveys/:id` - Get public survey info.
*   `POST /v1/surveys/:id/responses` - Submit anonymous feedback.

#### Personas (F-002)
*   `POST /v1/personas/synthesize` - Trigger synthesis (Fated/Alchemic).
*   `GET /v1/personas` - List user's personas.

#### Chat (F-003)
*   `WS /socket.io` - Realtime chat events (`chat:message`, `chat:response`).
*   `GET /v1/chats/:sessionId/history` - Get message history.

#### Social & Gamification (F-005, F-006)
*   `GET /v1/social/compatibility` - Check match score.
*   `POST /v1/quests/:id/claim` - Claim rewards.

---

## 5. AI Implementation Details

### 5.1. Synthesis Pipeline (F-002)
1.  **Aggregation:** Fetch all `Response` rows for a `Survey`.
2.  **Analysis:** Use LLM to extract key traits and calculate stat scores (0-100).
3.  **Prompt Engineering:** Construct a system prompt based on the archetype.
    *   *Template:* "You are {Name}, a {Archetype} character. Your traits are {Stats}. You speak in a {Style} manner."

### 5.2. Chat RAG Pipeline (F-003)
1.  **Embed:** Convert user message to vector.
2.  **Search:** Query past messages for context.
3.  **Generate:** Call LLM with augmented context + System Prompt.

---

## 6. Security & Compliance

*   **Encryption:** All `Response.content` fields should be encrypted at rest if possible.
*   **Rate Limiting:** Implement ThrottlerGuard in NestJS to prevent API abuse.
*   **Sanitization:** All user inputs must be sanitized to prevent XSS and Injection attacks.
*   **Transaction Safety:** All Gamification/Wallet operations must use ACID transactions.
