"use client";

import React from "react";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faPeopleGroup,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

type Props = {};

const LinkAntrian = () => {
  const {
    toggleMenu,
    state: { menu_id },
  } = useGlobalContext();
  return (
    <div className="relative h-full ">
      <button
        id="antrian"
        onClick={(e) => toggleMenu(e.currentTarget.id)}
        className="navbar-link  "
      >
        <FontAwesomeIcon icon={faPeopleGroup} className="navbar-link-icon" />
        <p>Antrian</p>
      </button>

      {/* DROP MENU EMERGENCY */}
      <div
        className={
          menu_id != "antrian"
            ? "antrian-menu-container-hidden "
            : "antrian-menu-container "
        }
      >
        <div className="menu-alert">
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            className="menu-icon "
          />
          <p className="body-3 ">
            CT Scan : Saat ini melayani nomor 25. &nbsp;
            <span className="font-bold">Nomor Anda 27</span>. Harap bersiap-siap
          </p>
        </div>

        <div className="menu-alert">
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            className="menu-icon "
          />
          <p className="body-3 ">
            Dr. Mamie (Poli Anak): Saat ini melayani nomor 10.
            <span className="font-bold">Nomor Anda 20</span>. Harap bersiap-siap
          </p>
        </div>

        <div className="menu-info">
          <FontAwesomeIcon icon={faInfo} className="menu-icon " />
          <p className="body-3 ">
            Farmasi : Saat ini melayani nomor 48 racikan, nomor 34 non racikan.
            <span className="font-bold">Nomor Anda 67 non racikan</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LinkAntrian;
