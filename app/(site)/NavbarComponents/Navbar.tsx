"use client";
import { useRef, useState } from "react";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import {
  faBarChart,
  faBell,
  faSquareMinus,
} from "@fortawesome/free-regular-svg-icons";
import "../styles/navbar.css";
import {
  faAmbulance,
  faBars,
  faHome,
  faPeopleGroup,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <motion.div
      initial={{ backgroundColor: "#ffffff00", y: -60 }}
      animate={{ backgroundColor: "#ffffff8a", y: 0 }}
      transition={{ stiffness: 30, type: "spring" }}
      className="navbar-container"
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

{
  /*
        <Link href="/">Enter</Link>
        <Link href="/homepage">HomePage</Link>
        <Link href="/facility">Facility</Link>
        <Link href="/laboratorium">Laboratorium</Link>
        <Link href="/appointment">Appointment</Link>
        <Link href="/about">Tentang</Link>
        <Link href="/activity">Aktivitas</Link>
      </div> */
}

const MainLogo = (props: Props) => {
  return (
    <div className="navbar-logo-container">
      <Image
        src="/images/navbar/main-logo.png"
        width={40}
        height={40}
        className=" object-covers rounded-full overflow-hidden"
        alt="main-logo"
        priority
      />
      <div className=" text-greenUrip  ">
        <h6 className="text-sm tracking-[7px] leading-3 font-oswald ">
          Rumah Sakit
        </h6>
        <h6 className="text-xl font-bold tracking-wide">Urip Sumoharjo</h6>
      </div>
    </div>
  );
};

const NavbarLinks = (props: Props) => {
  const [emergency, setEmergency] = useState(false);
  return (
    <div className="navbar-links-container">
      <div
        className="navbar-link text-redBase hover:text-red-700 relative"
        onClick={() => {
          setEmergency(!emergency);
        }}
      >
        <FontAwesomeIcon icon={faAmbulance} className="navbar-link-icon" />
        <p>Darurat</p>
        <AnimatePresence>
          {emergency && (
            <motion.div
              className=" w-52 bg-redBase overflow-hidden absolute top-14 left-0"
              initial={{ height: "0px" }}
              animate={{ height: "300px" }}
              exit={{ height: "0px" }}
              transition={{ type: "spring", stiffness: 50, duration: 0.3 }}
            >
              somethings
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="navbar-link">
        <FontAwesomeIcon icon={faPerson} className="navbar-link-icon" />
        <p>Profil</p>
      </div>
      <Link href="/facility" className="navbar-link">
        <FontAwesomeIcon icon={faPeopleGroup} className="navbar-link-icon" />
        <p>Antrian</p>
      </Link>
      <Link href="/mainpage" className="navbar-link">
        <FontAwesomeIcon icon={faHome} className="navbar-link-icon" />
        <p>Beranda</p>
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
            <FontAwesomeIcon icon={faBell} className="navbar-reg-icon" />
            <p className="absolute bg-redBase text-[12px] w-4 h-4 rounded-full text-center text-white -top-2 -right-2">
              2
            </p>
          </div>
        </div>
        <div className=" flex-center-center text-link w-10  h-full ">
          <FontAwesomeIcon icon={faBars} className="navbar-reg-icon" />
        </div>
      </div>
    </div>
  );
};
