# Core Features

This document provides detailed specifications for all Re:MirAI features.

**Version:** 1.0.0  
**Last Updated:** 2025-11-23  
**Status:** Active

---

## Feature Overview

Re:MirAI's features are organized into six main categories:

1. **[Ritual System](#1-ritual-system)** - Survey generation and sharing
2. **[Persona Synthesis](#2-persona-synthesis)** - AI-powered persona creation
3. **[AI Chat Interface](#3-ai-chat-interface)** - Interactive conversations
4. **[Social Features](#4-social-features)** - Compatibility and profiles
5. **[Gamification](#5-gamification)** - Quests and progression
6. **[Premium Features](#6-premium-features)** - Monetization (Phase 3)

---

## 1. Ritual System 🔮

### 1.1 Survey Generation

**Description:** Create personalized surveys (called "Rituals") to share with friends.

**User Story:**  
*As a user, I want to create a survey link to share with my friends so they can provide anonymous feedback about my personality.*

**Flow:**
1. User navigates to "Create Ritual" page
2. User views default survey questions
3. System generates unique ritual ID and shareable URL
4. User copies link to share via social media/messaging

**Technical Specs:**
- **Endpoint:** `POST /api/v1/ritual`
- **Response:** Ritual ID + invitation URL
- **Questions:** Fixed set of 10-15 personality questions
- **Question Types:** Multiple choice, pick-a-card, text response

**MVP Scope:**
- ✅ Fixed question set (non-customizable)
- ✅ Unique URL generation
- ❌ Custom questions (Phase 2)
- ❌ Question templates (Phase 2)

### 1.2 Anonymous Feedback Collection

**Description:** Friends anonymously complete surveys without requiring accounts.

**User Story:**  
*As a friend, I want to fill out a survey anonymously without creating an account.*

**Flow:**
1. Friend clicks ritual link
2. System displays questions
3. Friend completes survey
4. System saves responses anonymously
5. Friend sees result teaser page

**Technical Specs:**
- **Endpoint:** `POST /api/v1/ritual/{ritualId}/responses`
- **Authentication:** None required
- **Data Storage:** Anonymous (no PII collected)
- **Minimum Threshold:** 3 responses required for summoning

**Privacy Features:**
- No IP logging
- No device fingerprinting
- Responses cannot be traced back to individuals
- Users cannot see who responded

### 1.3 Practice Mode

**Description:** Self-assessment mode for immediate persona generation.

**User Story:**  
*As a user, I want to try the platform without waiting for friend responses.*

**Flow:**
1. User selects "Practice Summon"
2. User answers survey questions themselves
3. System generates lower-rarity "Proto-Persona"
4. User can chat with practice persona

**Technical Specs:**
- **Endpoint:** `POST /api/v1/ritual/practice`
- **Persona Rarity:** Always "R" (common)
- **Limitations:** No social features, cannot be shared

---

## 2. Persona Synthesis 🎭

### 2.1 Persona Generation

**Description:** AI-powered synthesis of survey responses into a unique personality profile.

**User Story:**  
*As a user, I want to summon an AI persona based on my friends' responses.*

**Flow:**
1. User has ≥3 survey responses
2. User navigates to "Summoning" page
3. User chooses summoning mode (Fated or Alchemic)
4. System processes responses (30-60 seconds)
5. Persona is generated and revealed

**Summoning Modes:**

**Fated Mode** (Default)
- AI decides persona archetype based on responses
- Higher chance of SSR/SR rarity
- Reflects "true" collective perception

**Alchemic Mode** (Advanced)
- User selects desired archetype (Yandere, Kuudere, etc.)
- AI emphasizes selected traits from responses
- Lower rarity likelihood
- Premium feature (Phase 3)

**Technical Specs:**
- **Endpoint:** `POST /api/v1/personas/summon`
- **Processing:** Asynchronous (202 Accepted)
- **AI Model:** GPT-4 for synthesis
- **Token Limit:** ~2000 tokens per synthesis

### 2.2 Persona Attributes

Each persona includes:

**Basic Info:**
- Name (AI-generated or user-customizable)
- Archetype (Yandere, Kuudere, Tsundere, etc.)
- Rarity (SSR, SR, R)
- Title (personality descriptor)

**Stats** (0-100 scale):
- **Charisma:** Social magnetism, confidence
- **Intellect:** Analytical thinking, wisdom
- **Kindness:** Empathy, compassion
- **Instability:** Emotional volatility, unpredictability
-**Spirit:** Energy, enthusiasm

**Visual:**
- Illustration URL (Phase 2: AI-generated)
- Color theme based on archetype

**Progression:**
- Bond Level (1-10)
- Bond Progress (0.0-1.0)
- Increases through chat interactions

### 2.3 Persona Archetypes

| Archetype | Description | Primary Stat |
|-----------|-------------|--------------|
| **Yandere** | Obsessive, protective, intense love | Instability |
| **Kuudere** | Cool, distant, hidden warmth | Intellect |
| **Tsundere** | Defensive, gradually warming | Charisma |
| **Genki** | Energetic, optimistic, cheerful | Spirit |
| **Dandere** | Shy, quiet, gentle | Kindness |
| **Himedere** | Proud, demanding, royalty-like | Charisma |

---

## 3. AI Chat Interface 💬

### 3.1 Conversational AI

**Description:** Real-time chat with generated persona using GPT-4.

**User Story:**  
*As a user, I want to have conversations with my persona to understand how others see me.*

**Flow:**
1. User navigates to Persona Room
2. User types message
3. System sends to GPT-4 with persona context
4. AI response displayed (typically <3 seconds)
5. Bond progress increases

**Technical Specs:**
- **Endpoint:** `POST /api/v1/personas/me/chat`
- **AI Model:** GPT-3.5-turbo (MVP), GPT-4 (Premium)
- **Context Window:** Last 10 messages
- **Max Tokens:** 150 per response
- **Temperature:** 0.8 (personality-dependent)

** Chat Features:**
- Personality-consistent responses
- Memory of conversation context
- Emotional state tracking
- Bond level influence on responses

### 3.2 Chat History

**Description:** Persistent storage of all conversations.

**User Story:**  
*As a user, I want to review past conversations with my persona.*

**Technical Specs:**
- **Endpoint:** `GET /api/v1/personas/me/chat`
- **Pagination:** 20 messages per page
- **Storage:** Indefinite (with user consent)

---

## 4. Social Features 👥

### 4.1 Persona Cards

**Description:** Shareable persona profile cards for social media.

**User Story:**  
*As a user, I want to share my persona on social media.*

**Features:**
- Visual persona card with stats
- Archetype and rarity display
- QR code linking to public profile
- Optimized for Instagram/Twitter

**Technical Specs:**
- **Format:** PNG (1080x1080px for Instagram)
- **Generation:** Server-side canvas rendering
- **Endpoint:** `GET /api/v1/personas/me/card`

### 4.2 Compatibility Matching

**Description:** Calculate compatibility scores between two personas.

**User Story:**  
*As a user, I want to see how compatible my persona is with my friend's persona.*

**Flow:**
1. User enters friend's profile URL or ID
2. System calculates compatibility using:
   - Stat similarity/complementarity
   - Archetype pairing dynamics
   - AI-generated chemistry analysis
3. Display compatibility score + description

**Technical Specs:**
- **Endpoint:** `GET /api/v1/social/compatibility?otherUserId={id}`
- **Score Range:** 0-100
- **Algorithm:** Weighted stat comparison + archetype compatibility matrix

**Compatibility Matrix Example:**
- Yandere + Dandere = High (protective + gentle)
- Tsundere + Genki = Medium (clash then harmony)
- Kuudere + Kuudere = Low (both emotionally distant)

### 4.3 Public Profiles

**Description:** Opt-in public persona profiles.

**User Story:**  
*As a user, I want to make my persona public so others can view it.*

**Features:**
- Public URL (remirai.app/persona/{username})
- Viewable stats and archetype
- Privacy controls (hide stats, limit chat)

**Privacy Settings:**
- Public / Friends Only / Private
- Show full stats vs. summary
- Allow compatibility checks

---

## 5. Gamification 🎮

### 5.1 Quest System

**Description:** Achievement-based tasks with rewards.

**User Story:**  
*As a user, I want to complete quests to earn rewards and stay engaged.*

**Quest Examples:**

| Quest | Description | Reward |
|-------|-------------|--------|
| First Steps | Create your first ritual | 10 Crystals |
| Break the Ice | Send first message to persona | 10 Crystals |
| Social Butterfly | Share persona card | 20 Crystals |
| Deep Connection | Reach Bond Level 3 | 50 Crystals |
| Maven | Complete 10 compatibility checks | 30 Crystals |

**Technical Specs:**
- **Endpoint:** `GET /api/v1/quests/me`
- **Completion:** `POST /api/v1/quests/{id}/complete`
- **Validation:** Server-side verification

### 5.2 Memory Crystals (Currency)

**Description:** In-app currency for premium features.

**Earning Methods:**
- Quest completion
- Daily login streaks
- Referrals
- Purchase (Phase 3)

**Usage:**
- Friend persona rental (100 Crystals/week)
- Detailed compatibility reports (50 Crystals)
- Re-summon persona (200 Crystals)
- Premium persona unlock (500 Crystals)

### 5.3 Bond Levels

**Description:** Progression system for persona relationships.

**Levels:** 1-10
- **Level 1-3:** Basic responses
- **Level 4-6:** More personalized, reference past convos
- **Level 7-9:** Deep insights, emotional responses
- **Level 10:** Maximum intimacy, special interactions

**Progression:**
- +0.1 per meaningful conversation (5+ messages)
- +0.05 per single response
- Resets if inactive >30 days (decay)

---

## 6. Premium Features 💎

*(Phase 3 - Months 7-12)*

### 6.1 Premium Persona Package

**Price:** $4.99/month or $49.99/year

**Includes:**
- AI-generated character illustration (DALL-E 3)
- GPT-4 chat (vs. GPT-3.5)
- Advanced personality analysis report
- Special interaction modes (counselor, debate, roleplay)
- Unlimited re-summons
- Priority support

### 6.2 Friend Persona Access

**Price:** 100 Memory Crystals (≈$2.99) for 1 week

**Description:** Temporary access to chat with a friend's public persona.

**Limitations:**
- Friend must have public profile
- 7-day access period
- Limited to 50 messages

### 6.3 Detailed Compatibility Report

**Price:** 50 Memory Crystals (≈$1.49)

**Includes:**
- 500+ word AI-generated analysis
- Relationship dynamics breakdown
- Communication tips
- Compatibility score history
- Downloadable PDF

---

## Feature Roadmap

### Phase 1: MVP (Months 1-3)

- ✅ User authentication
- ✅ Ritual creation and sharing
- ✅ Anonymous response collection
- ✅ Basic persona synthesis
- ✅ AI chat interface
- 🔄 Landing page and onboarding

### Phase 2: Enhancement (Months 4-6)

- 📋 AI-generated persona illustrations
- 📋 Compatibility matching
- 📋 Public persona profiles
- 📋 Quest system
- 📋 Shareable persona cards
- 📋 Gender toggle

### Phase 3: Scale (Months 7-12)

- 📋 Premium persona packages
- 📋 Friend persona rental
- 📋 Custom ritual questions
- 📋 Group personas
- 📋 Advanced analytics dashboard
- 📋 Mobile app (React Native)

---

**Related Documentation:**
- [User Flows](../05-user-experience/user-flows.md)
- [API Specification](../03-architecture/api-specification.md)
- [Development Roadmap](roadmap.md)
