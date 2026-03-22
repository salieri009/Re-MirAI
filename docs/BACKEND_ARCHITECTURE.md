# Backend Development Plan

**Version:** 1.0.0  
**Last Updated:** 2025-11-25  
**Status:** Active  
**Audience:** Backend Developers, Tech Leads, DevOps Engineers

---

## Related Documentation

**📖 Before you start, read these documents:**

### Essential Context
- **[Navigation Guide](../00-NAVIGATION-GUIDE.md)** - How to read all documentation effectively
- **[API Specification](06-API-Specification.md)** - All endpoints you'll implement
- **[Database Schema](07-Database-Schema.md)** - Complete data model
- **[Technical Specification](05-Technical-Specification.md)** - System architecture overview

### Feature Specifications (Read for each phase)
- **[F-001: Survey System](../02-project-overview/features/F-001-Survey-System.typ)** - Survey CRUD & anonymity (Week 2-3)
- **[F-002: Persona Synthesis](../02-project-overview/features/F-002-Persona-Synthesis.typ)** - LLM integration (Week 4)
- **[F-003: Chat Interface](../02-project-overview/features/F-003-Chat-Interface.typ)** - WebSocket & AI chat (Week 5)
- **[F-004: Persona Card](../02-project-overview/features/F-004-Persona-Card.typ)** - Image generation (Week 6)
- **[F-005: Social Features](../02-project-overview/features/F-005-Social-Features.typ)** - Compatibility logic (Week 7)
- **[F-006: Gamification](../02-project-overview/features/F-006-Gamification.typ)** - Quest system (Week 7-8)

### Frontend Coordination
- **[Frontend Development Plan](09-Frontend-Development-Plan.md)** - What frontend expects from your APIs
- **[User Experience Flows](../04-user-experience/02-User-Experience-Flows.md)** - End-to-end flow context

