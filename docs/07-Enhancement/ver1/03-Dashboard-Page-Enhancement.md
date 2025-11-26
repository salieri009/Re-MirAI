# Dashboard Page Enhancement Plan

**Version:** 1.1.0  
**Last Updated:** 2025-11-26  
**Status:** ✅ Complete (Chat-Integrated Dashboard)  
**Route:** `/dashboard`  
**Component:** `DashboardPage` (Page level)  
**Feature Specs:** F-001, F-002, F-003, F-006

---

## Feature Compliance Review

### Related Specifications
**Primary:** Central hub for all features  
**Features:** F-001 (Survey System), F-002 (Persona Synthesis), F-003 (Chat Interface), F-006 (Gamification)

### Implementation Status

#### ✅ Completed (v1.1.0 - Chat-Integrated Dashboard)

**Core Architecture:**
- **Layout**: 3-column chat-style design (Discord/Slack inspired)
  - **Left Sidebar** ([DashboardSidebar.tsx](file:///d:/UTS/ToyProjecT_2/frontend/src/components/organisms/DashboardSidebar.tsx)): Navigation channels (Overview, Daily Ritual, Persona Sync, Settings)
  - **Center Area** ([DashboardChatArea.tsx](file:///d:/UTS/ToyProjecT_2/frontend/src/components/organisms/DashboardChatArea.tsx)): Quick Actions + Chat Messages + Input
  - **Right Panel** ([DashboardRightPanel.tsx](file:///d:/UTS/ToyProjecT_2/frontend/src/components/organisms/DashboardRightPanel.tsx)): Persona Stats + Progress + Quests

**Integrated Chat System:**
- **Message Types**: Support for `user`, `system`, and `persona` messages
- **Real-time Messaging**: Message input with Enter key support
- **Message Display**: Animated message list with slide-in effects
- **Chat Input**: Full-width input area with Send button
- **Welcome Message**: System message on initial load

**Quick Actions (Center Area):**
- **Create New Survey**: Primary action card with link to survey creation
- **Daily Ritual**: Link to `/dashboard/ritual` with icon
- **Persona Sync**: Link to `/dashboard/synthesize` with icon
- **Grid Layout**: Responsive 3-card grid (auto-fit, minmax 280px)
- **Hover Effects**: translateY(-4px) animation + color transitions

**Right Panel Features:**
- **Persona Status Card**: Displays Level (5), Bond (75%), Essence (420)
- **Survey Progress**: Active survey tracking with response counter (2/3) and progress bar
- **Active Quests**: Daily Ritual (2/3 completed) and Persona Sync (Pending)
- **Quick Action Buttons**: "Start Ritual" and "Sync Persona"

**Design System:**
- **Color Palette**: Switch Palette implementation (F3C5FF primary, FEFEDF text, 00C9A7 accents)
- **Typography**: Display font for titles, consistent font weights
- **Animations**: Message slide-in, button hover effects, card transitions
- **Accessibility**: Proper semantic HTML structure

#### ✅ Feature Integration Status

| Feature | Requirement | Status | Implementation |
|:---|:---|:---:|:---|
| **F-001** | Survey creation flow | ✅ | "Create New Survey" quick action card with routing |
| **F-001** | Response progress display | ✅ | Response counter (2/3) with progress bar in right panel |
| **F-003** | Chat interface integration | ✅ | Full messaging system in `DashboardChatArea` |
| **F-003** | Message types support | ✅ | User, system, and persona message variants |
| **F-003** | Bond Level tracking | ⚠️ | Static display (75%) - needs backend integration |
| **F-006** | Quest system display | ✅ | Active quests UI in right panel (static data) |
| **F-006** | Gamification metrics | ✅ | Level, Bond, Essence displayed in right panel |

#### 🔄 Pending Backend Integration

| Component | Current State | Action Needed |
|:---|:---|:---|
| **Chat Messages** | Local state management | Connect to real-time chat API |
| **Persona Status** | Mock data (Level 5, Bond 75%) | Fetch from persona API |
| **Survey Progress** | Static (2/3 responses) | Poll or subscribe to survey status updates |
| **Active Quests** | Hardcoded quests | Integrate with gamification backend |

### Priority Actions
1. ~~**P0**: Add prominent "Create New Survey" button (F-001.UC-01)~~ ✅ **COMPLETE**
2. ~~**P0**: Implement survey response progress indicator (0/3, 1/3, 2/3, 3/3)~~ ✅ **COMPLETE**
3. ~~**P1**: Integrate chat messaging system in dashboard~~ ✅ **COMPLETE**
4. **P0**: Connect chat message system to backend API (real-time messaging)
5. **P1**: Implement dynamic persona status updates from backend
6. **P1**: Add real-time survey progress polling/WebSocket subscription
7. **P2**: Connect quest system to gamification backend
8. **P2**: Implement breadcrumb navigation for multi-step flows

### Compliance Score: 90/100
Dashboard successfully integrates chat with status monitoring. Needs backend integration for real-time data updates.

---

## 🟡 UX/UI Weak Points & Mitigation Strategies

### Critical Issue #1: Dual-Chat Mental Model Confusion (Severity: 9/10)

**Problem:** Users don't understand when to use Dashboard chat vs. Chat Page

**Current State:**
- Dashboard chat: Basic messaging with quick actions
- Chat Page (`/chat/[id]`): Full features (reactions, sharing, typing)
- **No visual or contextual differentiation**

**User's Mental Question:**
> "If I message here, does it show up in the Chat page?"

**Psychology Principle Violated:** Conceptual Model (Don Norman)
- Users cannot predict system behavior
- Leads to learned helplessness

**Mitigation (Choose One):**

**Option A: Message Continuity (Recommended)**
```tsx
// Dashboard shows last 5 messages from full chat history
<DashboardChat>
  <MessageList maxMessages={5} />
  <ViewFullButton href="/chat/{id}">
    View full conversation ({totalMessages} messages) →
  </ViewFullButton>
</DashboardChat>
```

**Option B: Separate Context with Clear Labels**
```tsx
<DashboardChat theme="system">
  <Icon>🤖</Icon>
  <Label>System Updates Only</Label>
  <SystemMessage>
    For persona conversations, 
    <Link>open Chat Room →</Link>
  </SystemMessage>
</DashboardChat>
```

**Option C: Merge Completely**
- Remove dashboard chat
- Add floating chat widget accessible from anywhere
- Simpler mental model

---

### Issue #2: Information Overload (Severity: 6/10)

**Problem:** 15+ interactive elements compete for attention

**Current Layout:**
- Left: 4 navigation channels
- Center: 3 quick actions + messages + input
- Right: 4 information panels

**Hick's Law:** Decision time increases logarithmically with choices

**Eye-Tracking Prediction (F-Pattern):**
1. Eyes scan top-left ✅
2. Horizontal scan quick actions ✅
3. Drop to right panel ⚠️ (competes with chat)
4. **Chat input gets missed**

**Mitigation:**

```tsx
// Progressive Disclosure
<QuickActions collapsed={hasActiveSurvey}>
  {/* Show only when user needs action */}
</QuickActions>

// Sticky Chat Input (always visible)
<ChatInput className={styles.sticky} />

// Accordion Right Panel
<RightPanel>
<PriorityMetric /> {/* Show TOP priority only */}
  <Accordion items={[status, quests, actions]} />
</RightPanel>
```

**Research:** Miller's Law (7±2 items) - Reduce visible elements to 9

---

### Issue #3: Static Data Without Real-Time Updates (Severity: 7/10)

**Problem:** Persona status, survey progress, quests all show mock static data

**User Expectation:** "Live" dashboard should update automatically

**Current Backend Integration Status:**
- ❌ Chat messages: Local state only
- ❌ Persona status: Hardcoded (Level 5, Bond 75%)
- ❌ Survey progress: Hardcoded (2/3)
- ❌ Quest data: Mock data

**Mitigation:**

```typescript
// Real-time polling approach
const { data: personaStatus } = useQuery({
  queryKey: ['persona-status'],
  queryFn: () => personaApi.getStatus(),
  refetchInterval: 10000, // Poll every 10s
});

// WebSocket approach (better)
useEffect(() => {
  const ws = new WebSocket('wss://api.remirai.app/dashboard');
  ws.onmessage = (event) => {
    const update = JSON.parse(event.data);
    updateDashboardState(update);
  };
}, []);
```

**Priority:** HIGH - Without backend, dashboard feels "fake"

---

### Issue #4: Missing Visual Hierarchy in Quick Actions (Severity: 4/10)

**Problem:** All 3 action cards have equal visual weight

**User Goal:** Identify NEXT action quickly

**Mitigation:**

```css
/* Primary action (what user should do NOW) */
.actionCard--primary {
  border: 2px solid var(--color-primary);
  box-shadow: 0 0 20px rgba(243, 197, 255, 0.3);
  animation: subtle-pulse 2s infinite;
}

/* Secondary actions */
.actionCard--secondary {
  opacity: 0.7;
  border: 1px solid var(--color-border);
}
```

**Smart Priority Logic:**
```typescript
const priorityAction = {
  noSurvey: 'create-survey',
  surveyActive: 'ritual', // Share link
  surveysufficient: 'synthesize', // Create persona
  personaReady: 'chat',
}[userState];
```

---

## Design Philosophy

**Core Concept:** **"The Magical Mirror"** — A mystical interface that reveals how others perceive you (*"Who do others believe I am?"*).

**Objective:** Design a multi-page interface where each page emphasizes its unique purpose and enhances the user experience aligned with that purpose.

**Core Principles:**
- **Core Purpose:** **Inform & Guide** (The Hero's Journey map).
- **Tailored UX:** Provide clarity on current status and clear calls-to-action for the next step; reduce cognitive load.
- **Visual Hierarchy:** Status/Progress is paramount; next action is the most prominent interactive element.
- **Immersive Consistency:** Use magical metaphors (Echoes, Crystals) for data to keep the user in the narrative.
- **Micro-Interactions:** Use pulsing animations to guide attention to the next required action.
- **Emotional Resonance:** Evoke **Motivation** and **Clarity** to encourage continued progress.
- **Visual Identity:** Adheres to the **Small Switch Palette** (see `09-Color-Palette-Plan.md`) to ensure brand consistency and accessibility.

---

## Executive Summary

The Dashboard is Re:MirAI's **command center**—where users instantly understand their journey status and know exactly what to do next.

## Phase 1.5 Implementation Addendum (v1.0.2)

### Current Build Snapshot
- `/dashboard` now renders `DashboardStateView` with state-driven templates (`empty`, `collecting`, `ready`, `active`) plus CTA wiring to survey, summoning, chat, and persona routes.
- TanStack Query integrates survey, persona, and quest APIs ensuring cards reflect live backend data; `SurveyLinkCard` + `StatusCard` express the guidance patterns defined in this doc.
- Guidance micro-interactions partially landed: `progressShimmer` animates ritual percentages and SurveyLink CTA duplicates share counts.

### Gap Analysis vs. Spec
- No real-time channel yet; queries poll once on mount and rely on manual refresh, so “live ritual pulse” requirement remains open.
- `actionPulse` and CTA gradient tokens are not applied, meaning attention hierarchy leans entirely on static styles.
- Dashboard analytics + education modules (empty tutorial, collecting tips) are absent, limiting insights for release/QA.

### Next Focus
1. Build `useSurveyStatus` hook with `refetchInterval`, jitter, and WebSocket fallback to keep responses + persona readiness hot.
2. Instrument CTA buttons with `guidanceInteractions.actionPulse` + event logging (`dashboard.cta.click`) gated by `useReducedMotion`.
3. Ship the onboarding checklist + tooltip copy described in §Empty State Blueprint to close the “Guided Onboarding” gap.

### Page Purpose: **INFORM + GUIDE**

**Core Intent:** Users land here to:
1. **INFORM:** See their persona creation status at a glance
2. **GUIDE:** Know the next required action with zero ambiguity

**Unique Experience:**  
State-driven UI that completely transforms based on user progress—each state tells a different visual story.

**Emotional Journey:** Control → Progress → Anticipation → Action

**Primary Goal:** Complete next step in persona creation (varies by state)

**How This Differs From Other Pages:**
- **vs. Landing:** Not selling/converting—user already committed
- **vs. Chat:** Not entertaining—focused on status & action
- **vs. Persona Room:** Not showcasing—showing journey state

---

## Purpose-Driven UX Design

### Visual Hierarchy for Status & Guidance

**Primary Focus (Z-Index 50):**
- **Status Card** - Current state dominates viewport
- **Primary Action Button** - Next step clearly visible
- **Progress Indicator** - Visual progress (when applicable)

**Secondary Focus (Z-Index 30):**
- **Header** - Welcome message with persona name (if active)
- **Survey Link Card** - Share functionality (when collecting)
- **Persona Card** - Preview (when active)

**Tertiary Focus (Z-Index 10):**
- **Quest Cards** - Secondary actions (below primary)
- **Navigation** - Logout, settings (top right)

### Micro-Interactions That Reinforce Purpose

**1. State Transitions (Status Clarity)**
- **Purpose:** Show progress through journey
- **Interaction:** Smooth fade between states
- **Feedback:** Card transforms based on state
- **Emotion:** Control → Progress

**2. Progress Bar Animation (Progress Visibility)**
- **Purpose:** Make progress tangible and motivating
- **Interaction:** Bar fills with shimmer effect
- **Feedback:** Percentage updates, visual fill
- **Emotion:** Progress → Anticipation

**3. Action Button States (Guidance)**
- **Purpose:** Make next step obvious and inviting
- **Interaction:** Button pulses when ready, glows when critical
- **Feedback:** Hover lift, click confirmation
- **Emotion:** Anticipation → Action

**4. Survey Link Sharing (Frictionless)**
- **Purpose:** Make sharing effortless
- **Interaction:** One-click copy, share modal opens
- **Feedback:** Copy confirmation, share options visible
- **Emotion:** Pride → Sharing

### Emotional Resonance Strategy

**Control Phase (Empty State):**
- **Visual:** Centered card with numbered steps
- **Copy:** "Your Journey Begins" + clear steps
- **Action:** User knows exactly what to do first

**Progress Phase (Collecting State):**
- **Visual:** Progress bar with shimmer, response count
- **Copy:** "X of Y responses received" + encouragement
- **Action:** User sees progress, motivated to share

**Anticipation Phase (Ready State):**
- **Visual:** Glowing button, 100% progress
- **Copy:** "SUMMON READY" + excitement
- **Action:** User ready to create persona

**Action Phase (Active State):**
- **Visual:** Persona card prominent, chat button
- **Copy:** "Persona Active" + persona name
- **Action:** User engages with persona

### Visual Patterns for Status & Guidance

**Layout Strategy:**
- **State-Driven:** UI completely transforms per state
- **Card-Based:** Information grouped in clear cards
- **Action-Oriented:** Primary action always visible
- **Progressive Disclosure:** Details revealed as needed

**Color Strategy:**
- **State Colors:** 
  - Empty: Neutral (gray)
  - Collecting: Blue (calming progress)
  - Ready: Fuchsia (excitement)
  - Active: Primary (engagement)
- **Status Indicators:** Color-coded borders, badges

**Animation Strategy:**
- **State Transitions:** 0.4s fade between states
- **Progress Animations:** Smooth fill, shimmer effects
- **Button Animations:** Pulse for ready, glow for critical
- **Reduced Motion:** Static states available

---

## Visual Purpose Communication

### State 1: Empty State - "GET STARTED"

**Purpose:** Guide new users to first action

**ASCII Mockup:**
```
┌────────────────────────────────────────┐
│  Welcome, Seeker ✨                      │
│  Memory Crystals: 0 💎                    │
│────────────────────────────────────────│
│                                          │
│   ╭─────────────────────────────╮         │
│   │ 🗺️  Your Journey Begins       │         │
│   │  ─────────────────────   │         │
│   │  1. Create Perception Ritual  │         │
│   │  2. Share with friends        │         │
│   │  3. Collect 3 Echoes          │         │
│   │  4. Summon your Persona       │         │
│   │                              │         │
│   │  [🌟 Create First Ritual]  │ ← Pulsing │
│   ╰─────────────────────────────╯         │
│                                          │
└────────────────────────────────────────┘
```

**Visual Pattern:**
- **Layout:** Single centered card (no distractions)
- **Hierarchy:** Numbered steps + massive CTA
- **Color:** Neutral background, fuchsia CTA
- **Animation:** CTA pulses gently (inviting)

### State 2: Collecting State - "KEEP GOING"

**Purpose:** Show progress and encourage sharing

**ASCII Mockup:**
```
┌────────────────────────────────────────┐
│  Welcome back ✨                        │
│  Memory Crystals: 25 💎                   │
│────────────────────────────────────────│
│                                          │
│   ╭─────────────────────────────╮         │
│   │ 🔮  Echoes Collected           │         │
│   │  ─────────────────────   │         │
│   │  ██████████░░░░░ 67% (2/3) │ ← Shimmer│
│   │  ↑ Animated fill             │         |
│   │                              │         │
│   │  "One more Echo needed..."    │ ← Fade  │
│   │  ↑ Gentle fade in/out         │         │
│   │                              │         │
│   │  [🔗 Share Ritual Link]     │ ← Blue  │
│   ╰─────────────────────────────╯         │
│                                          │
└────────────────────────────────────────┘
```

**Visual Pattern:**
- **Layout:** Progress card dominates
- **Hierarchy:** Progress bar → Status text → Share CTA
- **Color:** Blue accents (calming progress)
- **Animation:** Bar fills + shimmer effect, text pulses

### State 3: Ready State - "TAKE ACTION"

**Purpose:** Celebrate completion and direct to summoning

**ASCII Mockup:**
```
┌────────────────────────────────────────┐
│  The time has come ✨🌟                   │
│  Memory Crystals: 50 💎                   │
│────────────────────────────────────────│
│                                          │
│   ╭─────────────────────────────╮         │
│   │ ⚡ SUMMON READY ⚡             │         │
│   │  ─────────────────────   │         │
│   │  ███████████████ 100% ✓   │ ← Gold  │
│   │  ↑ Pulsing gold gradient      │   pulse │
│   │                              │         │
│   │  ┌──────────────────────┐ │         │
│   │  │ [SUMMON PERSONA NOW!] │ │ ← Glow+ │
│   │  │  ↑ Glow + bounce      │ │   bounce │
│   │  └──────────────────────┘ │         │
│   │                              │         │
│   ╰─────────────────────────────╯         │
│                                          │
└────────────────────────────────────────┘
```

**Visual Pattern:**
- **Layout:** Celebration card with dramatic CTA
- **Hierarchy:** Status badge → 100% bar → HUGE CTA
- **Color:** Gold gradient (achievement)
- **Animation:** Glow pulse + bounce (excitement)

### State 4: Active Persona State - "ENGAGE"

**Purpose:** Show persona and encourage interaction

**ASCII Mockup:**
```
┌────────────────────────────────────────┐
│  Welcome back. The Mystic awaits... ✨    │
│  Memory Crystals: 150 💎  Bond: Lv 3 ❤️    │
│────────────────────────────────────────│
│                                          │
│   ╭─────────╮  ╭────────────────╮      │
│   │ PERSONA │  │ Quick Actions  │      │
│   │  CARD   │  │────────────────│      │
│   │ [Image]│  │ 💬 Chat Now    │      │
│   │   SSR  │  │ 🎯 View Quests │      │
│   ╰─────────╯  │ 💎 Check Shop  │      │
│               ╰────────────────╯      │
│                                          │
└────────────────────────────────────────┘
```

**Visual Pattern:**
- **Layout:** Split view (Persona + Actions)
- **Hierarchy:** Persona card → Primary action (Chat) → Secondary actions
- **Color:** Vibrant (persona achieved)
- **Animation:** Persona card subtle float, action buttons on hover

## Current State Analysis

### Strengths
- State-driven architecture (Ready, Creating, Empty)
- Clear status indicators
- Contextual CTAs
- Minimal design

### Weaknesses
- **Utilitarian UI:** Fails to visually represent the "Hero's Journey" narrative. The interface looks like a standard admin panel rather than a magical gateway.
- **Static Status:** "Echoes" and "Crystals" feel like static numbers, not magical resources. There is no visual feedback when these values change.
- **Disconnected States:** Transition between "Collecting" and "Ready" lacks celebration. The user achieves a milestone but the UI just quietly switches state.
- **Low Urgency:** No visual cues to prompt the next specific action. The "Next Step" blends in with other UI elements.
- **Accessibility Gaps:** Navigation is not optimized for keyboard/screen readers. Dynamic state changes are not announced.

---

## Detailed UX/UI Weakness Analysis

| Weakness | UX Impact | UI Manifestation |
|----------|-----------|------------------|
| **Utilitarian UI** | Breaks immersion; feels like "work" instead of a "journey". | Flat cards, standard Bootstrap-like grid, lack of thematic textures or depth. |
| **Static Status** | Reduces motivation; progress feels abstract. | "Echoes: 3/5" is just text. No filling bar, no particle effects on increment. |
| **Disconnected States** | Missed emotional peak; user doesn't feel "accomplished". | State change is an instant re-render. No transition animation or "Level Up" overlay. |
| **Low Urgency** | Cognitive load increases; user has to "find" the next step. | Primary CTA has same visual weight as secondary buttons. No pulsing or guiding motion. |

---

## Enhancement Goals & Mitigation Strategies

### 1. Narrative UI (Mitigates: Utilitarian UI)
**Goal:** Transform the dashboard into a "Hero's Journey" map.
**Strategy:**
- **Visual Storytelling:** Use the "Small Switch Palette" to create depth. Use darker tones for "Empty" states and vibrant, glowing tones for "Ready" states.
- **Thematic Assets:** Replace standard icons with "Magical" iconography (Crystals, Scrolls) defined in the design system.

### 2. Dynamic Status (Mitigates: Static Status)
**Goal:** Make resources feel alive and valuable.
**Strategy:**
- **Animated Counters:** Use `micro-interactions.ts` to animate number increments (count-up effect).
- **Resource Glow:** Implement a subtle "pulse" animation on the Echo counter when a new survey response is received (detected via polling or websocket).

### 3. Celebratory Transitions (Mitigates: Disconnected States)
**Goal:** Create emotional peaks at milestones.
**Strategy:**
- **State Morphing:** Animate the transition between dashboard states (e.g., "Collecting" card dissolving into a glowing "Summon Ready" card).
- **Confetti/Particles:** Trigger a particle explosion (using `particleSystem`) when the "Ready" state is reached.

### 4. Visual Urgency (Mitigates: Low Urgency)
**Goal:** Guide users instinctively to the next action.
**Strategy:**
- **Action Pulse:** Apply `guidanceInteractions.actionPulse` to the primary CTA (e.g., "Summon Persona").
- **Focus Mode:** Dim secondary elements slightly when a critical action is pending, creating a "spotlight" effect on the CTA.

### 5. Inclusive Navigation (Mitigates: Accessibility Gaps)
**Goal:** Ensure the dashboard is usable by all.
**Strategy:**
- **Live Regions:** Wrap the status card in `aria-live="polite"` so state changes are announced.
- **Focus Management:** Automatically move focus to the Primary CTA when the state changes to "Ready".

### Success Metrics
- **Status Recognition Time:** <1 second
- **Action Clarity:** >90% users understand next step
- **Error Recovery Rate:** >85%
- **Accessibility Score:** 100% WCAG AA

---

## UX Risk Mitigation Strategies

### 1. Metaphor Ambiguity (Cognitive Load)
**Risk:** Users may not understand what "Echoes" or "Crystals" actually represent functionally.
**Mitigation:**
- **Contextual Tooltips:** Hovering over "Echoes" shows "Survey Responses collected".
- **Onboarding Coach Marks:** First-time visit highlights key metrics with plain-language explanations.
- **Legend/Key:** A subtle "Guide" icon that explains the dashboard symbols.

### 2. Visual Overload (Clarity)
**Risk:** Too many "magical" glowing elements can distract from the primary action.
**Mitigation:**
- **Focus Mode:** Only the *next immediate action* pulses; secondary elements remain static.
- **Visual Hierarchy:** Ensure text contrast is high (WCAG AA) even on "magical" backgrounds.

---

## Component Structure (Actual Implementation)

### Current Architecture (v1.1.0)

```
pages/
└── dashboard/
    └── page.tsx                      # Main dashboard container (flex layout)

organisms/
├── DashboardSidebar.tsx              # Left navigation panel
│   ├── Server info (Re:MirAI branding)
│   ├── Channel list navigation
│   └── User panel (avatar, status)
├── DashboardChatArea.tsx             # Center chat/messaging area
│   ├── Quick Actions card grid
│   ├── Messages container (scrollable)
│   └── Input area (message input + send button)
└── DashboardRightPanel.tsx           # Right status panel
    ├── Persona Status card
    ├── Survey Progress card
    ├── Active Quests list
    └── Quick Action buttons
```

### Component Details

#### DashboardSidebar
- **File**: [DashboardSidebar.tsx](file:///d:/UTS/ToyProjecT_2/frontend/src/components/organisms/DashboardSidebar.tsx)
- **Purpose**: Navigation and user identity
- **Features**:
  - Server branding ("R" icon + "Re:MirAI" title)
  - Navigation channels with active state highlighting  
  - User avatar with online status
  - Pathname-based active link detection

#### DashboardChatArea
- **File**: [DashboardChatArea.tsx](file:///d:/UTS/ToyProjecT_2/frontend/src/components/organisms/DashboardChatArea.tsx)
- **Purpose**: Primary interaction area combining quick actions and messaging
- **Features**:
  - **Quick Actions Grid**: 3 action cards (Create Survey, Daily Ritual, Persona Sync)
  - **Message Display**: Typed messages (user/system/persona) with animations
  - **Chat Input**: Text input with Enter key handler + Send button
  - **Local State**: Messages managed with useState hook

#### DashboardRightPanel
- **File**: [DashboardRightPanel.tsx](file:///d:/UTS/ToyProjecT_2/frontend/src/components/organisms/DashboardRightPanel.tsx)
- **Purpose**: Status monitoring and quick actions
- **Features**:
  - **Persona Status**: Level, Bond percentage, Essence count
  - **Survey Progress**: Active survey badge, response counter, progress bar
  - **Active Quests**: Daily Ritual progress, Persona Sync status
  - **Action Buttons**: "Start Ritual", "Sync Persona"

### Data Flow (Current Implementation)

```
┌──────────────────┐
│  authStore       │ ─── User authentication state
└──────────────────┘      │
                          ↓
┌────────────────────────────────────────────────┐
│  DashboardPage (page.tsx)                      │
│  - Auth check & redirect                       │
│  - Layout container (flex row)                 │
└────────────────────────────────────────────────┘
         │              │              │
         ↓              ↓              ↓
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│  Sidebar     │ │  ChatArea    │ │ RightPanel   │
│  - User data │ │  - Messages  │ │ - Mock data  │
│  - Pathname  │ │  - Actions   │ │ - Static UI  │
└──────────────┘ └──────────────┘ └──────────────┘
```

### Planned Component Structure (Original Design - For Reference)

<details>
<summary>Click to expand original atomic design plan</summary>

```
atoms/
├── StatusBadge.tsx               # Status indicator
├── ProgressBar.tsx                # Progress visualization
└── LoadingSkeleton.tsx             # Loading placeholder

molecules/
├── PersonaStatusCard.tsx         # Status display
├── ActionCard.tsx                # Contextual actions
├── ProgressCard.tsx               # Progress tracking
└── SurveyLinkCard.tsx            # Link sharing

organisms/
├── PrimaryStatusBlock.tsx        # Group A
├── ContextualActionBlock.tsx     # Group B
└── SupplementalBlock.tsx         # Group C

pages/
└── DashboardPage.tsx              # Page container
```

</details>

---

## Current Implementation Details (v1.1.0)

### Chat System Integration

**Message Interface:**
```typescript
interface Message {
  id: string;
  type: 'user' | 'system' | 'persona';
  content: string;
  timestamp: Date;
}
```

**Features:**
- **Message Types**: Three distinct message variants with different styling
  - `user`: Right-aligned, primary color background
  - `system`: Center-aligned, tertiary background, system announcements
  - `persona`: Left-aligned, elevated surface with border
- **Message Display**: Animated slide-in effect (translateY + opacity)
- **Input Handling**: 
  - Text input with real-time state management
  - Enter key submission support
  - Send button with disabled state when empty
- **Initial State**: Welcome message from system on mount

### Quick Actions Implementation

**Grid System:**
- Responsive grid: `repeat(auto-fit, minmax(280px, 1fr))`
- 16px gap between cards
- Three action cards with consistent structure

**Card Structure:**
```tsx
<Link href="/route" className={styles.actionCard}>
  <div className={styles.actionIcon}>Icon</div>
  <div className={styles.actionContent}>
    <h3>Title</h3>
    <p>Description</p>
  </div>
</Link>
```

**Actions:**
1. **Create New Survey** → `/dashboard/create-survey`
2. **Daily Ritual** → `/dashboard/ritual`
3. **Persona Sync** → `/dashboard/synthesize`

### Styling Approach

**Color System (Switch Palette):**
- Primary: `#F3C5FF` (Fuchsia - links, highlights)
- Text: `#FEFEDF` (Light Yellow - main text)
- Accent: `#00C9A7` (Teal - action icons)
- Backgrounds: RGBA variations of F3C5FF for depth

**Animation Tokens:**
```css
/* Message slide-in */
@keyframes messageSlideIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Action card hover */
.actionCard:hover {
  transform: translateY(-4px);
  border-color: #f3c5ff;
}
```

**Layout Structure:**
```css
.dashboard {
  display: flex;           /* 3-column layout */
  width: 100vw;
  height: 100vh;
  overflow: hidden;        /* Fixed viewport */
}

.chatArea {
  flex: 1;                 /* Takes remaining space */
  display: flex;
  flex-direction: column;  /* Quick Actions → Messages → Input */
}
```

### User Interactions

**Message Sending Flow:**
1. User types in input field → `setInputValue(e.target.value)`
2. User presses Enter or clicks Send → `handleSend()`
3. Validation: Check if `inputValue.trim()` is not empty
4. Create message object with timestamp
5. Append to messages array → `setMessages([...messages, newMessage])`
6. Clear input → `setInputValue('')`
7. Message appears with slide-in animation

**Navigation Flow:**
- Sidebar channels update active state based on `usePathname()`
- Quick action cards use Next.js `<Link>` for client-side navigation
- Right panel buttons are currently static (future: routing)

### State Management

**Current State:**
- **Local Component State**: Messages managed in `DashboardChatArea`
- **Auth State**: Global store via `useAuthStore()` (Zustand)
- **Router State**: `usePathname()` and `useRouter()` from Next.js

**Pending Backend Integration:**
- Chat API connection for real-time messaging
- Persona API for dynamic status updates
- Survey API for progress polling
- Quest API for gamification data

---

## Nielsen's Heuristics Compliance

### 1. Visibility of System Status ✅

**Enhancements:**
- Real-time status updates
- Progress percentage display
- Time estimates for operations
- Live polling for Creating state

**Implementation:**
```tsx
// molecules/PersonaStatusCard.tsx
<PersonaStatusCard 
  status={personaStatus}
  progress={progressPercentage}
  estimatedTime={estimatedTime}
  lastUpdated={lastUpdated}
  aria-live="polite"
/>
```

### 2. Match Between System and Real World ✅

**Enhancements:**
- Replace "Ritual" with "Survey"
- Use familiar progress terminology
- Clear status descriptions

**Implementation:**
- Status labels: "Ready", "Collecting Feedback", "Getting Started"
- Progress: "3 of 5 responses collected"
- Time: "Estimated 2 minutes remaining"

### 3. User Control and Freedom ✅

**Enhancements:**
- Cancel survey creation
- Edit survey settings
- Dismiss notifications
- Back navigation

**Implementation:**
```tsx
// molecules/ActionCard.tsx
<ActionCard 
  primaryAction={primaryCTA}
  secondaryActions={[
    { label: "Cancel", onClick: handleCancel },
    { label: "Edit", onClick: handleEdit }
  ]}
/>
```

### 4. Consistency and Standards ✅

**Enhancements:**
- Unified status indicators
- Consistent CTA styling
- Standard spacing (4px grid)
- Unified error message format

**Implementation:**
- Use design tokens for all styling
- Follow Blonix Branch color system
- Maintain consistent typography
- Standardize button variants

### 5. Error Prevention ✅

**Enhancements:**
- Disable invalid actions
- Confirm destructive actions
- Validate before submission
- Prevent duplicate requests

**Implementation:**
```tsx
<Button 
  disabled={!canSummon || isProcessing}
  onClick={handleSummon}
  aria-disabled={!canSummon}
>
  {canSummon ? "Begin Summoning" : `${needed} more responses needed`}
</Button>
```

### 6. Recognition Rather Than Recall ✅

**Enhancements:**
- Visible status at all times
- Breadcrumb navigation
- Recent activity display
- Contextual tooltips

**Implementation:**
```tsx
// molecules/Breadcrumb.tsx
<Breadcrumb 
  items={[
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" }
  ]}
/>

// molecules/RecentActivity.tsx
<RecentActivity 
  activities={[
    { type: "survey_created", time: "2 hours ago" },
    { type: "response_received", time: "1 hour ago" }
  ]}
/>
```

### 7. Flexibility and Efficiency of Use ✅

**Enhancements:**
- Keyboard shortcuts
- Quick actions menu
- Bulk operations
- Customizable dashboard

**Implementation:**
```tsx
// Keyboard shortcuts
const shortcuts = {
  'c': () => createSurvey(),
  's': () => shareLink(),
  'r': () => refreshStatus(),
  '?': () => showHelp()
};
```

### 8. Aesthetic and Minimalist Design ✅

**Enhancements:**
- Progressive disclosure
- Hide advanced options
- Prioritize content
- Reduce visual clutter

**Implementation:**
- Show only relevant information
- Collapse supplemental block by default
- Use accordions for details
- Minimize decorative elements

### 9. Help Users Recognize, Diagnose, and Recover from Errors ✅

**Enhancements:**
- Specific error messages
- Suggested solutions
- Retry buttons
- Error recovery flows

**Implementation:**
```tsx
// molecules/ErrorMessage.tsx
<ErrorMessage 
  error={error}
  onRetry={handleRetry}
  suggestions={getErrorSuggestions(error)}
  recoveryActions={getRecoveryActions(error)}
/>
```

### 10. Help and Documentation ✅

**Enhancements:**
- Contextual tooltips
- Help section
- FAQ links
- Onboarding reminders

**Implementation:**
```tsx
// molecules/HelpTooltip.tsx
<HelpTooltip 
  content="Your persona status shows if you're ready to chat or still collecting feedback"
  position="right"
>
  <IconHelp />
</HelpTooltip>
```

---

## State-Specific Enhancements

### Ready State

**Enhancements:**
- Persona preview card
- Quick chat button
- Share options
- Stats display

**Components:**
```tsx
<PrimaryStatusBlock>
  <PersonaStatusCard status="ready" />
  <PersonaPreviewCard persona={persona} />
</PrimaryStatusBlock>

<ContextualActionBlock>
  <ActionCard 
    primaryAction={{
      label: "Chat with Your Persona",
      onClick: () => navigate(`/chat/${persona.id}`)
    }}
    secondaryActions={[
      { label: "Share Profile", onClick: handleShare },
      { label: "View Details", onClick: handleViewDetails }
    ]}
  />
</ContextualActionBlock>
```

### Creating State

**Enhancements:**
- Real-time progress updates
- Response counter
- Time estimate
- Share link prominently

**Components:**
```tsx
<PrimaryStatusBlock>
  <PersonaStatusCard status="creating" />
  <ProgressCard 
    current={responseCount}
    target={minimumResponses}
    percentage={progressPercentage}
    estimatedTime={estimatedTime}
  />
</PrimaryStatusBlock>

<ContextualActionBlock>
  <SurveyLinkCard 
    link={surveyLink}
    onCopy={handleCopy}
    onShare={handleShare}
  />
  <ActionCard 
    primaryAction={{
      label: "Share Survey Link",
      onClick: handleShare,
      variant: "primary"
    }}
  />
</ContextualActionBlock>
```

### Empty State

**Enhancements:**
- Clear call-to-action
- Onboarding guidance
- Example preview
- Helpful tips

**Components:**
```tsx
<PrimaryStatusBlock>
  <EmptyStateCard 
    title="Start Your Journey"
    description="Create a survey to collect feedback and discover your persona"
    illustration={<EmptyStateIllustration />}
  />
</PrimaryStatusBlock>

<ContextualActionBlock>
  <ActionCard 
    primaryAction={{
      label: "Start Collecting Feedback",
      onClick: handleCreateSurvey,
      variant: "primary",
      size: "lg"
    }}
    helpText="Learn how it works"
  />
</ContextualActionBlock>
```

---

## Real-time Updates

### Polling Strategy

```tsx
// hooks/usePersonaStatus.ts
const usePersonaStatus = (personaId: string) => {
  const [status, setStatus] = useState<PersonaStatus>('empty');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (status === 'creating') {
      const interval = setInterval(async () => {
        const updated = await fetchPersonaStatus(personaId);
        setStatus(updated.status);
        setProgress(updated.progress);
        
        if (updated.status === 'ready') {
          clearInterval(interval);
        }
      }, 5000); // Poll every 5 seconds

      return () => clearInterval(interval);
    }
  }, [personaId, status]);

  return { status, progress };
};
```

### WebSocket Integration (Future)

```tsx
// hooks/useRealtimeStatus.ts
const useRealtimeStatus = (personaId: string) => {
  const [status, setStatus] = useState<PersonaStatus>('empty');

  useEffect(() => {
    const ws = new WebSocket(`/ws/persona/${personaId}`);
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setStatus(data.status);
    };

    return () => ws.close();
  }, [personaId]);

  return status;
};
```

---

## Accessibility Enhancements

### WCAG 2.1 AA Compliance

**Status Announcements:**
```tsx
<div 
  role="status" 
  aria-live="polite" 
  aria-atomic="true"
>
  {status === 'ready' && "Your persona is ready to chat"}
  {status === 'creating' && `Collecting feedback: ${progress}% complete`}
  {status === 'empty' && "Ready to start collecting feedback"}
</div>
```

**Keyboard Navigation:**
- Tab order: Status → Primary CTA → Secondary actions
- Enter/Space: Activate buttons
- Arrow keys: Navigate cards (if applicable)

**Screen Readers:**
- ARIA labels for all interactive elements
- Status announcements for state changes
- Progress announcements for updates

---

## Performance Optimization

### Loading Strategy
1. **Skeleton UI:** Show loading placeholders
2. **Progressive Loading:** Load critical content first
3. **Code Splitting:** Lazy load non-critical components
4. **Caching:** Cache persona status

### Optimization Targets
- First Contentful Paint: <1.5 seconds
- Time to Interactive: <2 seconds
- Status Update Latency: <500ms

---

## Testing Plan

### Unit Tests
- State management
- Component rendering
- Progress calculations
- Error handling

### Integration Tests
- State transitions
- Real-time updates
- CTA flows
- Navigation

### E2E Tests
- Complete user journey
- State-specific flows
- Error scenarios
- Cross-browser testing

### Accessibility Tests
- Screen reader compatibility
- Keyboard navigation
- Color contrast
- ARIA labels

---

## Implementation Phases

### Phase 1: Foundation (Week 1)
- [ ] Enhance status visibility
- [ ] Add real-time updates
- [ ] Improve error handling
- [ ] Add accessibility features

### Phase 2: Enhancement (Week 2)
- [ ] Add keyboard shortcuts
- [ ] Implement progress tracking
- [ ] Add help tooltips
- [ ] Optimize performance

### Phase 3: Refinement (Week 3)
- [ ] User testing
- [ ] A/B testing
- [ ] Performance optimization
- [ ] Documentation

### Phase 4: Launch (Week 4)
- [ ] Final QA
- [ ] Monitoring setup
- [ ] Analytics integration
- [ ] Gradual rollout

---

## Success Criteria

### Usability Metrics
- ✅ Status recognition: <1 second
- ✅ Action clarity: >90%
- ✅ Error recovery: >85%
- ✅ User satisfaction: >4.5/5

### Technical Metrics
- ✅ Page load time: <2 seconds
- ✅ Status update latency: <500ms
- ✅ Lighthouse score: >90
- ✅ Accessibility score: 100

---

## Related Documents

- [Dashboard Page Analysis](../05-analysis/page-analysis/03-Dashboard-Page-Analysis.md)
- [Nielsen's Heuristics Audit](../05-analysis/01-Nielsen-Heuristics-Audit.md)
- [Design Philosophy](../02-project-overview/03-Design-Philosophy.md)

---

**Next Steps:**
1. Review state management requirements
2. Implement real-time updates
3. Set up analytics tracking
4. Begin Phase 1 implementation

