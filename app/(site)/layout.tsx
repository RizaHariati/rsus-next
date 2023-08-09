import "./styles/globals.css";
import type { Metadata } from "next";
import { Oswald, Nunito } from "next/font/google";
import Navbar from "./NavbarComponents/Navbar";
import PageWrapper from "./pagewrapper";

const oswald = Oswald({ subsets: ["latin"], variable: "--oswald" });
const nunito = Nunito({ subsets: ["latin"], variable: "--nunito" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${oswald.variable} scrollbar-none`}>
        <PageWrapper>
          <Navbar />
          {children}
        </PageWrapper>
      </body>
    </html>
  );
}
