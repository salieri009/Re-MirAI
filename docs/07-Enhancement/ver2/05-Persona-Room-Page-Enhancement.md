# Persona Room Page Enhancement Plan (ver2)

**Version:** 2.0.0
**Last Updated:** 2025-11-27
**Status:** 📝 Planning (Design Phase)
**Route:** `/p/:id`
**Component:** `PersonaRoomPage` (Page level)
**Design Systems:** Tailwind Custom Config (Plus Jakarta Sans, Unified Color Palette)

> [!IMPORTANT]
> **Version 2 Design:** This document outlines the **Version 2** enhancement plan. It uses a specific HTML reference implementation as the source of truth for visual design, adapted to the unified Re:MirAI color palette.

---

## 🔴 UX/UI Expert Review (Design Rationale)

### Critical Issues Addressed by ver2 Design

#### 1. Visual Showcase & Pride
**Previous State:** Static profile page, persona felt like data, not a creation.
**ver2 Solution:**
- **Large Hero Image:** Full aspect-square visual dominates the left pane, making the persona feel like an artwork.
- **Archetype Badge:** Prominent pill badge ("The Visionary") immediately communicates persona identity.
- **Radar Chart:** Interactive SVG polygon visualizes persona statistics in an engaging, scannable format.

#### 2. Actionable Engagement
**Previous State:** Unclear next steps after viewing persona.
**ver2 Solution:**
- **Dual CTAs:** "Chat with Your Persona" (primary) and "Create Your Own Persona" (secondary) provide clear paths forward.
- **Share Button:** Prominent share CTA encourages viral distribution.

#### 3. In-Depth Understanding
**Previous State:** Surface-level trait lists.
**ver2 Solution:**
- **Key Traits with Icons:** Each trait has a Material Symbol icon and detailed description.
- **In-Depth Analysis:** Multi-paragraph narrative explaining the persona's psychological profile.

---

## Current Implementation Status

### ✅ Design Ready (Reference Implementation)
- **HTML Structure:** Complete two-column layout with visual + details panels.
- **Styling:** Tailwind CSS configuration defined.
- **Radar Chart:** Inline SVG for persona statistics visualization.

### ⏳ Pending Implementation
- **React Component Migration:** Converting static HTML to Next.js/React components.
- **Dynamic Data:** Fetching persona data from API based on ID param.
- **Share Modal:** Implementing platform-specific share functionality.
- **Color Unification:** Adapting provided colors to Re:MirAI's unified palette.

---

## Design Compliance

This design adheres to key feature requirements:

### ✅ F-002: Persona Synthesis
- **Persona Display:** Complete visual and textual representation of synthesized persona.
- **Statistics:** Radar chart showing personality dimensions.

### ✅ F-004: Persona Card
- **Shareable Asset:** Visual + badge design optimized for social sharing.
- **Export Functionality:** Share button enables viral distribution.

### ✅ F-006: Gamification
- **Achievement Context:** Persona creation is the payoff for completing surveys and quests.

---

## Design Philosophy (ver2)

**Core Concept:** **"The Gallery"** — A personal museum where users admire and interact with their created personas.

**Visual Identity:**
- **Palette (Unified):**
  - `primary`: #845EC2 (Amethyst Purple) - Primary actions (Chat)
  - `accent`: #00c9a7 (Mint Green) - Secondary actions (Share)
  - `highlight`: #c197ff (Light Lavender) - Archetype badge, accents
  - `background-dark`: #0A0112 (Deep Dark) - Dark mode base
- **Typography:** `Plus Jakarta Sans` for modern, friendly readability.
- **Layout:** Asymmetric two-column grid (4:6 ratio on desktop) creates visual interest.

---

## Executive Summary

The Persona Room is where users **celebrate** their creation. This ver2 design transforms the page from a static profile into an interactive showcase:
- **Left Pane:** Hero image with share button creates immediate visual impact.
- **Right Pane:** Scrollable details (archetype, stats, traits, analysis) invite deep exploration.

By unifying colors with the Landing Page palette and prioritizing visual storytelling, this page becomes a source of pride and a driver of sharing.

---

## Reference Implementation (Target Design - Color Adjusted)

The following HTML structure is the **definitive source of truth** for the ver2 visual design, with colors adjusted to match Re:MirAI's unified palette.

