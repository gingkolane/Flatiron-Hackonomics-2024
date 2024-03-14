/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // "./App.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}", // If you're using a pages directory (common in Next.js)
    "./components/**/*.{js,jsx,ts,tsx}", // For component files
    "./App.{js,jsx,ts,tsx}", // Keeping your specific App file pattern
  ],

  theme: {
    extend: {},
    colors: {
      "magnetic-grey": "#eae4ef",
      "mint-green": "#c0ffd0",
      "money-green": "#009933",
      "forest-green": "#00661F",
      "magnetic-plum": "#32004c",
    },
  },
  plugins: [],
};
