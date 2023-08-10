"use client";

import "../styles/navbar.css";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faHome } from "@fortawesome/free-solid-svg-icons";
import LinkMainMenu from "./NavbarComponentsItem/LinkMainMenu";
import LinkEmergency from "./NavbarComponentsItem/LinkEmergency";
import LinkProfile from "./NavbarComponentsItem/LinkProfile";
import LinkAntrian from "./NavbarComponentsItem/LinkAntrian";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <MainLogo />
        <NavbarLinks />
        <NavbarMenu />
      </nav>
    </div>
  );
};

export default Navbar;

const MainLogo = (props: Props) => {
  const { toggleMenu } = useGlobalContext();

  return (
    <div id="home" onClick={(e) => toggleMenu(e.currentTarget.id)}>
      <Link href="/" className="navbar-logo-container">
        <Image
          src="/images/navbar/main-logo.png"
          width={40}
          height={40}
          className=" object-covers rounded-full overflow-hidden"
          alt="main-logo"
          priority
        />
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
        <div className=" flex-center-center text-link w-12  h-full  ">
          <div className="relative">
            <button id="notification">
              <FontAwesomeIcon icon={faBell} className="navbar-reg-icon" />
              <p className="absolute bg-redBase text-[12px] w-4 h-4 rounded-full text-center text-white -top-2 -right-2">
                2
              </p>
            </button>
          </div>
        </div>
        <LinkMainMenu />
      </div>
    </div>
  );
};

const NavbarLinks = (props: Props) => {
  const {
    toggleMenu,
    state: { menu_id },
  } = useGlobalContext();
  return (
    <div className="navbar-links-container">
      <LinkEmergency />
      <LinkProfile />
      <LinkAntrian />
      <Link
        href="/mainpage"
        className="navbar-link"
        id="mainpage"
        onClick={(e) => toggleMenu(e.currentTarget.id)}
      >
        <FontAwesomeIcon icon={faHome} className="navbar-link-icon" />
        <p>Beranda</p>
      </Link>
    </div>
  );
};
