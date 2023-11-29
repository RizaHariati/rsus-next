"use client";

import React from "react";

import HospitalSidebarComponentLoading from "../../(tools)/components/adminHospitalComponents/HospitalLoadingComponents/HospitalSidebarComponentLoading";
import HospitalMidbarComponentLoading from "@/app/(tools)/components/adminHospitalComponents/HospitalLoadingComponents/HospitalMidbarComponentLoading";
import HospitalDescriptionComponentLoading from "@/app/(tools)/components/adminHospitalComponents/HospitalLoadingComponents/HospitalDescriptionComponentLoading";

type Props = {};

const LoadingPage = (props: Props) => {
  return (
    <div className="ptn-container">
      <div className="ptn-content">
        {/* --------------------- COLUMN 1 SIDEBAR MENU -------------------- */}
        <HospitalSidebarComponentLoading />
        {/* ----------------------- COLUMN 2 MID MENU ---------------------- */}
        {<HospitalMidbarComponentLoading />}
        {/* ----------------- COLUMN 3 DETAILED DESCRIPTION ---------------- */}
        <HospitalDescriptionComponentLoading />
      </div>
    </div>
  );
};

export default LoadingPage;
