# Dashboard Page Enhancement Plan (ver2)

**Version:** 2.0.0
**Last Updated:** 2025-11-28
**Status:** 📝 Planning (Design Phase)
**Route:** `/dashboard`
**Component:** `DashboardPage` (Page level)
**Design Systems:** Tailwind Custom Config (Space Grotesk, Custom Colors)

---

## 🔍 Comprehensive UX/UI & Frontend Review

**Goal:** Review the Dashboard Page to ensure information reliability, UX/UI immersion, animation relevance, and provide actionable improvements.

### 1. Information Verification
*   **Unverified Links:** The "Quick Actions" section links to `/dashboard/synthesize`, `/dashboard/create-survey`, and `/p/demo`. These routes need to be verified against the `app` directory structure to ensure they exist and are functional.
*   **Generic Status:** The "Summoning pipeline overview" header and "Ceremony is idle" message are static and generic. They do not reflect real-time user data or the actual state of the "Summoning" process (F-002).

### 2. UX/UI Immersion Check
*   **Flow Breakers:**
    *   **Static Chat Interface:** The chat area (`DashboardChatArea`) feels static. Messages appear instantly without typing indicators, breaking the illusion of communicating with an AI entity.
    *   **Visual Clutter:** The "Quick Actions" cards take up significant vertical space, potentially pushing the actual chat interaction below the fold on smaller screens.
*   **Lack of "Ritual" Feel:** The dashboard is functional but lacks the "mystical" or "ritualistic" atmosphere defined in the design philosophy. It feels like a standard admin dashboard rather than a "Sacred Workspace."

### 3. Animation & Module Relevance
*   **Relevance:**
    *   **Progress Bars:** The usage of `ProgressBar` for "Survey completion" and "Bonding Meter" is highly relevant for gamification (F-006).
*   **Missing Interactions:**
    *   **Typing Indicators:** No animation for the AI "thinking" or "typing," which is critical for F-003 (Chat Interface) immersion.
    *   **State Transitions:** No smooth transitions when switching between "Quick Actions" or updating the "Ritual Timeline."

### 4. UX/UI Weaknesses & Improvement Proposals

| Category | Weakness | Improvement Proposal |
| :--- | :--- | :--- |
| **Immersion** | Static AI Responses | **Typing Animation:** Implement a "TypingIndicator" component (3 bouncing dots) that appears for 1-2 seconds before the AI message is displayed. |
| **Visual Hierarchy** | Cluttered Header | **Collapsible Actions:** Make the "Quick Actions" section collapsible or convert it into a horizontal scrollable strip to prioritize the Chat Area. |
| **Atmosphere** | Generic "Admin" Look | **Ambient Background:** Add a subtle, low-intensity particle effect (`MirrorCanvas` with intensity 0.3) to the dashboard background to maintain the "Digital Mirror" vibe. |
| **Feedback** | Instant Message Send | **Message Transition:** Use `framer-motion` to animate new messages sliding in from the bottom (`y: 20, opacity: 0` -> `y: 0, opacity: 1`). |

---

## Implementation Plan

### 1. Component Breakdown
- `molecules/TypingIndicator.tsx`: New component for AI state.
- `organisms/DashboardChatArea.tsx`: Refactor to include animations and collapsible actions.
- `templates/DashboardLayout.tsx`: Ensure background canvas is present.

### 2. Animation Specifications
- **Message Entry:** Slide up (0.3s ease-out).
- **Typing Indicator:** Pulse animation (infinite loop).
- **Progress Bar:** Fill animation on load (width 0% -> value%).

### 3. Refactoring Tasks
- [ ] Verify and fix all internal links in "Quick Actions".
- [ ] Replace static "Ceremony is idle" message with dynamic state from `useSummoningStore`.
- [ ] Implement `framer-motion` for message list transitions.
