/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", // covering expo-router
    "./components/**/*.{js,jsx,ts,tsx}", // For component files
  ],

  theme: {
    extend: {},
    colors: {
      "magnetic-grey": "#eae4ef",
      white: "#fff",
      "mint-green": "#c0ffd0",
      "money-green": "#009933",
      "forest-green": "#00661F",
      "magnetic-plum": "#32004c",
      "error-red": "#DC2626",
    },
  },
  plugins: [],
};