```html
<!DOCTYPE html>
<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<title>Re:MirAI - Your Persona</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet"/>
<script id="tailwind-config">
  tailwind.config = {
    darkMode: "class",
    theme: {
      extend: {
        colors: {
          "primary": "#845EC2",       // Unified Purple
          "accent": "#00c9a7",         // Unified Mint Green
          "highlight": "#c197ff",      // Light Lavender
          "background-light": "#f8f6f7",
          "background-dark": "#0A0112",
          "border-light": "#E5E7EB",
          "border-dark": "#374151"
        },
        fontFamily: {
          "display": ["Plus Jakarta Sans", "sans-serif"]
        },
      },
    },
  }
</script>
</head>
<body class="font-display bg-background-light dark:bg-background-dark">
<!-- Two-Column Layout: Visual Showcase (Left) + Details Panel (Right) -->
<!-- (Full HTML structure similar to provided, with unified colors) -->
</body></html>
```

---

## Purpose-Driven UX Design

### Detailed UX/UI Analysis (ver2)

### Strengths
- **Immediate Impact:** Hero image creates "wow" moment on page load.
- **Information Density:** Radar chart packs 5 data points into a single, scannable visual.
- **Clear Hierarchy:** Archetype → Stats → Traits → Analysis flows naturally for progressive disclosure.

### Enhancement Goals
- **Interactive Radar Chart:** Allow users to hover over each axis for detailed explanations.
- **Animated Entrance:** Fade-in animation for sections as user scrolls.
- **Mobile Optimization:** Stack columns vertically on small screens, ensure hero image remains full-width.

---

## Implementation Plan

### 1. Component Breakdown
- `atoms/ArchetypeBadge.tsx`: Pill badge for persona archetype
- `atoms/TraitListItem.tsx`: Single trait with icon and description
- `molecules/PersonaHeroCard.tsx`: Left pane visual + share button
- `molecules/RadarChart.tsx`: SVG radar chart (reusable for comparisons)
- `organisms/PersonaDetailsPanel.tsx`: Right pane scrollable content
- `pages/PersonaRoomPage.tsx`: Main layout orchestrator

### 2. Data Structure

```typescript
interface Persona {
  id: string;
  name: string;
  archetype: string;
  image: string;
  stats: {
    creativity: number;    // 0-100
    logic: number;
    empathy: number;
    ambition: number;
    openness: number;
  };
  traits: Array<{
    icon: string;          // Material Symbol name
    title: string;
    description: string;
  }>;
  analysis: string[];      // Array of paragraphs
}
```

### 3. Tailwind Configuration
- **Colors:** Unified palette applied to badges, buttons, borders.
- **Responsive Grid:** `grid-cols-1 lg:grid-cols-10` (4 cols left, 6 cols right on desktop).

### 4. Asset Integration
- **Icons:** Material Symbols (`emoji_objects`, `rocket_launch`, `record_voice_over`, `ios_share`, `chat`, `auto_awesome`)
- **Images:** Dynamic persona visuals generated during synthesis or uploaded.

---

## Frontend Refactoring Plan

### Code Reusability

**Shared Components:**
- `RadarChart.tsx` can be reused in:
  - Persona comparison feature (future)
  - Dashboard analytics
- `ArchetypeBadge.tsx` pattern applies to:
  - Quest categories (Persona Room)
  - Survey template tags (Survey Page)
- `ShareModal.tsx` (to be created) used across:
  - Persona Room (share persona card)
  - Chat Page (share conversation highlights)
  - Survey Hub (share survey link)

**Unified Layout Pattern:**
Create `layouts/TwoColumnLayout.tsx`:
```typescript
interface TwoColumnLayoutProps {
  left: ReactNode;      // Visual/Media column
  right: ReactNode;     // Content/Details column
  leftSpan?: number;    // Grid column span (default: 4)
  rightSpan?: number;   // Grid column span (default: 6)
}

export const TwoColumnLayout = ({ left, right, leftSpan = 4, rightSpan = 6 }) => (
  <div className="grid grid-cols-1 lg:grid-cols-10 lg:gap-12">
    <div className={`lg:col-span-${leftSpan}`}>{left}</div>
    <div className={`lg:col-span-${rightSpan}`}>{right}</div>
  </div>
);
```

