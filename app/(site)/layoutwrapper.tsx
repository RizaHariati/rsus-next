"use client";
import React, { useState } from "react";

import Navbar from "../(tools)/components/NavbarComponents/Navbar";
import ModalContainer from "../(tools)/modal/ModalContainer";
import "../styles/navbar.css";
import AlertContainer from "../(tools)/alert/AlertContainer";
import { ToastContainer } from "react-toastify";
import BottomNavComponents from "../(tools)/components/BottomNavComponents/BottomNavComponents";

type Props = {
  children: React.ReactNode;
};

const LayoutWrapper = ({ children }: Props) => {
  const [scrollTop, setScrollTop] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollingUp, setscrollingUp] = useState(true);
  return (
    <div
      onScroll={(e) => {
        const top = e.currentTarget.scrollTop;
        setScrollPosition(top);
        setscrollingUp(top < scrollPosition);
        if (top > 100) {
          setScrollTop(true);
        } else {
          setScrollTop(false);
        }
      }}
      className="bg-greyLit h-screen overflow-y-scroll scrollbar-none snap-y snap-proximity relative"
    >
      <ToastContainer position="top-right" theme="light" autoClose={1000} />
      <ModalContainer />
      <AlertContainer />
      <Navbar scrollTop={scrollTop} />
      {children}
      <BottomNavComponents scrollingUp={scrollingUp} scrollTop={scrollTop} />
    </div>
  );
};

export default LayoutWrapper;
