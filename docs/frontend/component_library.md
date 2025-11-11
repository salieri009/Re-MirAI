# Re:MirAI Component Library Documentation

## Component Architecture Philosophy

Re:MirAI's component library follows atomic design principles with a mystical twist. Each component is designed to be self-contained, reusable, and thematically consistent while supporting the overall narrative of AI persona summoning.

### Component Hierarchy
```
Pages (Views)
  ├── Templates (Page Layouts)
  ├── Organisms (Complex Components)  
  ├── Molecules (Component Groups)
  └── Atoms (Base Components)
```

---

## 🔘 Atoms - Base Components

### Button Component (`Button.vue`)

> **Nielsen Heuristics Compliant:** Implements System Status Visibility, User Control, and Error Prevention.

#### Enhanced Design Specifications
```vue
<Button 
  variant="primary|secondary|ghost" 
  size="sm|md|lg"
  :loading="boolean"
  :disabled="boolean"
  :aria-disabled="boolean"
  :aria-busy="boolean"
  :aria-describedby="string"
  @click="handler"
>
  Button Text
</Button>
```

#### 4-Point Grid Sizing System
All button dimensions follow the 4-point grid system for perfect pixel alignment:

```css
/* Small - 4-Point Grid Applied */
sm: 'px-4 py-2 text-sm min-h-8'   /* 16px, 8px, 32px height */

/* Medium (Default) */  
md: 'px-6 py-3 min-h-12'          /* 24px, 12px, 48px height */

/* Large */
lg: 'px-8 py-4 text-lg min-h-14'  /* 32px, 16px, 56px height */
```

#### Enhanced Interaction States (Nielsen: System Status Visibility)
- **Hover**: Smooth color transition + subtle lift
- **Active**: Scale down (0.95) for tactile feedback  
- **Focus**: 4px ring with `focus:ring-4 focus:ring-primary/30`
- **Loading**: Spinner with `role="status" aria-label="Loading"`
- **Disabled**: Clear visual distinction with `opacity-60`

#### Advanced Accessibility Features (WCAG 2.1 AA)
- **ARIA States**: `aria-busy`, `aria-disabled`, `aria-describedby`
- **Role Semantics**: `role="status"` for loading states
- **Screen Reader**: Descriptive labels and state announcements
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Clear focus indicators

#### Loading State Implementation
```vue
<!-- Loading State (Nielsen: System Status Visibility) -->
<span 
  v-if="loading" 
  class="inline-flex items-center mr-2"
  role="status" 
  aria-label="Loading"
>
  <svg class="animate-spin h-4 w-4" aria-hidden="true">
    <!-- Spinner SVG -->
  </svg>
</span>
```
---

### LoadingSkeleton Component (`LoadingSkeleton.vue`)

> **Nielsen's System Status Visibility:** Skeleton UI provides better UX than traditional spinners by showing content structure.

#### Design Philosophy
LoadingSkeleton follows modern UX best practices by showing the **structure** of content being loaded rather than a generic spinner. This reduces perceived loading time and provides better context.

#### Component Specifications
```vue
<LoadingSkeleton 
  type="header|card|persona|progress|default"
  size="sm|md|lg|full"
/>
```

#### Skeleton Types

##### Header Skeleton
```vue
<LoadingSkeleton type="header" />
<!-- Shows: Title placeholder + subtitle + action button -->
```

##### Card Skeleton  
```vue
<LoadingSkeleton type="card" />
<!-- Shows: Header + content area + button placeholder -->
```

##### Persona Skeleton
```vue
<LoadingSkeleton type="persona" />
<!-- Shows: Avatar + details + stats + action button -->
```

##### Progress Skeleton
```vue
<LoadingSkeleton type="progress" />
<!-- Shows: Title + progress bar + action area -->
```

#### 4-Point Grid Implementation
All skeleton dimensions use design tokens:
```css
.skeleton-container {
  gap: var(--subsection-spacing); /* 32px */
}

.skeleton-element {
  padding: var(--card-padding);    /* 24px */
  margin-bottom: var(--element-spacing); /* 16px */
}
```

#### Accessibility Features
- **ARIA Labels**: `role="status" aria-live="polite"`
- **Screen Reader**: Hidden text explaining loading state
- **Animation**: Subtle pulse that doesn't cause seizures
- **Reduced Motion**: Respects `prefers-reduced-motion`

#### Animation Specifications
```css
@keyframes skeletonPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

.animate-pulse {
  animation: skeletonPulse 2s ease-in-out infinite;
}
```

---

### LoadingSpinner Component (`LoadingSpinner.vue`) [DEPRECATED]

> **Status**: Deprecated in favor of LoadingSkeleton. Use only for specific loading actions.

#### Design Specifications
```vue
<LoadingSpinner 
  size="sm|md|lg" 
  :text="string"
  color="primary|secondary|white"
/>
```

