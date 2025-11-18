# Re:MirAI Glossary

> **Standard terminology for the Re:MirAI project**

**Last Updated:** 2025-11-18  
**Version:** 1.0.0  
**Status:** Active

---

## Project & Product Names

### Re:MirAI
- **Definition:** The official project and product name
- **Usage:** Always use "Re:MirAI" in all documentation, code comments, and user-facing text
- **Note:** Do not use "Persona AI" (deprecated historical name)
- **Example:** "Re:MirAI is an AI-driven persona simulation project"

---

## Design System Terms

### Blonix Branch
- **Definition:** The top-priority design system for Re:MirAI
- **Characteristics:**
  - Light theme (`#f8fafc` background)
  - Fuchsia/Pink Primary (`#d946ef`)
  - Blue Secondary (`#3b82f6`)
  - Inter + Poppins typography
  - Modern, accessible, user-friendly
- **Usage:** Always reference when discussing design decisions
- **See Also:** [Blonix Branch Priority](concept/BLONIX_PRIORITY.md)

### Light Theme
- **Definition:** The primary theme for Re:MirAI (Blonix Branch)
- **Background:** `#f8fafc` (light gray)
- **Cards:** `#ffffff` (white)
- **Text:** `#0f172a` (dark gray) for primary, `#64748b` for secondary
- **Usage:** Default theme for all user-facing interfaces

### Dark Theme
- **Definition:** Legacy theme (deprecated for Blonix Branch)
- **Status:** ⚠️ Deprecated - Only for historical reference
- **Note:** Do not use in new documentation unless explicitly discussing legacy systems

---

## Color System Terms

### Primary Color
- **Definition:** Main brand color for primary actions
- **Blonix Branch:** Fuchsia/Pink (`#d946ef`)
- **Usage:** Primary CTA buttons, main actions, brand elements

### Secondary Color
- **Definition:** Supporting brand color for secondary actions
- **Blonix Branch:** Blue (`#3b82f6`)
- **Usage:** Secondary buttons, supporting elements

### Surface Colors
- **Definition:** Background and container colors
- **Blonix Branch:**
  - `surface-ground`: `#f8fafc` (page background)
  - `surface-card`: `#ffffff` (card background)
  - `surface-border`: `#e2e8f0` (border color)

---

## Feature Terms

### Persona
- **Definition:** An AI-generated character representation of a user based on friend feedback
- **Capitalization:** Capitalize when referring to the entity (e.g., "Your Persona"), lowercase for general concept
- **Usage:** "Create your Persona", "The Persona responds", "persona creation"
- **See Also:** Persona Creation Flow

### Survey
- **Definition:** The feedback collection mechanism where friends answer questions about the user
- **User-Facing Term:** Always use "Survey" in user-facing documentation
- **Technical Term:** May use "ritual" in technical/backend contexts
- **Usage:** "Create a survey", "Share your survey link", "Survey responses"

### Feedback Collection
- **Definition:** The process of gathering anonymous responses from friends
- **User-Facing Term:** Preferred over "Summoning" in user-facing contexts
- **Usage:** "Feedback collection is in progress", "Share link to collect feedback"

### Persona Creation / Generation
- **Definition:** The process of creating a Persona from collected feedback
- **User-Facing Term:** Preferred over "Summoning" in user-facing contexts
- **Technical Term:** May use "summoning" in technical/backend contexts
- **Usage:** "Persona creation in progress", "Your Persona is being generated"

### Persona Room
- **Definition:** The interface where users interact with their created Persona
- **Usage:** "Go to Persona Room", "Persona Room features"

### Chat Interface
- **Definition:** The real-time conversation interface with the AI Persona
- **Usage:** "Start a chat", "Chat with your Persona"

---

## Technical Terms

