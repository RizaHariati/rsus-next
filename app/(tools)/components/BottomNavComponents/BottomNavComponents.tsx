"use client";
import dayjs from "dayjs";
import React from "react";

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

type Props = { scrollingUp: boolean; scrollTop: boolean };

const BottomNavComponents = ({ scrollingUp, scrollTop }: Props) => {
  const {
    toggleMenuNavbar,
    state: { menu_id },
    patientState: { user },
  } = useGlobalContext();

  return (
    <div className="nav-b-container ">
      <div className={scrollingUp ? "nav-b-show" : "nav-b-hide"}>
        <div className="nav-b-pattern"></div>
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

      <div className="w-full h-8 bg-white flex-center-center">
        <p className="text-greenUrip footnote-1 m-auto">
          by Riza Hariati for Ichacodes copyright &copy;{dayjs().format("YYYY")}
        </p>
      </div>
    </div>
  );
};

export default BottomNavComponents;
