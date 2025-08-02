/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // make sure it's 'class', NOT 'media'
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
}