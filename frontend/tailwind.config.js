import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'customBlack': '#222831',
        'customGray': '#393E46',
        'customSky': '#00ADB5',
        'customWhite': '#EEEEEE',
        'customBlack2': '#1D232A'
      }
    },
  },
  plugins: [
    daisyui,
  ],
}