### UX/UI Experience Improvements

**Progressive Disclosure:**
- Load hero image first (skeleton while loading details).
- Animate sections into view on scroll (Intersection Observer).
- Collapsible "In-Depth Analysis" section for users who want quick overview.

**Accessibility:**
- Radar chart has text alternative: "Creativity: 90/100, Logic: 80/100..."
- Keyboard navigation: Tab through CTA buttons, Enter to activate.
- Screen reader announcements: "Persona loaded: The Visionary archetype."

**Personalization:**
- Background theme adjusts based on persona archetype (warm colors for Creator, cool for Sage).
- Particle effects subtly animated based on persona "energy level."

### Organic Connections

**From Summoning Page:**
- "Explore My Persona" CTA → `/p/:id` (newly created persona).

**To Chat Page:**
- "Chat with Your Persona" button → `/chat/:id`.

**To Dashboard:**
- Breadcrumb or back button → `/dashboard`.

**Shared State:**
- Persona data cached in TanStack Query after synthesis.
- Share count tracked globally, visible in Persona Room and Dashboard.

---

## Color Palette Unification

### Original HTML Colors → Unified Palette

| Element | Original Color | Unified Color | Variable Name |
|---------|----------------|----------------|---------------|
| Primary CTA (Chat) | #d946ef (Magenta) | #845EC2 (Purple) | `primary` |
| Secondary CTA (Share) | #3b82f6 (Blue) | #00c9a7 (Mint Green) | `accent` |
| Archetype Badge | #d946ef (Magenta) | #c197ff (Light Lavender) | `highlight` |
| Radar Chart Stroke | #d946ef (Magenta) | #845EC2 (Purple) | `primary` |
| Trait Icons | #3b82f6 (Blue) | #00c9a7 (Mint Green) | `accent` |

**Gradient Adjustments:**
- Radar polygon fill: `rgba(132, 94, 194, 0.2)` (primary with transparency).
- Hero image overlay (if needed): `from-primary/10 to-accent/10`.

This ensures visual consistency across all Re:MirAI pages.

---

## Share Functionality Enhancement

### Component: ShareModal

**Features:**
- Platform-specific formatting (Instagram Story, Twitter Card, PNG download).
- Pre-generated image with persona visual + archetype badge + stats.
- Pre-written share messages:
  - **Instagram:** "Meet 'The Visionary' - my AI persona from @ReMirAI 🪞✨"
  - **Twitter:** "I just discovered my AI persona: The Visionary. What's yours? Discover at re-mir.ai #ReMirAI"

**Implementation:**
```typescript
const handleShare = async (platform: string) => {
  const image = await generatePersonaCard(persona); // Canvas API
  
  if (platform === 'download') {
    downloadBlob(image, `${persona.name}-persona.png`);
  } else if (navigator.share) {
    await navigator.share({
      title: `My Re:MirAI Persona: ${persona.archetype}`,
      text: getShareMessage(platform),
      files: [new File([image], 'persona.png', { type: 'image/png' })],
    });
  } else {
    // Fallback: copy image to clipboard + open share dialog
    copyImageToClipboard(image);
    toast.success('Image copied! Open your favorite app to share.');
  }
};
```

---

## Animation Specifications (Next.js App Router + React)

**Framework Context**: Next.js 14+ App Router, React 18+, TypeScript, GSAP 3.x

**Emotional Journey**: Pride → Exploration → Sharing

**Animation Philosophy**: Celebrate the user's creation. Make the persona feel like an achievement worth showing off.

### 1. Page Entrance Animation (Server → Client Transition)

**File**: `frontend/src/app/p/[id]/page.tsx`

**Next.js Context**: 
- Server Component fetches persona data
- Client Components handle animations
- Uses React `use()` for async params

**Implementation**:
```typescript
'use client';

import { use, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function PersonaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // Next.js 14+ async params
  const cardRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // Entrance animation after page loads
  useEffect(() => {
    if (!reducedMotion && cardRef.current) {
      gsap.from(cardRef.current, {
        opacity: 0,
        scale: 0.9,
        y: 30,
        duration: 0.8,
        ease: 'power2.out'
      });
    }
  }, [reducedMotion]);
  
  // ... rest of component
}
```

