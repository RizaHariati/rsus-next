"use client";

import React, { useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";
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

  // return (
  //   <div className="page-main-container">
  //     <div className="flex-center-center flex-col gap-10  h-full">
  //       <h2>Loading</h2>
  //       <PropagateLoader
  //         color="#007814"
  //         loading={Loading}
  //         size={12}
  //         aria-label="Loading Spinner"
  //         data-testid="loader"
  //       />
  //     </div>
  //   </div>
  // );
};

export default LoadingPage;
