"use client";

import Link from "next/link";
import React from "react";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { enterOpacity } from "../../framervariants/variants";
import MainLogoImage from "../../modal/MainLogoImage";
import NavLinkEmergency from "./NavbarComponentsItem/NavLinkEmergency";
import NavLinkProfile from "./NavbarComponentsItem/NavLinkProfile";
import NavLinkAntrian from "./NavbarComponentsItem/NavLinkAntrian";
import NavLinkMainMenu from "./NavbarComponentsItem/NavLinkMainMenu";
import NavLinkNotification from "./NavbarComponentsItem/NavLinkNotification";
type Props = {};
type MainProps = {
  scrollTop: boolean;
};

const Navbar = ({ scrollTop }: MainProps) => {
  const path = usePathname();
  return (
    <motion.div
      key={path}
      variants={enterOpacity}
      initial="initial"
      animate="animate"
      className={
        scrollTop
          ? "navbar-container bg-opacity-100 shadow-md"
          : "navbar-container shadow-sm"
      }
    >
      <nav className="navbar">
        <MainLogo />
        <NavbarLinks />
        <NavbarMenu />
      </nav>
    </motion.div>
  );
};

export default Navbar;

const MainLogo = (props: Props) => {
  const { toggleMenuNavbar } = useGlobalContext();

  return (
    <div id="home" onClick={(e) => toggleMenuNavbar(e.currentTarget.id)}>
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

const NavbarMenu = (props: Props) => {
  return (
    <div className="h-full ">
      <div className="navbar-menu-container ">
        <NavLinkNotification />
        <NavLinkMainMenu />
      </div>
    </div>
  );
};

const NavbarLinks = (props: Props) => {
  const { toggleMenuNavbar } = useGlobalContext();
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
