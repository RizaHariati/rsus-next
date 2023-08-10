"use client";

import React, { useState } from "react";

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

  const [itemId, setItemId] = useState<string | null>(null);
  const toggleItem = (id: string) => {
    if (itemId === id) {
      setItemId(null);
    } else {
      setItemId(id);
    }
  };
  return (
    <div className="flex-center-center text-link w-10 h-fit relative ">
      <button id="main-menu" onClick={(e) => toggleMenu(e.currentTarget.id)}>
        <FontAwesomeIcon icon={faBars} className="navbar-reg-icon" />
      </button>

      {/* DROP MAIN MENU */}
      <div className="navbar-drop-container w-[450px] right-0 p-0 pb-10 ">
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
        <div className="flex flex-col">
          {datamenu.map((menu: DataMenuType) => {
            if (menu.subdata.length > 0) {
              return (
                <div key={menu.title}>
                  <div className="bg-greyBorder h-fit flex items-center justify-end pl-2 relative ">
                    <button
                      id={menu.name}
                      onClick={(e) => {
                        toggleItem(e.currentTarget.id);
                      }}
                      className={
                        itemId != menu.name
                          ? "main-menu-item w-full"
                          : "main-menu-item text-right w-10/12 transition-all"
                      }
                    >
                      {menu.title}
                    </button>
                  </div>
                  <div
                    className={
                      itemId != menu.name
                        ? "h-0 overflow-hidden w-full"
                        : "h-full overflow-hidden w-full"
                    }
                  >
                    <p>satu</p>
                    <p>dua</p>
                    <p>tiga</p>
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  className="bg-greyBorder h-10 flex items-center justify-end pl-2 "
                  key={menu.title}
                >
                  <button className="btn-3 hover:btn-3-bold hover:text-greyBorder transition-all h-full w-full bg-white leading-10 px-2 border-b border-b-greyBorder text-left">
                    {menu.title}
                  </button>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default LinkMainMenu;
