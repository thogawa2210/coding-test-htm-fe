/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#153376",
        secondary: "#4D4F5C",
      },
      fontFamily: {
        sans: ['"Source Sans Pro"', "ui-sans-serif", "system-ui"], // Set Source Sans Pro as default
      },
    },
  },
  plugins: [],
};
