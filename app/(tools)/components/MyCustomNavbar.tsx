import React from "react";
import { StudioNavbar } from "sanity";

import "../../styles/globals.css";
import "../../styles/navbar.css";
import "../../styles/mainpage.css";
import "../../styles/bottomnav.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

import { Card, Text } from "@sanity/ui";

type Props = {};

function MyCustomNavbar(props: Props) {
  return (
    <div className="flex flex-col w-full top-0 fixed h-32">
      <div className="navbar-container bg-opacity-100 shadow-md opacity-100 top-0">
        <nav className="navbar">
          <MainLogo />
          <a
            href={`https://rsuripsumoharjo-model.netlify.app/mainpage`}
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
}

export default MyCustomNavbar;

export const MainLogo = (props: Props) => {
  return (
    <a
      href={`https://rsuripsumoharjo-model.netlify.app/`}
      className="flex-center-center mr-auto h-full w-fit"
    >
      <div className="h-8 w-8">
        <MainLogoImage />
      </div>
      <div className=" text-greenUrip hidden md:block">
        <h6 className="text-sm tracking-normal leading-3 font-sans ">
          Rumah Sakit
        </h6>
        <h6 className="text-xl font-bold tracking-wide">Urip Sumoharjo</h6>
      </div>
    </a>
  );
};

const MainLogoImage = (props: Props) => {
  return (
    <>
      <img
        rel="preload"
        placeholder="empty"
        src="https://rsuripsumoharjo-model.netlify.app/images/navbar/main-logo.png?w=64&q=75"
        width={50}
        height={50}
        className=" object-covers rounded-full overflow-hidden"
        alt="main-logo"
        loading="lazy"
      />
    </>
  );
};

export const LinkHome = () => {
  return (
    <Card padding={4}>
      <Text
        href={`https://rsuripsumoharjo-model.netlify.app/mainpage`}
        className="flex-center-center ml-auto h-full w-fit"
      >
        Beranda
      </Text>
    </Card>
  );
};
