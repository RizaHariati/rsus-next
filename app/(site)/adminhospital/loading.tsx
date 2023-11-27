"use client";

import React, { useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";
import HospitalSidebarComponentLoading from "../../(tools)/components/adminHospitalComponents/HospitalLoadingComponents/HospitalSidebarComponentLoading";
import HospitalMidbarComponentLoading from "@/app/(tools)/components/adminHospitalComponents/HospitalLoadingComponents/HospitalMidbarComponentLoading";
import HospitalDescriptionComponentLoading from "@/app/(tools)/components/adminHospitalComponents/HospitalLoadingComponents/HospitalDescriptionComponentLoading";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import useAssignColumn from "@/app/(tools)/utils/useAssignColumn";
import { hospitalBtnDetail } from "@/app/(tools)/column/sidebarColumnKeys";

type Props = {};

const LoadingPage = (props: Props) => {
  const {
    handleShowDetail,
    showDetail,

    hospitalState: { dataDoctor, dataFacility },
  } = useGlobalContext();
  useAssignColumn();
  const [showMidbar, setShowMidbar] = useState(
    showDetail.column_open === "all"
  );

  useEffect(() => {
    handleShowDetail(hospitalBtnDetail[0]);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setShowMidbar(showDetail.column_open === "all");
    // eslint-disable-next-line
  }, [showDetail]);

  return (
    <div className="ptn-container">
      <div className="ptn-content">
        {/* --------------------- COLUMN 1 SIDEBAR MENU -------------------- */}
        <HospitalSidebarComponentLoading />
        {/* ----------------------- COLUMN 2 MID MENU ---------------------- */}
        {showMidbar && <HospitalMidbarComponentLoading />}
        {/* ----------------- COLUMN 3 DETAILED DESCRIPTION ---------------- */}
        <HospitalDescriptionComponentLoading />
      </div>
    </div>
  );
};

export default LoadingPage;
