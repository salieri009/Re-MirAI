# Page Structure Documentation

This directory contains XML documentation files that describe the UI/UX structure of each page in the Re:MirAI frontend application. These files are designed to be machine-readable and help AI systems understand the design patterns, layout structures, and design principles applied throughout the application.

## Design Principles Applied

All pages follow the design principles outlined in the [KickoffLabs Landing Page Design Guide](https://kickofflabs.com/blog/landing-page-fonts-colors/):

1. **Color Palette Limitation**: Each page uses 1-3 colors maximum, with one primary color assigned to call-to-action (CTA) buttons
2. **Single Font Family**: All pages use the Inter font family with weight variations (bold, semibold, regular) for hierarchy
3. **4px Grid System**: All spacing values are multiples of 4px, ensuring consistent visual rhythm
4. **Consistent Padding**: All sections maintain consistent padding using CSS variables
5. **Mobile-First Responsive Design**: All layouts adapt from mobile to desktop breakpoints

## XML File Structure

Each XML file contains the following sections:

### Metadata
- Page name, route, and component file
- Description of the page's purpose

### Design Principles
- Compliance check for each design principle
- Specific implementation details

### Color Palette
- Primary CTA color (usually indigo-500 to purple-600 gradient)
- Complementary colors (if used)
- Background colors
- Text colors (primary, secondary, muted)
- State colors (success, error, warning)

### Typography
- Font family (Inter)
- Font weight variations
- Font size hierarchy
- Special text effects (gradients, animations)

### Spacing System
- Base unit (4px)
- CSS variable tokens with multipliers
- Usage examples for each spacing value

### Layout Structure
- Container types and layouts
- Section hierarchy
- Component placement
- Spacing between elements
- Responsive breakpoints

### Components
- List of components used on the page
- Component variants and sizes
- Usage context

### States
- Loading states
- Error states
- Empty states
- Ready/active states

### Accessibility
- ARIA labels and roles
- Semantic HTML usage
- Keyboard navigation
- Screen reader support

### Responsive Design
- Breakpoint definitions
- Layout adaptations for different screen sizes

## Files

- `landing-page.xml` - Main entry point with hero section and "How It Works"
- `login-page.xml` - Authentication page with Google OAuth
- `dashboard-page.xml` - User dashboard with persona status and ritual progress
- `ritual-hub-page.xml` - Ritual creation and management interface
- `summoning-page.xml` - Persona summoning interface with Fated/Alchemic modes
- `persona-room-page.xml` - Persona's personal room with profile, actions, and quests
- `chat-page.xml` - Real-time chat interface with AI persona
- `survey-page.xml` - Public survey interface for anonymous feedback
- `ritual-result-page.xml` - Result display after completing a survey
- `public-profile-page.xml` - Shareable public persona profile

## Usage for AI Systems

These XML files can be used by AI systems to:

1. **Understand Design Patterns**: Learn how design principles are applied consistently across pages
2. **Generate Code**: Create new pages following the same design patterns
3. **Review Compliance**: Check if new designs follow the established principles
4. **Maintain Consistency**: Ensure spacing, colors, and typography remain consistent
5. **Accessibility Audit**: Verify accessibility features are properly implemented

## CSS Variables Reference

All pages use the following CSS variables defined in `frontend/src/assets/main.css`:

```css
--container-padding: 24px    /* Main container padding */
--section-spacing: 48px      /* Between major sections */
--subsection-spacing: 32px    /* Between subsections */
--card-padding: 24px         /* Card internal padding */
--card-spacing: 16px         /* Between cards */
--element-spacing: 16px      /* Between elements */
--text-spacing: 8px          /* Text elements */
--tight-spacing: 8px         /* Closely related items */
--micro-spacing: 4px         /* Micro adjustments */
```

## Color System

### Primary CTA Color (Blonix Branch)
- Gradient: Fuchsia/Pink (`#d946ef`) to darker Fuchsia (`#c026d3`)
- Used for: Primary action buttons, main CTAs

### Secondary Color (Blonix Branch)
- Blue: `#3b82f6`
- Used for: Secondary actions, supporting elements

### Background (Blonix Branch: Light Theme)
- Primary: `#f8fafc` (light gray)
- Cards: `#ffffff` (white)

### Text Colors (Blonix Branch: Light Theme)
- Primary: `#0f172a` (dark gray)
- Secondary: `#64748b` (medium gray)
- Muted: `rgba(100, 116, 139, 0.8)`

## Typography System

### Font Family (Blonix Branch)
- Primary: `Inter, Poppins, system-ui, sans-serif`
- Usage: Inter for body text, Poppins for friendly, modern feel

### Font Weights
- Bold (700): Headings
- Semibold (600): Subheadings
- Regular (400): Body text

### Font Sizes
- text-xs: 12px
- text-sm: 14px
- text-base: 16px
- text-lg: 18px
- text-xl: 20px
- text-2xl: 24px
- text-3xl: 30px
- text-4xl: 36px
- text-6xl: 60px
- text-7xl: 72px

## Responsive Breakpoints

- Mobile: Default (mobile-first)
- Tablet: `md:` (768px+)
- Desktop: `lg:` (1024px+)

## Maintenance

When updating pages:

1. Update the corresponding XML file to reflect changes
2. Ensure new designs comply with the design principles
3. Maintain 4px grid spacing consistency
4. Keep color palette limited to 1-3 colors
5. Use only the Inter font family (or Poppins for display text)
6. Document any new components or patterns

## References

- [KickoffLabs: Landing Page Design - Fonts & Colors](https://kickofflabs.com/blog/landing-page-fonts-colors/)
- [4px Grid System](https://tylerforge.design/styles/spacing/)
- Frontend Design System: `docs/frontend/design_system.md`
- Component Library: `docs/frontend/component_library.md`

