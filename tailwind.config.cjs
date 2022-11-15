/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    screens: {
      'xs': '480px',
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      '3xl': '1700px',
      '4xl': '2000px',
      '5xl': '2400px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      // padding:{
      //   nice:'20px',
      //   nice:'@media'
      // }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
