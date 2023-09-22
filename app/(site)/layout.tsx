import "../styles/globals.css";
import "../styles/navbar.css";
import "../styles/mainpage.css";
import "../styles/bottomnav.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import type { Metadata } from "next";
import { Oswald, Nunito } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";

import LayoutWrapper from "./layoutwrapper";
import { AppProvider } from "../(tools)/context/AppProvider";
import Head from "next/head";
import Footer from "../(tools)/components/Footer";
import Navbar from "../(tools)/components/NavbarComponents/Navbar";

const oswald = Oswald({ subsets: ["latin"], variable: "--oswald" });
const nunito = Nunito({ subsets: ["latin"], variable: "--nunito" });

export const metadata: Metadata = {
  title: "RSUripSumoharjo",
  description:
    "Study Case Website untuk RS Urip Sumoharjo, sebuah Rumah Sakit Islami di Bandarlampung",
  verification: { google: "I8DmG1jddxeDUsS2GRJ9alc89wW6vffSEFuFo3J8PiQ" },
  creator: "Riza Hariati for Ichacodes@2023",
};
config.autoAddCss = false;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </head>
      <body
        className={`${nunito.variable} ${oswald.variable}`}
        style={{ touchAction: "auto" }}
      >
        <AppProvider>
          <Navbar />
          <LayoutWrapper>{children}</LayoutWrapper>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
