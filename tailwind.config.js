/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          base: '#000000',
          card: '#18181B',
          surface: '#27272A',
          elevated: '#3F3F46',
        },
        accent: {
          purple: '#8B5CF6',
          'purple-dark': '#7C3AED',
          'purple-glow': '#A78BFA',
          'purple-muted': '#6D28D9',
          pink: '#EC4899',
          indigo: '#6366F1',
        },
        green: {
          primary: '#00E86C',
          dark: '#00A34B',
          glow: '#00FF7A',
          turf: '#0B8C4A',
        },
        gold: {
          primary: '#FFD700',
          light: '#FFE44D',
          muted: '#C8A800',
        },
        glass: {
          white: 'rgba(255,255,255,0.05)',
          border: 'rgba(255,255,255,0.08)',
          purple: 'rgba(139,92,246,0.08)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
        glass: '20px',
        heavy: '40px',
      },
      boxShadow: {
        'neu-out': '6px 6px 14px rgba(0,0,0,0.6), -4px -4px 10px rgba(255,255,255,0.04)',
        'neu-in': 'inset 4px 4px 10px rgba(0,0,0,0.5), inset -2px -2px 6px rgba(255,255,255,0.04)',
        'glow-purple': '0 0 30px rgba(139,92,246,0.3), 0 0 60px rgba(139,92,246,0.1)',
        'glow-gold': '0 0 20px rgba(255,215,0,0.25), 0 0 40px rgba(255,215,0,0.08)',
        'glass': '0 8px 32px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.08)',
        'card-hover': '0 20px 60px rgba(139,92,246,0.2), 0 8px 32px rgba(0,0,0,0.5)',
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'bounce-slow': 'bounceSlow 2s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite',
        'shiny': 'shiny 3s linear infinite',
        'scrollLeft': 'scrollLeft 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-18px) rotate(6deg)' },
          '66%': { transform: 'translateY(-8px) rotate(-4deg)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(139,92,246,0.3)' },
          '50%': { boxShadow: '0 0 50px rgba(139,92,246,0.7), 0 0 80px rgba(139,92,246,0.3)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shiny: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        scrollLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
