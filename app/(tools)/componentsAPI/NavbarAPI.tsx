"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
// import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import MainLogoImageAPI from "./MainLogoImage";

type Props = {};
type MainProps = {};

const NavbarAPI = (props: MainProps) => {
  const { scrollTop } = useGlobalContext();

  const [nowPathname, setNowPathname] = useState<any>();
  const pathname = usePathname();
  useEffect(() => {
    setTimeout(() => {
      setNowPathname(pathname);
    }, 1000);
  }, [pathname]);

  return (
    <div
      className={
        nowPathname !== pathname
          ? "navbar-container shadow-sm opacity-0 fixed -top-14  "
          : scrollTop
          ? "navbar-container bg-opacity-100 shadow-md opacity-100 top-0"
          : "navbar-container shadow-sm bg-opacity-60 fixed top-0 opacity-100"
      }
    >
      <nav className="navbar">
        <MainLogo />
      </nav>
    </div>
  );
};

export default NavbarAPI;

const MainLogo = (props: Props) => {
  const { toggleMenuNavbar } = useGlobalContext();

  return (
    <div id="home" onClick={(e) => toggleMenuNavbar(null)}>
      <Link href="/" className="navbar-logo-container">
        <div className="h-8 w-8">
          <MainLogoImageAPI />
        </div>
        <div className=" text-greenUrip">
          <h6 className="text-sm tracking-[7px] leading-3 font-oswald ">
            Rumah Sakit
          </h6>
          <h6 className="text-xl font-bold tracking-wide">Urip Sumoharjo</h6>
        </div>
      </Link>
    </div>
  );
};
