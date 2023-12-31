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
        column: "300px",
        modal_xl: "1240px",
        modal_lg: "1000px",
        modal_md: "500px",
        modal_sm: "350px",
      },
      maxWidth: {
        uripMax: "1440px",
        modal_xl: "1240px",
        modal_lg: "1000px",
        column: "300px",
      },
      backgroundImage: {
        pattern: "url('/static/images/pages/pattern.jpg')",
      },
      fontFamily: {
        oswald: ["var(--oswald)", "sans-serif"],
        nunito: ["var(--nunito)", "sans-serif"],
      },
      colors: {
        hoverBG: "#fafaf9",
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
