# UI/UX Design Specification (v2.0)

This document refines the UI/UX strategy with a primary focus on creating a frictionless, shareable, and inherently viral user experience. The philosophy is simple: **"Show, Don't Tell."** We let users experience the fun of a friend's persona first, which becomes the primary driver for their own participation.

**Design Philosophy:**
*   **Light Theme First:** Clean, bright interface optimized for daytime use and accessibility
*   **Modern Aesthetics:** Fuchsia/Pink primary colors (`#d946ef`) with Blue secondary (`#3b82f6`) for a fresh, contemporary feel
*   **User-Centric:** Prioritizes ease of use, clarity, and professional appeal over immersive gaming aesthetics
*   **Accessibility:** High contrast (light background `#f8fafc` with dark text `#0f172a`), readable typography (Inter + Poppins), and WCAG-compliant design
*   **Broad Appeal:** Welcoming to users of all backgrounds, not requiring subculture knowledge
*   **CTA Strategy:** Primary actions use **Fuchsia (`#d946ef`)** to stand out; Secondary actions use Blue or Outline styles.

**Related Documentation:**
*   [Design Philosophy](../02-project-overview/03-Design-Philosophy.md) - Core design principles and system.
*   [Page Architecture](02-Page-Architecture.md) - Detailed page patterns and structure.

## 1. Core UX Principles

*   **Frictionless Onboarding:** Eliminate traditional sign-up forms. We will lead with Google Authentication. One click is all it should take to get started.
*   **Viral Loop by Design:** The entire user journey is a loop. A user shares their result, their friends see it, get intrigued, and start their own journey. Every design decision must serve this loop.
*   **The "Payoff" is the Product:** The moment a user sees their created persona is the climax. This "reveal" must be visually stunning, emotionally resonant, and instantly shareable. The shareable image *is* the ad.
*   **Mobile-First, Social-First:** Our target audience lives on mobile social media. All shareable content must be optimized for platforms like Instagram Stories, TikTok, and Twitter.

## 2. The Viral User Flow

The journey is not linear; it's a cycle.

1.  **Discovery (Intrigue):** A potential user sees a friend's shared **Persona Card** on social media. The card is visually appealing and contains a hook like "My friends think I'm a... See yours!". A link (`remirai.app/p/{username}`) brings them to the public persona page.
2.  **Effortless Onboarding:** On the public persona page, a clear CTA "Find out how your friends see you" leads to a **one-click "Sign in with Google"** prompt. No username/password required.
3.  **Immediate Engagement (The Ask):** Post-login, the user lands on their dashboard. The primary CTA is clear: **"Create Your Survey Link."** We explain that they need ~3 responses to unlock their own Persona Card.
4.  **Frictionless Sharing (The Trigger):** Upon survey creation, we provide a "Copy Link" button and direct "Share to..." buttons (Instagram, WhatsApp, etc.) with pre-written, enticing messages.
5.  **The Reveal (The Payoff):** Once enough responses are in, the dashboard transforms. A "Create Persona" button triggers a short, dramatic animation before presenting the final **Persona Card**.
6.  **Share & Re-engage:** The Persona Card view has a prominent **"Share Your Card"** button. This generates a clean image of the card, ready for social media. The user can then chat with their persona, creating more shareable moments (e.g., sharing funny chat snippets).

## 3. Global Navigation & Header

*   **Sticky Header:** Always visible.
*   **Left:** `Re:MirAI` Logo (Home).
*   **Right:**
    *   **Currency Widget:** "Memory Crystals" balance (if Gamification active).
    *   **User Menu:** Profile, Settings, Sign Out.

## 4. Page & Component Redesign

**Methodology: Atomic Design**
All components are organized following Atomic Design principles (Atoms, Molecules, Organisms) to ensure consistency and reusability. See individual Feature Implementation Guides for specific component breakdowns.

### 3.1. Login & Onboarding (Single Entry Point)

*   **Purpose:** Remove all barriers to entry.
*   **Component:** A single landing view that explains the concept in one sentence. The only button is **"Continue with Google."** Email/password is a secondary, almost hidden option. We don't need a username at this stage; we can use the Google account name and let them change it later if desired.

### 3.2. Dashboard (`/dashboard`)

*   **Purpose:** The user's dynamic home base.
*   **State 1 (Awaiting Responses):**
    *   **Visual:** A blurred or "generating" placeholder for the Persona Card.
    *   **Data:** A live counter: "2 out of 3 responses received..."
    *   **CTA:** "Share this link to get more responses!" with the survey URL and share buttons.
    *   **Alternative:** "Practice Mode" button to answer questions yourself (for immediate Proto-Persona generation).
*   **State 2 (The Reveal):**
    *   **Options:** "Fated Summon" (Default) or "Alchemic Summon" (Select Archetype - Premium).
    *   A modal or full-screen takeover for the persona creation animation.
    *   Presents the final **Persona Card**.
*   **State 3 (Active Persona - Post-Reveal):**
    *   **Main View:** The Persona Card is prominently displayed.
    *   **Primary Action:** "Chat with [Persona Name]" button.
    *   **Gamification:** Small widget showing "Bond Level" or "Daily Quests" to encourage return visits.
    *   **Social:** "Share Card" and "Check Compatibility" buttons.

### 3.3. The Persona Card (The Viral Asset)

*   **This is not just a page; it's a shareable image.**
*   **Purpose:** To be the core viral mechanism. It must be beautiful, personal, and intriguing.
*   **Components (within the generated image):**
    1.  **AI-Generated Illustration:** The main visual hook.
    2.  **Persona Title & Rarity:** A catchy title (e.g., "The Group's Sarcastic Strategist") + Rarity Badge (SSR/SR/R).
    3.  **Stats & Traits:** A Radar Chart (Charisma, Intellect, etc.) + 3-4 key trait bullet points.
    4.  **Subtle Branding:** A small `Re:MirAI` logo (Transparent PNG), QR Code, and the user's handle.
*   **Functionality:** The "Share" button on this card will trigger a `toBlob()` or similar function to generate a high-resolution PNG, which the user can then immediately save or share via their device's native share sheet.

### 3.4. Chat Page (`/persona/chat`)

*   **Purpose:** Deepen engagement and create more shareable content.
*   **Feature:** Add a "Share this snippet" icon next to individual AI responses. Clicking it would copy a stylized image of that specific chat bubble to the clipboard, perfect for sharing out-of-context funny moments.