### DevOps Setup
- **[Environment Config](08-Environment-Config.md)** - All environment variables and secrets
- **[CI/CD Pipeline](08-Environment-Config.md#cicd-configuration)** - Deployment automation

---

## Document Purpose

This plan guides the backend development of Re:MirAI's API and services. This document outlines:

- What technologies we'll use and why
- How to structure the codebase
- What to build in each development phase
- How to integrate with external services (OpenAI, Google OAuth)
- How to ensure performance and security

**Expected timeline:** 8 weeks from project kickoff to production deployment

---

## Quick Start for Developers

**👉 Ready to start coding? Follow this path:**

### Day 1: Setup & Context (3 hours)
1. Read **[API Specification](06-API-Specification.md)** - All endpoints overview
2. Review **[Database Schema](07-Database-Schema.md)** - Understand data model
3. Check **[Environment Config](08-Environment-Config.md)** - Set up `.env` file
4. Jump to **[Phase 1: Foundation Setup](#phase-1-foundation-setup-week-1)** below

### Day 2: First Endpoint (4 hours)
1. Review **[F-001 Survey System](../02-project-overview/features/F-001-Survey-System.typ)** - First feature
2. Check **[API Spec: Survey Endpoints](06-API-Specification.md#survey-endpoints)** - Exact requirements
3. Start coding (see Phase 1 checklist)

### First Week Goal: Working authentication + first CRUD endpoint

---

## 1. Technology Stack

### Why These Choices Matter

We selected technologies that prioritize:
- **Type safety**: Catch errors before deployment
- **Scalability**: Handle growth from 100 to 100,000+ users
- **Developer productivity**: Fast development with fewer bugs
- **AI integration**: Seamless LLM and vector database support

### Core Technologies

#### Framework: NestJS
**What it is:** A progressive Node.js framework for building server-side applications  
**Why we chose it:**
- Built-in TypeScript support (type safety)
- Modular architecture (easy to organize code by feature)
- Dependency injection (testable code)
- Excellent documentation and ecosystem
- Native WebSocket support (for chat feature)

#### Database: PostgreSQL 15+
**What it is:** An open-source relational database  
**Why we chose it:**
- ACID compliance (data integrity)
- JSON support (flexible schema where needed)
- Full-text search (for quest descriptions, persona traits)
- Excellent performance for our data model
- `pgcrypto` extension for encryption (survey responses)

#### ORM: Prisma
**What it is:** Next-generation ORM for Node.js and TypeScript  
**Why we chose it:**
- Type-safe database queries (no SQL injection)
- Automatic migrations (schema changes)
- Amazing developer experience (autocomplete everywhere)
- Visual database browser (Prisma Studio)

#### Authentication: Passport.js + JWT
**What it is:** Authentication middleware for Node.js  
**Why we chose it:**
- Google OAuth strategy built-in
- JWT tokens for stateless authentication
- Widely used (proven security)
- Works seamlessly with NestJS

#### AI Integration: OpenAI API
**What it is:** LLM API for persona synthesis  
**Why we chose it:**
- GPT-4 for high-quality persona generation
- Consistent API (easy to integrate)
- Fast response times (<10s for most requests)
- Good cost/performance ratio

#### Real-time: Socket.io
**What it is:** WebSocket library for real-time communication  
**Why we chose it:**
- Automatic fallback to polling (works everywhere)
- Room support (chat sessions)
- Easy integration with NestJS
- Built-in reconnection logic

---

## 2. Project Structure

### How Code is Organized

We follow **Domain-Driven Design** principles, organizing by feature:

```
backend/
├── src/
│   ├── main.ts                  # Application entry point
│   ├── app.module.ts            # Root module
│   │
│   ├── modules/                 # Feature modules
│   │   ├── auth/
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── strategies/
│   │   │   │   ├── jwt.strategy.ts
│   │   │   │   └── google.strategy.ts
│   │   │   └── guards/
│   │   │       └── jwt-auth.guard.ts
│   │   │
│   │   ├── survey/              # F-001: Survey System
│   │   │   ├── survey.module.ts
│   │   │   ├── survey.service.ts
│   │   │   ├── survey.controller.ts
│   │   │   ├── dto/
│   │   │   │   ├── create-survey.dto.ts
│   │   │   │   └── submit-response.dto.ts
│   │   │   └── entities/
│   │   │       ├── survey.entity.ts
│   │   │       └── survey-response.entity.ts
│   │   │
│   │   ├── persona/             # F-002: Persona Synthesis
│   │   │   ├── persona.module.ts
│   │   │   ├── persona.service.ts
│   │   │   ├── persona.controller.ts
│   │   │   ├── synthesis/
│   │   │   │   ├── synthesis.service.ts
│   │   │   │   └── llm.service.ts
│   │   │   └── dto/
│   │   │       └── synthesize-persona.dto.ts
│   │   │
│   │   ├── chat/                # F-003: Chat Interface
│   │   │   ├── chat.module.ts
│   │   │   ├── chat.gateway.ts  # WebSocket
│   │   │   ├── chat.service.ts
│   │   │   └── dto/
│   │   │       └── send-message.dto.ts
│   │   │
│   │   ├── social/              # F-005: Social Features
│   │   │   ├── social.module.ts
│   │   │   ├── compatibility.service.ts
│   │   │   └── social.controller.ts
│   │   │
│   │   └── gamification/        # F-006: Quests & Rewards
│   │       ├── gamification.module.ts
│   │       ├── quest.service.ts
│   │       ├── quest.controller.ts
│   │       └── dto/
│   │           └── claim-reward.dto.ts
│   │
│   ├── common/                  # Shared code
│   │   ├── decorators/
│   │   ├── filters/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── pipes/
│   │
│   ├── config/                  # Configuration
│   │   ├── database.config.ts
│   │   ├── openai.config.ts
│   │   └── jwt.config.ts
│   │
│   └── prisma/                  # Database
│       ├── schema.prisma
│       └── migrations/
│
├── test/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
└── docker/
    ├── Dockerfile
    └── docker-compose.yml
```

### Why This Structure?

- **Feature modules**: Each module is self-contained and testable
- **Clear separation**: Easy to find code related to specific features
- **Scalable**: New features fit naturally
- **Testable**: Each module can be tested in isolation

---

## Backend-Frontend Coordination

**Important:** Backend must deliver working APIs 1 week before frontend integration.

### Timeline Coordination with Frontend

| Week | Backend Deliverable | Frontend Consumes | Why 1 Week Lead? |
|------|---------------------|-------------------|------------------|
| Week 1 | Auth APIs (Google OAuth, JWT) | Week 2: Login page | Frontend needs auth before any protected routes |
| Week 2-3 | Survey CRUD + Response APIs | Week 3-4: Survey UI | Frontend needs endpoints to build forms |
| Week 4 | Persona synthesis API | Week 5: Persona reveal | Frontend needs working AI before building reveal animation |
| Week 5 | WebSocket chat | Week 6: Chat UI | Frontend needs real-time connection before chat interface |
| Week 6 | Card generation API | Week 7: Sharing features | Frontend needs image URLs for share functionality |
| Week 7-8 | Social + Quest APIs | Week 7-8: Social UI | Concurrent development, daily integration testing |

**Buffer:** 1-week lead gives frontend time to integrate without blocking on API delays.

**Communication Channels:**
- **Daily standups:** Sync on API readiness and integration blockers
- **API changelog:** Document all endpoint changes in Slack #api-changes
- **Integration tests:** Run end-to-end tests before marking APIs "ready"

**API Readiness Checklist:**
- [ ] Endpoint implemented and tested
- [ ] API Specification updated
- [ ] Postman collection updated
- [ ] Frontend team notified in standup

---

## 3. Development Phases

### Overview: 8-Week Timeline

```
Week 1: Foundation → Week 2-3: Survey → Week 4: AI → Week 5: Chat → Week 6-8: Social
```

**Note:** All APIs must be delivered 1 week before frontend integration (see coordination table above)

---

### Phase 1: Foundation Setup (Week 1)

**Goal:** Set up project infrastructure, database, and authentication

#### Steps:

**1. Initialize NestJS Project**
```bash
# Install NestJS CLI
npm i -g @nestjs/cli

# Create project
nest new backend --package-manager npm

# Install core dependencies
npm install @nestjs/config @nestjs/passport passport passport-jwt
npm install @prisma/client
npm install -D prisma

# Install dev dependencies
npm install -D @types/passport-jwt
```

**2. Set Up Database**

Create `prisma/schema.prisma`:
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  googleId  String?  @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  surveys   Survey[]
  personas  Persona[]
}

// More models defined in Week 2-3
```

Initialize database:
```bash
# Create migration
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate
```

**3. Implement Authentication (Google OAuth + JWT)**

Aligns with **API Spec: Authentication section**

```typescript
// modules/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateGoogleUser(profile: any) {
    // Find or create user
    let user = await this.prisma.user.findUnique({
      where: { googleId: profile.id }
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          googleId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
        }
      });
    }

    return user;
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email };
    
    // Generate access token (1 hour expiry)
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1h'
    });
    
    // Generate refresh token (7 days expiry)
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d'
    });
    
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: 3600, // 1 hour in seconds
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      }
    };
  }
  
  async refreshAccessToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET
      });
      
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub }
      });
      
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      
      return this.login(user);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
