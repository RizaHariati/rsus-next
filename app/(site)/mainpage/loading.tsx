import React from "react";
import "../../styles/mainpage.css";
import MainImageSmallLoading from "@/app/(tools)/components/PageComponents/mainpage/mainpageSmall/MainImageSmallLoading";
import FloatingMenuLoading from "@/app/(tools)/components/PageComponents/mainpage/FloatingMenuLoading";

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className=" page-main-container ">
      <section
        id="main-page-top"
        className="h-full md:min-h-screen w-full z-0 overflow-hidden flex flex-col md:flex-row relative snap-none md:snap-center bg-white md:bg-accent1 pb-2 border-b border-greyBorder"
      >
        <MainImageSmallLoading />
        <div className="h-1/2 w-full md:h-full relative md:absolute z-0 translate-y-1/2  md:top-0 md:translate-y-0 md:z-20">
          <FloatingMenuLoading />
        </div>
        <div className="hidden md:block h-screen w-3/12 bg-greyLit relative z-10 ">
          <div className="w-4 h-full bg-accent1 absolute right-0 top-0  animate-pulse"></div>
        </div>
        <MainImageAnimated />
      </section>
    </div>
  );
};

export default Loading;

const MainImageAnimated = () => {
  return (
    <div className="hidden md:relative h-screen w-9/12 bg-accent1  z-0 animate-pulse"></div>
  );
};
