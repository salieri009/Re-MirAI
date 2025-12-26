# Page Architecture & Patterns

**Parent Document:** [UI/UX Design Specification](01-UI-UX-Design.md)

This document defines the specific UI patterns, layout structures, and component hierarchies for each core page of Re:MirAI. All implementations must adhere to the [Blonix Design Philosophy](../02-project-overview/03-Design-Philosophy.md).

---

## 1. Landing Page (`/`)

**Pattern:** **AIDA Model** (Attention, Interest, Desire, Action) + **Z-Pattern** Layout.
**Goal:** Convert visitors into users via Google Login.

### Structure
1.  **Hero Section (Attention):**
    *   **Layout:** Split screen (Text Left, Visual Right) or Centered.
    *   **Components:** `HeroHeadline` (Display Font), `ValuePropSubtext`, `GoogleLoginButton` (Fuchsia, Shadow).
    *   **Visual:** High-quality illustration of a Persona Card (Floating animation).
2.  **Social Proof (Interest):**
    *   **Layout:** Horizontal scrolling band or grid.
    *   **Components:** `TestimonialCard`, `UserCountBadge`.
3.  **How It Works (Desire):**
    *   **Layout:** 3-Step Zig-Zag (Text + Icon/Image).
    *   **Steps:** 1. Create Survey -> 2. Friends Vote -> 3. Reveal Persona.
4.  **Sticky CTA (Action):**
    *   **Layout:** Fixed bottom bar on mobile, persistent button in header on desktop.

---

## 2. Dashboard (`/dashboard`)

**Pattern:** **Dashboard Grid** / **Card UI**.
**Goal:** Provide a clear overview of progress and quick access to key actions.

### Structure
1.  **Global Header:**
    *   **Components:** `Logo`, `CurrencyWidget`, `UserMenu`.
2.  **Status Overview (Top):**
    *   **Layout:** Full-width banner or large card.
    *   **Components:** `ProgressBar` (Responses: X/3), `StatusMessage` ("Waiting for 1 more...").
3.  **Action Grid (Center) - State 1 (Awaiting):**
    *   **Layout:** Responsive Grid (1 col mobile, 2-3 col desktop).
    *   **Components:**
        *   `ShareCard` (Primary): "Copy Link", "Share to Instagram".
        *   `PracticeCard` (Secondary): "Try it yourself".
        *   `QuestCard` (Gamification): "Daily Login: Claim".

4.  **Reveal Modal - State 2 (Ready):**
    *   **Pattern:** Full-screen Overlay.
    *   **Components:**
        *   `SummonTypeSelector`: "Fated" (Free) vs "Alchemic" (Premium/Archetype Select).
        *   `RevealAnimation`: Lottie/Video.

5.  **Active Persona View - State 3 (Complete):**
    *   **Layout:** Hero Card (Top) + Action Bar (Sticky Bottom).
    *   **Components:**
        *   `PersonaHero`: Large card display.
        *   `ChatButton` (Fuchsia, Floating): Primary interaction.
        *   `SocialActions`: Share, Compare.

---

## 3. Survey Page (`/s/{id}`)

**Pattern:** **Wizard / Stepper** (Single Focus).
**Goal:** Maximize completion rates by reducing cognitive load.

### Structure
1.  **Progress Header:**
    *   **Components:** `SimpleProgressBar` (e.g., "Question 3 of 10").
2.  **Question Card (Center):**
    *   **Layout:** Centered, focused card.
    *   **Components:** `QuestionText`, `LikertScale` (Strongly Disagree <-> Strongly Agree) or `OptionList`.
3.  **Navigation Footer:**
    *   **Components:** `NextButton` (Primary), `PrevButton` (Ghost).
    *   **Behavior:** Auto-advance on selection (optional setting).

---

## 4. Persona Page (`/p/{id}`)

**Pattern:** **Split Screen** (Desktop) / **Vertical Stack** (Mobile).
**Goal:** Showcase the "Viral Asset" and encourage sharing.

### Structure
1.  **Visual Showcase (Left/Top):**
    *   **Components:** `PersonaCard` (The generated image), `ShareButton` (Floating/Sticky).
2.  **Details Panel (Right/Bottom):**
    *   **Components:**
        *   `ArchetypeBadge` (e.g., "The Strategist").
        *   `RadarChart` (Stats visualization).
        *   `TraitList` (Bullet points).
        *   `AnalysisText` (LLM generated description).
3.  **Action Area:**
    *   **Components:** `ChatButton` (Primary), `CreateYourOwnButton` (For visitors).

---

## 5. Chat Interface (`/chat/{id}`)

**Pattern:** **Conversational UI**.
**Goal:** Immerse user in interaction with the Persona.

### Structure
1.  **Chat Header:**
    *   **Components:** `PersonaAvatar`, `PersonaName`, `BondLevelWidget`.
2.  **Message Stream (Body):**
    *   **Layout:** Vertical scroll, bubbles.
    *   **Components:** `UserBubble` (Right), `PersonaBubble` (Left), `ShareSnippetIcon` (On hover/tap).
3.  **Input Area (Fixed Bottom):**
    *   **Components:** `InputBar`, `SendButton`, `StickerMenu` (Optional).

---

**Last Updated:** 2025-11-24