```

**Week 1 Deliverables:**
- ✅ Working NestJS application
- ✅ PostgreSQL database connected
- ✅ Prisma ORM configured
- ✅ Google OAuth login working
- ✅ JWT authentication protecting routes
- ✅ Basic health check endpoint (`GET /health`)

---

### Phase 2: Survey System (Week 2-3)

**Goal:** Implement complete survey CRUD and anonymous response system

**Aligns with Feature F-001:**
- FR-001.1: Generate unique URLs
- FR-001.2: 10-15 personality questions
- FR-001.3: No account required for respondents
- FR-001.4: Minimum 3 responses threshold
- NFR-001.1: Complete anonymity
- NFR-001.2: < 1s response time

#### Week 2: Survey Creation

**Database Schema:**
```prisma
model Survey {
  id         String   @id @default(uuid())
  userId     String
  status     String   @default("ACTIVE") // ACTIVE, COMPLETED, EXPIRED
  createdAt  DateTime @default(now())
  expiresAt  DateTime @default(dbgenerated("NOW() + INTERVAL '30 days'"))
  
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  responses  SurveyResponse[]
  
  @@index([userId])
  @@index([status])
}

model SurveyResponse {
  id              String   @id @default(uuid())
  surveyId        String
  answers         Json     // Encrypted answers
  fingerprintHash String
  submittedAt     DateTime @default(now())
  
  survey          Survey   @relation(fields: [surveyId], references: [id], onDelete: Cascade)
  
  @@index([surveyId])
}

// Anonymity protection (24-hour TTL)
model AnonymityCheck {
  surveyId        String
  ipHash          String
  fingerprintHash String
  createdAt       DateTime @default(now())
  expiresAt       DateTime @default(dbgenerated("NOW() + INTERVAL '24 hours'"))
  
  @@id([surveyId, ipHash, fingerprintHash])
  @@index([expiresAt])
}
```

**API Implementation:**
```typescript
// modules/survey/survey.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class SurveyService {
  constructor(private prisma: PrismaService) {}

  // FR-001.1: Generate unique, shareable URL
  async create(userId: string) {
    const survey = await this.prisma.survey.create({
      data: {
        userId,
        status: 'ACTIVE'
      }
    });

    return {
      id: survey.id,
      url: `${process.env.FRONTEND_URL}/s/${survey.id}`,
      status: survey.status,
      createdAt: survey.createdAt,
      expiresAt: survey.expiresAt
    };
  }

  // Get survey with progress
  async getSurveyWithProgress(id: string) {
    const survey = await this.prisma.survey.findUnique({
      where: { id },
      include: {
        _count: {
          select: { responses: true }
        }
      }
    });

    // FR-001.4: Check if threshold met
    const isUnlocked = survey._count.responses >= 3;

    return {
      ...survey,
      responseCount: survey._count.responses,
      isUnlocked
    };
  }
}
```

#### Week 3: Anonymous Response Submission

**Anonymity Service:**
```typescript
// modules/survey/anonymity.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as crypto from 'crypto';

