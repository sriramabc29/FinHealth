/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'raisin': '#1E212B',
        'magnolia': '#ECE5F0',
        'dodger': '#2191FB',
        'tiffany': '#84DCC6',
      },
    },
  },
  plugins: [],
}