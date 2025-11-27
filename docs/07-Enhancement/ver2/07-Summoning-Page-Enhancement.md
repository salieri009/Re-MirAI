# Summoning Page Enhancement Plan (ver2)

**Version:** 2.0.0
**Last Updated:** 2025-11-27
**Status:** 📝 Planning (Design Phase)
**Route:** `/dashboard/synthesize` or `/summon`
**Component:** `SummoningPage` (Page level)
**Design Systems:** Tailwind Custom Config (Plus Jakarta Sans, Unified Color Palette)

> [!IMPORTANT]
> **Version 2 Design:** This document outlines the **Version 2** enhancement plan. It uses a specific HTML reference implementation as the source of truth for visual design, adapted to the unified Re:MirAI color palette.

---

## 🔴 UX/UI Expert Review (Design Rationale)

### Critical Issues Addressed by ver2 Design

#### 1. Ceremony & Anticipation
**Previous State:** Generic loading spinner, no sense of ritual or importance.
**ver2 Solution:**
- **Multi-Stage Animation:** Three distinct phases (Pre-Synthesis → Alchemic Mode → Reveal) build suspense and create a memorable moment.
- **Visual Spectacle:** Spinning gradient rings and centered icon create a "magical summoning circle" aesthetic.

#### 2. User Agency in "Alchemic Mode"
**Previous State:** Passive waiting; user has no control.
**ver2 Solution:**
- **Archetypal Choice:** Optional "Alchemic Mode" allows users to influence the final persona by selecting an archetype (Creator, Sage, Explorer, Guardian).
- **Engagement:** Transforms waiting time into an interactive decision point.

#### 3. Emotional Payoff
**Previous State:** Abrupt transition; no celebration of the completed persona.
**ver2 Solution:**
- **Reveal View:** Dedicated screen with large persona name, icon, description, and clear CTA to "Explore My Persona."
- **Gradient Theming:** Visual gradient (primary → secondary) reinforces the persona's uniqueness.

---

## Current Implementation Status

### ✅ Design Ready (Reference Implementation)
- **HTML Structure:** Complete three-stage layout provided.
- **Styling:** Tailwind CSS configuration defined.
- **Animations:** Spinning gradient rings, archetypal selection cards.

### ⏳ Pending Implementation
- **React Component Migration:** Converting static HTML to Next.js/React components.
- **State Management:** Handling synthesis stages and archetypal selection.
- **Backend Integration:** API call to trigger synthesis and receive persona data.
- **Color Unification:** Adapting provided colors to Re:MirAI's unified palette.

---

## Design Compliance

This design adheres to key feature requirements:

### ✅ F-002: Persona Synthesis
- **Synthesis Process:** Visual representation of AI processing user data.
- **Archetypal Customization:** Optional user input to refine persona traits.
- **Reveal Experience:** Dramatic presentation of the final persona.

---

## Design Philosophy (ver2)

**Core Concept:** **"The Summoning Ritual"** — A mystical, high-stakes moment where data transforms into a living persona.

**Visual Identity:**
- **Palette (Unified):**
  - `primary`: #845EC2 (Amethyst Purple) - Main brand color
  - `accent`: #00c9a7 (Mint Green) - Secondary actions
  - `highlight`: #c197ff (Light Lavender) - Accents and highlights
  - `background-dark`: #0A0112 (Deep Dark) - Dark mode base
- **Typography:** `Plus Jakarta Sans` for modern, friendly readability.
- **Motion:** Continuous spinning animations convey "active processing."

---

## Executive Summary

The Summoning Page is the emotional climax of the Re:MirAI experience. This ver2 design transforms what could be a mundane "loading" screen into a three-act ceremony:
1. **Pre-Synthesis:** Anticipation builds as spinning rings visualize the AI's work.
2. **Alchemic Mode (Optional):** User chooses an archetypal focus, adding agency and personalization.
3. **Reveal:** The persona is unveiled with dramatic flair, ready for exploration.

By unifying colors with the Landing Page palette and adding interactive elements, this page becomes a memorable "birth moment" for each persona.

---

