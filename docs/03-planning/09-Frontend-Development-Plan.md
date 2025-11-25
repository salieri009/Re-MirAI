# Frontend Development Plan

**Version:** 1.0.0  
**Last Updated:** 2025-11-25  
**Status:** Active  
**Audience:** Frontend Developers, Tech Leads, Project Managers

---

## Related Documentation

**📖 Before you start, read these documents:**

### Essential Context
- **[Navigation Guide](../00-NAVIGATION-GUIDE.md)** - How to read all documentation effectively
- **[UI/UX Design](01-UI-UX-Design.md)** - Design philosophy and viral user flow strategy
- **[Page Architecture](02-Page-Architecture.md)** - Detailed structure of all 5 pages
- **[API Specification](06-API-Specification.md)** - All backend endpoints you'll integrate with

### Feature Specifications (Read for each phase)
- **[F-001: Survey System](../02-project-overview/features/F-001-Survey-System.md)** - Survey creation & response (Week 3-4)
- **[F-002: Persona Synthesis](../02-project-overview/features/F-002-Persona-Synthesis.md)** - AI persona generation (Week 5)
- **[F-003: Chat Interface](../02-project-overview/features/F-003-Chat-Interface.md)** - Real-time chat (Week 6)
- **[F-004: Persona Card](../02-project-overview/features/F-004-Persona-Card.md)** - Social sharing (Week 7)
- **[F-005: Social Features](../02-project-overview/features/F-005-Social-Features.md)** - Compatibility & visits (Week 8)
- **[F-006: Gamification](../02-project-overview/features/F-006-Gamification.md)** - Quest system (Week 8)

### UX Reference
- **[User Journey Map](../04-user-experience/01-User-Journey-Map.md)** - Complete user flow from discovery to advocacy
- **[User Experience Flows](../04-user-experience/02-User-Experience-Flows.md)** - Detailed interaction flows with error paths
- **[Page Concepts](../04-user-experience/03-Page-Concepts.md)** - Design concepts for each page

### Technical Setup
- **[Technical Specification](05-Technical-Specification.md)** - System architecture and tech stack
- **[Environment Config](08-Environment-Config.md)** - Environment variables and deployment setup
- **[Database Schema](07-Database-Schema.md)** - Data models you'll work with

---

## Document Purpose

This plan guides the frontend development of Re:MirAI, a web application that helps users discover how their friends perceive them through AI-powered persona generation. This document outlines:

- What technologies we'll use and why
- What we'll build and when
- How to organize code for maintainability
- How to ensure quality through testing

**Expected timeline:** 8 weeks from project kickoff to launch

---

## Quick Start for Developers

**👉 Ready to start coding? Follow this path:**

