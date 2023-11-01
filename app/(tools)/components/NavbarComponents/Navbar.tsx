"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";

import NavLinkEmergency from "./NavbarComponentsItem/NavLinkEmergency";
import NavLinkProfile from "./NavbarComponentsItem/NavLinkProfile";
import NavLinkAntrian from "./NavbarComponentsItem/NavLinkSchedule";
import NavLinkMainMenu from "./NavbarComponentsItem/NavLinkMainMenu";
import NavLinkNotification from "./NavbarComponentsItem/NavLinkNotification";
import MainLogoImage from "../../modal/MainLogoImage";
import { toast } from "react-toastify";

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
    <Link
      id="home"
      href="/"
      className="navbar-logo-container"
      onClick={(e) => toggleMenuNavbar(null)}
    >
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
  );
};

export const NavbarMenu = (props: Props) => {
  return (
    <div className="h-full ">
      <div className="navbar-menu-container ">
        <a href="https://rsus-api.vercel.app/" className="navbar-menu-btn">
          <FontAwesomeIcon icon={faHome} className=" w-6 h-6" />
        </a>
        <Link
          href="/admin"
          // href="https://rsus.sanity.studio/"
          className="navbar-menu-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faUserCircle} className=" w-6 h-6" />
        </Link>
      </div>
    </div>
  );
};

export const NavbarLinks = (props: Props) => {
  const {
    toggleMenuNavbar,
    openAlert,
    patientState: { patient },
  } = useGlobalContext();
  return (
    <div className="navbar-links-container">
      <Link
        className="navbar-link"
        href={!patient.medical_record_number ? "/" : "/patient"}
        onClick={() => {
          if (!patient.medical_record_number) {
            openAlert("inputmedicalrecord", {});
          }
        }}
      >
        <p className="text-link"> PASIEN</p>
      </Link>

      <Link
        href="/facility"
        className="navbar-link"
        onClick={(e) => toggleMenuNavbar(e.currentTarget.id)}
      >
        <FontAwesomeIcon icon={faHome} className="navbar-link-icon" />
        <p className="text-link">RumahSakit</p>
      </Link>
    </div>
  );
};
