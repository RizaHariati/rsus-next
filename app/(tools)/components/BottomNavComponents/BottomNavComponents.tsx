"use client";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAmbulance,
  faDoorOpen,
  faPerson,
  faPeopleGroup,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import Link from "next/link";
import { DaruratContent } from "../NavbarComponents/NavbarComponentsItem/NavLinkEmergency";

import { PatientProfileContent } from "../NavbarComponents/NavbarComponentsItem/PatientProfile";
import { MenuAntrianContent } from "../NavbarComponents/NavbarComponentsItem/NavLinkAntrian";
import { LoginFormContent } from "../NavbarComponents/NavbarComponentsItem/UserLogin";
import { AnimatePresence, motion } from "framer-motion";
import { enterOpacity } from "../../framervariants/variants";
import { popBottomVariant } from "../../framervariants/bottomvariants";

type Props = { scrollingUp: boolean; scrollTop: boolean };

const BottomNavComponents = ({ scrollingUp, scrollTop }: Props) => {
  const {
    toggleMenuNavbar,
    state: { menu_id },
    patientState: { user },
  } = useGlobalContext();

  return (
    <div className="nav-b-container ">
      <div className={scrollingUp || !scrollTop ? "nav-b-show" : "nav-b-hide"}>
        <div
          className={scrollingUp ? "nav-b-pattern-show " : "nav-b-pattern-hide"}
        ></div>
        <div className=" absolute top-0 w-full h-full z-40 flex-center-center pt-2">
          <button
            id="darurat"
            type="button"
            onClick={(e) => toggleMenuNavbar(e.currentTarget.id)}
            className="nav-b-link  "
          >
            <FontAwesomeIcon icon={faAmbulance} className="nav-b-icon" />
            <p className="nav-b-txt ">Darurat</p>
          </button>
          {user.login && (
            <button
              type="button"
              id="profile"
              onClick={(e) => toggleMenuNavbar(e.currentTarget.id)}
              className="nav-b-link   "
            >
              <FontAwesomeIcon icon={faPerson} className="nav-b-icon" />
              <p className="nav-b-txt">Profil </p>
            </button>
          )}
          {!user.login && (
            <button
              type="button"
              id="login"
              onClick={(e) => toggleMenuNavbar(e.currentTarget.id)}
              className="nav-b-link  "
            >
              <FontAwesomeIcon icon={faDoorOpen} className="nav-b-icon" />
              <p className="nav-b-txt">Login</p>
            </button>
          )}
          <button
            type="button"
            id="antrian"
            onClick={(e) => {
              if (!user.login) {
                toast.error("Anda harus login terlebih dahulu");
              } else {
                toggleMenuNavbar(e.currentTarget.id);
              }
            }}
            className="nav-b-link"
          >
            <FontAwesomeIcon icon={faPeopleGroup} className="nav-b-icon" />
            <p className="nav-b-txt">Antrian</p>
          </button>
          <Link
            href="/mainpage"
            className="nav-b-link "
            id="mainpage"
            onClick={(e) => toggleMenuNavbar(e.currentTarget.id)}
          >
            <FontAwesomeIcon icon={faHome} className="nav-b-icon" />
            <p className="nav-b-txt">Beranda</p>
          </Link>
        </div>
      </div>

      <div className="w-full h-8 bg-white flex-center-center border-t z-40 absolute bottom-0  border-greenUrip">
        <a
          href="https://www.ichacodes.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-greenUrip footnote-1 m-auto"
        >
          by Riza Hariati for Ichacodes copyright &copy;{dayjs().format("YYYY")}
        </a>
      </div>

      <BottomNavContent>
        {menu_id === "darurat" && <DaruratContent />}
        {menu_id === "login" && <LoginFormContent />}
        {menu_id === "profile" && <PatientProfileContent />}
        {menu_id === "antrian" && <MenuAntrianContent />}
      </BottomNavContent>
    </div>
  );
};

export default BottomNavComponents;

type BottomProps = {
  children: React.ReactNode;
};
const BottomNavContent = ({ children }: BottomProps) => {
  const {
    state: { menu_id },
  } = useGlobalContext();

  return (
    <AnimatePresence initial={false}>
      {menu_id && (
        <motion.div
          key={menu_id}
          variants={popBottomVariant}
          initial="initial"
          animate="animate"
          exit="exit"
          className="drawer-b-container"
        >
          <button className=" fixed left-1/2 -translate-x-1/2 top-2 w-16 h-2 rounded-full border-greyBorder bg-greyBorder"></button>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
