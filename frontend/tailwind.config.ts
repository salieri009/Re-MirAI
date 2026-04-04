import type { Config } from 'tailwindcss'
import { tokens } from './src/design-tokens'
import plugin from 'tailwindcss/plugin'

const config: Config = {
    darkMode: "class",
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "primary": "var(--color-primary)",
                "accent": "var(--color-accent)",
                "highlight": "var(--color-highlight)",
                "background-dark": "var(--color-bg-dark)",
                "surface": "var(--color-surface)",
                "surface-elevated": "var(--color-surface-elevated)",
                "text-primary": "var(--color-text-primary)",
            },
            fontFamily: {
                "display": ["var(--font-display)", "sans-serif"],
                "sans": ["var(--font-sans)", "sans-serif"],
                "mono": ["var(--font-mono)", "monospace"],
            },
            borderRadius: {
                "xs": "var(--radius-xs)",
                "sm": "var(--radius-sm)",
                "md": "var(--radius-md)",
                "lg": "var(--radius-lg)",
                "xl": "var(--radius-xl)",
                "pill": "var(--radius-pill)",
                "DEFAULT": "var(--radius-md)",
            },
            boxShadow: {
                "glow-primary": "var(--shadow-glow-primary)",
                "glow-accent": "var(--shadow-glow-accent)",
            },
        },
    },
    plugins: [
        plugin(function({ addBase }) {
            addBase({
                ':root': {
                    '--color-primary': tokens.palette.primary,
                    '--color-accent': tokens.palette.accent,
                    '--color-highlight': tokens.palette.highlight,
                    '--color-bg-dark': tokens.palette.bgDark,
                    '--color-surface': tokens.surface.card,
                    '--color-surface-elevated': tokens.surface.glass,
                    '--color-text-primary': tokens.palette.highlight,
                    '--font-display': tokens.typography.family.display,
                    '--font-sans': tokens.typography.family.body,
                    '--font-mono': tokens.typography.family.mono,
                    '--radius-xs': tokens.radius.xs + 'px',
                    '--radius-sm': tokens.radius.sm + 'px',
                    '--radius-md': tokens.radius.md + 'px',
                    '--radius-lg': tokens.radius.lg + 'px',
                    '--radius-xl': tokens.radius.xl + 'px',
                    '--radius-pill': tokens.radius.pill + 'px',
                    '--shadow-glow-primary': tokens.shadow.glowPrimary,
                    '--shadow-glow-accent': tokens.shadow.glowAccent,
                }
            })
        })
    ],
}
export default config
