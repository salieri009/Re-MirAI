/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "primary": "#00c9a7",
                "background-light": "#f8f6f7",
                "background-dark": "#0A0112",
                "accent-purple": "#845EC2",
                "accent-purple-light": "#c197ff",
                "accent-green-dark": "#005b44",
            },
            fontFamily: {
                "display": ["Space Grotesk", "sans-serif"]
            },
            borderRadius: { "DEFAULT": "0.5rem", "lg": "1rem", "xl": "1.5rem", "full": "9999px" },
        },
    },
    plugins: [],
}
