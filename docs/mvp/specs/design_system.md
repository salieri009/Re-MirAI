# Design System: Persona AI

This document defines the visual language and design principles for the Persona AI project, ensuring a cohesive, modern, and anime-inspired user experience. All design tokens (colors, fonts, spacing) will be configured in `tailwind.config.js`.

## 1. Aesthetic & Vibe

-   **Core Concept:** Clean, modern, and intuitive with a distinct anime/webtoon aesthetic.
-   **Feeling:** Engaging, fun, and magical. The UI should feel lightweight and responsive, with moments of delight (e.g., the persona reveal).
-   **Inspiration:** Modern web apps, minimalist anime UI, and gacha game interfaces.

## 2. Color Palette

The color palette must be WCAG compliant and support both light and dark themes.

-   **Primary (Brand/Accent):** A vibrant purple/magenta. Used for primary CTAs, links, and key highlights.
    -   `primary-500` (base), with shades from `100` (lightest) to `900` (darkest).
-   **Secondary (Supporting):** A cool blue. Used for secondary buttons and informational elements.
-   **Neutrals (Surface & Text):** A palette of grays with a slight cool tint.
    -   `surface-ground`: The main page background.
    -   `surface-card`: Background for cards and modals.
    -   `surface-border`: For borders and dividers.
    -   `text-primary`: For main text content.
    -   `text-secondary`: For subtitles and less important text.
-   **Feedback Colors:**
    -   `success`: Green for success states.
    -   `warning`: Yellow for warnings.
    -   `danger`: Red for errors and destructive actions.

## 3. Typography

-   **Primary Font:** A clean, geometric sans-serif font (e.g., Inter, Poppins) for all UI text to ensure readability.
-   **Typographic Scale:** A responsive and consistent type scale will be defined in `tailwind.config.js`.
    -   `display`: Large, expressive text for major headings.
    -   `h1` - `h6`: Standard heading levels.
    -   `body-lg`, `body-md`, `body-sm`: Paragraph and body text sizes.
    -   `caption`: For small, auxiliary text.

## 4. Spacing & Layout

-   **Base Unit:** 8px. All spacing (padding, margin, gaps) will be multiples of this base unit, configured in Tailwind's spacing scale.
-   **Layout:** The main layout will be centered with a maximum width to ensure readability on large screens. It will be fully responsive for mobile, tablet, and desktop views.

## 5. Core Components (To be built as Base Components)

-   **`Button`**:
    -   Variants: `primary`, `secondary`, `ghost`, `danger`.
    -   Sizes: `sm`, `md`, `lg`.
    -   States: `default`, `hover`, `active`, `disabled`, `loading`.
-   **`Card`**:
    -   Default container for most content blocks.
    -   Subtle border, box-shadow, and rounded corners.
-   **`Input`**:
    -   Consistent styling for text fields, text areas, and select dropdowns.
    -   Includes states for `default`, `focus`, `disabled`, and `error`.
-   **`Modal`**:
    -   Centered popup for critical information or actions.
    -   Includes a backdrop overlay.
-   **`Toast/Notification`**:
    -   Small, non-disruptive popups for providing feedback (e.g., "Response Submitted!").

## 6. Iconography

-   A single, consistent icon set will be used, such as `Lucide` or `Tabler Icons`, to maintain visual harmony. Icons should be lightweight SVGs.

## 7. Animation & Motion

-   **Principle:** Animations should be subtle, meaningful, and performant. They should enhance the user experience, not distract from it.
-   **UI Transitions:** Use standard CSS transitions for smooth state changes on hover and focus (`ease-in-out`, `150ms`).
-   **Special Animations:** The "Persona Reveal" sequence will be a key moment featuring a more elaborate, "gacha-style" animation to build excitement.
