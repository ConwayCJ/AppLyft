/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js'
  ],
  theme: {
    extend: {}
  },
  daisyui: {
    themes: ['dark', 'light', 'dracula', 'acid', 'night', 'fantasy']
  },
  plugins: [require('daisyui')]
}
