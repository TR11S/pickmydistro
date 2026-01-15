/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './_layouts/**/*.html',
    './_includes/**/*.html',
    './*.md',
    './*.html',
    './assets/js/**/*.js',
  ],

  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        zinc: {
          950: '#09090b',
        }
      },
      letterSpacing: {
        widest: '.25em',
        ultra: '.4em',
      },
    },
  },
  plugins: [],
}