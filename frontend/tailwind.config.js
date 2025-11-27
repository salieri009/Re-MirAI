/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Core Palette (Mapped to HSL variables)
                "primary": "var(--color-primary)",
                "primary-dark": "var(--color-primary-dark)",
                "primary-light": "var(--color-primary-light)",

                "accent": "var(--color-accent)",
                "accent-dark": "var(--color-accent-dark)",
                "accent-light": "var(--color-accent-light)",

                "highlight": "var(--color-highlight)",

                // Backgrounds
                "background-dark": "var(--color-bg-dark)",
                "surface": "var(--color-surface)",
                "surface-elevated": "var(--color-surface-elevated)",

                // Text
                "text-primary": "var(--color-text-primary)",
                "text-secondary": "var(--color-text-secondary)",
                "text-muted": "var(--color-text-muted)",
            },
            fontFamily: {
                "display": ["var(--font-display)", "Plus Jakarta Sans", "sans-serif"],
                "sans": ["var(--font-sans)", "Plus Jakarta Sans", "sans-serif"],
            },
            borderRadius: {
                "xs": "0.25rem",
                "sm": "0.5rem",
                "md": "0.75rem",
                "lg": "1rem",
                "xl": "1.5rem",
                "pill": "999px",
                "full": "9999px",
                "DEFAULT": "0.5rem",
            },
            spacing: {
                "1": "0.25rem",
                "2": "0.5rem",
                "3": "0.75rem",
                "4": "1rem",
                "5": "1.25rem",
                "6": "1.5rem",
                "7": "1.75rem",
                "8": "2rem",
            },
            fontSize: {
                "xs": ["0.75rem", { lineHeight: "1.2" }],
                "sm": ["0.875rem", { lineHeight: "1.3" }],
                "base": ["1rem", { lineHeight: "1.5" }],
                "lg": ["1.125rem", { lineHeight: "1.5" }],
                "xl": ["1.25rem", { lineHeight: "1.4" }],
                "2xl": ["1.5rem", { lineHeight: "1.35" }],
                "3xl": ["1.875rem", { lineHeight: "1.3" }],
                "4xl": ["2.5rem", { lineHeight: "1.2" }],
            },
        },
    },
    plugins: [],
}
