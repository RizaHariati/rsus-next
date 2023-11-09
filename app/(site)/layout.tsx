export const runtime = "nodejs";
import "../styles/globals.css";
import "../styles/navbar.css";
import "../styles/mainpage.css";
import "../styles/homepage.css";
import "../styles/admin.css";
import "../styles/bottomnav.css";
import "../styles/columnsetting.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/ReactToastify.css";

import "react-datepicker/dist/react-datepicker.css";
import type { Metadata } from "next";
import { Oswald, Nunito } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import { AppProvider } from "../(tools)/context/AppProvider";
// import Navbar from "../(tools)/components/NavbarComponents/Navbar";

// import Footer from "../(tools)/components/Footer";
import LayoutWrapper from "./layoutwrapper";
import Navbar from "../(tools)/components/NavbarComponents/Navbar";
import Footer from "../(tools)/components/Footer";

const oswald = Oswald({ subsets: ["latin"], variable: "--oswald" });
const nunito = Nunito({ subsets: ["latin"], variable: "--nunito" });

export const metadata: Metadata = {
  title: "RSUripSumoharjo",
  description:
    "Study Case Website untuk RS Urip Sumoharjo, sebuah Rumah Sakit Islami di Bandarlampung",
  verification: { google: "I8DmG1jddxeDUsS2GRJ9alc89wW6vffSEFuFo3J8PiQ" },
};
config.autoAddCss = false;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
