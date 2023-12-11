"use client";

import React from "react";

import { useGlobalContext } from "@/app/(tools)/context/AppProvider";

import moment from "moment";

type Props = {};

const BottomNavComponents = (props: Props) => {
  const {
    patientState: { patient },
  } = useGlobalContext();

  if (!patient || !patient.scheduled_appointments) {
    return <div></div>;
  } else {
    return (
      <div
        className="w-full h-12 bg-white flex-center-center border-t  absolute -bottom-12
          border-greenUrip  z-[100] "
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
    );
  }
};

export default BottomNavComponents;
