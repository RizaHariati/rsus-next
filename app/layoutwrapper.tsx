"use client";
import React, { useEffect, useState } from "react";

import ModalContainer from "./(tools)/modal/ModalContainer";
import "./styles/navbar.css";
import AlertContainer from "./(tools)/alert/AlertContainer";
import { ToastContainer } from "react-toastify";
import BottomNavComponents from "./(tools)/components/BottomNavComponents/BottomNavComponents";
import { useGlobalContext } from "./(tools)/context/AppProvider";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const LayoutWrapper = ({ children }: Props) => {
  const { handleScroll, toggleMenuNavbar } = useGlobalContext();
  const pathname = usePathname();
  useEffect(() => {
    if (pathname !== "home") {
      toggleMenuNavbar(null);
    }
  }, [pathname]);

  return (
    <div
      onScroll={(e) => {
        handleScroll(e);
      }}
      className="main-layout-container "
    >
      <ToastContainer position="top-right" theme="light" autoClose={1000} />
      <ModalContainer />
      <AlertContainer />

      {children}
      <BottomNavComponents />
    </div>
  );
};

export default LayoutWrapper;
