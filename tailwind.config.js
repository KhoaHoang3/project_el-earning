/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      '400screen': '400px',
      '936screen': '936px',
      '948screen': '948px',
      '965screen': '965px',
      '1024screen': '1024px',
    },
    lineHeight: {
      'leading-more-loose': '3',
    },
    fontSize: {
      1: '1rem',
      1.2: '1.2rem',
      1.5: '1.5rem',
      2: '2rem',
    },
    backgroundImage: {
      'background-1': './src/assets/img/background1.jpg',
    },
  },
  plugins: [],
};
