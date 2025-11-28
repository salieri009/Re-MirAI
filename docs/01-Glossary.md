# Re:MirAI Glossary

> **Standard terminology for the Re:MirAI project**

**Last Updated:** 2025-11-28  
**Version:** 1.1.0  
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

### ver2 "Digital Mirror" Design System
- **Definition:** The current design system for Re:MirAI (Version 2)
- **Characteristics:**
  - Dark theme (`#0A0112` Deep Space background)
  - 3-Color System: Primary (Amethyst Purple #845EC2), Accent (Mint Green #00C9A7), Highlight (Light Lavender #C197FF)
  - Space Grotesk (Display) + Plus Jakarta Sans (Body) typography
  - 4px grid system for spacing
  - Glassmorphism effects
  - Modern, immersive, accessible
- **Usage:** Current design system for all new implementations
- **See Also:** [ver2 Enhancement Documentation](07-Enhancement/ver2/README.md)

### Blonix Branch
- **Definition:** Legacy design system (deprecated)
- **Status:** ⚠️ Deprecated - Replaced by ver2 "Digital Mirror"
- **Note:** Only for historical reference

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

### 3-Color System (ver2)
- **Definition:** The unified color palette for ver2 design system
- **Colors:**
  - **Primary:** Amethyst Purple (`#845EC2`) - Primary actions, main brand elements
  - **Accent:** Mint Green (`#00C9A7`) - Secondary actions, highlights
  - **Highlight:** Light Lavender (`#C197FF`) - Accents, borders, subtle highlights
- **Usage:** All UI elements must use only these three colors (with opacity variations)
- **See Also:** [Color Palette Plan](07-Enhancement/ver2/09-Color-Palette-Plan.md)

### Primary Color (ver2)
- **Definition:** Main brand color for primary actions
- **ver2:** Amethyst Purple (`#845EC2`)
- **Usage:** Primary CTA buttons, main actions, brand elements

### Accent Color (ver2)
- **Definition:** Supporting brand color for secondary actions
- **ver2:** Mint Green (`#00C9A7`)
- **Usage:** Secondary buttons, supporting elements, progress indicators

### Highlight Color (ver2)
- **Definition:** Accent color for subtle highlights and borders
- **ver2:** Light Lavender (`#C197FF`)
- **Usage:** Borders, subtle highlights, text accents

### Surface Colors (ver2)
- **Definition:** Background and container colors
- **ver2:**
  - `background-dark`: `#0A0112` (Deep Space - page background)
  - `surface`: `rgba(132, 94, 194, 0.2)` (Purple tint - card background)
  - `surface-elevated`: `rgba(132, 94, 194, 0.4)` (Elevated cards)
  - `border`: `rgba(193, 151, 255, 0.2)` (Border color)

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

### Glassmorphism (ver2)
- **Definition:** UI design technique using semi-transparent backgrounds with blur effects
- **ver2:** Applied to cards, modals, and elevated surfaces
- **Usage:** "Glassmorphism effect", "glass card"
- **Characteristics:** `backdrop-filter: blur()`, semi-transparent backgrounds

### Material Symbols (ver2)
- **Definition:** Google Material Symbols icon font library
- **ver2:** Used for feature icons (link, neurology, auto_awesome)
- **Usage:** "Material Symbols icons", "material-symbols-outlined class"

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
- **Replacement:** Digital Mirror / Modern
- **Reason:** Aligns with ver2 "Digital Mirror" philosophy
- **Exception:** Historical references only

### ❌ Blonix Branch (Current Use)
- **Replacement:** ver2 "Digital Mirror" Design System
- **Reason:** Current design system is ver2, not Blonix Branch
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

### Space Grotesk (ver2)
- **Definition:** Display font family for headings and titles
- **ver2:** Primary display font
- **Usage:** "Space Grotesk font", "Space Grotesk typography"
- **Weights:** Medium (500), Bold (700)
- **See Also:** [Typography System](07-Enhancement/ver2/11-Typography-System.md)

### Plus Jakarta Sans (ver2)
- **Definition:** Body font family for content text
- **ver2:** Primary body font
- **Usage:** "Plus Jakarta Sans font", "body typography"

### 4px Grid System (ver2)
- **Definition:** Spacing system where all measurements are multiples of 4px
- **ver2:** Standard spacing values: 4px, 8px, 12px, 16px, 24px, 32px, 40px, 48px, 64px
- **Usage:** "Follow 4px grid", "4px grid compliant spacing"
- **See Also:** [4px Baseline Grid System](07-Enhancement/ver2/10-4px-Baseline-Grid-System.md)

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

