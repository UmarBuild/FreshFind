/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Midnight Harvest palette
        oatmeal: '#F7F5F0',
        emerald: {
          DEFAULT: '#064E3B',
          deep: '#053E2F',
          soft: '#0A6B52',
        },
        orange: {
          DEFAULT: '#EA580C',
          deep: '#C2410C',
          soft: '#FB923C',
        },
        charcoal: '#1C1917',
        cream: '#FFFBF5',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 10px 40px -12px rgba(0,0,0,0.08)',
        cardHover: '0 25px 60px -15px rgba(6,78,59,0.18)',
        glow: '0 0 0 4px rgba(234,88,12,0.15)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.8)', opacity: '0.7' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        pulseRing: 'pulseRing 1.6s ease-out infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