## Reference Implementation (Target Design - Color Adjusted)

The following HTML structure is the **definitive source of truth** for the ver2 visual design, with colors adjusted to match Re:MirAI's unified palette.

```html
<!DOCTYPE html>
<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Re:MirAI - Persona Synthesis</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/>
<script id="tailwind-config">
    tailwind.config = {
        darkMode: "class",
        theme: {
            extend: {
                colors: {
                    "primary": "#845EC2",        // Unified Purple
                    "accent": "#00c9a7",          // Unified Mint Green
                    "highlight": "#c197ff",       // Light Lavender
                    "dark-accent": "#005b44",     // Dark Teal
                    "background-light": "#f8f6f7",
                    "background-dark": "#0A0112",
                },
                fontFamily: {
                    "display": ["Plus Jakarta Sans", "sans-serif"]
                },
            },
        },
    }
</script>
</head>
<body class="font-display bg-background-light dark:bg-background-dark text-white">
<!-- Three-Stage Layout: Pre-Synthesis, Alchemic Mode, Reveal -->
<!-- (Full HTML structure similar to provided, with unified colors) -->
</body></html>
```

---

## 🔍 Comprehensive UX/UI & Frontend Review

**Goal:** Review the Summoning Page to ensure information reliability, UX/UI immersion, animation relevance, and provide actionable improvements.

### 1. Information Verification
*   **Unverified API:** The plan assumes a "Synthesis API" that accepts an archetype and returns a persona. This needs to be verified against `BACKEND_SETUP.md` or the `backend` codebase to ensure the `/v1/personas/synthesize` endpoint exists and supports the "Archetype" parameter.
*   **Performance Claims:** The "Estimated time: 5 seconds" label is a hardcoded assumption. Real LLM generation (GPT-4) often takes 30-60 seconds. This discrepancy could lead to user frustration if the progress bar stalls.

### 2. UX/UI Immersion Check
*   **Flow Breakers:**
    *   **Waiting Fatigue:** If synthesis takes >10 seconds, the "Spinning Rings" animation might become monotonous.
    *   **Lack of Feedback:** During the "Alchemic Mode" (Choice Phase), if the user doesn't select an archetype quickly, does the system auto-proceed? The current flow implies an indefinite wait, which could stall the ritual.
*   **Immersion Strength:** The "Three-Act Structure" (Pre-Synthesis -> Alchemic -> Reveal) is excellent for gamifying the loading state. It turns a technical delay into a narrative feature.

### 3. Animation & Module Relevance
*   **Relevance:**
    *   **Particle Vortex:** The "Converge" animation (particles swirling to center) is **highly relevant** for the "Synthesis" concept—literally visualizing data coming together to form a soul.
    *   **Magic Circle:** The rotating SVG ring adds a layer of "mysticism" that aligns perfectly with the brand.
*   **Missing Interactions:**
    *   **Sound Design:** The plan mentions "Audio cues" as an enhancement, but they are not in the implementation plan. Sound is a huge immersion multiplier for "Reveal" moments.

### 4. UX/UI Weaknesses & Improvement Proposals

| Category | Weakness | Improvement Proposal |
| :--- | :--- | :--- |
| **Expectation Management** | Unrealistic Timing | **Dynamic Progress:** Instead of a fake 5s timer, use a "Step-based" progress bar (e.g., "Analyzing Traits...", "Weaving Memories...", "Finalizing Archetype...") to keep the user engaged for 30s+. |
| **Immersion** | Silent Reveal | **Audio Integration:** Add a `useSound` hook to trigger a "Chime" or "Whoosh" sound effect exactly when the screen flashes white for the reveal. |
| **Agency** | Indefinite Wait | **Auto-Select Timer:** In Alchemic Mode, add a subtle countdown (e.g., "Auto-selecting in 10s...") to keep the momentum going if the user is indecisive. |

---

## Implementation Plan

### 1. Component Breakdown
- `atoms/ArchetypeCard.tsx`: Individual archetype selection button
- `molecules/SynthesisSpinner.tsx`: Animated spinning rings
- `organisms/AlchemicModePanel.tsx`: Archetype selection grid
- `organisms/RevealCard.tsx`: Final persona reveal display
- `pages/SummoningPage.tsx`: State machine orchestrating the three stages

