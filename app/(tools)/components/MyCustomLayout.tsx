import React from "react";
import { LayoutProps } from "sanity";
import { AppProvider } from "../context/AppProvider";
import { config } from "../../../node_modules/@fortawesome/fontawesome-svg-core/";
import "../../styles/globals.css";
import "../../styles/navbar.css";
import "../../styles/mainpage.css";
import "../../styles/bottomnav.css";
import {
  Nunito,
  Oswald,
} from "../../../node_modules/next/dist/compiled/@next/font/dist/google";

const oswald = Oswald({ subsets: ["latin"], variable: "--oswald" });
const nunito = Nunito({ subsets: ["latin"], variable: "--nunito" });

type Props = {};
config.autoAddCss = false;
const MyCustomLayout = (props: LayoutProps) => {
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

export default MyCustomLayout;
