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

export const tokens = {
    /**
     * Emotional Color Mappings
     * Colors evoke specific emotions aligned with page purposes
     */
    emotions: {
        // Curiosity & Wonder (Landing Page)
        curiosity: {
            primary: '#d946ef',    // Fuchsia - Intriguing, magical
            secondary: '#f093fb',  // Pink - Warm, inviting
            accent: '#8b5cf6',     // Purple - Mysterious, deep
        },

        // Trust & Clarity (Login, Survey)
        trust: {
            primary: '#3b82f6',    // Blue - Trustworthy, calm
            secondary: '#60a5fa',  // Light Blue - Clear, open
            accent: '#10b981',     // Green - Safe, secure
        },

        // Progress & Motivation (Dashboard, Ritual Hub)
        progress: {
            collecting: '#3b82f6', // Blue - Calming progress
            ready: '#d946ef',      // Fuchsia - Excitement, ready
            success: '#10b981',    // Green - Achievement
            warning: '#f59e0b',    // Amber - Attention needed
        },

        // Intimacy & Connection (Chat, Persona Room)
        connection: {
            user: '#d946ef',       // Warm fuchsia - Personal warmth
            ai: '#f1f5f9',         // Soft neutral - Gentle presence
            bond: '#f59e0b',       // Gold - Precious connection
            heartLv1: '#e5e7eb',   // Gray - New bond
            heartLv3: '#ef4444',   // Red - Growing bond
            heartLv5: '#ec4899',   // Pink - Deep bond
        },

        // Awe & Joy (Summoning)
        delight: {
            dark: '#1e1b4b',       // Deep indigo - Dramatic backdrop
            magical: '#d946ef',    // Fuchsia - Magical energy
            celebration: '#f59e0b', // Gold - Joy, achievement
            particle: '#a78bfa',   // Light purple - Ethereal particles
        },
    },

    /**
     * Surface Colors
     * Backgrounds and containers
     */
    surface: {
        light: '#f8fafc',                    // Slate 50
        card: 'rgba(255, 255, 255, 0.95)',   // Semi-transparent white
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
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',

        // Emotional shadows
        glow: '0 0 30px rgba(217, 70, 239, 0.4)',      // Magical glow
        glowBlue: '0 0 20px rgba(59, 130, 246, 0.3)',  // Trust glow
        glowGreen: '0 0 20px rgba(16, 185, 129, 0.3)', // Success glow
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
} as const;

/**
 * CSS Custom Properties Generator
 * Converts tokens to CSS variables for global use
 */
export function generateCSSVariables(): string {
    return `
    :root {
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
      --shadow-glow: ${tokens.shadow.glow};
    }
  `;
}

export type Tokens = typeof tokens;