#### Visual Design
- **Animation**: Smooth 1s linear infinite rotation
- **Styling**: Circular border with animated segment
- **Colors**: Matches theme palette
- **Text**: Optional descriptive text below spinner

#### Size Variants
```css
sm: 1rem diameter, 2px border
md: 1.5rem diameter, 3px border  
lg: 2rem diameter, 4px border
```

#### Use Cases
- Page loading states
- Button loading overlays  
- Content fetching indicators
- Form submission feedback

---

## 🎭 Molecules - Component Groups

### PersonaCard Component (`PersonaCard.vue`)

#### Design Philosophy
The PersonaCard is the crown jewel component, showcasing AI personas with beautiful visual hierarchy and interactive elements that reflect personality and rarity.

#### Component Structure
```vue
<PersonaCard 
  :persona="PersonaObject"
  :interactive="boolean"
  :compact="boolean"
  @click="handler"
  @share="shareHandler"
/>
```

#### Visual Elements

##### Rarity Indication
- **Border Glow**: Color-coded based on rarity (N/R/SR/SSR/UR)
- **Background Gradient**: Subtle rarity-themed backgrounds  
- **Particle Effects**: Animated elements for higher rarities
- **Hover Animation**: Rarity-appropriate hover responses

##### Persona Information Display
```html
<!-- Card Structure -->
<div class="persona-card">
  <div class="portrait-section">
    <img class="persona-illustration" />
    <div class="rarity-indicator" />
  </div>
  
  <div class="info-section">
    <h3 class="persona-name" />
    <p class="persona-title" />
    <div class="archetype-badge" />
  </div>
  
  <div class="stats-section">
    <div class="stat-bar" v-for="stat in stats" />
  </div>
  
  <div class="bond-section">
    <div class="bond-progress" />
    <span class="bond-level" />
  </div>
</div>
```

##### Stat Visualization
- **Progress Bars**: Color-coded personality dimensions
- **Hover Tooltips**: Detailed stat explanations
- **Visual Hierarchy**: Most prominent stats highlighted
- **Animation**: Bars fill on card appearance

#### Interactive States
- **Hover**: Gentle lift + glow enhancement
- **Focus**: Keyboard navigation highlight  
- **Loading**: Skeleton state with shimmer effect
- **Error**: Graceful fallback with retry option

#### Responsive Behavior
- **Mobile**: Vertical layout, larger touch targets
- **Tablet**: Horizontal layout, balanced proportions
- **Desktop**: Enhanced hover effects, detailed tooltips

### ShareButton Component (`ShareButton.vue`)

#### Design Concept
Social sharing that maintains the mystical theme while providing practical functionality across platforms.

#### Platform Support
```vue
<ShareButton 
  :platforms="['twitter', 'instagram', 'whatsapp']"
  :content="shareContent"
  variant="inline|modal|floating"
/>
```

#### Sharing Content Structure
```typescript
interface ShareContent {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
  hashtags: string[];
}
```

#### Visual Design
- **Platform Icons**: Recognizable social media icons
- **Mystical Styling**: Icons with subtle glow effects
- **Hover States**: Platform-colored hover responses
- **Success Feedback**: Confirmation animations on share

#### Share Flow
1. **Selection**: User chooses platform
2. **Content Generation**: Dynamic content based on context
3. **Platform Opening**: Native share or web intent
4. **Feedback**: Visual confirmation of action

---

## 🏗️ Organisms - Complex Components

### Navigation Header

#### Design Philosophy
The navigation adapts to user context, providing relevant actions while maintaining the mystical aesthetic.

#### Component States
- **Guest**: Logo + Login CTA
- **Authenticated**: Logo + User Menu + Memory Crystals
- **In-Process**: Context-aware actions (e.g., "Save Ritual")

#### Responsive Behavior
- **Mobile**: Hamburger menu with slide-out drawer
- **Desktop**: Horizontal navigation with dropdowns

### Dashboard Widget System

#### Widget Types
1. **Persona Status Widget**: Current AI companion state
2. **Ritual Progress Widget**: Survey creation and sharing status
3. **Quest Tracker Widget**: Active achievements and progress
4. **Social Activity Widget**: Friend interactions and sharing

#### Layout System
```css
/* Widget Grid */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

/* Widget Base Styles */
.dashboard-widget {
  background: var(--color-bg-secondary);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--color-border);
}
```

#### Widget Interactions
- **Collapsible**: Minimize less important widgets
- **Draggable**: Reorder for personal preference
- **Expandable**: Detail views for complex information

---

## 🎨 Visual Effects & Animations

### Magical Particle System

#### Implementation
```typescript
// Particle configuration
interface ParticleConfig {
  count: number;
  colors: string[];
  speed: number;
  opacity: number;
  size: { min: number; max: number };
}

// Usage contexts
const summoningParticles: ParticleConfig = {
  count: 50,
  colors: ['#6d28d9', '#a78bfa', '#c4b5fd'],
  speed: 0.5,
  opacity: 0.7,
  size: { min: 2, max: 6 }
};
```

