"use client";

import React, { useState } from "react";

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
import { AnimatePresence, motion } from "framer-motion";
import { popBottomVariant } from "../../framervariants/bottomvariants";
import moment from "moment";

type Props = {};

const BottomNavComponents = (props: Props) => {
  const {
    toggleMenuNavbar,
    scrollingUp,
    scrollTop,
    state: { menu_id },
    patientState: { user, patient },
  } = useGlobalContext();

  if (!patient || !patient.scheduled_appointments) {
    return <div></div>;
  } else {
    return (
      <div className="nav-b-container ">
        <div className="w-full h-8 bg-white flex-center-center border-t z-40 absolute bottom-0  border-greenUrip">
          <a
            href="https://www.ichacodes.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-greenUrip footnote-1 m-auto underline"
          >
            by Riza Hariati for Ichacodes copyright &copy;
            {moment().format("YYYY")}
          </a>
        </div>
      </div>
    );
  }
};

export default BottomNavComponents;