### Day 1: Setup & Context (2 hours)
1. Read **[API Specification](06-API-Specification.md)** - Understand all endpoints
2. Review **[F-001 Survey System](../02-project-overview/features/F-001-Survey-System.md)** - First feature to build
3. Check **[Environment Config](08-Environment-Config.md)** - Set up `.env.local`
4. Jump to **[Phase 1: Foundation Setup](#phase-1-foundation-setup-week-1-2)** below

### Day 2: First Component (4 hours)
1. Review **[Page Architecture: Landing Page](02-Page-Architecture.md#1-landing-page-)** 
2. Check **[User Journey Map](../04-user-experience/01-User-Journey-Map.md#phase-1-discovery-)** for context
3. Start coding (see Phase 1 checklist)

### First Week Goals: See **[Section 3: Development Phases](#3-development-phases)**

---

## 1. Technology Stack

### Why These Choices Matter

We selected technologies that prioritize:
- **Developer productivity**: Faster development with fewer bugs
- **User experience**: Fast page loads and smooth interactions
- **Scalability**: Can handle growth from 10 to 10,000 users

### Core Technologies

#### Framework: Next.js 14+
**What it is:** A React framework for building web applications  
**Why we chose it:**
- Server-side rendering makes pages load faster
- Built-in file-based routing (no extra configuration needed)
- Excellent SEO support (search engines can find our content easily)
- Automatic image optimization (smaller file sizes, faster loads)

#### UI Library: React with TypeScript
**What it is:** A JavaScript library for building user interfaces  
**Why we chose it:**
- Large ecosystem with many ready-to-use components
- TypeScript catches errors before they reach users
- Strong community support and documentation

#### Styling: Vanilla CSS with Design Tokens
**What it is:** Plain CSS with variables for consistent design  
**Why we chose it:**
- Maximum control over styling (no framework limitations)
- Smaller bundle size (faster page loads)
- Design tokens ensure visual consistency across all pages

**Key colors:**
- Primary (Fuchsia): `#d946ef` - Main brand color for buttons and highlights
- Secondary (Blue): `#3b82f6` - Supporting color for links and accents
- Background (Light): `#f8fafc` - Clean, accessible background

#### State Management

**TanStack Query** (for server data)
- Automatically caches API responses (fewer network requests)
- Handles loading and error states (less code to write)
- Keeps data fresh without manual refreshing

**Zustand** (for app state)
- Lightweight (only 1KB)
- Simple API (easy to learn)
- Works well with React hooks

---

## 2. Project Structure

### How Code is Organized

We follow **Atomic Design** principles, organizing components from smallest to largest:

```
frontend/
├── src/
│   ├── app/                    # Pages (Next.js App Router)
│   │   ├── (auth)/login/      # Login page
│   │   ├── dashboard/         # User dashboard
│   │   ├── s/[id]/            # Survey pages (dynamic route)
│   │   ├── p/[id]/            # Persona pages (dynamic route)
│   │   └── chat/[id]/         # Chat interface
│   │
│   ├── components/            # Reusable UI components
│   │   ├── atoms/             # Smallest pieces (Button, Input, Badge)
│   │   ├── molecules/         # Small groups (QuestionCard, StatDisplay)
│   │   ├── organisms/         # Large sections (SurveyWizard, PersonaCard)
│   │   └── templates/         # Page layouts (DashboardLayout)
│   │
│   ├── lib/
│   │   ├── api/               # API client code
│   │   ├── hooks/             # Reusable React hooks
│   │   └── utils/             # Helper functions
│   │
│   ├── stores/                # Global state management
│   └── styles/                # CSS files and design tokens
│
└── tests/                     # Test files
    ├── unit/                  # Component tests
    ├── integration/           # Feature tests
    └── e2e/                   # Full user journey tests
```

### Why This Structure?

**Goal:** Set up project infrastructure and authentication

#### Week 1: Project Initialization

**Steps:**

1. **Create Next.js project**
   ```bash
   npx create-next-app@latest frontend --typescript --app --no-tailwind
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install @tanstack/react-query axios zustand
   npm install -D vitest @playwright/test
   ```

3. **Create design system**
   - Write CSS variables file (`styles/tokens.css`)
   - Define color palette, spacing, and typography
   - Create base component styles

**Deliverables:**
- ✅ Working development environment
- ✅ Design tokens file with brand colors
- ✅ Basic components (Button, Input, Badge)

#### Week 2: Authentication & Landing Page

**What we're building:** Login system and homepage

**Features:**
- Landing page with hero section (tells users what Re:MirAI does)
- Google OAuth login (one-click sign-in)
- Protected routes (only logged-in users see dashboard)

**Aligns with Feature F-001 Requirements:**
- FR-001.3: No account required for survey respondents
- Authentication for survey creators only

**Implementation checklist:**
1. Set up NextAuth.js with Google provider
2. Create landing page with 3 sections:
   - Hero: Value proposition + CTA button
   - Social proof: User testimonials
   - How it works: 3-step process
3. Add login redirect logic
4. Test authentication flow end-to-end

---

### Phase 2: Dashboard & Survey System (Week 3-4)

**Goal:** Implement core survey creation and response features

#### Week 3: Dashboard Implementation

**What we're building:** User's home page with three states

**State 1: Awaiting Responses** (before 3 responses received)
- Shows blurred placeholder for persona card
- Displays progress: "2 out of 3 responses received"
- Prominent "Share" button with survey link

**State 2: Ready for Synthesis** (3+ responses received)
- "Create Persona" button appears
- Celebration animation

**State 3: Active Persona** (after persona created)
- Persona card preview
- Quick access to chat
- Stats display (Charisma, Intellect, etc.)

**Aligns with Feature F-001:**
- FR-001.4: Minimum 3 responses before persona unlock
- Progress tracking (NFR-001.2: < 1s response time)

#### Week 4: Survey Creation & Response

**What we're building:** Survey generation and response pages

**Survey Creation Flow:**
1. Click "Create Survey" button
2. System generates unique URL
3. Copy-to-clipboard with success message
4. Direct share buttons (WhatsApp, Instagram)

**Survey Response Page:**
- 10-15 personality questions (FR-001.2)
- Progress bar showing completion
- Skip option for each question
- Anonymous submission (no login required)

**Components to build:**
- `SurveyWizard` (Organism) - Full creation flow
- `QuestionCard` (Molecule) - Individual question display
- `ProgressBar` (Molecule) - Visual progress indicator
- `ShareButton` (Molecule) - Native share functionality

**Implementation checklist:**
1. Create survey generation API endpoint
2. Build question display with Likert scale inputs
3. Implement response submission (encrypted storage)
4. Add clipboard API integration
5. Test anonymity safeguards

---

### Phase 3: Persona Generation & Chat (Week 5-6)

**Goal:** Implement AI-powered persona synthesis and chat interface

#### Week 5: Persona Synthesis

**What we're building:** Persona creation with dramatic reveal animation

**Reveal Animation Sequence:**
1. **Gathering (2s):** Particles collecting (Lottie animation)
2. **Synthesis (3s):** AI processing visual
3. **Reveal (1s):** Persona card appears with flourish

**Aligns with Feature F-002:**
- NFR-002.1: Generation must complete within 60 seconds
- FR-002.3: Assign archetype (Yandere, Kuudere, etc.)

**Implementation details:**
```typescript
// PersonaReveal.tsx - Animation stages
const stages = {
  gathering: { duration: 2000, animation: 'particles.json' },
  synthesis: { duration: 3000, animation: 'processing.json' },
  reveal: { duration: 1000, animation: 'tada.json' }
};
```

**Components:**
- `PersonaReveal` (Organism) - Full reveal experience
- `PersonaCard` (Organism) - Final persona display
- `StatRadarChart` (Molecule) - Visual stat representation

#### Week 6: Chat Interface

**What we're building:** Real-time chat with AI persona

**Chat Features:**
- Send text messages
- Receive AI responses (consistent with persona archetype)
- View conversation history (infinite scroll)
- Typing indicators
- Message timestamps

**Aligns with Feature F-003:**
- FR-003.1: Real-time text chat interface
- FR-003.2: Responses match assigned archetype
- FR-003.3: Maintain 10 turns of context
- NFR-003.1: Response time under 3 seconds

**Technology:**
- WebSocket connection for real-time messaging
- TanStack Query for message history caching
- Optimistic UI updates (instant message display)

**Implementation checklist:**
1. Set up WebSocket connection with Socket.io
2. Build message components (sent/received)
3. Implement infinite scroll for history
4. Add typing indicators
5. Handle connection loss gracefully
6. Test with various archetypes

---

### Phase 4: Social & Gamification (Week 7-8)

**Goal:** Enable sharing and add engagement features

#### Week 7: Persona Card Sharing

**What we're building:** Social sharing system

**Sharing Methods:**
- Native Share API (mobile devices)
- Copy link to clipboard (desktop)
- Direct share to Instagram, Twitter
- Generate OG image preview

**Implementation:**
```typescript
// Sharing function
async function sharePersonaCard(personaId: string) {
  // Try native share first
  if (navigator.share) {
    await navigator.share({
      title: 'My Re:MirAI Persona',
      text: 'Check out how my friends see me!',
      url: `https://remirai.app/p/${personaId}`
    });
  } else {
    // Fallback: Copy to clipboard
    navigator.clipboard.writeText(`https://remirai.app/p/${personaId}`);
  }
}
```

**Aligns with Feature F-004:**
- FR-004.1: Generate 1080x1080px image
- FR-004.2: Include name, archetype, stats, QR code
- NFR-004.1: Generation under 2 seconds

---

#### Week 7: Social Features (F-005)

**What we're building:** Compatibility matching and social graph

**Aligns with Feature F-005:**
- FR-005.1: Calculate compatibility score
- FR-005.2: Relationship description
- FR-005.3: Visit friend's room
- FR-005.4: Social graph (follow/followers)

##### Component: CompatibilityBadge (Molecule)

**Purpose:** Display compatibility score between two personas

```typescript
// components/molecules/CompatibilityBadge.tsx
interface CompatibilityBadgeProps {
  score: number; // 0-100
  description: string;
}

