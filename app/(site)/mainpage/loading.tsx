"use client";
import React from "react";

import "../../styles/mainpage.css";

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className="page-main-container">
      <section
        id="zero"
        className=" h-full  min-h-screen w-full z-0 overflow-hidden flex relative snap-center"
      >
        <div className="h-full w-3/12 bg-greyLit relative z-30 ">
          <div className="w-4 h-full bg-accent1 absolute right-0 top-0 animate-pulse"></div>
        </div>
        <MainImageAnimated />
      </section>
    </div>
  );
};

export default Loading;

const MainImageAnimated = () => {
  return (
    <div className="h-screen w-9/12 bg-accent1 relative z-0 pulsing"></div>
  );
};
