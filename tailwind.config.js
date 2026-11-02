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
          950: '#050204',
          900: '#0c0508',
          850: '#14080d',
          800: '#1c0b12',
          700: '#2b0f1b',
          600: '#3d1426',
        },
        crimson: {
          glow: '#ff003c',
          DEFAULT: '#ff1744',
          accent: '#ef4444',
          rose: '#f43f5e',
          dark: '#b91c1c',
        },
        // Maintain alias for electric so any component referencing electric transitions to cyber crimson red
        electric: {
          glow: '#ff003c',
          DEFAULT: '#ff1744',
          muted: '#dc2626',
          dark: '#991b1b',
        },
        cyber: {
          red: '#ff1744',
          crimson: '#e11d48',
          rose: '#f43f5e',
          slate: '#0f080b',
          card: 'rgba(20, 8, 13, 0.75)',
          border: 'rgba(255, 23, 68, 0.2)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'electric-sm': '0 0 15px -3px rgba(255, 23, 68, 0.3)',
        'electric': '0 0 25px -4px rgba(255, 23, 68, 0.45)',
        'electric-lg': '0 0 45px -5px rgba(255, 23, 68, 0.6)',
        'crimson-sm': '0 0 15px -3px rgba(255, 23, 68, 0.3)',
        'crimson': '0 0 25px -4px rgba(255, 23, 68, 0.45)',
        'crimson-lg': '0 0 45px -5px rgba(255, 23, 68, 0.6)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(135deg, rgba(255, 23, 68, 0.12) 0%, rgba(225, 29, 72, 0.05) 100%)',
        'electric-gradient': 'linear-gradient(135deg, #ff1744 0%, #ef4444 50%, #f43f5e 100%)',
        'crimson-gradient': 'linear-gradient(135deg, #ff1744 0%, #ef4444 50%, #be123c 100%)',
        'grid-pattern': 'radial-gradient(circle, rgba(255, 23, 68, 0.09) 1px, transparent 1px)',
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