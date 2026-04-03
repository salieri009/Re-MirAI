/**
 * Inline Style Utilities
 * Pure inline styles using design tokens - no CSS files needed
 */

// ============================================
// Type Definitions
// ============================================
export type CSSProperties = React.CSSProperties;

// ============================================
// Spacing Helpers
// ============================================
export const spacing = {
    xxs: 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
    '2xl': 40,
    '3xl': 48,
    '4xl': 64,
} as const;

// ============================================
// Color Palette
// ============================================
export const colors = {
    primary: '#d946ef',
    primaryDark: '#c026d3',
    primaryLight: '#e879f9',
    accent: '#e6ebf8',
    accentDark: '#d7deef',
    accentLight: '#f4f7ff',
    highlight: '#334155',
    bgDark: '#e6ebf8',
    background: '#e6ebf8',
    surface: 'rgba(255, 255, 255, 0.62)',
    surfaceElevated: 'rgba(255, 255, 255, 0.82)',
    border: 'rgba(51, 65, 85, 0.16)',
    borderHover: 'rgba(51, 65, 85, 0.3)',
    text: '#334155',
    textSecondary: '#475569',
    textMuted: 'rgba(51, 65, 85, 0.68)',
    white: '#ffffff',
    black: '#000000',
    transparent: 'transparent',
    error: '#EF4444',
    success: '#10B981',
} as const;

// ============================================
// Typography
// ============================================
export const typography = {
    fontDisplay: "'Sora', sans-serif",
    fontSans: "'Manrope', sans-serif",
    fontMono: "'IBM Plex Mono', monospace",

    weight: {
        regular: 400,
        medium: 500,
        semiBold: 600,
        bold: 700,
        extraBold: 800,
    },

    size: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
        '5xl': '3rem',
    },

    lineHeight: {
        tight: 1.2,
        snug: 1.3,
        normal: 1.5,
        relaxed: 1.6,
        loose: 1.8,
    },
} as const;

// ============================================
// Border Radius
// ============================================
export const radius = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 999,
    pill: 999,
} as const;

// ============================================
// Shadows
// ============================================
export const shadows = {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.15)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.25)',
    glowPrimary: '0 0 32px rgba(217, 70, 239, 0.35)',
    glowAccent: '0 0 28px rgba(51, 65, 85, 0.22)',
    glowHighlight: '0 0 24px rgba(71, 85, 105, 0.25)',
} as const;

// ============================================
// Z-Index Scale
// ============================================
export const zIndex = {
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    tooltip: 1070,
} as const;

// ============================================
// Common Style Patterns
// ============================================
export const patterns = {
    // Flexbox shortcuts
    flex: {
        display: 'flex' as const,
    },
    flexCenter: {
        display: 'flex' as const,
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
    },
    flexBetween: {
        display: 'flex' as const,
        alignItems: 'center' as const,
        justifyContent: 'space-between' as const,
    },
    flexColumn: {
        display: 'flex' as const,
        flexDirection: 'column' as const,
    },
    flexColumnCenter: {
        display: 'flex' as const,
        flexDirection: 'column' as const,
        alignItems: 'center' as const,
    },

    // Glass effect
    glass: {
        background: 'rgba(255, 255, 255, 0.68)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: `1px solid ${colors.border}`,
    },

    // Card base
    card: {
        background: colors.surface,
        borderRadius: radius.lg,
        border: `1px solid ${colors.border}`,
        padding: spacing.lg,
    },

    // Text ellipsis
    ellipsis: {
        overflow: 'hidden' as const,
        textOverflow: 'ellipsis' as const,
        whiteSpace: 'nowrap' as const,
    },

    // Absolute fill
    absoluteFill: {
        position: 'absolute' as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

    // Base reset for interactive elements
    resetButton: {
        border: 'none',
        background: 'none',
        padding: 0,
        margin: 0,
        font: 'inherit',
        color: 'inherit',
        cursor: 'pointer',
    },
} as const;

// ============================================
// Transition Helpers
// ============================================
export const transitions = {
    fast: 'all 0.15s ease',
    normal: 'all 0.2s ease',
    slow: 'all 0.3s ease',
    transform: 'transform 0.2s ease',
    opacity: 'opacity 0.2s ease',
    colors: 'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease',
} as const;

// ============================================
// Style Merge Utility
// ============================================
export function mergeStyles(...styles: (CSSProperties | undefined | null | false)[]): CSSProperties {
    return Object.assign({}, ...styles.filter(Boolean));
}

// ============================================
// Responsive Helpers (for inline styles with JS)
// ============================================
export const breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
} as const;

