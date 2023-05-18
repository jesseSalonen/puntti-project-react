/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        green: {
          100: "#b5f8c9",
          200: "#71ff9c",
          300: "#61feb9",
          400: "#12fea3",
          500: "#19fa8f",
          600: "#46c47a",
          700: "#27be58",
          800: "#1b6742",
          900: "#286049",
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
