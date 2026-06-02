/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF8C00',
          dark: '#E07800',
          light: '#FFA733',
        },
        veg: '#16A34A',
        nonveg: '#DC2626',
        surface: '#F7F8FA',
        card: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 16px rgba(0,0,0,0.08)',
        footer: '0 -4px 24px rgba(0,0,0,0.10)',
        tab: '0 2px 12px rgba(255,140,0,0.35)',
      },
      animation: {
        'fade-slide': 'fadeSlide 0.3s ease both',
        'bounce-slow': 'bounce 1.5s infinite',
      },
      keyframes: {
        fadeSlide: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
