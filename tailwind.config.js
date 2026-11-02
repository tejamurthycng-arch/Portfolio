/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#05060f',
          900: '#090a18',
          850: '#0e1026',
          800: '#141738',
          700: '#1d224e',
          600: '#2a316e',
        },
        electric: {
          glow: '#a855f7',
          DEFAULT: '#8b5cf6',
          accent: '#7c3aed',
          cyan: '#06b6d4',
          dark: '#5b21b6',
        },
        crimson: {
          glow: '#a855f7',
          DEFAULT: '#8b5cf6',
          accent: '#7c3aed',
          rose: '#c084fc',
          dark: '#5b21b6',
        },
        cyber: {
          violet: '#8b5cf6',
          cyan: '#06b6d4',
          indigo: '#6366f1',
          slate: '#090a18',
          card: 'rgba(14, 16, 38, 0.55)',
          border: 'rgba(255, 255, 255, 0.1)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'electric-sm': '0 0 15px -3px rgba(139, 92, 246, 0.35)',
        'electric': '0 0 25px -4px rgba(139, 92, 246, 0.5)',
        'electric-lg': '0 0 45px -5px rgba(139, 92, 246, 0.65)',
        'cyan-glow': '0 0 25px -4px rgba(6, 182, 212, 0.45)',
        'glass': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.15), 0 20px 40px -15px rgba(0, 0, 0, 0.6)',
        'glass-hover': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.25), 0 20px 40px -10px rgba(139, 92, 246, 0.3)',
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(6, 182, 212, 0.08) 100%)',
        'electric-gradient': 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 50%, #06b6d4 100%)',
        'violet-gradient': 'linear-gradient(135deg, #a855f7 0%, #8b5cf6 50%, #06b6d4 100%)',
        'grid-pattern': 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 1px, transparent 1px)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'spin-reverse': 'spin-reverse 25s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'radar': 'radar 4s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'spin-reverse': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        radar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
}