### 2. State Machine (Three Stages)

```typescript
type SummoningStage = 'PRE_SYNTHESIS' | 'ALCHEMIC_MODE' | 'REVEAL';

const [stage, setStage] = useState<SummoningStage>('PRE_SYNTHESIS');
const [selectedArchetype, setSelectedArchetype] = useState<string | null>(null);
const [persona, setPersona] = useState<Persona | null>(null);

useEffect(() => {
  if (stage === 'PRE_SYNTHESIS') {
    // Show spinner for 3-5 seconds
    setTimeout(() => setStage('ALCHEMIC_MODE'), 4000);
  } else if (stage === 'ALCHEMIC_MODE' && selectedArchetype) {
    // User selected archetype, trigger synthesis
    synthesizePersona(selectedArchetype).then(result => {
      setPersona(result);
      setStage('REVEAL');
    });
  }
}, [stage, selectedArchetype]);
```

### 3. Tailwind Configuration
- **Colors:** Unified palette (`primary`, `accent`, `highlight`, `background-dark`).
- **Animations:** 
  - `spin` (5s duration for outer ring, 6s reverse for inner ring)
  - `pulse` for archetypal cards on hover

### 4. Asset Integration
- **Icons:** Material Symbols (`neurology`, `brush`, `local_library`, `explore`, `shield`, `lightbulb`)
- **Fonts:** `Plus Jakarta Sans` loaded from Google Fonts

---

## Frontend Refactoring Plan

### Code Reusability

**Shared Components:**
- `SynthesisSpinner.tsx` can be reused in:
  - Survey Hub (while waiting for responses)
  - Chat Page (initial load)
- `ArchetypeCard.tsx` pattern applies to:
  - Quest selection (Persona Room)
  - Survey template selection (Survey Page)

**Unified Animation Library:**
Create `lib/animations.ts`:
```typescript
export const spinnerVariants = {
  outer: { duration: 5, repeat: Infinity, ease: "linear" },
  inner: { duration: 6, repeat: Infinity, reverse: true },
};

export const revealVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
};
```

### UX/UI Experience Improvements

**Progress Feedback:**
- Add subtle progress indicator (0% → 100%) during Pre-Synthesis stage.
- Announce stage changes via `aria-live` for screen readers.

**Accessibility:**
- Skip button with keyboard shortcut (Esc key).
- Reduce motion support: disable spinning if `prefers-reduced-motion` is detected.
- Clear labeling: "Synthesizing your persona. Estimated time: 5 seconds."

**Error Recovery:**
- If synthesis API fails:
  - Show calming message: "The threads are tangled. Shall we try again?"
  - Retry button with exponential backoff.
  - Option to return to Survey Hub.

### Organic Connections

**From Survey Hub:**
- "Generate Persona" button → Summoning Page (Pre-Synthesis stage).

**To Persona Room:**
- "Explore My Persona" CTA → `/p/:id` (newly created persona).

**Shared State:**
- Synthesis uses survey ID from URL params or global state.
- Persona result is cached in TanStack Query for instant Persona Room load.

---

## Color Palette Unification

### Original HTML Colors → Unified Palette

| Element | Original Color | Unified Color | Variable Name |
|---------|----------------|----------------|---------------|
| Primary Accent | #E02494 (Pink) | #845EC2 (Purple) | `primary` |
| Secondary Accent | #3A48A7 (Blue) | #00c9a7 (Mint Green) | `accent` |
| Highlight | N/A | #c197ff (Light Lavender) | `highlight` |
| Background Dark | #101018 | #0A0112 | `background-dark` |

**Gradient Adjustments:**
- Spinning rings: `from-primary/50 to-accent/50` (Purple → Mint Green)
- Central icon background: `from-primary to-accent/80`
- Reveal card icon: `from-primary to-accent`

This ensures visual consistency across Landing, Login, Survey, and Summoning pages.

---

## Animation Specifications (Next.js App Router + React State Machine)

