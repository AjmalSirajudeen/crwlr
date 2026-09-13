/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      colors: {
        ink: {
          DEFAULT: '#14110f',
          soft: '#3f3933',
        },
        paper: {
          DEFAULT: '#f6f1ea',
          card: '#fffaf4',
        },
        ember: {
          DEFAULT: '#c45c26',
          light: '#f3d9c4',
          dark: '#8f3f16',
        },
      },
    },
  },
  plugins: [],
};
