/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        dl: {
          bg:      '#08080f',
          surface: '#10101a',
          card:    '#181825',
          border:  '#252535',
          accent:  '#7c6aff',
          hover:   '#8f7fff',
          danger:  '#ff4757',
          success: '#2ed573',
          warning: '#ffa502',
          fog:     '#4a90e2',
          freeze:  '#74b9ff',
          text:    '#e0e0f0',
          muted:   '#7a7a9a',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