**Framework Context**: Next.js 14+, React 18+, TypeScript, GSAP 3.x, Canvas API

**Emotional Journey**: Anticipation → Awe → Joy

**Animation Philosophy**: Create climactic, awe-inspiring reveal. This is the payoff for completing surveys—make it unforgettable.

### State Machine Architecture

**Core Pattern**: Three-stage state machine with animation orchestration

```typescript
'use client';

type SummoningStage = 'PRE_SYNTHESIS' | 'ALCHEMIC_MODE' | 'REVEAL';

interface SummoningState {
  stage: SummoningStage;
  selectedArchetype: string | null;
  progress: number; // 0-100
  persona: Persona | null;
  error: string | null;
}

const [state, setState] = useState<SummoningState>({
  stage: 'PRE_SYNTHESIS',
  selectedArchetype: null,
  progress: 0,
  persona: null,
  error: null,
});
```

### Stage 1: Pre-Synthesis Animation (Countdown)

**File**: `frontend/src/app/dashboard/synthesize/page.tsx`

**Purpose**: Build anticipation before synthesis begins

**Implementation**:
```typescript
useEffect(() => {
  if (state.stage === 'PRE_SYNTHESIS') {
    const particleCanvas = canvasRef.current;
    const ctx = particleCanvas?.getContext('2d');
    
    if (ctx && particleCanvas) {
      // Ambient particle system (default mode)
      const cleanup = delightInteractions.particleSystem(
        particleCanvas,
        ctx,
        {
          count: 50,
          color: '#845EC2', // Purple
          speed: 1,
          connectDistance: 100,
          showConnections: true,
          interactionMode: 'default'
        }
      );
      
      return cleanup;
    }
  }
}, [state.stage]);
```

**Visual Elements**:
1. **Particle Background** (50 particles, purple, slow drift)
2. **Pulsing "Begin" Button**:
   ```typescript
   gsap.to(beginButton, {
     scale: 1.02,
     boxShadow: '0 0 32px rgba(132, 94, 194, 0.6)',
     duration: 1.5,
     repeat: -1,
     yoyo: true,
     ease: 'sine.inOut'
   });
   ```
3. **Countdown Timer** (optional):
   ```typescript
   const [countdown, setCountdown] = useState(3);
   
   useEffect(() => {
     if (state.stage === 'PRE_SYNTHESIS' && autoStart) {
       const interval = setInterval(() => {
         setCountdown(prev => {
           if (prev <= 1) {
             clearInterval(interval);
             handleBeginSynthesis();
             return 0;
           }
           return prev - 1;
         });
       }, 1000);
       
       return () => clearInterval(interval);
     }
   }, [state.stage, autoStart]);
   ```

**Transition to Stage 2**: User clicks "Begin Synthesis"

---

### Stage 2: Alchemic Mode Animation (Choice Phase)

**Trigger**: User clicks "Begin Synthesis" → API call starts

**Purpose**: Give user sense of control while synthesis happens

**Particle System Transition**:
```typescript
useEffect(() => {
  if (state.stage === 'ALCHEMIC_MODE') {
    const particleCanvas = canvasRef.current;
    const ctx = particleCanvas?.getContext('2d');
    
    if (ctx && particleCanvas) {
      // Switch to CONVERGE mode
      const cleanup = delightInteractions.particleSystem(
        particleCanvas,
        ctx,
        {
          count: 80, // Increase particle density
          color: state.selectedArchetype 
            ? archetypeColors[state.selectedArchetype]
            : '#845EC2',
          speed: 2,
          connectDistance: 150,
          showConnections: true,
          interactionMode: 'converge' // Swirl toward center!
        }
      );
      
      return cleanup;
    }
  }
}, [state.stage, state.selectedArchetype]);
```

