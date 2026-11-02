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
          950: '#030712',
          900: '#060c1b',
          850: '#091226',
          800: '#0c1833',
          700: '#112247',
          600: '#1a3366',
        },
        electric: {
          glow: '#00f0ff',
          DEFAULT: '#00d4ff',
          muted: '#0284c7',
          dark: '#0369a1',
        },
        cyber: {
          blue: '#3b82f6',
          indigo: '#6366f1',
          cyan: '#06b6d4',
          slate: '#0f172a',
          card: 'rgba(12, 24, 51, 0.7)',
          border: 'rgba(0, 212, 255, 0.15)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'electric-sm': '0 0 15px -3px rgba(0, 212, 255, 0.25)',
        'electric': '0 0 25px -5px rgba(0, 212, 255, 0.35)',
        'electric-lg': '0 0 45px -5px rgba(0, 212, 255, 0.45)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%)',
        'electric-gradient': 'linear-gradient(135deg, #00d4ff 0%, #3b82f6 50%, #6366f1 100%)',
        'grid-pattern': 'radial-gradient(circle, rgba(0, 212, 255, 0.08) 1px, transparent 1px)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { opacity: '0.4' },
          '100%': { opacity: '0.9' },
        }
      }
    },
  },
  plugins: [],
}