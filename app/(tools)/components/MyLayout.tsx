import React from "react";
import { LayoutProps } from "sanity";
import { AppProvider } from "../context/AppProvider";
import { config } from "@fortawesome/fontawesome-svg-core";
import "../../styles/globals.css";
import "../../styles/navbar.css";
import "../../styles/mainpage.css";
import "../../styles/bottomnav.css";
import { Oswald, Nunito } from "next/font/google";
const oswald = Oswald({ subsets: ["latin"], variable: "--oswald" });
const nunito = Nunito({ subsets: ["latin"], variable: "--nunito" });

type Props = {};
config.autoAddCss = false;
const MyLayout = (props: LayoutProps) => {
  return (
    <AppProvider>
      <div
        className={`h-[calc(100vh-112px)]  w-full fixed top-28 overflow-y-scroll ${nunito.variable} ${oswald.variable}`}
      >
        {props.renderDefault(props)}
      </div>
    </AppProvider>
  );
};

export default MyLayout;