export function CompatibilityBadge({ score, description }: CompatibilityBadgeProps) {
  const getColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-blue-500';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="compatibility-badge">
      <div className={`score-circle ${getColor(score)}`}>
        {score}%
      </div>
      <p className="description">{description}</p>
    </div>
  );
}
```

**CSS (Vanilla with design tokens):**
```css
.compatibility-badge {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md);
  background: var(--color-surface);
  border-radius: var(--radius-lg);
}

.score-circle {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-xl);
  font-weight: bold;
  color: white;
}

.description {
  flex: 1;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}
```

##### Component: FollowButton (Atom)

**Purpose:** Follow/unfollow users

```typescript
// components/atoms/FollowButton.tsx
interface FollowButtonProps {
  userId: string;
  isFollowing: boolean;
  onToggle: () => Promise<void>;
}

export function FollowButton({ userId, isFollowing, onToggle }: FollowButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await onToggle();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`follow-button ${isFollowing ? 'following' : 'not-following'}`}
    >
      {loading ? 'Loading...' : isFollowing ? 'Following' : 'Follow'}
    </button>
  );
}
```

##### Page: RoomVisit (/users/[id]/room)

**Purpose:** Visit a friend's room (FR-005.3)

```typescript
// app/users/[id]/room/page.tsx
export default async function RoomVisitPage({ params }: { params: { id: string } }) {
  const roomData = await fetch(`${API_URL}/v1/users/${params.id}/room`);
  
  if (!roomData.canVisit) {
    return <div>This room is private</div>;
  }

  return (
    <div className="room-visit">
      <h1>{roomData.persona.name}'s Room</h1>
      <PersonaCard persona={roomData.persona} readOnly />
      <div className="room-actions">
        <CompatibilityBadge 
          score={roomData.compatibility.score}
          description={roomData.compatibility.description}
        />
        <FollowButton userId={params.id} />
      </div>
    </div>
  );
}
```

**Implementation checklist:**
1. Create CompatibilityBadge molecule
2. Create FollowButton atom
3. Build RoomVisit page
4. Add Privacy settings (PUBLIC/FRIENDS_ONLY/PRIVATE)
5. Integrate compatibility API
6. Test social graph features

---

#### Week 8: Quest System (F-006)

**What we're building:** Gamification to increase engagement

**Quest Examples (from Feature F-006):**
- "Create Your First Survey" - 50 Memory Crystals
- "Receive 5 Responses" - 100 Memory Crystals
- "Share Your Persona" - 75 Memory Crystals
- "Chat 10 Times" - 50 Memory Crystals

**Aligns with Feature F-006:**
- FR-006.1: Track quest progress
- FR-006.2: Award currency (Memory Crystals)
- FR-006.3: Daily login rewards
- FR-006.4: Leaderboards

##### Component: QuestCard (Molecule)

**Purpose:** Display individual quest with progress

```typescript
// components/molecules/QuestCard.tsx
interface QuestCardProps {
  quest: {
    id: string;
    name: string;
    description: string;
    progress: number;
    requirement: number;
    reward: number;
    status: 'ACTIVE' | 'COMPLETED' | 'CLAIMED';
  };
  onClaim: (questId: string) => Promise<void>;
}

