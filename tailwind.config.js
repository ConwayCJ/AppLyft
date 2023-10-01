/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        customdark: {
          primary: '#4b5563',

          secondary: '#a5b4fc',

          accent: '#4ade80',

          neutral: '#263440',

          'base-100': '#1f2937',

          info: '#bef264',

          success: '#84cc16',

          warning: '#fbbf24',

          error: '#dc2626',
        },
      },
      'dark',
      'light',
    ],
  },
  plugins: [require('daisyui')],
}
