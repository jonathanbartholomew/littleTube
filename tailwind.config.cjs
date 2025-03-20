/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF6B6B",
          light: "#FFA5A5",
          dark: "#E05050",
        },
        secondary: {
          DEFAULT: "#4ECDC4",
          light: "#7FDFDA",
          dark: "#36B1A8",
        },
        accent: {
          yellow: "#FFD166",
          purple: "#9381FF",
          blue: "#48CAE4",
          green: "#76C893",
          orange: "#FF9E00",
        },
        background: {
          light: "#FFFFFF",
          DEFAULT: "#F8F9FA",
          dark: "#F1F3F5",
        },
      },
      fontFamily: {
        display: ["Comic Sans MS", "Comic Sans", "cursive"],
        body: ["Arial Rounded MT Bold", "Arial", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
    },
  },
  plugins: [],
};
