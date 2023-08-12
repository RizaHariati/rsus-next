"use client";

import React, { useState } from "react";

import { datamenu } from "@/app/(tools)/data/datamenu";
import { DataMenuType, SubDataType } from "@/app/(tools)/types";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

type Props = {};

const LinkMainMenu = (props: Props) => {
  const {
    toggleMenu,
    state: { menu_id },
  } = useGlobalContext();

  const [itemId, setItemId] = useState<string | null>(null);
  const toggleItem = (id: string | null) => {
    if (itemId === id) {
      setItemId(null);
    } else {
      setItemId(id);
    }
  };
  return (
    <div className="flex-center-center text-link w-10 h-full relative ">
      <button id="main-menu" onClick={(e) => toggleMenu(e.currentTarget.id)}>
        <FontAwesomeIcon icon={faBars} className="navbar-reg-icon" />
      </button>

      {/* DROP MAIN MENU */}
      <div
        className={
          menu_id != "main-menu"
            ? "main-menu-container-hidden "
            : "main-menu-container  "
        }
      >
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
                <SubMenu
                  menu={menu}
                  toggleItem={toggleItem}
                  itemId={itemId}
                  key={menu.title}
                />
              );
            } else {
              return (
                <div
                  className="bg-greyBorder h-12 flex items-center justify-end pl-2 "
                  key={menu.title}
                >
                  <Link
                    href={menu.link}
                    onClick={() => {
                      toggleMenu("main-menu");
                      toggleItem(null);
                    }}
                    className="main-menu-item pt-3"
                  >
                    {menu.title}
                  </Link>
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

type SubProps = {
  menu: DataMenuType;
  toggleItem: (id: string | null) => void;
  itemId: string | null;
};
const SubMenu = ({ menu, toggleItem, itemId }: SubProps) => {
  const {
    toggleMenu,
    state: { menu_id },
  } = useGlobalContext();
  return (
    <div>
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
            ? "h-0 overflow-hidden w-full transition-all opacity-0"
            : " h-36 overflow-hidden w-full transition-all opacity-100"
        }
      >
        {menu.subdata.map((item: SubDataType, index) => {
          return (
            <div
              key={index}
              className="bg-greyBorder h-12 flex items-center justify-center px-2"
            >
              <Link
                href={item.link}
                onClick={() => {
                  toggleMenu("main-menu");
                  toggleItem(null);
                }}
                className="text-[14px] main-menu-item pt-3 text-center "
              >
                {item.title}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