**Converge Animation** (from `micro-interactions.ts` lines 434-463):
```typescript
// Particles swirl toward center in spiral pattern
const dx = centerX - p.x;
const dy = centerY - p.y;
const distance = Math.sqrt(dx * dx + dy * dy);

if (distance > 5) {
  // Normalize vector
  const nx = dx / distance;
  const ny = dy / distance;
  
  // Tangential vector (90° rotation) for swirl
  const tx = -ny;
  const ty = nx;
  
  // Calculate speeds (faster as they approach center)
  const swirlSpeed = 3 + (200 / (distance + 10));
  const suctionSpeed = 4;
  
  // Apply movement
  p.x += nx * suctionSpeed + tx * swirlSpeed;
  p.y += ny * suctionSpeed + ty * swirlSpeed;
  
  // Increase opacity as they converge
  p.alpha = Math.min(1, p.alpha + 0.03);
}
```

**Visual Effect**: Particles form a "vortex" pulling toward center

**Archetype Card Selection**:
```typescript
const archetypeRefs = useRef<Record<string, HTMLDivElement>>({});

const handleArchetypeSelect = (archetype: string) => {
  const card = archetypeRefs.current[archetype];
  
  if (!reducedMotion && card) {
    // Deselect all
    Object.values(archetypeRefs.current).forEach(otherCard => {
      gsap.to(otherCard, {
        scale: 1,
        filter: 'brightness(1)',
        borderColor: 'transparent',
        duration: 0.2
      });
    });
    
    // Select clicked card
    gsap.to(card, {
      scale: 1.1,
      filter: 'brightness(1.3)',
      borderColor: '#00c9a7', // Accent color
      duration: 0.3,
      ease: 'back.out(1.7)'
    });
  }
  
  setState(prev => ({ ...prev, selectedArchetype: archetype }));
};
```

**API Progress Simulation** (while synthesis happens):
```typescript
useEffect(() => {
  if (state.stage === 'ALCHEMIC_MODE') {
    // Simulate progress (real progress from API)
    const interval = setInterval(() => {
      setState(prev => ({
        ...prev,
        progress: Math.min(100, prev.progress + 5)
      }));
    }, 300); // Update every 300ms
    
    return () => clearInterval(interval);
  }
}, [state.stage]);
```

**Progress Bar Animation**:
```typescript
<div className="progress-bar">
  <div 
    className="progress-fill"
    style={{ 
      width: `${state.progress}%`,
      transition: 'width 0.3s ease-out'
    }}
  />
</div>
```

**Transition to Stage 3**: Progress reaches 100% OR user clicks "Skip" → Reveal

---

### Stage 3: Persona Reveal Animation (Climax)

**Trigger**: Synthesis completes (`state.progress === 100`)

**Purpose**: Climactic reveal with maximum emotional impact

**Sequence Timeline**:
```
0.0s  │ Particle vortex reaches peak intensity
      ├─ All particles at center
      ├─ Screen flashes white (0.1s)
      │
0.1s  ├─ Particles explode outward
      │  - Radial burst pattern
      │  - Fade to transparency
      │
0.5s  ├─ Persona card entrance
      │  - Scale 0.5 → 1.0
      │  - Opacity 0 → 1
      │  - Blur 20px → 0
      │
2.0s  ├─ Card glow pulse
      │  - Box shadow expands
      │
2.5s  └─ Buttons appear (Chat, View Profile)
      │  - Fade in + slide up
```

**Implementation**:
```typescript
const handleReveal = async () => {
  setState(prev => ({ ...prev, stage: 'REVEAL' }));
  
  if (!reducedMotion) {
    // Stage 1: Screen flash
    const flashDiv = document.createElement('div');
    flashDiv.style.cssText = `
      position: fixed;
      inset: 0;
      background: white;
      z-index: 9999;
      pointer-events: none;
    `;
    document.body.appendChild(flashDiv);
    
    gsap.fromTo(flashDiv,
      { opacity: 0 },
      { 
        opacity: 1, 
        duration: 0.05,
        onComplete: () => {
          gsap.to(flashDiv, {
            opacity: 0,
            duration: 0.1,
            onComplete: () => flashDiv.remove()
          });
        }
      }
    );
    
    // Stage 2: Particle explosion (handled in particle system cleanup)
    
    // Stage 3: Persona card reveal
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (personaCardRef.current) {
      const tl = gsap.timeline({ onComplete: () => announceReveal() });
      
      tl.fromTo(personaCardRef.current,
        {
          scale: 0.5,
          opacity: 0,
          y: 50,
          filter: 'blur(20px)'
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.5,
          ease: 'power2.out'
        }
      )
      .to(personaCardRef.current, {
        boxShadow: '0 0 60px rgba(132, 94, 194, 0.8)',
        duration: 0.5
      })
      .from(actionsContainerRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.4,
        ease: 'power2.out'
      }, '-=0.2');
    }
  }
};

const announceReveal = () => {
  if (state.persona) {
    announce(
      `Your persona has been revealed: ${state.persona.archetype}`,
      'assertive'
    );
  }
};
```

