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
        'customBlack': '#383F47',
        'customRed': '#a70d47',
        'customPurple': '#605586',
        'customPurple2': '#281D3B',
        'customPurple3': '#291F3D',
        'customDark': '#271B38',
        'customDark2': '#241E3B',
        'customDark3': '#261B38',
        'purpleRed': '#2D2345',
        'lightPurple': '#57417B',
        'chatstart': '#34234A',
        'chatend': '#241A36'
      }
    },
  },
  plugins: [
    daisyui,
  ],
}