### Ritual (Technical Context Only)
- **Definition:** Backend term for survey/feedback collection process
- **Status:** ⚠️ Technical use only - Do not use in user-facing documentation
- **Usage:** API endpoints, database tables, backend code
- **Example:** `POST /ritual` (API endpoint), `rituals` table (database)

### Summoning (Technical Context Only)
- **Definition:** Backend term for persona creation/generation process
- **Status:** ⚠️ Technical use only - Do not use in user-facing documentation
- **Usage:** API endpoints, backend code, technical documentation
- **Example:** `POST /personas/summon` (API endpoint)

### Akashic (Deprecated)
- **Definition:** Legacy term for background gradient
- **Status:** ❌ Deprecated - Use "primary background" or "bg-primary" instead
- **Replacement:** `bg-primary` class, `--color-bg-primary` CSS variable

---

## UI/UX Terms

### CTA (Call-to-Action)
- **Definition:** Primary action button that drives user conversion
- **Blonix Branch:** Uses Fuchsia/Pink gradient (`#d946ef` to `#c026d3`)
- **Usage:** "Primary CTA", "CTA button"

### State-Driven UI
- **Definition:** UI that changes based on application state
- **Usage:** "State-driven dashboard", "State-based UI components"

### 4px Grid System
- **Definition:** Spacing system where all measurements are multiples of 4px
- **Usage:** "Follow 4px grid", "4px grid compliant spacing"

---

## Deprecated Terms

### ❌ Persona AI
- **Replacement:** Re:MirAI
- **Reason:** Project name changed

### ❌ Ritual (User-Facing)
- **Replacement:** Survey
- **Reason:** More accessible, professional terminology
- **Exception:** Technical/backend contexts

### ❌ Summoning (User-Facing)
- **Replacement:** Persona Creation / Generation
- **Reason:** More accessible, professional terminology
- **Exception:** Technical/backend contexts

### ❌ Mystical (Design Context)
- **Replacement:** Modern / Clean
- **Reason:** Aligns with Blonix Branch philosophy
- **Exception:** Historical references only

### ❌ Akashic
- **Replacement:** Primary / bg-primary
- **Reason:** Removes religious connotations, more professional

---

## Acronyms

### AI
- **Definition:** Artificial Intelligence
- **Usage:** Define on first use: "AI (Artificial Intelligence)"

### API
- **Definition:** Application Programming Interface
- **Usage:** Define on first use: "API (Application Programming Interface)"

### CTA
- **Definition:** Call-to-Action
- **Usage:** Define on first use: "CTA (Call-to-Action)"

### UI
- **Definition:** User Interface
- **Usage:** Define on first use: "UI (User Interface)"

### UX
- **Definition:** User Experience
- **Usage:** Define on first use: "UX (User Experience)"

### WCAG
- **Definition:** Web Content Accessibility Guidelines
- **Usage:** Define on first use: "WCAG (Web Content Accessibility Guidelines)"

### MVP
- **Definition:** Minimum Viable Product
- **Usage:** Define on first use: "MVP (Minimum Viable Product)"

---

## Typography Terms

### Inter
- **Definition:** Primary font family
- **Usage:** "Inter font family", "Inter typography"

### Poppins
- **Definition:** Secondary font family (Blonix Branch)
- **Usage:** "Inter + Poppins font combination"

---

## Status Terms

### Active
- **Definition:** Currently in use, maintained
- **Usage:** Document status, feature status

### Deprecated
- **Definition:** No longer recommended, may be removed
- **Usage:** Legacy features, old terminology

### Draft
- **Definition:** Work in progress, not finalized
- **Usage:** Document status, feature status

---

## Maintenance

### Adding New Terms
1. Add term to appropriate section
2. Include definition, usage, and examples
3. Update "Last Updated" date
4. Cross-reference related documents

### Review Schedule
- **Monthly:** Review for new terms
- **Quarterly:** Full glossary audit
- **Per Release:** Update with new features

---

**Maintained by:** Documentation Team  
**Questions?** Contact: kordalek@naver.com

