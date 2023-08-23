"use client";
import React from "react";

import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAmbulance,
  faFireFlameSimple,
} from "@fortawesome/free-solid-svg-icons";

type Props = {};

const LinkEmergency = (props: Props) => {
  const {
    toggleMenuNavbar,
    state: { menu_id },
  } = useGlobalContext();

  return (
    <div className="relative h-full ">
      <button
        id="darurat"
        onClick={(e) => toggleMenuNavbar(e.currentTarget.id)}
        className="navbar-link text-redBase hover:text-red-700 "
      >
        <FontAwesomeIcon icon={faAmbulance} className="navbar-link-icon" />
        <p>Darurat</p>
      </button>

      {/* DROP MENU EMERGENCY */}
      <div
        className={
          menu_id != "darurat"
            ? "emergency-menu-container-hidden"
            : "emergency-menu-container "
        }
      >
        <div className="menu-link-icon">
          <FontAwesomeIcon icon={faAmbulance} className="menu-icon" />
          <p className="btn-3-bold text-greyDrk">AMBULANS : (0721)700323</p>
        </div>
        <div className="menu-link-icon">
          <FontAwesomeIcon icon={faFireFlameSimple} className="menu-icon" />
          <p className="btn-3-bold text-greyDrk">
            igd: instalasi gawat darurat 24 jam : (0721)771322
          </p>
        </div>
      </div>
    </div>
  );
};

export default LinkEmergency;
