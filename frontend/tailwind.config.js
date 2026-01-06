/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        valentine: {
          pink: '#ff6b9d',
          red: '#e63946',
          light: '#fff0f5',
        }
      }
    },
  },
  plugins: [],
}

