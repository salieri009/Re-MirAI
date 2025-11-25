/**
 * Re:MirAI Design Tokens
 * Emotion-mapped design system supporting purpose-driven UX
 * 
 * Each token set aligns with page purposes and emotional journeys:
 * - Curiosity & Wonder (Landing)
 * - Trust & Clarity (Login, Survey)
 * - Progress & Motivation (Dashboard, Ritual Hub)
 * - Intimacy & Connection (Chat, Persona Room)
 * - Awe & Joy (Summoning)
 */

const SMALL_SWITCH_PALETTE = {
    primary: '#d946ef',
    primaryLight: '#f5c6ff',
    primaryDark: '#b51eca',
    canvas: '#e6ebf8',
    accent: '#697fac',
    accentLight: '#90a1c8',
    accentDark: '#4b5d80',
    textAnchor: '#334155', // New accessible text color
} as const;

export const tokens = {
    palette: SMALL_SWITCH_PALETTE,
    /**
     * Emotional Color Mappings
     * Colors evoke specific emotions aligned with page purposes
     */
    emotions: {
        // Curiosity & Wonder (Landing Page)
        curiosity: {
            primary: SMALL_SWITCH_PALETTE.primary,
            secondary: SMALL_SWITCH_PALETTE.canvas,
            accent: SMALL_SWITCH_PALETTE.accent,
            text: SMALL_SWITCH_PALETTE.textAnchor,
        },

        // Trust & Clarity (Login, Survey)
        trust: {
            primary: SMALL_SWITCH_PALETTE.accent,
            secondary: SMALL_SWITCH_PALETTE.accentLight,
            accent: SMALL_SWITCH_PALETTE.canvas,
            text: SMALL_SWITCH_PALETTE.textAnchor,
        },

        // Progress & Motivation (Dashboard, Ritual Hub)
        progress: {
            collecting: SMALL_SWITCH_PALETTE.accent,
            ready: SMALL_SWITCH_PALETTE.primary,
            success: '#10b981',    // Green - Achievement
            warning: '#f59e0b',    // Amber - Attention needed
        },

        // Intimacy & Connection (Chat, Persona Room)
        connection: {
            user: SMALL_SWITCH_PALETTE.primary,
            ai: '#f1f5f9',         // Soft neutral - Gentle presence
            bond: '#f59e0b',       // Gold - Precious connection
            heartLv1: '#e5e7eb',   // Gray - New bond
            heartLv3: '#ef4444',   // Red - Growing bond
            heartLv5: '#ec4899',   // Pink - Deep bond
        },

        // Awe & Joy (Summoning)
        delight: {
            dark: '#1e1b4b',       // Deep indigo - Dramatic backdrop
            magical: SMALL_SWITCH_PALETTE.primary,
            celebration: '#f59e0b', // Gold - Joy, achievement
            particle: SMALL_SWITCH_PALETTE.accentLight,
        },
    },

    /**
     * Surface Colors
     * Backgrounds and containers
     */
    surface: {
        light: SMALL_SWITCH_PALETTE.canvas,
        card: 'rgba(255, 255, 255, 0.95)',   // Semi-transparent white
        alt: SMALL_SWITCH_PALETTE.canvas,
        glass: 'rgba(255, 255, 255, 0.1)',   // Glassmorphism
        dark: '#0f172a',                     // Slate 900
        overlay: 'rgba(0, 0, 0, 0.5)',       // Modal overlay
    },

    /**
     * Typography
     * Font families for hierarchy
     */
    fonts: {
        display: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        mono: "'Fira Code', 'Courier New', monospace",
    },

    /**
     * Font Sizes
     * Responsive typography scale
     */
    fontSize: {
        xs: '0.75rem',    // 12px
        sm: '0.875rem',   // 14px
        base: '1rem',     // 16px
        lg: '1.125rem',   // 18px
        xl: '1.25rem',    // 20px
        '2xl': '1.5rem',  // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem', // 36px
        '5xl': '3rem',    // 48px
    },

    /**
     * Spacing (4px grid system)
     * Maintains visual rhythm
     */
    space: {
        0: '0',
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '96px',
        '5xl': '128px',
    },

    /**
     * Z-Index Hierarchy (Purpose-Driven)
     * Manages focus and visual priority
     */
    zIndex: {
        background: 0,       // Base layer
        tertiary: 10,        // Ambient/supportive elements
        secondary: 30,       // Supporting content
        primary: 50,         // Main focus elements
        overlay: 100,        // Modals, dropdowns
        notification: 200,   // Toasts, alerts
    },

    /**
     * Animation Durations (Emotional Pacing)
     * Duration reflects interaction importance
     */
    duration: {
        instant: 100,      // Immediate feedback (ms)
        fast: 200,         // Quick responses
        normal: 300,       // Standard transitions
        slow: 600,         // Deliberate moments
        epic: 1200,        // Dramatic reveals
        summoning: 10000,  // Full summoning sequence
    },

    /**
     * Easing Functions (Emotional Character)
     * Cubic bezier curves for different feelings
     */
    easing: {
        // Calm, trustworthy (Login, Survey)
        calm: 'cubic-bezier(0.4, 0, 0.2, 1)',

        // Bouncy, delightful (Achievements, completions)
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',

        // Elastic, playful (Micro-interactions)
        elastic: 'cubic-bezier(0.68, -0.55, 0.265, 2)',

        // Smooth, natural (Message flow, scrolling)
        smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',

        // Sharp entrance (Modals, important alerts)
        sharpIn: 'cubic-bezier(0.4, 0, 1, 1)',

        // Soft exit (Dismissals, closings)
        softOut: 'cubic-bezier(0, 0, 0.2, 1)',
    },

    /**
     * Border Radius
     * Softens UI, creates approachability
     */
    radius: {
        none: '0',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
        full: '9999px',
    },

    /**
     * Shadows (Depth Layers)
     * Creates visual hierarchy through elevation
     */
    shadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -1px rgba(15, 23, 42, 0.06)',
        lg: '0 10px 20px -5px rgba(15, 23, 42, 0.15)',
        xl: '0 20px 35px -8px rgba(15, 23, 42, 0.2)',
        '2xl': '0 25px 50px -12px rgba(15, 23, 42, 0.25)',

        // Emotional shadows
        glowPrimary: `0 0 32px rgba(217, 70, 239, 0.4)`,
        glowAccent: `0 0 28px rgba(105, 127, 172, 0.45)`,
        glowDual: `0 0 36px rgba(217, 70, 239, 0.3), 0 0 52px rgba(105, 127, 172, 0.35)`,
        glowSuccess: '0 0 20px rgba(16, 185, 129, 0.3)',
    },

    /**
     * Breakpoints
     * Responsive design thresholds
     */
    breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
    },

    /**
     * Gradients
     * Shared hero/card backgrounds
     */
    gradients: {
        primaryToCanvas: `linear-gradient(135deg, ${SMALL_SWITCH_PALETTE.primary} 0%, ${SMALL_SWITCH_PALETTE.canvas} 100%)`,
        primaryToAccent: `linear-gradient(135deg, ${SMALL_SWITCH_PALETTE.primary} 0%, ${SMALL_SWITCH_PALETTE.accent} 100%)`,
        accentWash: `linear-gradient(145deg, rgba(233, 239, 252, 0.9), rgba(105, 127, 172, 0.15))`,
    },
} as const;

