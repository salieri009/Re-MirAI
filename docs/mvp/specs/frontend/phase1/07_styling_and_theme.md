# Frontend Spec Phase 1: Styling & Theme

This document outlines how the design system will be implemented using Tailwind CSS to ensure a consistent, anime-inspired aesthetic.

## 1. Configuration (`tailwind.config.js`)
All design tokens (colors, fonts, etc.) will be defined in `tailwind.config.js` under the `theme.extend` object to customize and extend Tailwind's defaults.

### 1.1. Color Palette
The color system is designed to support both light and dark themes.

-   **Primary**: A vibrant magenta.
    -   `primary: { 50: '#...', 100: '#...', ..., 900: '#...' }`
-   **Secondary**: A cool blue.
    -   `secondary: { ... }`
-   **Neutrals**: A set of cool grays for text and surfaces.
    -   `text-primary`, `text-secondary`
    -   `surface-ground`, `surface-card`, `surface-border`
-   **Feedback**: Standard colors for application states.
    -   `success`, `warning`, `danger`

*(Note: Specific hex codes will be determined from the final design mockups and added here.)*

### 1.2. Typography
-   **Font Family**:
    -   `sans: ['Inter', 'sans-serif']` (or 'Poppins' as a fallback). The chosen font will be imported in `index.html` from a service like Google Fonts.
-   **Font Size Scale**: A responsive typographic scale will be defined.
    -   `display`, `h1` - `h6`, `body-lg`, `body-md`, `body-sm`, `caption`.

### 1.3. Spacing
-   The default Tailwind CSS spacing scale will be used, which is based on a `4px` unit (`1` = `4px`, `2` = `8px`). This aligns with the `8px` base unit principle.

### 1.4. Plugins
-   `@tailwindcss/forms`: Will be used to provide a sensible reset for form element styles.

## 2. Global Styles (`src/styles/main.css`)
This file will contain the core Tailwind directives and any necessary global styles.

```css
/* src/styles/main.css */

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-surface-ground text-text-primary antialiased;
  }
}
```

## 3. Layouts (`/src/layouts`)
To maintain a consistent page structure, views will be wrapped in layout components.

-   **`DefaultLayout.vue`**:
    -   **Purpose**: The standard layout for most authenticated pages.
    -   **Structure**: Contains a site header (with user info/logout), a main content area, and potentially a footer.
    -   **Slot**: Provides a default `<slot />` for the view content. The main content `<div>` will have classes for responsive centering and max-width (e.g., `max-w-screen-xl mx-auto px-4`).
-   **`CenteredLayout.vue`**:
    -   **Purpose**: A minimal layout for pages like Login or the Survey.
    -   **Structure**: A simple flex container that centers its content both vertically and horizontally on the page.
    -   **Slot**: Provides a default `<slot />`.

## 4. Dark Mode
-   **Strategy**: Dark mode will be implemented using Tailwind's `darkMode: 'class'` strategy.
-   **Implementation**: A theme-switching utility will toggle a `.dark` class on the `<html>` element. All color definitions in `tailwind.config.js` will be updated to include `dark:` variants (e.g., `dark:bg-gray-900`, `dark:text-gray-100`).
