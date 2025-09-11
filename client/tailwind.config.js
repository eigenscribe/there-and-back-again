/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-cyan': '#00e8ff',
        'custom-blue-light': '#14b5ff',
        'custom-blue': '#3a98ff',
        'custom-purple': '#7952f5',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}