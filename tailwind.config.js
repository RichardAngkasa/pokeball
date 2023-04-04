/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      main: "#e8e4e6",
      secondary: "#abd1c6",
      tertiary: "#e16162",
      highlight: "#f9bc60",
      stroke: "#001e1d",
    },
    extend: {},
  },
  plugins: [],
};
