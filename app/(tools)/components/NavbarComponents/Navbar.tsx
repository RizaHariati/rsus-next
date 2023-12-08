"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";

import MainLogoImage from "../../modal/MainLogoImage";

type Props = {};
type MainProps = {};

const Navbar = (props: MainProps) => {
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
          ? "navbar-container bg-opacity-80 shadow-md opacity-80 top-0"
          : "navbar-container shadow-sm bg-opacity-60 fixed top-0 opacity-80"
      }
    >
      <nav className="navbar">
        <MainLogo />

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
      href="https://rsuripsumoharjo-model.netlify.app/"
      // href="https://rsus.sanity.studio/"

      target="_blank"
      rel="noopener noreferrer"
      className="navbar-logo-container"
      onClick={(e) => toggleMenuNavbar(null)}
    >
      <div className="h-8 w-8">
        <MainLogoImage />
      </div>
      <div className=" text-greenUrip">
        <h6 className="text-xs md:text-sm tracking-[5px] md:tracking-[7px] leading-3 font-oswald ">
          Rumah Sakit
        </h6>
        <h6 className="text-base md:text-xl font-bold tracking-wide">
          Urip Sumoharjo
        </h6>
      </div>
    </Link>
  );
};

export const NavbarMenu = (props: Props) => {
  return (
    <div className="h-full ">
      <div className="navbar-menu-container flex-center-end ">
        <Link href="/" className="navbar-menu-btn">
          <FontAwesomeIcon
            icon={faHome}
            className=" w-5 h-5 md:w-6 md:h-6  text-base md:text-lg"
          />
        </Link>
        <Link
          href="/admin"
          // href="https://rsus.sanity.studio/"
          className="navbar-menu-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={faUserCircle}
            className=" w-5 h-5 md:w-6 md:h-6 text-base md:text-xl"
          />
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
    <div className="navbar-links-container ">
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
        href="/adminhospital/"
        className="navbar-link"
        onClick={(e) => toggleMenuNavbar(e.currentTarget.id)}
      >
        <p className="text-link">RumahSakit</p>
      </Link>
    </div>
  );
};
