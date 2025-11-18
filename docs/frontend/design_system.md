# Re:MirAI Frontend Design System

> *"The mirror reflects your soul. What image do you cast in others?"*

## Design Philosophy (Blonix Branch Priority)

Re:MirAI's design system prioritizes the **Blonix Branch design philosophy**: a modern, accessible, and user-friendly experience with a light theme optimized for general users (B2C service). The interface balances technological precision with emotional depth while maintaining broad appeal and accessibility.

### Core Design Principles

#### 1. **Modern Minimalism (Blonix Style)**
- Clean, uncluttered layouts with a light theme (`#f8fafc` background)
- Strategic use of negative space to create breathing room
- Focus on essential elements while maintaining visual hierarchy
- Bright, welcoming aesthetic that doesn't require gaming or subculture knowledge

#### 2. **User-Centric Design** 
- Colors (Fuchsia/Pink Primary `#d946ef`, Blue Secondary `#3b82f6`) that evoke freshness and modernity
- UI patterns that reflect clarity and ease of use
- Professional appeal suitable for both personal and professional contexts
- High contrast for optimal readability (dark text `#0f172a` on light background)

#### 3. **Progressive Revelation**
- Information architecture that gradually reveals complexity
- Onboarding flow that educates while maintaining clarity
- UI states that clearly communicate system status and user progress
- State-driven UI with immediate visual feedback

#### 4. **Accessibility & Inclusivity (Top Priority)**
- High contrast ratios (WCAG AA compliant) for readability
- Light theme optimized for daytime use and reduced eye strain
- Clear visual hierarchies and intuitive navigation
- Responsive design that works across all devices
- Typography: Inter + Poppins for friendly, modern feel

---

## Design Token System

> **The Illusionist's Toolkit:** Following industry best practices from Designership.com's 4-Point Grid System and Nielsen's Usability Heuristics.

### 4-Point Grid Spacing System

All spacing in Re:MirAI follows a **strict 4-point grid system** where every measurement is divisible by 4px. This ensures pixel-perfect alignment across all devices and maintains visual consistency.

```css
:root {
  /* === 4-POINT GRID SPACING SYSTEM === */
  /* Base unit: 4px - All spacing MUST be divisible by 4 */
  --space-1: 0.25rem; /* 4px - micro spacing */
  --space-2: 0.5rem;  /* 8px - tight spacing */
  --space-3: 0.75rem; /* 12px - small spacing */
  --space-4: 1rem;    /* 16px - base spacing */
  --space-5: 1.25rem; /* 20px - medium spacing */
  --space-6: 1.5rem;  /* 24px - large spacing */
  --space-8: 2rem;    /* 32px - section spacing */
  --space-10: 2.5rem; /* 40px - container spacing */
  --space-12: 3rem;   /* 48px - page spacing */
  --space-16: 4rem;   /* 64px - hero spacing */
  --space-20: 5rem;   /* 80px - large sections */
  --space-24: 6rem;   /* 96px - massive spacing */
}
```

### Semantic Spacing Tokens

These tokens create a **clear hierarchy** and ensure consistency across all components:

```css
/* === SEMANTIC SPACING TOKENS === */
/* Container Hierarchy (Large → Small) */
--container-padding: var(--space-6);    /* 24px - main containers */
--section-spacing: var(--space-12);     /* 48px - between major sections */
--subsection-spacing: var(--space-8);   /* 32px - between subsections */
--card-padding: var(--space-6);         /* 24px - card internal padding */
--card-spacing: var(--space-4);         /* 16px - between cards */
--element-spacing: var(--space-4);      /* 16px - between elements */
--text-spacing: var(--space-2);         /* 8px - text elements */
--tight-spacing: var(--space-2);        /* 8px - closely related items */
--micro-spacing: var(--space-1);        /* 4px - micro adjustments */
```

### Usage Guidelines

1. **Always use tokens**: Never hardcode spacing values
2. **Respect hierarchy**: Larger containers get larger spacing
3. **Consistent application**: Use the same token for similar relationships
4. **4px rule**: All custom spacing must be divisible by 4

---

## Color System

### Primary Palette

```css
:root {
  /* === COLOR SYSTEM (Blonix Branch: Light Theme) === */
  --color-bg-primary: #f8fafc;        /* Light gray background */
  --color-bg-secondary: #ffffff;      /* White card background */
  --color-bg-accent: #f1f5f9;         /* Light accent background */
  --color-text-primary: #0f172a;      /* Dark gray text */
  --color-text-secondary: #64748b;     /* Medium gray text */
  --color-text-muted: rgba(100, 116, 139, 0.8);
  --color-accent: #d946ef;             /* Fuchsia/Pink primary */
  --color-accent-hover: #c026d3;       /* Darker fuchsia on hover */
  --color-border: rgba(226, 232, 240, 1);  /* Light border */
  --color-border-light: rgba(226, 232, 240, 0.5);
  
  /* State Colors (Nielsen Heuristic: System Status Visibility) */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #06b6d4;
  --color-loading: #8b5cf6;
}
```

