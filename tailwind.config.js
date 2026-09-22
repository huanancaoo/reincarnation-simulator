/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        underworld: {
          950: '#020504',
          900: '#050a08',
          850: '#09120e',
          800: '#0e1a15',
          700: '#152720',
          600: '#1f382e',
          500: '#2b4d40',
          ghost: '#0df5b1',
          ghostDim: '#069b6e',
          cinnabar: '#ff2a4b',
          cinnabarDark: '#8b0c1d',
          gold: '#f3ca52',
          goldDim: '#997d26',
          parchment: '#e7dcbd',
          purple: '#9d4edd',
          purpleDark: '#4a1570',
          bone: '#e2e8f0',
        }
      },
      boxShadow: {
        'glow-ghost': '0 0 25px rgba(13, 245, 177, 0.45)',
        'glow-ghost-sm': '0 0 12px rgba(13, 245, 177, 0.3)',
        'glow-cinnabar': '0 0 25px rgba(255, 42, 75, 0.45)',
        'glow-gold': '0 0 25px rgba(243, 202, 82, 0.4)',
        'glow-purple': '0 0 25px rgba(157, 78, 221, 0.45)',
        'underworld-card': '0 10px 30px rgba(0, 0, 0, 0.85), inset 0 0 15px rgba(13, 245, 177, 0.05)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
        'ghost-flame': 'ghostFlame 3s ease-in-out infinite alternate',
      },
      keyframes: {
        ghostFlame: {
          '0%': { filter: 'drop-shadow(0 0 8px rgba(13, 245, 177, 0.5))', transform: 'scale(1)' },
          '50%': { filter: 'drop-shadow(0 0 20px rgba(13, 245, 177, 0.9))', transform: 'scale(1.05)' },
          '100%': { filter: 'drop-shadow(0 0 10px rgba(13, 245, 177, 0.4))', transform: 'scale(0.97)' },
        }
      }
    },
  },
  plugins: [],
}
