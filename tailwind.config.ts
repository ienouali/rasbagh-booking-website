/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#E1E8EF",
          100: "#D4DEE7",
          200: "#B7C7D7",
          300: "#99B0C7",
          400: "#7C99B6",
          500: "#5E82A6",
          600: "#4C6B8A",
          700: "#3C546C",
          800: "#2C3D4F",
          900: "#15212d",
          950: "#0d141c",
        },
        accent: {
          50: "#faf7f0",
          100: "#f4ebe1",
          200: "#e8d4bf",
          300: "#ddbda2",
          400: "#d2a284",
          500: "#d08651",
          600: "#b77743",
          700: "#925935",
          800: "#6c4028",
          900: "#41281a",
          950: "#49360a",
        },
      },
    },
  },
  plugins: [],
};