---

## Nielsen's 10 Usability Heuristics Implementation

> **The Illusionist's Standards:** Every UI element follows Nielsen's proven usability principles for maximum user satisfaction.

### 1. **Visibility of System Status**
- **Loading States**: Skeleton UI instead of spinners
- **Progress Indicators**: Clear percentage and milestone markers
- **System Feedback**: `aria-live` regions for screen readers
- **Status Colors**: Consistent color coding for different states

```css
/* Implementation */
role="status" aria-live="polite"  /* Loading states */
:loading="true" :aria-busy="true" /* Button states */
```

### 2. **Match Between System and Real World**
- **Familiar Language**: Clear, accessible terminology (e.g., "Survey" instead of technical terms)
- **Real-World Metaphors**: "Persona Room", "Feedback Collection", "Persona Creation"
- **Progressive Disclosure**: Information revealed in natural order

### 3. **User Control and Freedom**
- **Clear Navigation**: Breadcrumbs on every page
- **Undo Actions**: "Try again" buttons for errors
- **Escape Routes**: Always provide back/cancel options

### 4. **Consistency and Standards**
- **4-Point Grid**: All spacing follows the same system
- **Design Tokens**: Consistent visual language
- **Component Library**: Reusable, standardized components

### 5. **Error Prevention**
- **Input Validation**: Real-time feedback on forms
- **Confirmation Dialogs**: For destructive actions
- **Clear Labels**: Descriptive button text and aria-labels

### 6. **Recognition Rather Than Recall**
- **Visual Cues**: Icons paired with text
- **Status Indicators**: Clear visual states
- **Contextual Information**: Always show where users are

### 7. **Flexibility and Efficiency of Use**
- **Keyboard Navigation**: Full keyboard accessibility
- **Multiple Paths**: Different ways to reach same goals
- **Responsive Design**: Works on all device sizes

### 8. **Aesthetic and Minimalist Design**
- **Information Hierarchy**: Clear visual priorities
- **Purposeful Elements**: Every element serves a function
- **White Space**: Breathing room between elements

### 9. **Help Users Recognize, Diagnose, and Recover from Errors**
- **Specific Error Messages**: Clear problem description
- **Recovery Actions**: "Try again" functionality
- **Error Context**: Show exactly where the error occurred

### 10. **Help and Documentation**
- **Contextual Help**: `aria-describedby` attributes
- **Screen Reader Support**: Comprehensive ARIA labels
- **Progressive Disclosure**: Information revealed as needed

---

## Persona Rarity System
Inspired by gacha games, each persona rarity has its distinct color language:

- **N (Normal)**: `#9ca3af` - Neutral gray, common and approachable
- **R (Rare)**: `#60a5fa` - Sky blue, reliable and trustworthy  
- **SR (Super Rare)**: `#a78bfa` - Lavender purple, special and valued
- **SSR (Super Super Rare)**: `#f59e0b` - Golden amber, precious and coveted
- **UR (Ultra Rare)**: `#ef4444` - Ruby red, legendary and powerful

### Persona Stats Colors
Each personality dimension has its own thematic color:

- **Charisma**: `#4f46e5` - Royal purple (leadership, magnetism)
- **Intellect**: `#06b6d4` - Cyan blue (logic, wisdom)
- **Kindness**: `#10b981` - Emerald green (growth, compassion)
- **Instability**: `#ec4899` - Hot pink (passion, unpredictability)
- **Spirit**: `#f59e0b` - Bright orange (energy, vitality)

---

## Typography

### Font Families
- **Primary**: Inter - Clean, readable, modern sans-serif
- **Display**: Poppins - Friendly, rounded for headings and hero text
- **System Fallback**: system-ui, sans-serif

### Type Scale
```css
/* Headings */
h1: 3rem (48px) - Hero titles, landing page
h2: 2.25rem (36px) - Section headers  
h3: 1.5rem (24px) - Card titles, subsections
h4: 1.25rem (20px) - Component labels

/* Body Text */
Large: 1.125rem (18px) - Hero descriptions
Base: 1rem (16px) - Primary body text  
Small: 0.875rem (14px) - Secondary text, captions
```

### Text Hierarchy
- **Primary Text**: High contrast white for main content
- **Secondary Text**: Medium contrast gray for supporting info
- **Muted Text**: Low contrast for metadata and less important details

---

## Component System

### Buttons

#### Primary Button (`btn-primary`)
- **Use Case**: Main actions (Begin Ritual, Summon Persona)
- **Style**: Indigo background with hover effects
- **Psychology**: Confidence, forward momentum

#### Secondary Button (`btn-secondary`) 
- **Use Case**: Supporting actions (View Profile, Settings)
- **Style**: Purple background, slightly less prominent
- **Psychology**: Support without overwhelming

