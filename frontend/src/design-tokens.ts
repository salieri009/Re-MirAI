/**
 * Re:MirAI Design Tokens
 * Emotion-mapped design system supporting purpose-driven UX
 * 
 * Aligned with 3-Color System:
 * - Primary: Amethyst Purple (#845EC2)
 * - Accent: Mint Green (#00C9A7)
 * - Highlight: Light Lavender (#C197FF)
 */

export const tokens = {
    // Core Palette (Matching tokens.css)
    palette: {
        primary: '#845EC2',   // Amethyst Purple
        accent: '#00C9A7',    // Mint Green
        highlight: '#C197FF', // Light Lavender
        bgDark: '#0A0112',    // Deep Space
        surface: 'rgba(132, 94, 194, 0.2)', // Purple tint
    },

    /**
     * Emotional Color Mappings
     */
    emotions: {
        // Curiosity & Wonder (Landing Page)
        curiosity: {
            primary: '#845EC2',
            secondary: '#C197FF',
            accent: '#00C9A7',
        },

        // Trust & Clarity (Login, Survey)
        trust: {
            primary: '#00C9A7',
            secondary: '#845EC2',
            accent: '#C197FF',
        },

        // Progress & Motivation (Dashboard)
        progress: {
            collecting: '#00C9A7',
            ready: '#845EC2',
            success: '#00C9A7',
            warning: '#C197FF',
        },

        // Intimacy & Connection (Chat)
        connection: {
            user: '#845EC2',
            ai: '#C197FF',
            bond: '#00C9A7',
        },

        // Awe & Joy (Summoning)
        delight: {
            dark: '#0A0112',
            magical: '#845EC2',
            celebration: '#00C9A7',
            particle: '#C197FF',
        },
    },

    /**
     * Surface Colors
     */
    surface: {
        card: 'rgba(132, 94, 194, 0.1)',
        glass: 'rgba(10, 1, 18, 0.6)',
        overlay: 'rgba(10, 1, 18, 0.8)',
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
        glowPrimary: '0 0 32px rgba(132, 94, 194, 0.4)',
        glowAccent: '0 0 28px rgba(0, 201, 167, 0.4)',
    },
} as const;

export type Tokens = typeof tokens;