@Injectable()
export class AnonymityService {
  constructor(private prisma: PrismaService) {}

  // NFR-001.1: Ensure complete anonymity
  async checkAndRecordSubmission(
    surveyId: string,
    ipAddress: string,
    fingerprint: string
  ): Promise<boolean> {
    // Hash IP and fingerprint
    const ipHash = this.hashWithSalt(ipAddress, surveyId);
    const fingerprintHash = this.hashWithSalt(fingerprint, surveyId);

    // Check if already submitted (24-hour window)
    const existing = await this.prisma.anonymityCheck.findUnique({
      where: {
        surveyId_ipHash_fingerprintHash: {
          surveyId,
          ipHash,
          fingerprintHash
        }
      }
    });

    if (existing) {
      throw new BadRequestException('You have already submitted a response');
    }

    // Record submission
    await this.prisma.anonymityCheck.create({
      data: {
        surveyId,
        ipHash,
        fingerprintHash
      }
    });

    return true;
  }

  private hashWithSalt(value: string, salt: string): string {
    return crypto
      .createHmac('sha256', salt)
      .update(value)
      .digest('hex');
  }
}
```

**Response Submission:**
```typescript
// modules/survey/survey.controller.ts
@Controller('v1/surveys')
export class SurveyController {
  constructor(
    private surveyService: SurveyService,
    private anonymityService: AnonymityService
  ) {}