**Timeline**:
- **0.0s**: Server renders skeleton
- **0.2s**: Client hydration complete
- **0.3s**: Persona card fades in + scales up (0.8s)

### 2. Quest Card Celebration Animation

**File**: `frontend/src/app/p/[id]/page.tsx` (lines 57-99)

**Trigger**: User clicks "Claim Quest" button

**Current React Implementation**:
```typescript
const questCardRefs = useRef<Record<string, HTMLDivElement>>({});
const celebrationRef = useRef<HTMLDivElement>(null);

const handleClaimQuest = async (questId: string) => {
  const questCard = questCardRefs.current[questId];
  
  if (!reducedMotion && questCard) {
    // Stage 1: Card scale + rotation (0.3s)
    gsap.to(questCard, {
      scale: 1.1,
      rotation: 5,
      filter: 'brightness(1.3)',
      duration: 0.3,
      ease: 'back.out(1.7)',
    });
    
    // Stage 2: Celebration overlay (0.4s)
    if (celebrationRef.current) {
      gsap.fromTo(celebrationRef.current,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: 'back.out(1.7)',
          onComplete: () => {
            // Auto-dismiss after 1.5s
            gsap.to(celebrationRef.current, {
              opacity: 0,
              scale: 0.8,
              duration: 0.3,
              delay: 1.5,
            });
          },
        }
      );
    }
    
    // Stage 3: Screen reader announcement
    announce('Quest completed! Reward claimed.', 'assertive');
    
    // Stage 4: Reset card (after 500ms)
    setTimeout(() => {
      gsap.to(questCard, {
        scale: 1,
        rotation: 0,
        filter: 'brightness(1)',
        duration: 0.3,
      });
    }, 500);
  }
  
  setCompletedQuestId(questId);
  await questApi.claim(questId);
  
  // Reload page with new data
  setTimeout(() => {
    window.location.reload();
  }, reducedMotion ? 0 : 2000);
};
```

**Celebration Overlay JSX**:
```tsx
{completedQuestId && !reducedMotion && (
  <div ref={celebrationRef} className={styles.celebration} aria-live="polite">
    <div className={styles.celebrationContent}>
      <span className={styles.celebrationEmoji}>🎉</span>
      <h3>Quest Complete!</h3>
      <p>Reward claimed</p>
    </div>
  </div>
)}
```

**Visual Sequence**:
```
0.0s  │ User clicks "Claim"
      ├─ Card scales to 1.1x + tilts 5°
0.3s  ├─ Celebration overlay pops in (🎉)
      │  - Scale 0 → 1 with elastic bounce
1.8s  ├─ Celebration fades out
2.0s  └─ Page reloads with updated quest status
```

**Emotional Effect**: **Achievement → Pride → Joy**

### 3. Share Modal Animation (React Portal)

**File**: `frontend/src/components/organisms/ShareModal.tsx`

**Next.js Consideration**: Uses React Portal for overlay

**Implementation**:
```typescript
'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';

export function ShareModal({ 
  persona, 
  onShare, 
  onClose 
}: ShareModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Ensure portal only renders on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Entrance animation
  useEffect(() => {
    if (backdropRef.current && modalRef.current) {
      const tl = gsap.timeline();
      
      // Backdrop fade in
      tl.fromTo(backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2 }
      );
      
      // Modal slide up + fade
      tl.fromTo(modalRef.current,
        { y: 50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.7)' },
        '-=0.1' // Overlap with backdrop
      );
    }
  }, []);

  const handleClose = () => {
    if (backdropRef.current && modalRef.current) {
      const tl = gsap.timeline({ onComplete: onClose });
      
      // Reverse animation
      tl.to(modalRef.current, {
        y: 30,
        opacity: 0,
        scale: 0.95,
        duration: 0.2,
        ease: 'power2.in'
      });
      
      tl.to(backdropRef.current, {
        opacity: 0,
        duration: 0.15
      }, '-=0.1');
    } else {
      onClose();
    }
  };

  if (!mounted) return null;

  return createPortal(
    <>
      <div ref={backdropRef} className="backdrop" onClick={handleClose} />
      <div ref={modalRef} className="modal">
        {/* Modal content */}
      </div>
    </>,
    document.body
  );
}
```

