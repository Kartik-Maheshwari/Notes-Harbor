/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
   keyframes: {
        'spinner-vse6n7': {
          '0%, 100%': { transform: 'rotate(calc(var(--rotation, 0) * 1deg)) translateY(0)' },
          '50%': { transform: 'rotate(calc(var(--rotation, 0) * 1deg)) translateY(300%)' },
        },
      },
      animation: {
        'spinner-o824ag': 'spinner-o824ag 1s infinite linear',
      },
  },
  plugins: [],
}