  // FR-001.3: Submit without account
  @Post(':id/responses')
  @HttpCode(201)
  async submitResponse(
    @Param('id') surveyId: string,
    @Body() dto: SubmitResponseDto,
    @Ip() ipAddress: string,
    @Headers('x-fingerprint') fingerprint: string
  ) {
    // Check anonymity
    await this.anonymityService.checkAndRecordSubmission(
      surveyId,
      ipAddress,
      fingerprint
    );

    // Encrypt answers
    const encryptedAnswers = this.encryptAnswers(dto.answers);

    // Save response
    const response = await this.surveyService.createResponse(
      surveyId,
      encryptedAnswers,
      fingerprint
    );

    return {
      success: true,
      message: 'Response submitted successfully'
    };
  }
}
```

**Week 2-3 Deliverables:**
- ✅ Survey CRUD endpoints
- ✅ Anonymous response submission
- ✅ IP/fingerprint hashing for anonymity
- ✅ Response encryption (pgcrypto)
- ✅ 3-response threshold logic
- ✅ All F-001 requirements met

---

### Phase 3: Persona Synthesis (Week 4)

**Goal:** Implement AI-powered persona generation using OpenAI

**Aligns with Feature F-002:**
- FR-002.1: Aggregate scores from responses
- FR-002.2: LLM analysis of text responses
- FR-002.3: Assign archetype
- FR-002.4: Generate system prompt
- NFR-002.1: < 60s generation time
- NFR-002.2: > 99% success rate

#### LLM Integration Service

```typescript
// modules/persona/synthesis/llm.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class LLMService {
  private openai: OpenAI;

  constructor(private config: ConfigService) {
    this.openai = new OpenAI({
      apiKey: config.get('OPENAI_API_KEY')
    });
  }

  // FR-002.2: Analyze text responses WITH RETRY LOGIC
  async synthesizePersona(surveyData: any) {
    const prompt = this.buildSynthesisPrompt(surveyData);

    // Retry with exponential backoff for reliability
    return await this.retryWithBackoff(async () => {
      const completion = await Promise.race([
        this.openai.chat.completions.create({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: 'You are an expert psychologist and character writer.' },
            { role: 'user', content: prompt }
          ],
          response_format: { type: 'json_object' },
          temperature: 0.7
        }),
        // NFR-002.1: 60-second timeout
        this.timeout(60000)
      ]);

      return JSON.parse(completion.choices[0].message.content);
    }, 3); // Max 3 retries
  }

  // Exponential backoff retry utility
  private async retryWithBackoff<T>(
    fn: () => Promise<T>,
    maxRetries = 3,
    baseDelay = 1000
  ): Promise<T> {
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await fn();
      } catch (error) {
        if (i === maxRetries - 1) {
          // Last attempt failed
          throw new Error(`LLM synthesis failed after ${maxRetries} attempts: ${error.message}`);
        }
        
        // Wait before retry (exponential backoff: 1s, 2s, 4s)
        const delay = baseDelay * Math.pow(2, i);
        console.log(`LLM attempt ${i + 1} failed, retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  private buildSynthesisPrompt(data: any): string {
    return `
Analyze the following survey responses and create a persona:

Survey Data:
${JSON.stringify(data, null, 2)}

Output a JSON object with:
{
  "name": "string (creative name reflecting personality)",
  "archetype": "string (choose from: Yandere, Kuudere, Tsundere, Genki, etc.)",
  "stats": {
    "charisma": 0-100,
    "intellect": 0-100,
    "kindness": 0-100,
    "energy": 0-100
  },
  "systemPrompt": "string (personality instruction for chat)",
  "greeting": "string (first message to user)"
}
    `.trim();
  }

  private timeout(ms: number): Promise<never> {
    return new Promise((_, reject) =>
      setTimeout(() => reject(new Error('LLM timeout')), ms)
    );
  }
}
```

#### Persona Synthesis Service

```typescript
// modules/persona/synthesis/synthesis.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { LLMService } from './llm.service';

@Injectable()
export class SynthesisService {
  constructor(
    private prisma: PrismaService,
    private llm: LLMService
  ) {}

  async synthesizeFromSurvey(surveyId: string, userId: string) {
    // FR-002.1: Aggregate numerical scores
    const responses = await this.prisma.surveyResponse.findMany({
      where: { surveyId }
    });

    const aggregatedData = this.aggregateResponses(responses);

    // FR-002.2 & FR-002.3: LLM analysis and archetype selection
    const personaData = await this.llm.synthesizePersona(aggregatedData);

    // FR-002.4: Save with generated system prompt
    const persona = await this.prisma.persona.create({
      data: {
        userId,
        surveyId,
        name: personaData.name,
        archetype: personaData.archetype,
        statCharisma: personaData.stats.charisma,
        statIntellect: personaData.stats.intellect,
        statKindness: personaData.stats.kindness,
        statEnergy: personaData.stats.energy,
        systemPrompt: personaData.systemPrompt,
        greetingMessage: personaData.greeting
      }
    });

    return persona;
  }

  private aggregateResponses(responses: any[]): any {
    // Calculate average scores, extract text answers
    // Implementation details...
    return {
      averageScores: {},
      textResponses: [],
      responseCount: responses.length
    };
  }
}
```

**Week 4 Deliverables:**
- ✅ OpenAI integration
- ✅ Persona synthesis endpoint
- ✅ Archetype assignment logic
- ✅ System prompt generation
- ✅ Error handling with retries
- ✅ All F-002 requirements met

---

### Phase 4: Chat Interface (Week 5)

**Goal:** Implement real-time WebSocket chat with AI persona

**Aligns with Feature F-003:**
- FR-003.1: Real-time chat interface
- FR-003.2: Responses match archetype
- FR-003.3: Maintain 10-turn context
- FR-003.4: Track bond level
- NFR-003.1: < 3s response time
- NFR-003.2: 99.9% uptime

#### WebSocket Gateway

```typescript
// modules/chat/chat.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private chatService: ChatService) {}

  async handleConnection(client: Socket) {
    try {
      // Authenticate socket connection
      const user = await this.validateToken(client.handshake.auth.token);
      client.data.user = user;
      console.log(`Client connected: ${client.id}, User: ${user.email}`);
    } catch (error) {
      console.error(`Auth failed for client ${client.id}:`, error.message);
      client.disconnect(); // Force disconnect on auth failure
      return;
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // FR-003.1: Real-time message handling
  @SubscribeMessage('sendMessage')
  async handleMessage(client: Socket, payload: any) {
    const { personaId, message } = payload;
    const userId = client.data.user.id;

    // Save user message
    await this.chatService.saveMessage({
      personaId,
      userId,
      content: message,
      sender: 'user'
    });

    // Get AI response (FR-003.2: Match archetype)
    const response = await this.chatService.getAIResponse(
      personaId,
      message,
      userId
    );

    // Send to client
    client.emit('message', {
      content: response.content,
      sender: 'ai',
      timestamp: new Date()
    });

    // FR-003.4: Update bond level
    await this.chatService.updateBondLevel(personaId, userId);
  }
}
```

#### Chat Service with Context

```typescript
// modules/chat/chat.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import OpenAI from 'openai';

@Injectable()
export class ChatService {
  private openai: OpenAI;

  constructor(private prisma: PrismaService) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }

  async getAIResponse(personaId: string, message: string, userId: string) {
    // Get persona with system prompt
    const persona = await this.prisma.persona.findUnique({
      where: { id: personaId }
    });

    // FR-003.3: Load last 10 turns of context
    const history = await this.prisma.chatMessage.findMany({
      where: { personaId, userId },
      orderBy: { createdAt: 'desc' },
      take: 20 // 10 turns = 20 messages (user + AI)
    });

    // Build message array for OpenAI
    const messages = [
      { role: 'system', content: persona.systemPrompt },
      ...history.reverse().map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    // NFR-003.1: Must respond within 3 seconds
    const completion = await Promise.race([
      this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo', // Faster than GPT-4
        messages,
        max_tokens: 150,
        temperature: 0.8
      }),
      this.timeout(3000)
    ]);

    const aiMessage = completion.choices[0].message.content;

    // Save AI response
    await this.prisma.chatMessage.create({
      data: {
        personaId,
        userId,
        content: aiMessage,
        sender: 'ai'
      }
    });

    return { content: aiMessage };
  }

  // FR-003.4: Track bond level
  async updateBondLevel(personaId: string, userId: string) {
    await this.prisma.persona.update({
      where: { id: personaId },
      data: {
        bondLevel: {
          increment: 1
        }
      }
    });
  }
}
```

**Week 5 Deliverables:**
- ✅ WebSocket gateway
- ✅ Real-time messaging
- ✅ AI context management (10 turns)
- ✅ Bond level tracking
- ✅ Response time optimization
- ✅ All F-003 requirements met

---

### Phase 5: Social Features & Gamification (Week 6-8)

**Goal:** Persona cards, compatibility, and quest system

#### Week 6: Persona Card Generation (F-004)

```typescript
// modules/persona/card/card.service.ts
import { Injectable } from '@nestjs/common';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import QRCode from 'qrcode';
import { readFile } from 'fs/promises';

@Injectable()
export class CardService {
  constructor(private prisma: PrismaService) {}

  async generateCard(personaId: string, theme: string = 'default') {
    const persona = await this.prisma.persona.findUnique({
      where: { id: personaId },
      include: { user: true }
    });

    // FR-004.1: Generate 1080x1080 image
    const cardImage = await this.renderCard(persona, theme);

    // Save to S3 or CDN
    const url = await this.uploadToStorage(cardImage, personaId);

    return { url, size: '1080x1080' };
  }

  private async renderCard(persona: any, theme: string): Promise<Buffer> {
    // FR-004.2: Generate QR code
    const qrDataUrl = await QRCode.toDataURL(
      `${process.env.FRONTEND_URL}/p/${persona.id}`,
      { errorCorrectionLevel: 'H', width: 200 }
    );

    // Load font
    const fontData = await readFile('./assets/fonts/Inter-Bold.ttf');

    // FR-004.2: Render card with Satori
    const svg = await satori(
      {
        type: 'div',
        props: {
          style: {
            width: '1080px',
            height: '1080px',
            display: 'flex',
            flexDirection: 'column',
            background: this.getThemeGradient(theme),
            padding: '60px',
            fontFamily: 'Inter',
            color: '#ffffff'
          },
          children: [
            // Persona Name
            {
              type: 'h1',
              props: {
                style: { fontSize: '72px', marginBottom: '20px' },
                children: persona.name
              }
            },
            // Archetype
            {
              type: 'p',
              props: {
                style: { fontSize: '32px', opacity: 0.9, marginBottom: '40px' },
                children: persona.archetype
              }
            },
            // Stats Radar Chart (simplified as bars for Satori)
            {
              type: 'div',
              props: {
                style: { display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' },
                children: this.renderStats(persona.stats)
              }
            },
            // QR Code
            {
              type: 'img',
              props: {
                src: qrDataUrl,
                style: { width: '200px', height: '200px', marginTop: 'auto' }
              }
            }
          ]
        }
      },
      {
        width: 1080,
        height: 1080,
        fonts: [{
          name: 'Inter',
          data: fontData,
          weight: 700,
          style: 'normal'
        }]
      }
    );

    // Convert SVG to PNG using Resvg
    const resvg = new Resvg(svg);
    const pngData = resvg.render();
    return pngData.asPng();
  }

  private getThemeGradient(theme: string): string {
    const themes = {
      default: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      dark: 'linear-gradient(135deg, #1e1e1e 0%, #000000 100%)',
      neon: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      pastel: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    };
    return themes[theme] || themes.default;
  }

  private renderStats(stats: any) {
    const statNames = ['Charisma', 'Intellect', 'Kindness', 'Energy'];
    const statKeys = ['charisma', 'intellect', 'kindness', 'energy'];
    
    return statKeys.map((key, i) => ({
      type: 'div',
      props: {
        style: { display: 'flex', alignItems: 'center', gap: '16px' },
        children: [
          { type: 'span', props: { style: { width: '120px' }, children: statNames[i] } },
          {
            type: 'div',
            props: {
              style: {
                width: `${stats[key] * 6}px`,
                height: '24px',
                background: '#ffffff',
                borderRadius: '12px'
              }
            }
          },
          { type: 'span', props: { children: stats[key] } }
        ]
      }
    }));
  }

  private async uploadToStorage(imageBuffer: Buffer, personaId: string): Promise<string> {
    // Upload to S3 or equivalent
    const key = `cards/${personaId}.png`;
    // AWS S3 upload logic here
    return `${process.env.CDN_URL}/${key}`;
  }
}
```

**Dependencies to install:**
```bash
npm install satori @resvg/resvg-js qrcode
npm install -D @types/qrcode
```

**Week 6 Deliverables:**
    const url = await this.uploadToS3(cardImage);

    return { url };
  }

  private async renderCard(persona: any): Promise<Buffer> {
    // Using sharp or Satori for image generation
    // Include: Name, Archetype, Stats radar chart, QR code
@Injectable()
export class QuestService {
  // FR-006.1: Track quest progress
  async checkQuestProgress(userId: string, questId: string) {
    const quest = await this.prisma.quest.findUnique({
      where: { id: questId }
    });

    const progress = await this.getUserProgress(userId, quest);

    if (progress >= quest.requirement) {
      // Auto-complete
      await this.completeQuest(userId, questId);
    }

    return { progress, requirement: quest.requirement };
  }

  // FR-006.2: Award currency
  async completeQuest(userId: string, questId: string) {
    const quest = await this.prisma.quest.findUnique({
      where: { id: questId }
    });

    // Award Memory Crystals
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        memoryCrystals: {
          increment: quest.reward
        }
      }
    });

    // Mark quest complete
    await this.prisma.userQuest.create({
      data: {
        userId,
        questId,
        completedAt: new Date()
      }
    });

    return { reward: quest.reward };
  }
}
```

---

## 4. Testing Strategy

### Why Testing Matters for Backend

Backend bugs can cause:
- Data loss
- Security vulnerabilities
- Service downtime
- Incorrect billing

We use three testing layers:

### Unit Tests (Jest)

**Test individual services:**
```typescript
// modules/survey/survey.service.spec.ts
describe('SurveyService', () => {
  let service: SurveyService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [SurveyService, PrismaService]
    }).compile();

    service = module.get<SurveyService>(SurveyService);
  });

  it('should create survey with unique ID', async () => {
    const survey = await service.create('user-123');
    expect(survey.id).toBeDefined();
    expect(survey.url).toContain('/s/');
  });

  it('should enforce 3-response threshold', async () => {
    const survey = await service.getSurveyWithProgress('survey-123');
    expect(survey.isUnlocked).toBe(survey.responseCount >= 3);
  });
});
```

### Integration Tests

**Test database operations:**
```typescript
// modules/survey/survey.integration.spec.ts
describe('Survey Integration', () => {
  it('should create survey and submit responses', async () => {
    // Create survey
    const survey = await surveyService.create('user-123');

    // Submit 3 responses
    for (let i = 0; i < 3; i++) {
      await surveyService.createResponse(survey.id, {}, `fp-${i}`);
    }

    // Check unlock status
    const updated = await surveyService.getSurveyWithProgress(survey.id);
    expect(updated.isUnlocked).toBe(true);
  });
});
```

### E2E Tests (Supertest)

**Test complete API flows:**
```typescript
// test/e2e/survey-flow.e2e.spec.ts
describe('Survey Flow (e2e)', () => {
  it('complete survey creation and response', async () => {
    // Login
    const loginRes = await request(app.getHttpServer())
      .post('/v1/auth/google/callback')
      .send({ token: 'mock-token' });

    const token = loginRes.body.access_token;

    // Create survey
    const surveyRes = await request(app.getHttpServer())
      .post('/v1/surveys')
      .set('Authorization', `Bearer ${token}`)
      .expect(201);

    const surveyId = surveyRes.body.id;

    // Submit response (no auth required)
    await request(app.getHttpServer())
      .post(`/v1/surveys/${surveyId}/responses`)
      .send({ answers: { q1: 5, q2: 4 } })
      .expect(201);
  });
});
```

---

## 5. Performance Optimization

### Database Performance

**1. Proper Indexing**
```prisma
model Survey {
  id        String   @id @default(uuid())
  userId    String
  status    String
  
  @@index([userId])      // Fast user survey lookups
  @@index([status])      // Fast active survey queries
  @@index([createdAt])   // Fast chronological sorting
}
```

**2. Query Optimization**
```typescript
// Bad: N+1 query problem
const surveys = await prisma.survey.findMany();
for (const survey of surveys) {
  const count = await prisma.surveyResponse.count({ where: { surveyId: survey.id }});
}