**Particle Explosion Logic** (add to particle system):
```typescript
// When transitioning to REVEAL stage
if (interactionMode === 'explode') {
  particles.forEach(p => {
    // Calculate direction from center
    const angle = Math.atan2(p.y - centerY, p.x - centerX);
    
    // Explode outward
    p.vx = Math.cos(angle) * 20;
    p.vy = Math.sin(angle) * 20;
    p.alpha = Math.max(0, p.alpha - 0.05);
  });
}
```

---

### Magic Circle Rotation (Background Detail)

**Element**: Decorative SVG ring behind persona card

**Implementation**:
```typescript
useEffect(() => {
  if (state.stage === 'ALCHEMIC_MODE' && magicRingRef.current) {
    gsap.to(magicRingRef.current, {
      rotation: 360,
      duration: 8,
      ease: 'linear',
      repeat: -1
    });
  }
}, [state.stage]);
```

**SVG Structure**:
```tsx
<svg className="magic-ring" ref={magicRingRef} viewBox="0 0 200 200">
  <circle
    cx="100"
    cy="100"
    r="80"
    fill="none"
    stroke="url(#ring-gradient)"
    strokeWidth="2"
    strokeDasharray="5,5"
  />
  <defs>
    <linearGradient id="ring-gradient">
      <stop offset="0%" stopColor="#845EC2" />
      <stop offset="100%" stopColor="#00c9a7" />
    </linearGradient>
  </defs>
</svg>
```

---

### Error State Animation

**Trigger**: API synthesis fails

**Implementation**:
```typescript
const handleSynthesisError = (error: Error) => {
  setState(prev => ({ 
    ...prev, 
    error: error.message,
    stage: 'PRE_SYNTHESIS' // Reset to start
  }));
  
  // Shake animation
  if (containerRef.current) {
    gsap.timeline()
      .to(containerRef.current, {
        x: '+=10',
        duration: 0.1,
        repeat: 5,
        yoyo: true
      })
      .to(containerRef.current, {
        x: 0,
        duration: 0.2
      });
  }
  
  // Show error toast
  toast.error('Synthesis failed. Click to retry.');
  announce('Synthesis failed. Please try again.', 'assertive');
};
```

---

### React Hooks for Animation Orchestration

**Custom Hook**: `useSummoningAnimation.ts`

```typescript
export function useSummoningAnimation(stage: SummoningStage) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particleCleanup, setParticleCleanup] = useState<(() => void) | null>(null);
  
  useEffect(() => {
    // Cleanup previous particles
    if (particleCleanup) {
      particleCleanup();
    }
    
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (!canvas || !ctx) return;
    
    // Configure particles based on stage
    const config = getParticleConfig(stage);
    const cleanup = delightInteractions.particleSystem(canvas, ctx, config);
    
    setParticleCleanup(() => cleanup);
    
    return () => {
      if (cleanup) cleanup();
    };
  }, [stage]);
  
  return { canvasRef };
}

function getParticleConfig(stage: SummoningStage) {
  switch (stage) {
    case 'PRE_SYNTHESIS':
      return {
        count: 50,
        color: '#845EC2',
        speed: 1,
        interactionMode: 'default' as const
      };
    case 'ALCHEMIC_MODE':
      return {
        count: 80,
        color: '#00c9a7',
        speed: 2,
        interactionMode: 'converge' as const
      };
    case 'REVEAL':
      return {
        count: 100,
        color: '#c197ff',
        speed: 5,
        interactionMode: 'explode' as const
      };
  }
}
```

