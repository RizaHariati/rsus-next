"use client";

import React from "react";

import { datamenu } from "@/app/(tools)/data/datamenu";
import { DataMenuType } from "@/app/(tools)/types";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

type Props = {};

const LinkMainMenu = (props: Props) => {
  const {
    toggleMenu,
    state: { menu_id },
  } = useGlobalContext();
  return (
    <div className="flex-center-center text-link w-10 h-fit relative ">
      <button id="main-menu" onClick={(e) => toggleMenu(e.currentTarget.id)}>
        <FontAwesomeIcon icon={faBars} className="navbar-reg-icon" />
      </button>

      {/* DROP MAIN MENU */}
      <div className="navbar-drop-container w-[350px] right-0 p-0 pb-10 ">
        <div className="p-3 w-full h-full flex items-center gap-2 justify-end ">
          <FontAwesomeIcon
            icon={faFacebook}
            className="h-8 text-blue-600 hover:text-blue-700 transition-all"
          />
          <FontAwesomeIcon
            icon={faInstagram}
            className="h-8 text-fuchsia-700 hover:text-fuchsia-800 transition-all"
          />
        </div>
        {datamenu.map((menu: DataMenuType) => {
          return (
            <div
              className="bg-greyBorder h-10 flex items-center justify-end pl-2 "
              key={menu.title}
            >
              <button
                on
                className="btn-3 hover:btn-3-bold hover:text-greyBorder transition-all h-full w-full bg-white leading-10 px-2 border-b border-b-greyBorder text-left"
              >
                {menu.title}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LinkMainMenu;
