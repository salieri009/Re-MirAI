# Technical Specification: Re:MirAI

**Version:** 1.0.0  
**Date:** 2025-11-24  
**Status:** Draft  

---

## 1. Introduction

This document outlines the technical architecture, data models, and implementation details for the Re:MirAI platform. It is intended for the development team to guide the implementation of the MVP and subsequent phases.

## 2. System Architecture

### 2.1. High-Level Diagram

```mermaid
graph TD
    Client[Client (Next.js)] -->|HTTPS| API[API Gateway (NestJS)]
    API -->|Auth| Auth[Google OAuth]
    API -->|Read/Write| DB[(PostgreSQL)]
    API -->|Generate| AI[OpenAI API]
    
    subgraph "Backend Services"
        API
        Auth
        Worker[Async Job Queue]
    end
```

### 2.2. Tech Stack

| Component | Technology | Version | Reasoning |
| :--- | :--- | :--- | :--- |
| **Frontend** | Next.js | 14+ (App Router) | SEO, Server Components, React Ecosystem. |
| **Backend** | NestJS | 10+ | Structured, scalable, TypeScript support. |
| **Database** | PostgreSQL | 15+ | Relational data integrity, JSONB support for flexible survey data. |
| **ORM** | Prisma | 5+ | Type-safe database access. |
| **AI** | OpenAI API | GPT-4o / 3.5 | Best-in-class reasoning for persona synthesis. |
| **Infra** | Vercel / Railway | - | Easy deployment, CI/CD integration. |

---

## 3. Data Models

### 3.1. Schema Overview (Prisma)

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  rituals   Ritual[]
  personas  Persona[]
}

model Ritual {
  id          String     @id @default(uuid())
  userId      String
  user        User       @relation(fields: [userId], references: [id])
  status      String     // "ACTIVE", "COMPLETED"
  responses   Response[]
  createdAt   DateTime   @default(now())
}

model Response {
  id        String   @id @default(uuid())
  ritualId  String
  ritual    Ritual   @relation(fields: [ritualId], references: [id])
  content   Json     // Encrypted answers
  createdAt DateTime @default(now())
}

model Persona {
  id          String   @id @default(uuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  name        String
  archetype   String
  systemPrompt String  @db.Text
  stats       Json     // { charisma: 80, kindness: 40 ... }
  createdAt   DateTime @default(now())
}
```

---

## 4. API Design

### 4.1. Core Endpoints

#### Auth
*   `POST /auth/google/login` - Exchange Google Token for JWT.
*   `POST /auth/refresh` - Refresh access token.

#### Rituals
*   `POST /rituals` - Create a new survey link.
*   `GET /rituals/:id` - Get public survey info (for respondents).
*   `POST /rituals/:id/responses` - Submit anonymous feedback.

#### Personas
*   `POST /personas/summon` - Trigger synthesis (requires Ritual completion).
*   `GET /personas` - List user's personas.
*   `GET /personas/:id` - Get details (stats, image).

#### Chat
*   `POST /chat/message` - Send message to Persona.
    *   **Body:** `{ personaId: "...", content: "Hello" }`
    *   **Response:** `{ content: "Hi there!", sentiment: "happy" }`

---

## 5. AI Implementation Details

### 5.1. Synthesis Pipeline
1.  **Aggregation:** Fetch all `Response` rows for a `Ritual`.
2.  **Analysis:** Use LLM to extract key traits and calculate stat scores (0-100).
3.  **Prompt Engineering:** Construct a system prompt based on the archetype.
    *   *Template:* "You are {Name}, a {Archetype} character. Your traits are {Stats}. You speak in a {Style} manner."

### 5.2. Chat Context Management
*   Store last 10-20 turns in Redis or Postgres.
*   Inject "Core Memories" (key facts from survey) into the system prompt to ensure consistency.

---

## 6. Security & Compliance

*   **Encryption:** All `Response.content` fields should be encrypted at rest if possible, or at least strictly access-controlled.
*   **Rate Limiting:** Implement ThrottlerGuard in NestJS to prevent API abuse.
*   **Sanitization:** All user inputs must be sanitized to prevent XSS and Injection attacks.