**Next.js SSR Safety**: Modal only renders on client (no hydration mismatch)

### 4. Stats Panel Radar Chart Animation

**Component**: `StatsPanel.tsx` (displays persona stats)

**Data Fetching** (TanStack Query):
```typescript
const { data: persona } = useQuery({
  queryKey: ['persona', id],
  queryFn: () => personaApi.get(id),
});
```

**SVG Radar Chart Animation**:
```typescript
useEffect(() => {
  if (persona?.stats && radarPathRef.current) {
    // Animate radar polygon from center
    gsap.fromTo(radarPathRef.current,
      {
        attr: { points: getCenterPoints() }, // All points at (50, 50)
        opacity: 0
      },
      {
        attr: { points: getStatPoints(persona.stats) },
        opacity: 0.3,
        duration: 1.2,
        ease: 'power2.out'
      }
    );
  }
}, [persona]);

// Helper: Convert stats to SVG points
function getStatPoints(stats: PersonaStats): string {
  const angles = [0, 72, 144, 216, 288]; // 5 stats = pentagon
  return angles
    .map((angle, i) => {
      const value = Object.values(stats)[i] / 100; // Normalize 0-1
      const rad = (angle * Math.PI) / 180;
      const x = 50 + value * 40 * Math.cos(rad);
      const y = 50 + value * 40 * Math.sin(rad);
      return `${x},${y}`;
    })
    .join(' ');
}
```

**Visual**: Polygon expands from center like a "blooming" flower

### 5. Activity Feed Stagger

**Component**: `ActivityFeed.tsx`

**React Hook Pattern**:
```typescript
const [activityItems, setActivityItems] = useState<ActivityItem[]>([]);

useEffect(() => {
  // Fetch activity items
  const items = buildActivityItems(persona, quests, shareCount);
  setActivityItems(items);
  
  // Animate on mount
  if (!reducedMotion) {
    gsap.from('.activity-item', {
      opacity: 0,
      x: -20,
      duration: 0.4,
      stagger: 0.1, // 100ms between items
      ease: 'power2.out'
    });
  }
}, [persona, quests, shareCount, reducedMotion]);
```

**Stagger Effect**: Items appear top-to-bottom like a "timeline unfurling"

### 6. Button Hover Micro-Interactions

**Next.js Optimization**: Server-rendered buttons, client-side hover

```typescript
const chatButtonRef = useRef<HTMLButtonElement>(null);

<Button 
  ref={chatButtonRef}
  variant="primary"
  size="lg"
  onClick={() => router.push(`/chat/${persona.id}`)}
  onMouseEnter={() => {
    if (!reducedMotion && chatButtonRef.current) {
      gsap.to(chatButtonRef.current, {
        scale: 1.05,
        boxShadow: '0 0 32px rgba(0, 201, 167, 0.4)',
        duration: 0.15,
        ease: 'power2.out'
      });
    }
  }}
  onMouseLeave={() => {
    if (chatButtonRef.current) {
      gsap.to(chatButtonRef.current, {
        scale: 1,
        boxShadow: 'none',
        duration: 0.2
      });
    }
  }}
>
  💬 Chat with {persona.name}
</Button>
```

**Why ref over querySelectorAll**: Type-safe, avoids DOM queries

### 7. Share Button Success Feedback

**After user shares persona**:
```typescript
const handleShare = (platform: string) => {
  // ... share logic
  
  // Success animation
  if (shareButtonRef.current) {
    gsap.timeline()
      .to(shareButtonRef.current, {
        scale: 0.9,
        duration: 0.1
      })
      .to(shareButtonRef.current, {
        scale: 1.1,
        backgroundColor: '#00c9a7', // Accent color
        duration: 0.2,
        ease: 'back.out(1.7)'
      })
      .to(shareButtonRef.current, {
        scale: 1,
        duration: 0.2
      });
  }
  
  // Visual checkmark
  toast.success('Link copied! Share with friends 🎉');
  
  // Update share count
  setShareCount(prev => prev + 1);
};
```

**Emotional Effect**: Instant gratification for social sharing

---

## React State Management for Animations

### Using Zustand for Animation State (if needed)

