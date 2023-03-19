/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        sm: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
      },
    },
  },
  plugins: [],
};
