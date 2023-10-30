import React from "react";
import { StudioNavbar } from "sanity";

import "../../styles/globals.css";
import "../../styles/navbar.css";
import "../../styles/mainpage.css";
import "../../styles/bottomnav.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import MainLogoImage from "../modal/MainLogoImage";
import { useGlobalContext } from "../context/AppProvider";
type Props = {};

const MyNavbar = (props: Props) => {
  return (
    <div className="flex flex-col w-full top-0 fixed h-32">
      <div className="navbar-container bg-opacity-100 shadow-md opacity-100 top-0">
        <nav className="navbar">
          <MainLogo />
          <a
            href={
              process.env.NODE_ENV === "production"
                ? `${process.env.NEXT_PUBLIC_BASE_CONSUMER}/mainpage`
                : `http://localhost:3000/mainpage`
            }
            className="flex-center-center ml-auto h-full w-fit"
            id="mainpage"
          >
            <FontAwesomeIcon icon={faHome} className=" w-6 h-6" />
            <p className="text-link">Beranda</p>
          </a>
        </nav>
      </div>
      <StudioNavbar />
    </div>
  );
};

export default MyNavbar;

export const MainLogo = (props: Props) => {
  const { toggleMenuNavbar } = useGlobalContext();

  return (
    <div id="home" onClick={(e) => toggleMenuNavbar(null)}>
      <a
        href={
          process.env.NODE_ENV === "production"
            ? `${process.env.NEXT_PUBLIC_BASE_CONSUMER}/`
            : `http://localhost:3000/`
        }
        className="flex-center-center ml-auto h-full w-fit"
        id="mainpage"
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
      </a>
    </div>
  );
};
