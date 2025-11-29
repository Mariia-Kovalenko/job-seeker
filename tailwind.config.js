/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF7A45',
        success: '#22946E',
        secondaryGreen: '#1EB980',
        warning: '#A87A2A',
        error: '#9C2121',
        info: '#21498A',
        darkBackground: '#171717',
        secondaryYellow: '#FFCF44',
        purple: '#B15DFF',
        blue: '#72DEFF',
        lightGrey: '#232323',
        lighterGrey: '#737373',
      }
    },
  },
  plugins: [],
}