```typescript
// stores/animationStore.ts
import { create } from 'zustand';

interface AnimationState {
  isAnimating: boolean;
  completedQuests: Set<string>;
  setAnimating: (value: boolean) => void;
  markQuestComplete: (questId: string) => void;
}

export const useAnimationStore = create<AnimationState>((set) => ({
  isAnimating: false,
  completedQuests: new Set(),
  setAnimating: (value) => set({ isAnimating: value }),
  markQuestComplete: (questId) => 
    set((state) => ({
      completedQuests: new Set(state.completedQuests).add(questId)
    })),
}));
```

**Usage in component**:
```typescript
const { isAnimating, setAnimating } = useAnimationStore();

const handleClaimQuest = async (questId: string) => {
  setAnimating(true);
  // ... animation code
  await questApi.claim(questId);
  setAnimating(false);
};
```

---

## TypeScript Type Definitions

```typescript
// types/animations.ts
export interface AnimationPreferences {
  reducedMotion: boolean;
  duration: number; // Multiplier: 1.0 = normal, 0.5 = fast, 0 = instant
}

export interface QuestCardAnimation {
  scale: number;
  rotation: number;
  filter: string;
  duration: number;
  ease: string;
}

export interface CelebrationOverlay {
  emoji: string;
  title: string;
  subtitle: string;
  duration: number;
}

// Component props
export interface PersonaPageProps {
  params: Promise<{ id: string }>;
}

export interface ShareModalProps {
  persona: Persona;
  onShare: (platform: string, image?: Blob) => void;
  onClose: () => void;
}
```

---

## Next.js-Specific Considerations

### 1. Hydration Mismatch Prevention

**Problem**: Server renders static, client animates
**Solution**: Guard animations with `useEffect`

```typescript
const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
  setIsMounted(true);
}, []);

if (!isMounted) {
  return <PersonaCardSkeleton />; // Server-rendered skeleton
}

return <PersonaCard persona={persona} />; // Client-rendered with animations
```

### 2. Route Transitions

**Using Next.js `useRouter`**:
```typescript
const router = useRouter();

const navigateToChat = () => {
  // Exit animation before navigation
  if (cardRef.current) {
    gsap.to(cardRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      onComplete: () => {
        router.push(`/chat/${persona.id}`);
      }
    });
  } else {
    router.push(`/chat/${persona.id}`);
  }
};
```

### 3. Prefetching for Smooth Transitions

```typescript
// Prefetch chat page on hover
<Button
  onMouseEnter={() => {
    router.prefetch(`/chat/${persona.id}`);
  }}
>
  Chat with Persona
</Button>
```

---

## Performance Optimization

### Using React.memo for Animation Components

```typescript
export const QuestCard = React.memo(({ 
  quest, 
  onClaim 
}: QuestCardProps) => {
  // ... component logic
}, (prevProps, nextProps) => {
  // Only re-render if quest ID changes
  return prevProps.quest.id === nextProps.quest.id;
});
```

### GSAP Cleanup in useEffect

```typescript
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from('.persona-stat', {
      scale: 0,
      duration: 0.5,
      stagger: 0.1
    });
  }, containerRef);

  // Cleanup on unmount
  return () => ctx.revert();
}, []);
```

---

## Animation Implementation Checklist

- ✅ Page entrance (implemented with `useEffect`)
- ✅ Quest celebration (implemented with refs + GSAP)
- ⚠️ Share modal (RECOMMENDED, use React Portal)
- ⚠️ Radar chart animation (RECOMMENDED, SVG morph)
- ✅ Activity feed stagger (implemented)
- ✅ Button hover (implemented with refs)
- ⚠️ Share success feedback (RECOMMENDED)
- ✅ Reduced motion support (custom hook)
- ✅ TypeScript types defined

**Framework**: Next.js 14+ App Router  
**State**: Zustand + TanStack Query  
**Animation**: GSAP 3.x  
**Type Safety**: Full TypeScript coverage

---

## Success Metrics

- **Engagement Time:** Average >90 seconds on page (indicates deep exploration).
- **Share Rate:** >40% of users share their persona.
- **Chat Initiation:** >60% click "Chat with Your Persona."
- **Return Rate:** >50% return to view persona within 7 days.