export function QuestCard({ quest, onClaim }: QuestCardProps) {
  const progress Percentage = (quest.progress / quest.requirement) * 100;
  const canClaim = quest.progress >= quest.requirement && quest.status === 'COMPLETED';

  return (
    <div className="quest-card">
      <div className="quest-header">
        <h3>{quest.name}</h3>
        <span className="reward">{quest.reward} 💎</span>
      </div>
      <p className="description">{quest.description}</p>
      
      {/* Progress Bar */}
      <div className="progress-container">
        <div 
          className="progress-bar" 
          style={{ width: `${progressPercentage}%` }}
        />
        <span className="progress-text">
          {quest.progress} / {quest.requirement}
        </span>
      </div>

      {/* Claim Button */}
      {canClaim && (
        <button 
          className="claim-button"
          onClick={() => onClaim(quest.id)}
        >
          Claim Reward
        </button>
      )}
    </div>
  );
}
```

**CSS:**
```css
.quest-card {
  padding: var(--space-lg);
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 2px solid var(--color-border);
}

.quest-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-sm);
}

.reward {
  font-size: var(--font-size-lg);
  font-weight: bold;
  color: var(--color-primary);
}

.progress-container {
  position: relative;
  height: 24px;
  background: var(--color-bg-secondary);
  border-radius: var(--radius-md);
  overflow: hidden;
  margin: var(--space-md) 0;
}

