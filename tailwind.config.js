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
        app: {
          bg: '#08090E',
          surface: '#0E111B',
          card: '#141824',
          subtle: '#1C2234',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-active': 'rgba(0, 216, 255, 0.35)',
        },
        rn: {
          cyan: '#00D8FF',
          blue: '#38BDF8',
          indigo: '#6366F1',
          emerald: '#10B981',
          purple: '#A855F7',
          amber: '#F59E0B',
          rose: '#F43F5E',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'mobile-card': '0 4px 24px -2px rgba(0, 0, 0, 0.45), 0 2px 8px -1px rgba(0, 0, 0, 0.25)',
        'mobile-sheet': '0 -10px 40px -4px rgba(0, 0, 0, 0.65)',
        'rn-glow': '0 0 35px -5px rgba(0, 216, 255, 0.25)',
        'rn-glow-sm': '0 0 15px -2px rgba(0, 216, 255, 0.3)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
