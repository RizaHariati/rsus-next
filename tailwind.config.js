/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    transitionDuration: {
      DEFAULT: "250ms",
    },

    extend: {
      width: {
        modal_lg: "1000px",
      },
      maxWidth: {
        uripMax: "1440px",
      },
      backgroundImage: {
        pattern: "url('/images/pages/pattern.jpg')",
      },
      fontFamily: {
        oswald: ["var(--oswald)", "sans-serif"],
        nunito: ["var(--nunito)", "sans-serif"],
      },
      colors: {
        whiteOpacity: "#ffffff8a",
        greenUrip: "#007814",
        greenUripOpacity: "#0078142d",
        accent1: "#F4CD7F",
        accent2: "#DDC4A6",
        accent1txt: "#7E5C29",
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