#### Animation Contexts
- **Summoning Scene**: Intense particle generation during persona creation
- **Persona Cards**: Subtle ambient particles for high rarities
- **Achievement Moments**: Celebration bursts on quest completion
- **Page Transitions**: Gentle particle flows between sections

### Glow Effect System

#### Rarity-Based Glows
```css
/* Ultra Rare Glow */
.glow-ur {
  box-shadow: 0 0 20px rgba(239, 68, 68, 0.6);
  animation: ur-pulse 2s ease-in-out infinite alternate;
}

/* SSR Glow */  
.glow-ssr {
  box-shadow: 0 0 15px rgba(245, 158, 11, 0.5);
  animation: ssr-shimmer 3s linear infinite;
}
```

#### Interactive Glows
- **Hover Enhancement**: Glow intensifies on interaction
- **Focus States**: Accessibility-compliant glow rings
- **Loading States**: Pulsing glow during async operations
- **Achievement**: Victory glow on completion

---

## 🔧 Technical Implementation

### CSS Custom Properties Integration

#### Component Theming
```css
.btn {
  background: var(--btn-bg, var(--color-accent));
  color: var(--btn-text, var(--color-text-primary));
  border-radius: var(--btn-radius, 0.5rem);
}

/* Theme overrides */
.btn--secondary {
  --btn-bg: var(--color-bg-accent);
  --btn-text: var(--color-text-primary);
}
```

#### Dynamic Styling
```typescript
// Rarity-based theming
const getRarityStyles = (rarity: string) => ({
  '--card-glow': `var(--color-rarity-${rarity})`,
  '--card-border': `var(--color-rarity-${rarity})`,
  '--card-bg': `rgba(var(--color-rarity-${rarity}-rgb), 0.1)`
});
```

### Performance Optimizations

#### Animation Performance
```css
/* GPU acceleration for smooth animations */
.animate-optimized {
  transform: translateZ(0);
  will-change: transform, opacity;
  backface-visibility: hidden;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .animate-glow {
    animation: none;
  }
}
```

#### Lazy Loading
```typescript
// Component lazy loading
const PersonaCard = defineAsyncComponent(() => 
  import('@/components/common/PersonaCard.vue')
);

// Image lazy loading
<img 
  :src="persona.illustrationUrl" 
  loading="lazy"
  :alt="persona.name"
/>
```

### Accessibility Implementation

#### Focus Management
```typescript
// Focus trap for modals
const focusTrap = {
  mounted(el: HTMLElement) {
    const focusableElements = el.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    firstElement?.focus();
  }
};
```

#### Screen Reader Support
```vue
<template>
  <div 
    role="region" 
    :aria-label="`${persona.name} persona card`"
    :aria-describedby="`persona-${persona.id}-description`"
  >
    <div :id="`persona-${persona.id}-description`" class="sr-only">
      {{ persona.archetype }} type persona with {{ persona.rarity }} rarity.
      Bond level {{ persona.bondLevel }}.
    </div>
  </div>
</template>
```

---

## 📱 Responsive Component Behavior

### Breakpoint Strategy
```typescript
// Responsive breakpoints
const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet portrait  
  lg: '1024px',  // Tablet landscape / Small desktop
  xl: '1280px'   // Large desktop
} as const;
```

### Component Adaptation
```css
/* PersonaCard responsive behavior */
.persona-card {
  /* Mobile: Stack vertically */
  @media (max-width: 767px) {
    flex-direction: column;
    text-align: center;
  }
  
  /* Desktop: Horizontal layout */
  @media (min-width: 768px) {
    flex-direction: row;
    text-align: left;
  }
}
```

### Touch Optimization
```css
/* Touch-friendly targets */
.btn {
  min-height: 44px; /* iOS guideline */
  min-width: 44px;
  
  /* Touch device spacing */
  @media (hover: none) {
    margin: 0.25rem;
  }
}
```

---

## 🎯 Component Testing Strategy

### Visual Regression Testing
```typescript
// Storybook stories for component states
export default {
  title: 'Components/PersonaCard',
  component: PersonaCard,
};

export const AllRarities = () => ({
  template: `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <PersonaCard v-for="rarity in rarities" 
                   :key="rarity" 
                   :persona="getPersonaByRarity(rarity)" />
    </div>
  `
});
```

### Accessibility Testing
```typescript
// Automated accessibility testing
describe('PersonaCard Accessibility', () => {
  it('should have proper ARIA labels', () => {
    expect(screen.getByLabelText(/persona card/i)).toBeInTheDocument();
  });
  
  it('should be keyboard navigable', () => {
    const card = screen.getByRole('button');
    card.focus();
    expect(card).toHaveFocus();
  });
});
```

This comprehensive component library ensures consistency, accessibility, and maintainability while supporting the mystical aesthetic and user experience goals of Re:MirAI.
