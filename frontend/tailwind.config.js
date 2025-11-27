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
                "display": ["var(--font-display)", "sans-serif"],
                "sans": ["var(--font-sans)", "sans-serif"],
            },
            borderRadius: { "DEFAULT": "0.5rem", "lg": "1rem", "xl": "1.5rem", "full": "9999px" },
        },
    },
    plugins: [],
}
