import React from "react";
import { LayoutProps } from "sanity";
import { config } from "../../../node_modules/@fortawesome/fontawesome-svg-core/";
import "../../styles/globals.css";
import "../../styles/navbar.css";
import "../../styles/mainpage.css";
import "../../styles/bottomnav.css";

type Props = {};
config.autoAddCss = false;
const MyCustomLayout = (props: LayoutProps) => {
  return (
    <div
      className={`h-[calc(100vh-112px)]  w-full fixed top-28 overflow-y-scroll  font-nunito `}
    >
      {props.renderDefault(props)}
    </div>
  );
};

export default MyCustomLayout;
