/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      lightgreen: '#bbff9e',
      lightred: '#ff7f7f',
      lightblue: '#a7c7e7',
      black: '#141414',
      offwhite: '#eef0f2'
    }
  },
    
  },
  plugins: [],
}