.progress-bar {
  position: absolute;
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
  transition: width 0.3s ease;
}

.progress-text {
  position: absolute;
  width: 100%;
  text-align: center;
  line-height: 24px;
  font-weight: bold;
  color: var(--color-text);
  mix-blend-mode: difference;
}

.claim-button {
  width: 100%;
  padding: var(--space-sm);
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s;
}

.claim-button:hover {
  transform: scale(1.02);
}
```

##### Component:QuestBoard (Organism)

**Purpose:** Display all active quests

```typescript
// components/organisms/QuestBoard.tsx
export function QuestBoard() {
  const { data: quests, isLoading } = useQuery({
    queryKey: ['quests', 'active'],
    queryFn: () => fetch('/api/v1/quests/active').then(r => r.json())
  });

  const claimMutation = useMutation({
    mutationFn: (questId: string) => 
      fetch(`/api/v1/quests/${questId}/claim`, { method: 'POST' }),
    onSuccess: () => {
      toast.success('Reward claimed! 💎');
      queryClient.invalidateQueries(['quests']);
      queryClient.invalidateQueries(['wallet']);
    }
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="quest-board">
      <h2>Active Quests</h2>
      <div className="quest-list">
        {quests.map(quest => (
          <QuestCard 
            key={quest.id}
            quest={quest}
            onClaim={claimMutation.mutate}
          />
        ))}
      </div>
    </div>
  );
}
```

##### Component: WalletDisplay (Molecule)

**Purpose:** Show current Memory Crystal balance

```typescript
// components/molecules/WalletDisplay.tsx
export function WalletDisplay() {
  const { data: wallet } = useQuery({
    queryKey: ['wallet'],
    queryFn: () => fetch('/api/v1/wallet').then(r => r.json())
  });

  return (
    <div className="wallet-display">
      <span className="label">Memory Crystals</span>
      <span className="balance">{wallet?.balance || 0} 💎</span>
    </div>
  );
}
```

##### Component: RewardToast (Molecule)

**Purpose:** Animated notification for quest completion

```typescript
// components/molecules/RewardToast.tsx
export function RewardToast({ amount }: { amount: number }) {
  return (
    <div className="reward-toast">
      <span className="icon">✨</span>
      <span className="message">+{amount} Crystals!</span>
    </div>
  );
}
```

**CSS with animation:**
```css
.reward-toast {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-md);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.reward-toast .icon {
  font-size: 24px;
  animation: pulse 0.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}
```

**Implementation checklist:**
1. Create quest tracking system
2. Build quest progress UI
3. Implement reward notifications
4. Add currency display (Memory Crystals)
5. Test quest completion triggers

---

## 4. State Management Strategy

### Why State Management Matters

Without proper state management, you end up "prop drilling" (passing data through many components). We split state into two categories:

### Server State (TanStack Query)

**Use for:** Data from API (surveys, personas, messages)

**Example:**
```typescript
// hooks/usePersona.ts
export function usePersona(id: string) {
  return useQuery({
    queryKey: ['persona', id],
    queryFn: () => fetch(`/api/v1/personas/${id}`).then(r => r.json()),
    staleTime: 5 * 60 * 1000 // Consider data fresh for 5 minutes
  });
}

// Usage in component
function PersonaProfile({ id }) {
  const { data, isLoading, error } = usePersona(id);
  
  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorMessage />;
  return <PersonaCard persona={data} />;
}
```

**Benefits:**
- Automatic loading states
- Error handling built-in
- Caching reduces API calls
- Background refetching keeps data fresh

### App State (Zustand)

**Use for:** User session, UI state (modals, sidebars)

**Example:**
```typescript
// stores/authStore.ts
const useAuthStore = create((set) => ({
  user: null,
  token: null,
  login: (token) => set({ token }),
  logout: () => set({ user: null, token: null })
}));

// Usage in component
function Header() {
  const { user, logout } = useAuthStore();
  return (
    <header>
      <span>Welcome, {user.name}</span>
      <button onClick={logout}>Sign Out</button>
    </header>
  );
}
```

---

## 5. API Integration

### API Organization by Feature

We organize API calls by feature for easy maintenance:

```
lib/api/
├── client.ts       # Base API client with auth
├── survey.ts       # F-001: Survey System
├── persona.ts      # F-002: Persona Synthesis
├── chat.ts         # F-003: Chat Interface
├── social.ts       # F-005: Social Features
└── quest.ts        # F-006: Gamification
```

### Base API Client Setup

**Why:** Centralizes authentication and error handling

```typescript
// lib/api/client.ts
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'sonner'; // or your toast library

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000 // 30 second timeout
});