/**
 * Hook to use: const isMobile = useMediaQuery(breakpoints.md)
 * Returns true if viewport is smaller than the breakpoint
 */
export function createMediaQuery(maxWidth: number): string {
    return `(max-width: ${maxWidth}px)`;
}

// ============================================
// Button Styles
// ============================================
export const buttonStyles = {
    base: {
        fontFamily: typography.fontDisplay,
        fontWeight: typography.weight.semiBold,
        fontSize: typography.size.base,
        padding: `${spacing.md}px ${spacing.xl}px`,
        borderRadius: radius.sm,
        border: 'none',
        cursor: 'pointer',
        transition: transitions.normal,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
    } as CSSProperties,

    primary: {
        background: colors.primary,
        color: colors.white,
    } as CSSProperties,

    primaryHover: {
        background: colors.primaryLight,
        transform: 'translateY(-2px)',
        boxShadow: shadows.glowPrimary,
    } as CSSProperties,

    secondary: {
        background: 'transparent',
        color: colors.primary,
        border: `1px solid ${colors.primary}`,
    } as CSSProperties,

    secondaryHover: {
        background: colors.surface,
        borderColor: colors.primaryLight,
    } as CSSProperties,

    accent: {
        background: colors.accent,
        color: colors.bgDark,
    } as CSSProperties,

    accentHover: {
        background: colors.accentLight,
        transform: 'translateY(-2px)',
        boxShadow: shadows.glowAccent,
    } as CSSProperties,

    ghost: {
        background: 'transparent',
        color: colors.text,
    } as CSSProperties,

    ghostHover: {
        background: colors.surface,
    } as CSSProperties,

    // Sizes
    sm: {
        padding: `${spacing.xs}px ${spacing.md}px`,
        fontSize: typography.size.sm,
    } as CSSProperties,

    lg: {
        padding: `${spacing.lg}px ${spacing['2xl']}px`,
        fontSize: typography.size.lg,
    } as CSSProperties,
} as const;

// ============================================
// Input Styles
// ============================================
export const inputStyles = {
    base: {
        fontFamily: typography.fontSans,
        fontSize: typography.size.base,
        padding: `${spacing.md}px`,
        borderRadius: radius.sm,
        border: `1px solid ${colors.border}`,
        background: colors.surface,
        color: colors.text,
        transition: transitions.colors,
        outline: 'none',
        width: '100%',
    } as CSSProperties,

    focus: {
        borderColor: colors.highlight,
        boxShadow: `0 0 0 2px rgba(193, 151, 255, 0.2)`,
    } as CSSProperties,
} as const;

// ============================================
// Badge Styles
// ============================================
export const badgeStyles = {
    base: {
        display: 'inline-flex',
        alignItems: 'center',
        padding: `${spacing.xxs}px ${spacing.sm}px`,
        borderRadius: radius.pill,
        fontSize: typography.size.xs,
        fontWeight: typography.weight.medium,
    } as CSSProperties,

    primary: {
        background: `${colors.primary}20`,
        color: colors.primary,
    } as CSSProperties,

    accent: {
        background: `${colors.accent}20`,
        color: colors.accent,
    } as CSSProperties,

    highlight: {
        background: `${colors.highlight}20`,
        color: colors.highlight,
    } as CSSProperties,
} as const;
