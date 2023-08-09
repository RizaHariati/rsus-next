/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        oswald: ["var(--oswald)", "sans-serif"],
        nunito: ["var(--nunito)", "sans-serif"],
      },
      colors: {
        whiteOpacity: "#ffffff8a",
        greenUrip: "#007814",
        greenUripOpacity: "#00781449",
        accent1: "#F4CD7F",
        accent2: "#DDC4A6",
        greyDrk: "#404040",
        greyMed1: "#5C5A5A",
        greyMed2: "#939393",
        greyLit: "#EFEFEC",
        greyBorder: "#D0CBB4",
        redBase: "#FF0202",
        redOpacity: "#ff02025e",
      },
    },
  },
  plugins: [
    // ...
    require("tailwind-scrollbar"),
  ],
};
