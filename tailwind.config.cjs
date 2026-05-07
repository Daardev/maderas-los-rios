/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,js,jsx,ts,tsx,vue,html}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        wood: "#8B5A2B",
        "wood-100": "#F5E8D0",
        bark: "#4B382A",
        leaf: "#2E7D32",
        sand: "#E5D5C5",
      },
      fontFamily: {
        serif: ["'Merriweather'", "serif"],
        sans: ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
