"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";

import NavLinkEmergency from "./NavbarComponentsItem/NavLinkEmergency";
import NavLinkProfile from "./NavbarComponentsItem/NavLinkProfile";
import NavLinkAntrian from "./NavbarComponentsItem/NavLinkSchedule";
import NavLinkMainMenu from "./NavbarComponentsItem/NavLinkMainMenu";
import NavLinkNotification from "./NavbarComponentsItem/NavLinkNotification";
import MainLogoImage from "../../modal/MainLogoImage";

type Props = {};
type MainProps = {};

const Navbar = (props: MainProps) => {
  const { scrollTop, toggleMenuNavbar, patientDispatch } = useGlobalContext();

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
        <NavbarLinks />
        <NavbarMenu />
      </nav>
    </div>
  );
};

export default Navbar;

export const MainLogo = (props: Props) => {
  const { toggleMenuNavbar } = useGlobalContext();

  return (
    <div id="home" onClick={(e) => toggleMenuNavbar(null)}>
      <Link href="/" className="navbar-logo-container">
        <div className="h-8 w-8">
          <MainLogoImage />
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

export const NavbarMenu = (props: Props) => {
  return (
    <div className="h-full ">
      <div className="navbar-menu-container ">
        <NavLinkNotification />
        <NavLinkMainMenu />
      </div>
    </div>
  );
};

export const NavbarLinks = (props: Props) => {
  const {
    toggleMenuNavbar,
    patientState: { user },
  } = useGlobalContext();
  return (
    <div className="navbar-links-container">
      <NavLinkEmergency />
      <NavLinkProfile />
      <NavLinkAntrian />
      <Link
        href="/mainpage"
        className="navbar-link"
        id="mainpage"
        onClick={(e) => toggleMenuNavbar(e.currentTarget.id)}
      >
        <FontAwesomeIcon icon={faHome} className="navbar-link-icon" />
        <p className="text-link">Beranda</p>
      </Link>
    </div>
  );
};
