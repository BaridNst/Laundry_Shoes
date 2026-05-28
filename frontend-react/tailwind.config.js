/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-white': '#FFFFFF',
        'brand-black': '#1E1B4B', // Dark purple/indigo for text and strong contrasts
        'brand-gray': '#F3E8FF', // Soft lavender for backgrounds
        'brand-cedar': '#7C3AED', // Main purple (vibrant, elegant)
        'brand-purple-light': '#A78BFA',
        'brand-purple-dark': '#4C1D95',
      }
    },
  },
  plugins: [],
}
