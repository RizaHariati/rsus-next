"use client";

import React from "react";

import { useGlobalContext } from "@/app/(tools)/context/AppProvider";

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
        <div
          className="w-full h-12 bg-white flex-center-center border-t z-40 absolute bottom-10
          border-greenUrip"
        >
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