// Good: Single query with aggregation
const surveys = await prisma.survey.findMany({
  include: {
    _count: {
      select: { responses: true }
    }
  }
});
```

**3. Caching Strategy**

Use Redis for frequently accessed data:
```typescript
// modules/cache/cache.service.ts
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class CacheService {
  private redis: Redis;

  constructor() {
    this.redis = new Redis(process.env.REDIS_URL);
  }

  async cachePersona(id: string, data: any) {
    // Cache for 5 minutes
    await this.redis.setex(`persona:${id}`, 300, JSON.stringify(data));
  }

  async getPersona(id: string) {
    const cached = await this.redis.get(`persona:${id}`);
    return cached ? JSON.parse(cached) : null;
  }
}
```

### API Response Time

**Target:** 95% of requests under 200ms

**Strategies:**
- Database connection pooling
- Response compression (gzip)
- Pagination for list endpoints
- Lazy loading for heavy fields

---

## 6. Deployment

### Environments

| Environment | Purpose | Database | URL |
|-------------|---------|----------|-----|
| Development | Local testing | Local PostgreSQL | localhost:3000 |
| Staging | QA testing | RDS Staging | api-staging.remirai.app |
| Production | Live users | RDS Production | api.remirai.app |

### Docker Configuration

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD ["node", "dist/main.js"]
```

