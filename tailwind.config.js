/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  plugins: [],
};
