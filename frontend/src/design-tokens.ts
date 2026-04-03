/**
 * Re:MirAI Design Tokens
 * Emotion-mapped design system supporting purpose-driven UX
 * 
 * Aligned with Small Switch Palette v2:
 * - Background: Mist (#e6ebf8)
 * - Primary: Fuchsia (#d946ef)
 * - Text/Anchor: Anchor (#334155)
 */

export const tokens = {
    // Core Palette (Matching tokens.css)
    palette: {
        primary: '#d946ef',   // Fuchsia
        accent: '#e6ebf8',    // Mist
        highlight: '#334155', // Anchor
        bgDark: '#e6ebf8',
        surface: 'rgba(255, 255, 255, 0.72)',
    },

    spacing: {
        grid: 4, // 4px baseline
        xxs: 4,
        xs: 8,
        sm: 12,
        md: 16,
        lg: 24,
        xl: 32,
        '2xl': 40,
        '3xl': 48,
        '4xl': 64,
    },

    radius: {
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 24,
        pill: 999,
    },

    typography: {
        family: {
            display: '\'Space Grotesk\', sans-serif',
            body: '\'Plus Jakarta Sans\', sans-serif',
            mono: '\'Space Mono\', monospace',
        },
        weight: {
            regular: 400,
            medium: 500,
            semiBold: 600,
            bold: 700,
            extraBold: 800,
        },
        size: {
            xs: '0.75rem',   // 12px
            sm: '0.875rem',  // 14px
            base: '1rem',    // 16px
            lg: '1.125rem',  // 18px
            xl: '1.25rem',   // 20px
            '2xl': '1.5rem', // 24px
            '3xl': '2rem',   // 32px
            '4xl': '2.5rem', // 40px
        },
        lineHeight: {
            snug: 1.1,
            tight: 1.2,
            relaxed: 1.4,
            loose: 1.6,
        },
    },

    /**
     * Emotional Color Mappings
     */
    emotions: {
        // Curiosity & Wonder (Landing Page)
        curiosity: {
            primary: '#d946ef',
            secondary: '#ec4899',
            accent: '#334155',
        },

        // Trust & Clarity (Login, Survey)
        trust: {
            primary: '#334155',
            secondary: '#475569',
            accent: '#d946ef',
        },

        // Progress & Motivation (Dashboard)
        progress: {
            collecting: '#64748b',
            ready: '#d946ef',
            success: '#10b981',
            warning: '#f59e0b',
        },

        // Intimacy & Connection (Chat)
        connection: {
            user: '#d946ef',
            ai: '#334155',
            bond: '#0ea5e9',
        },

        // Awe & Joy (Summoning)
        delight: {
            dark: '#334155',
            magical: '#d946ef',
            celebration: '#10b981',
            particle: '#e6ebf8',
        },
    },

    /**
     * Surface Colors
     */
    surface: {
        card: 'rgba(255, 255, 255, 0.7)',
        glass: 'rgba(255, 255, 255, 0.78)',
        overlay: 'rgba(51, 65, 85, 0.35)',
    },

    /**
     * Animation Durations
     */
    duration: {
        instant: 100,
        fast: 200,
        normal: 300,
        slow: 600,
        epic: 1200,
    },

    /**
     * Easing Functions
     */
    easing: {
        calm: 'power2.out',
        bounce: 'back.out(1.7)',
        elastic: 'elastic.out(1, 0.3)',
        smooth: 'power2.inOut',
    },

    /**
     * Shadows
     */
    shadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.1)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.15)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
        glowPrimary: '0 0 32px rgba(217, 70, 239, 0.35)',
        glowAccent: '0 0 28px rgba(51, 65, 85, 0.25)',
    },
} as const;

export type Tokens = typeof tokens;