### CI/CD Pipeline

```yaml
# .github/workflows/deploy-backend.yml
name: Deploy Backend
on:
  push:
    branches: [main]

jobs:
  test-and-deploy:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run Prisma migrations
        run: npx prisma migrate deploy
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
      
      - name: Deploy to AWS ECS
        run: |
          # Build and push Docker image
          # Update ECS service
```

---

## 7. Development Priorities

### P0 (MVP - Week 1-4)
- Authentication (Google OAuth + JWT)
- Survey CRUD (F-001)
- Anonymous response submission
- Persona synthesis (F-002)

### P1 (Post-MVP - Week 5-6)
- Chat interface (F-003)
- WebSocket messaging
- Persona card generation (F-004)

### P2 (Phase 2 - Week 7-8)
- Social features (F-005)
- Quest system (F-006)
- Daily rewards

---

## 8. Risk Management

### Technical Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| **OpenAI API downtime** | High | Implement retry logic, queue system, fallback responses |
| **Database connection exhaustion** | High | Connection pooling (max 20), connection timeout monitoring |
| **Memory leaks in WebSocket** | Medium | Proper cleanup on disconnect, memory profiling |
| **Data encryption failure** | High | Dual encryption (pgcrypto + app-level), regular audits |

### Security Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| **SQL injection** | Critical | Use Prisma (parameterized queries only) |
| **JWT token theft** | High | Short expiry (1 hour), refresh tokens, HTTPS only |
| **Rate limiting bypass** | Medium | Implement Redis-based rate limiter |
| **PII leakage** | Critical | Hash all IPs, never log sensitive data, audit logs |

---

## Key Takeaways

### What You Should Remember

1. **8-week timeline** across 5 phases
2. **Feature-first architecture** (one module per feature)
3. **Type safety** throughout (Prisma + TypeScript)
4. **Anonymity is critical** (hashing, encryption, no PII logs)
5. **Performance targets**: < 200ms API, < 3s AI responses
6. **Test coverage**: Unit + Integration + E2E

### Next Steps

**Week 1 checklist:**
1. Run `nest new backend` to initialize
2. Set up PostgreSQL database
3. Configure Prisma schema
4. Implement Google OAuth
5. Deploy first endpoint to staging

### Success Metrics

By Week 8, we will have:
- ✅ 15+ API endpoints implemented
- ✅ 6 features complete (F-001 through F-006)
- ✅ > 80% test coverage
- ✅ < 200ms average API response time
- ✅ Zero PII leakage incidents

---

## Document Maintenance

**Review schedule:** Every Friday during development  
**Owner:** Backend Tech Lead  
**Last updated:** 2025-11-25

**Feedback:** Create GitHub issue with tag `[DOCS-BACKEND]`
