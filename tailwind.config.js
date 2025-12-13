const { preset } = require('nativewind/preset');

module.exports = {
  presets: [preset],
  content: [
    './App.{js,jsx,ts,tsx}',
    './index.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {}
  }
};