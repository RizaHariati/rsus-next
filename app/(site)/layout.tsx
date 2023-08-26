import "../styles/globals.css";
import "../styles/navbar.css";
import "../styles/mainpage.css";
import "react-datepicker/dist/react-datepicker.css";
import type { Metadata } from "next";
import { Oswald, Nunito } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";

import LayoutWrapper from "./layoutwrapper";
import { AppProvider } from "../(tools)/context/AppProvider";

const oswald = Oswald({ subsets: ["latin"], variable: "--oswald" });
const nunito = Nunito({ subsets: ["latin"], variable: "--nunito" });

export const metadata: Metadata = {
  title: "RSUripSumoharjo",

  description: "Rumah Sakit Islami Bandarlampung",
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
      <body className={`${nunito.variable} ${oswald.variable}`}>
        <AppProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </AppProvider>
      </body>
    </html>
  );
}
