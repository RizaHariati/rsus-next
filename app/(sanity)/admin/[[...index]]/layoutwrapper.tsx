"use client";
import React, { useEffect } from "react";

import { ToastContainer } from "react-toastify";

import { usePathname } from "next/navigation";
import ModalContainer from "@/app/(tools)/modal/ModalContainer";
import AlertContainer from "@/app/(tools)/alert/AlertContainer";
import BottomNavComponents from "@/app/(tools)/components/BottomNavComponents/BottomNavComponents";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";

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
    // eslint-disable-next-line
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
