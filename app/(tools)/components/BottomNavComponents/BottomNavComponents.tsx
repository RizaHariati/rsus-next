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
import { LoginFormContent } from "../NavbarComponents/NavbarComponentsItem/UserLogin";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import { popBottomVariant } from "../../framervariants/bottomvariants";
import { MenuJadwalContent } from "../NavbarComponents/NavbarComponentsItem/NavLinkSchedule";

type Props = {};

const BottomNavComponents = (props: Props) => {
  const {
    toggleMenuNavbar,
    scrollingUp,
    scrollTop,
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
            id="jadwal"
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
            <p className="nav-b-txt">Jadwal</p>
          </button>
          <Link
            href="/mainpage"
            className="nav-b-link "
            id="mainpage"
            onClick={(e) => toggleMenuNavbar(null)}
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
          className="text-greenUrip footnote-1 m-auto underline"
        >
          by Riza Hariati for Ichacodes copyright &copy;{dayjs().format("YYYY")}
        </a>
      </div>

      {menu_id !== "main-menu" && menu_id !== "nav-notification" && (
        <BottomNavContent>
          {menu_id === "darurat" && <DaruratContent />}
          {menu_id === "login" && <LoginFormContent />}
          {menu_id === "profile" && <PatientProfileContent />}
          {menu_id === "jadwal" && <MenuJadwalContent />}
        </BottomNavContent>
      )}
    </div>
  );
};

export default BottomNavComponents;

type BottomProps = {
  children: React.ReactNode;
};
const BottomNavContent = ({ children }: BottomProps) => {
  const {
    toggleMenuNavbar,
    state: { menu_id },
  } = useGlobalContext();
  const controls = useDragControls();

  const [dragging, setDragging] = useState<false | "y">("y");
  function startDrag(event: any) {
    if (event.target.id === "drag-btn") {
      toggleMenuNavbar(null);
    } else {
      setDragging(false);
    }
  }

  return (
    <AnimatePresence initial={false}>
      {menu_id && (
        <motion.div
          key={menu_id}
          variants={popBottomVariant}
          initial="initial"
          animate="animate"
          exit="exit"
          className="drawer-b-container "
          drag={dragging}
          onDrag={(e) => {
            startDrag(e);
          }}
        >
          <button
            onClick={() => setDragging("y")}
            id="drag-btn"
            className={
              !dragging
                ? "drag-btn bg-redBase border-redBase w-3 h-3"
                : "drag-btn "
            }
          ></button>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
