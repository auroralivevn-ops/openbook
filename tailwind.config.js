/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Hệ màu Book Hồng Hà - Bình Minh Trên Sông Hồng
        'hh-red': {
          DEFAULT: '#C8102E',
          dark: '#8B0F1F',
          light: '#E63946',
        },
        'hh-yellow': {
          DEFAULT: '#F5B700',
          light: '#FFD700',
          warm: '#F77F00',
        },
        'hh-blue': {
          DEFAULT: '#1B4D7C',
          light: '#DBEAFE',
        },
        'hh-green': {
          DEFAULT: '#2D8659',
          light: '#4CAF50',
        },
        'hh-brown': {
          DEFAULT: '#8B5E3C',
          light: '#A67C5A',
        },
        'hh-cream': '#FFF8EC',
      },
      fontFamily: {
        'sans': ['"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
        'display': ['"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        // Gradient Bình Minh - dùng cho Hero
        'sunrise': 'linear-gradient(135deg, #8B0F1F 0%, #C8102E 35%, #E63946 70%, #F77F00 100%)',
        // Gradient nắng vàng
        'gold-glow': 'radial-gradient(circle, rgba(245,183,0,0.6) 0%, transparent 70%)',
        // Gradient nút xanh
        'green-cta': 'linear-gradient(135deg, #2D8659 0%, #4CAF50 100%)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { opacity: '0.5' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}