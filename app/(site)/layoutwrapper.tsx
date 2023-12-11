"use client";

import { usePathname, useRouter } from "next/navigation";
import { useGlobalContext } from "../(tools)/context/AppProvider";
import { ToastContainer, toast } from "react-toastify";
import ModalContainer from "../(tools)/modal/ModalContainer";
import AlertContainer from "../(tools)/alert/AlertContainer";
import BottomNavComponents from "../(tools)/components/BottomNavComponents/BottomNavComponents";
import {
  LegacyRef,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";

type Props = {
  children: React.ReactNode;
};

const LayoutWrapper = ({ children }: Props) => {
  const layoutRef: LegacyRef<HTMLDivElement> | null = useRef(null);
  const {
    handleScroll,
    toggleMenuNavbar,
    removeToken,

    state: { token },
  } = useGlobalContext();
  const pathname = usePathname();
  useEffect(() => {
    if (pathname !== "home") {
      toggleMenuNavbar(null);
    }
    // eslint-disable-next-line
  }, [pathname]);
  const [timer, setTimer] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    if (!token) return;
    else {
      while (timer < 300) {
        const interval = setInterval(() => {
          setTimer(timer + 1);
        }, 1000);

        return () => {
          clearInterval(interval);
        };
      }
      removeToken();
      setTimer(0);
      toast.info("waktu mengedit habis, silahkan login kembali", {
        autoClose: 1500,
      });
      router.push("/");
    }
    // eslint-disable-next-line
  }, [timer, token]);

  return (
    <div
      ref={layoutRef}
      onScroll={(e) => {
        handleScroll(e);
      }}
      className="main-layout-container  "
    >
      <ToastContainer
        position="top-right"
        theme="light"
        autoClose={1000}
        limit={3}
      />
      <ModalContainer />
      <AlertContainer />

      {children}
      <BottomNavComponents />
    </div>
  );
};

export default LayoutWrapper;