#### Ghost Button (`btn-ghost`)
- **Use Case**: Tertiary actions (Cancel, Learn More)
- **Style**: Transparent with colored border
- **Psychology**: Available but non-intrusive

### Cards (`card`)
- **Foundation**: Semi-transparent backgrounds with subtle borders
- **Effect**: Glassmorphism with backdrop blur
- **Purpose**: Create depth and hierarchy while maintaining a modern, clean aesthetic
- **Shadow**: Soft purple glow to enhance the magical feeling

### Form Elements (`input`)
- **Design**: Consistent with card styling
- **Focus States**: Indigo glow on interaction
- **Accessibility**: Clear labels and sufficient contrast

---

## Animation & Motion

### Animation Principles
1. **Purposeful**: Every animation serves a functional purpose
2. **Smooth**: 60fps performance with hardware acceleration
3. **Contextual**: Motion that reflects the mystical theme

### Key Animations

#### Fade In (`animate-fade-in`)
- **Duration**: 0.5s ease-in-out
- **Use**: Page transitions, content reveals
- **Feel**: Gentle appearance, respectful of user attention

#### Slide Up (`animate-slide-up`)
- **Duration**: 0.5s ease-out  
- **Use**: Modal appearances, form submissions
- **Feel**: Content emerging from below, natural upward motion

#### Glow Effect (`animate-glow`)
- **Duration**: 2s infinite alternate
- **Use**: Highlighting important elements, mystical effects
- **Feel**: Pulsing energy, magical presence

#### Float Animation (`animate-float`)
- **Duration**: 3s ease-in-out infinite
- **Use**: Decorative elements, persona cards
- **Feel**: Weightless, ethereal presence

### Micro-interactions
- **Hover States**: Subtle scale and color transitions (200ms)
- **Click Feedback**: Brief scale down (100ms) for tactile feel
- **Loading States**: Smooth spinning indicators with appropriate messaging

---

## Layout System

### Container Strategy
```css
.container-page {
  max-width: 7xl (1280px);
  margin: 0 auto;
  padding: 2rem 1rem; /* Mobile first */
}

@media (sm) { padding: 2rem 1.5rem; }
@media (lg) { padding: 2rem 2rem; }
```

### Grid System
- **Mobile First**: Single column layouts that expand upward
- **Breakpoints**: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- **Cards**: Responsive grid that maintains aspect ratios

### Spacing Scale
Based on Tailwind's 4px base unit:
- **xs**: 0.25rem (4px) - Tight spacing
- **sm**: 0.5rem (8px) - Small gaps  
- **md**: 1rem (16px) - Standard spacing
- **lg**: 1.5rem (24px) - Section spacing
- **xl**: 2rem (32px) - Large separations

---

## Responsive Design

### Mobile-First Approach
All components are designed mobile-first and progressively enhanced:

1. **Mobile (320px+)**: Single column, large touch targets
2. **Tablet (768px+)**: Two-column layouts, refined spacing  
3. **Desktop (1024px+)**: Multi-column, hover states, larger typography
4. **Wide (1280px+)**: Maximum content width, enhanced animations

### Touch Considerations
- **Minimum Target Size**: 44px × 44px (iOS guideline)
- **Gesture Support**: Swipe navigation where appropriate
- **Safe Areas**: Respect device notches and rounded corners

---

## Accessibility Standards

### WCAG 2.1 AA Compliance
- **Color Contrast**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Keyboard Navigation**: Full functionality via keyboard
- **Screen Readers**: Semantic HTML and ARIA labels
- **Motion**: Respect user's motion preferences

### Focus Management
- **Visible Focus Indicators**: Clear blue outline (--color-accent)
- **Focus Trapping**: Modals and overlays properly manage focus
- **Skip Links**: Allow navigation to main content

### Color Independence
- **Never Color Only**: Information conveyed through multiple means
- **Pattern Support**: Icons and shapes supplement color coding
- **High Contrast Mode**: Compatible with OS accessibility features

---

## Performance Guidelines

### Optimization Strategies
1. **Critical CSS**: Above-the-fold styles inlined
2. **Image Optimization**: WebP with fallbacks, responsive sizes
3. **Code Splitting**: Lazy load non-critical components
4. **Animation Performance**: Use `transform` and `opacity` only

### Loading States
- **Skeleton Screens**: For content-heavy pages
- **Spinner Components**: For short operations (< 2 seconds)
- **Progress Indicators**: For multi-step processes

### Bundle Size Targets
- **CSS Bundle**: < 50KB compressed
- **Initial JS**: < 200KB compressed  
- **Total Page Weight**: < 1MB on first load

---

## Design Tokens

All design values are stored as CSS custom properties and Tailwind config, enabling:
- **Consistent Application**: Same values across all components
- **Easy Updates**: Change once, apply everywhere
- **Theme Variants**: Potential for light/dark mode toggle
- **Developer Handoff**: Clear documentation of all values

This system ensures that Re:MirAI maintains its mystical, professional appearance while providing an intuitive and accessible user experience across all devices and interaction methods.
