"use client";
import React, { useState } from "react";

import Navbar from "../(tools)/components/NavbarComponents/Navbar";
import ModalContainer from "../(tools)/modal/ModalContainer";
import "../styles/navbar.css";
import AlertContainer from "../(tools)/alert/AlertContainer";
type Props = {
  children: React.ReactNode;
};

const LayoutWrapper = ({ children }: Props) => {
  const [scrollTop, setScrollTop] = useState<boolean>(false);
  return (
    <div
      onScroll={(e) => {
        const top = e.currentTarget.scrollTop;
        if (top > 100) {
          setScrollTop(true);
        } else {
          setScrollTop(false);
        }
      }}
      className="bg-greyLit h-screen overflow-y-scroll scrollbar-none snap-y snap-proximity"
    >
      <ModalContainer />
      <AlertContainer />
      <Navbar scrollTop={scrollTop} />
      {children}
    </div>
  );
};

export default LayoutWrapper;