---

### TypeScript Type Definitions

```typescript
// types/summoning.ts
export type SummoningStage = 'PRE_SYNTHESIS' | 'ALCHEMIC_MODE' | 'REVEAL';

export interface SummoningState {
  stage: SummoningStage;
  selectedArchetype: string | null;
  progress: number;
  persona: Persona | null;
  error: string | null;
}

export interface ParticleConfig {
  count: number;
  color: string;
  speed: number;
  connectDistance?: number;
  showConnections?: boolean;
  interactionMode: 'default' | 'converge' | 'explode';
}

export interface ArchetypeCardProps {
  archetype: Archetype;
  selected: boolean;
  onClick: () => void;
}
```

---

### Performance Considerations

**Canvas Optimization**:
```typescript
// Resize canvas on mount
useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  
  const resizeCanvas = () => {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
  };
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  return () => window.removeEventListener('resize', resizeCanvas);
}, []);
```

**Particle System Budget**:
- **Pre-Synthesis**: 50 particles (low CPU)
- **Alchemic Mode**: 80 particles (medium CPU)
- **Reveal**: 100 particles for 2 seconds (high CPU, then cleanup)

**Mobile Optimization**:
```typescript
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const particleCount = isMobile ? 30 : 50; // Reduce on mobile
```

---

### Accessibility Implementation

**Screen Reader Flow**:
```typescript
// Stage announcements
useEffect(() => {
  switch (state.stage) {
    case 'PRE_SYNTHESIS':
      announce('Ready to begin synthesis', 'polite');
      break;
    case 'ALCHEMIC_MODE':
      announce('Synthesis in progress. Select an archetype or wait.', 'polite');
      break;
    case 'REVEAL':
      announce(
        `Your persona has been revealed: ${state.persona?.archetype}`, 
        'assertive'
      );
      break;
  }
}, [state.stage]);
```

**Reduced Motion**:
```typescript
const reducedMotion = useReducedMotion();

if (reducedMotion) {
  // Skip particle system entirely
  // Instant stage transitions
  // Progress bar jumps to 100% (no animation)
  // Persona card appears instantly (no blur/scale)
}
```

**Keyboard Navigation**:
```typescript
// Archetype selection via keyboard
<div
  role="button"
  tabIndex={0}
  onClick={() => handleArchetypeSelect(archetype)}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleArchetypeSelect(archetype);
    }
  }}
  aria-pressed={state.selectedArchetype === archetype}
>
  {archetype}
</div>
```

---

## Animation Implementation Checklist

**Stage 1: Pre-Synthesis**
- ✅ Ambient particle system (implemented)
- ✅ Pulsing begin button (implemented)
- ⚠️ Optional countdown timer (RECOMMENDED)

**Stage 2: Alchemic Mode**
- ✅ Particle convergence vortex (implemented)
- ✅ Archetype card selection animation (spec defined)
- ✅ Progress bar updates (smooth transitions)
- ✅ Magic circle rotation (background detail)

**Stage 3: Reveal**
- ⚠️ Screen flash effect (RECOMMENDED)
- ⚠️ Particle explosion (needs implementation)
- ✅ Persona card entrance (elastic blur reveal)
- ✅ Glow pulse effect (box shadow)
- ✅ Action buttons entrance (stagger)

**Cross-Cutting**
- ✅ State machine architecture (3 stages)
- ✅ Error handling with shake animation
- ✅ Reduced motion support
- ✅ Screen reader announcements
- ✅ TypeScript types
- ✅ Canvas performance optimization

**Framework**: Next.js 14+ App Router  
**State Machine**: React `useState` + `useEffect`  
**Animation**: GSAP 3.x + Canvas API  
**Performance**: 60fps target, mobile-optimized

---

## Success Metrics

- **Completion Rate:** >95% of users reach Reveal stage.
- **Alchemic Mode Engagement:** >60% of users select an archetype (vs skipping).
- **Skip Rate:** <20% use skip button (indicates compelling experience).
- **Error Recovery:** 100% of API failures result in graceful retry UX.