/**
 * CSS Custom Properties Generator
 * Converts tokens to CSS variables for global use
 */
export function generateCSSVariables(): string {
    return `
    :root {
      /* Palette */
      --palette-primary: ${tokens.palette.primary};
      --palette-primary-light: ${tokens.palette.primaryLight};
      --palette-primary-dark: ${tokens.palette.primaryDark};
      --palette-canvas: ${tokens.palette.canvas};
      --palette-accent: ${tokens.palette.accent};
      --palette-accent-light: ${tokens.palette.accentLight};
      --palette-accent-dark: ${tokens.palette.accentDark};

      /* Emotional Colors */
      --color-curiosity-primary: ${tokens.emotions.curiosity.primary};
      --color-curiosity-secondary: ${tokens.emotions.curiosity.secondary};
      --color-curiosity-accent: ${tokens.emotions.curiosity.accent};
      
      --color-trust-primary: ${tokens.emotions.trust.primary};
      --color-trust-secondary: ${tokens.emotions.trust.secondary};
      --color-trust-accent: ${tokens.emotions.trust.accent};
      
      --color-progress-collecting: ${tokens.emotions.progress.collecting};
      --color-progress-ready: ${tokens.emotions.progress.ready};
      --color-progress-success: ${tokens.emotions.progress.success};
      
      --color-connection-user: ${tokens.emotions.connection.user};
      --color-connection-ai: ${tokens.emotions.connection.ai};
      --color-connection-bond: ${tokens.emotions.connection.bond};
      
      --color-delight-dark: ${tokens.emotions.delight.dark};
      --color-delight-magical: ${tokens.emotions.delight.magical};
      --color-delight-celebration: ${tokens.emotions.delight.celebration};
      
      /* Surfaces */
      --surface-light: ${tokens.surface.light};
      --surface-card: ${tokens.surface.card};
      --surface-alt: ${tokens.surface.alt};
      --surface-dark: ${tokens.surface.dark};
      
      /* Typography */
      --font-display: ${tokens.fonts.display};
      --font-body: ${tokens.fonts.body};
      
      /* Z-Index */
      --z-background: ${tokens.zIndex.background};
      --z-tertiary: ${tokens.zIndex.tertiary};
      --z-secondary: ${tokens.zIndex.secondary};
      --z-primary: ${tokens.zIndex.primary};
      --z-overlay: ${tokens.zIndex.overlay};
      
      /* Animation */
      --duration-instant: ${tokens.duration.instant}ms;
      --duration-fast: ${tokens.duration.fast}ms;
      --duration-normal: ${tokens.duration.normal}ms;
      --duration-slow: ${tokens.duration.slow}ms;
      --duration-epic: ${tokens.duration.epic}ms;
      
      --easing-calm: ${tokens.easing.calm};
      --easing-bounce: ${tokens.easing.bounce};
      --easing-smooth: ${tokens.easing.smooth};
      
      /* Shadows */
      --shadow-md: ${tokens.shadow.md};
      --shadow-lg: ${tokens.shadow.lg};
      --shadow-glow-primary: ${tokens.shadow.glowPrimary};
      --shadow-glow-accent: ${tokens.shadow.glowAccent};
      --shadow-glow-dual: ${tokens.shadow.glowDual};
      --shadow-glow-success: ${tokens.shadow.glowSuccess};

      /* Gradients */
      --gradient-primary-to-canvas: ${tokens.gradients.primaryToCanvas};
      --gradient-primary-to-accent: ${tokens.gradients.primaryToAccent};
      --gradient-accent-wash: ${tokens.gradients.accentWash};
    }
  `;
}

export type Tokens = typeof tokens;