// Request interceptor: Add auth token
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: Comprehensive error handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Network error (no response)
    if (!error.response) {
      toast.error('Network connection lost. Please check your internet.');
      return Promise.reject(error);
    }

    const { status, data } = error.response;

    switch (status) {
      case 401:
        // Unauthorized - try refresh token
        const refreshToken = useAuthStore.getState().refreshToken;
        
        if (refreshToken && !error.config._retry) {
          error.config._retry = true;
          
          try {
            // Attempt to refresh access token
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/refresh`,
              { refresh_token: refreshToken }
            );
            
            const { access_token } = response.data;
            useAuthStore.getState().setToken(access_token);
            
            // Retry original request with new token
            error.config.headers.Authorization = `Bearer ${access_token}`;
            return apiClient(error.config);
          } catch (refreshError) {
            // Refresh failed - logout user
            useAuthStore.getState().logout();
            window.location.href = '/login';
          }
        } else {
          // No refresh token - logout
          useAuthStore.getState().logout();
          window.location.href = '/login';
        }
        break;

      case 403:
        toast.error('Access denied.');
        break;

      case 404:
        toast.error('Resource not found.');
        break;

      case 429:
        toast.error('Too many requests. Please wait.');
        break;

      case 500:
        toast.error('Server error. Our team has been notified.');
        console.error('500 Error:', data);
        break;

      case 503:
        toast.error('Service temporarily unavailable.');
        break;

      default:
        toast.error(data?.message || 'An unexpected error occurred.');
    }

    return Promise.reject(error);
  }
);

export default apiClient;
```

### Feature-Specific API Modules

**Example: Survey API (F-001)**
```typescript
// lib/api/survey.ts
import apiClient from './client';

export const surveyApi = {
  // FR-001.1: Generate unique, shareable URL
  async create() {
    const response = await apiClient.post('/v1/surveys');
    return response.data; // { id, url, status }
  },

  // Get survey details
  async get(id: string) {
    const response = await apiClient.get(`/v1/surveys/${id}`);
    return response.data;
  },

  // FR-001.3: Submit answers without account
  async submitResponse(surveyId: string, answers: object) {
    const response = await apiClient.post(`/v1/surveys/${surveyId}/responses`, {
      answers
    });
    return response.data;
  }
};
```

**Example: Chat API with WebSocket (F-003)**
```typescript
// lib/api/chat.ts
import apiClient from './client';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'sonner';

// FR-003.1: Real-time chat with auto-reconnection
export function connectChat(personaId: string): Socket {
  const socket = io(process.env.NEXT_PUBLIC_API_URL, {
    auth: {
      token: useAuthStore.getState().token
    },
    // AUTO-RECONNECTION CONFIG
    reconnection: true,           // Enable auto-reconnection
    reconnectionDelay: 1000,      // Start with 1s delay
    reconnectionDelayMax: 5000,   // Max 5s between retries
    reconnectionAttempts: 5,      // Try 5 times before giving up
    timeout: 10000                // 10s connection timeout
  });

  socket.on('connect', () => {
    console.log('✅ Connected to chat');
    socket.emit('join', { personaId });
  });

  socket.on('disconnect', (reason) => {
    console.log('❌ Disconnected:', reason);
    
    if (reason === 'io server disconnect') {
      // Server forced disconnect - manual reconnection with fresh auth
      const newToken = useAuthStore.getState().token;
      socket.auth = { token: newToken };
      socket.connect();
    }
    // Otherwise, auto-reconnect handles it
  });

  socket.on('connect_error', (error) => {
    console.error('Connection error:', error.message);
    toast.error('Chat connection lost. Reconnecting...');
  });

  socket.on('reconnect', (attemptNumber) => {
    console.log(`✅ Reconnected after ${attemptNumber} attempts`);
    toast.success('Chat reconnected');
    socket.emit('join', { personaId }); // Re-join room
  });

  socket.on('reconnect_failed', () => {
    console.error('❌ Reconnection failed after all attempts');
    toast.error('Could not reconnect to chat. Please refresh.');
  });

  return socket;
}

// FR-003.3: Load conversation history (last 10 turns)
export const chatApi = {
  async getHistory(personaId: string, limit = 10) {
    const response = await apiClient.get(`/v1/chat/${personaId}/messages`, {
      params: { limit }
    });
    return response.data;
  }
};
```

---

## 6. Testing Strategy

### Why Testing Matters

Tests prevent bugs from reaching users and make refactoring safer. We use three types:

### Unit Tests (Vitest)

**What:** Test individual components in isolation  
**When:** For atoms and molecules with complex logic

**Example:**
```typescript
// tests/unit/components/Button.test.ts
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/atoms/Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    screen.getByText('Click me').click();
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('applies primary variant styles', () => {
    render(<Button variant="primary">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-primary');
  });
});
```

### Integration Tests (Vitest + React Testing Library)

**What:** Test feature workflows  
**When:** For organisms and complex user flows

**Example:**
```typescript
// tests/integration/survey-creation.test.ts
import { render, screen, waitFor } from '@testing-library/react';
import { SurveyWizard } from '@/components/organisms/SurveyWizard';

test('creates survey and shows share options', async () => {
  render(<SurveyWizard />);
  
  // Click create button
  screen.getByText('Create Survey').click();
  
  // Wait for API call to complete
  await waitFor(() => {
    expect(screen.getByText(/Survey created/i)).toBeInTheDocument();
  });
  
  // Check share button appears
  expect(screen.getByText('Share Link')).toBeInTheDocument();
});
```

### End-to-End Tests (Playwright)

**What:** Test complete user journeys  
**When:** For critical paths (signup, survey flow, persona creation)

**Example:**
```typescript
// tests/e2e/survey-flow.spec.ts
import { test, expect } from '@playwright/test';

test('complete survey creation and response flow', async ({ page }) => {
  // Login
  await page.goto('/login');
  await page.click('text=Continue with Google');
  await page.waitForURL('/dashboard');

  // Create survey
  await page.click('text=Create Survey');
  await expect(page.locator('text=Survey created')).toBeVisible();

  // Copy survey link
  const surveyLink = await page.locator('[data-testid="survey-link"]').textContent();
  
  // Open survey in new tab (simulate friend)
  await page.goto(surveyLink);
  
  // Answer questions
  await page.fill('input[name="q1"]', '5');
  await page.fill('input[name="q2"]', '4');
  await page.click('text=Submit');

  // Verify submission
  await expect(page.locator('text=Thank you')).toBeVisible();
});
```

### Testing Checklist Before Launch

- [ ] All atoms have unit tests
- [ ] Critical organisms have integration tests
- [ ] Main user flows have E2E tests
- [ ] Tests run in CI/CD pipeline
- [ ] Code coverage > 70%

---

## 7. Performance Optimization

### Why Performance Matters

- **User retention:** 53% of users abandon sites that take > 3s to load
- **SEO:** Google ranks faster sites higher
- **Conversion:** Faster loads = more signups

### Image Optimization

**Use Next.js Image component:**
```typescript
import Image from 'next/image';

// Before (slow):
<img src="/persona-card.png" alt="Persona" />

// After (fast):
<Image
  src="/persona-card.png"
  alt="Persona"
  width={1080}
  height={1080}
  quality={85}
  placeholder="blur"
  blurDataURL="..." // Generated at build time
/>
```

**What it does:**
- Serves WebP format (30% smaller than PNG)
- Lazy loads images below the fold
- Responsive images for different screen sizes
- Blur placeholder while loading

### Code Splitting

**Load heavy components only when needed:**
```typescript
import dynamic from 'next/dynamic';

// Heavy component loaded only when shown
const PersonaReveal = dynamic(
  () => import('@/components/organisms/PersonaReveal'),
  {
    loading: () => <LoadingSkeleton />,
    ssr: false // Don't render on server
  }
);
```

**Impact:** Reduces initial bundle size by excluding large animations

### Caching Strategy

**Static pages:** Generated at build time
- Landing page
- About page
- Pricing page

**ISR (Incremental Static Regeneration):** Regenerate every 60 seconds
- Public persona pages (e.g., `/p/username`)
- Survey pages (e.g., `/s/abc123`)

**Dynamic:** Generated per request
- Dashboard (user-specific)
- Chat interface (real-time)

---

## 8. Deployment

### Environments

| Environment | Purpose | URL | Branch |
|-------------|---------|-----|--------|
| Development | Local testing | localhost:3000 | N/A |
| Staging | QA testing | staging.remirai.app | develop |
| Production | Live users | remirai.app | main |

### CI/CD Pipeline

**Automated checks on every push:**
1. Run linter (code style)
2. Run type checker (TypeScript)
3. Run tests (unit + integration)
4. Build application
5. Deploy to Vercel

**Example workflow:**
```yaml
# .github/workflows/deploy.yml
name: Deploy Frontend
on:
  push:
    branches: [main, develop]
    
jobs:
  test-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install dependencies
        run: npm ci
        
      - name: Run linter
        run: npm run lint
        
      - name: Run tests
        run: npm test
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## 9. Development Priorities

### Phase Breakdown by Priority

#### P0 (MVP - Week 1-4) - MUST HAVE
These features are required for launch:
- Landing page (user acquisition)
- Google OAuth login (account creation)
- Dashboard with 3 states (user home)
- Survey creation (F-001: FR-001.1)
- Survey response page (F-001: FR-001.2, FR-001.3)
- 3-response threshold enforcement (F-001: FR-001.4)

#### P1 (Post-MVP - Week 5-6) - SHOULD HAVE
These features enhance core value:
- Persona synthesis (F-002: All FRs)
- Persona reveal animation
- Chat interface (F-003: FR-003.1, FR-003.2, FR-003.3)
- Persona card generation (F-004: FR-004.1, FR-004.2)

#### P2 (Phase 2 - Week 7-8) - NICE TO HAVE
These features drive engagement:
- Social sharing (F-004: Native share API)
- Quest system (F-006: FR-006.1, FR-006.2)
- Daily login rewards (F-006: FR-006.3)
- Compatibility matching (F-005: FR-005.1)

### What Happens If We're Behind Schedule?

**Priority 1:** Complete P0 features for minimal viable product  
**Priority 2:** Launch with placeholder animations for P1  
**Priority 3:** P2 features can ship post-launch

---

## 10. Risk Management

### Technical Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| **LLM API slow** (>60s) | High | Medium | Show loading animation, set 60s timeout, display retry option |
| **WebSocket drops** | Medium | Medium | Implement polling fallback, auto-reconnect logic |
| **Image generation fails** | Medium | Low | Use fallback placeholder images, retry mechanism |
| **OAuth integration issues** | High | Low | Test thoroughly, provide email backup option |

### UX Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| **Low survey completion** | High | Medium | Reduce questions to 10, add progress bar, allow skip |
| **Users leave during synthesis** | High | Medium | Engaging animation (2s + 3s + 1s), prevent navigation |
| **No one shares personas** | High | High | Prominent share button, add social proof, reward sharing |
| **Complex onboarding** | Medium | Low | One-click Google OAuth, skip traditional signup |

---

## Key Takeaways

### What You Should Remember

1. **8-week timeline** broken into 4 phases
2. **Atomic Design** structure for component reusability
3. **Feature alignment**: Each phase directly implements requirements from F-001 to F-006
4. **Performance first**: Code splitting, image optimization, caching
5. **Test coverage**: Unit, integration, and E2E tests throughout
6. **Risk mitigation**: Identified risks with concrete solutions

### Next Steps

**Week 1 starts with:**
1. Run `npx create-next-app@latest` to initialize project
2. Set up design tokens in `styles/tokens.css`
3. Create first atoms: Button, Input, Badge
4. Set up NextAuth.js for Google OAuth

### Success Metrics

By launch (Week 8), we will have:
- ✅ 5 complete pages (Landing, Login, Dashboard, Survey, Persona, Chat)
- ✅ 6 features implemented (F-001 through F-006)
- ✅ >70% test coverage
- ✅ <3s page load time (measured by Lighthouse)
- ✅ Full mobile responsiveness

---

## Document Maintenance

**Review schedule:** Every Friday during development  
**Owner:** Frontend Tech Lead  
**Last updated:** 2025-11-25

**Feedback:** If you find issues or have suggestions, create a GitHub issue with tag `[DOCS]`
