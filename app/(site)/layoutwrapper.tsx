"use client";

import { usePathname } from "next/navigation";
import { useGlobalContext } from "../(tools)/context/AppProvider";
import { ToastContainer } from "react-toastify";
// import ModalContainer from "../(tools)/modal/ModalContainer";
// import AlertContainer from "../(tools)/alert/AlertContainer";
// import BottomNavComponents from "../(tools)/components/BottomNavComponents/BottomNavComponents";
import { useEffect } from "react";

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
      {/* <ModalContainer />
      <AlertContainer /> */}

      {children}
      {/* <BottomNavComponents /> */}
    </div>
  );
};

export default LayoutWrapper;
