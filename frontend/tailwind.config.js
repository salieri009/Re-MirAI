/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Figma Color Scheme 41: Festive Eve - Blue/Purple Gradient (Ethereal & Dreamy)
        // Perfect for AI persona creation: mysterious, magical, trustworthy
        primary: {
          50: '#eff6ff',   // Lightest blue
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',  // Main Primary (Blue) - Start of gradient
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',  // Darkest blue
        },
        secondary: {
          50: '#f5f3ff',   // Lightest purple
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#7c3aed',  // Main Secondary (Purple) - End of gradient
          600: '#6d28d9',
          700: '#5b21b6',
          800: '#4c1d95',
          900: '#3b1f6f',  // Darkest purple
        },
        // Light Theme Surface Colors
        'surface-ground': '#f8fafc',
        'surface-card': '#ffffff',
        'surface-border': '#e2e8f0',
        'text-primary': '#0f172a',
        'text-secondary': '#64748b',
        // State Colors
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        // Persona Rarity (kept for compatibility)
        persona: {
          n: '#9ca3af',
          r: '#60a5fa',
          sr: '#a78bfa',
          ssr: '#f59e0b',
          ur: '#ef4444',
        },
      },
      fontFamily: {
        // Blonix Branch: Inter + Poppins for friendly, modern feel
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        // Nielsen: Aesthetic & Minimalist Design - Mystical floating animations
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'float-medium': 'floatMedium 12s ease-in-out infinite',
        'sparkle': 'sparkle 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(59, 130, 246, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(124, 58, 237, 0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        // Mystical floating animation - Slow, ethereal movement
        floatSlow: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.3' },
          '25%': { transform: 'translate(20px, -30px) scale(1.1)', opacity: '0.5' },
          '50%': { transform: 'translate(-15px, -50px) scale(0.9)', opacity: '0.4' },
          '75%': { transform: 'translate(10px, -20px) scale(1.05)', opacity: '0.45' },
        },
        // Medium speed floating - More dynamic movement
        floatMedium: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1) rotate(0deg)', opacity: '0.25' },
          '33%': { transform: 'translate(30px, -40px) scale(1.2) rotate(120deg)', opacity: '0.4' },
          '66%': { transform: 'translate(-25px, -60px) scale(0.8) rotate(240deg)', opacity: '0.3' },
        },
        // Sparkle effect for magical feel
        sparkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '0.6', transform: 'scale(1.2)' },
        },
        // XML Prompt: P_Anim_AkashicFlow_Subtle_Perf - Fluidic background animations
        'fluid-warp': 'fluidWarp 45s ease-in-out infinite',
        'color-shift': 'colorShift 60s ease-in-out infinite',
        'noise-flow': 'noiseFlow 40s ease-in-out infinite',
      },
      backgroundImage: {
        // Figma Color Scheme 41: Festive Eve - Blue to Purple gradient
        'gradient-primary': 'linear-gradient(135deg, #3b82f6 0%, #7c3aed 100%)',
        'gradient-soft': 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)',
        'gradient-subtle': 'linear-gradient(135deg, #bfdbfe 0%, #c4b5fd 100%)',
        // Legacy gradients (kept for compatibility)
        'gradient-mystical': 'linear-gradient(135deg, #3b82f6 0%, #7c3aed 100%)',
        'gradient-akashic': 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 50%, #2d1b4e 100%)',
      },
    },
  },
  plugins: [],
}
