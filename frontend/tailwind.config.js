/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#F8F6F1',
        ink: '#141210',
        accent: '#B07D62',
        surface: {
          1: '#FFFFFF',
          2: '#F2EFE9',
          3: 'rgba(20,18,16,0.04)'
        },
        status: {
          success: '#2D6A4F',
          warning: '#92622A',
          error: '#8B3030',
          info: '#2B5BA8'
        },
        badge: {
          green: { bg: '#EAF3DE', text: '#27500A' },
          amber: { bg: '#FAEEDA', text: '#633806' },
          red: { bg: '#FCEBEB', text: '#791F1F' },
          blue: { bg: '#E6F1FB', text: '#0C447C' },
          gray: { bg: '#F1EFE8', text: '#444441' }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        'paper': '0 8px 48px rgba(20,18,16,0.12)',
        'card': '0 4px 24px rgba(20,18,16,0.08)'
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0.0, 0.0, 0.2, 1)',
      },
      transitionDuration: {
        '200': '200ms',
      }
    },
  },
  plugins: [],
}
