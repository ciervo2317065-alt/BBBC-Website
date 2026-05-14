import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#E6ECF5',
          100: '#CCD8EA',
          200: '#99B1D5',
          300: '#668ABF',
          400: '#3363AA',
          500: '#1A4C95',
          600: '#0F3A7A',
          700: '#0B2D5F',
          800: '#082045',
          900: '#0B2545',
        },
        gold: {
          50: '#FBF4E0',
          100: '#F7E9C2',
          200: '#EFD385',
          300: '#E7BC47',
          400: '#D4AF37',
          500: '#B8961F',
          600: '#8E7218',
          700: '#634F11',
        },
        crimson: '#B22234',
        ink: '#1F2937',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 8px 24px rgba(11,37,69,0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
