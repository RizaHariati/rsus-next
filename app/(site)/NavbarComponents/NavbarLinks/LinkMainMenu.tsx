"use client";

import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React from "react";

type Props = {};

const LinkMainMenu = (props: Props) => {
  const {
    toggleMenu,
    state: { menu_id },
  } = useGlobalContext();
  return (
    <div className="flex-center-center text-link w-10  h-full relative ">
      <button id="menu">
        <FontAwesomeIcon icon={faBars} className="navbar-reg-icon" />
      </button>
    </div>
  );
};

export default LinkMainMenu;
