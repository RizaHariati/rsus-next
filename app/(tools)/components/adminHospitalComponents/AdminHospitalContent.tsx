"use client";
import HospitalDescriptionComponent from "@/app/(tools)/components/adminHospitalComponents/HospitalDescriptionComponent";
import HospitalMidbarComponent from "@/app/(tools)/components/adminHospitalComponents/HospitalMidbarComponent";
import HospitalSidebarComponent from "@/app/(tools)/components/adminHospitalComponents/HospitalSidebarComponent";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import useAssignColumn from "@/app/(tools)/utils/useAssignColumn";
import React, { useEffect, useState } from "react";

import { hospitalBtnDetail } from "../../column/sidebarColumnKeys";

type Props = {};

const AdminHospitalContent = (props: Props) => {
  const { handleShowDetail, showDetail } = useGlobalContext();

  const [showMidbar, setShowMidbar] = useState(
    showDetail.column_open === "all"
  );
  useAssignColumn();
  useEffect(() => {
    handleShowDetail(hospitalBtnDetail[0]);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setShowMidbar(showDetail.column_open === "all");
    // eslint-disable-next-line
  }, [showDetail]);

  return (
    <div className="ptn-content">
      {/* --------------------- COLUMN 1 SIDEBAR MENU -------------------- */}
      <HospitalSidebarComponent />
      {/* ----------------------- COLUMN 2 MID MENU ---------------------- */}
      {showMidbar && <HospitalMidbarComponent />}
      {/* ----------------- COLUMN 3 DETAILED DESCRIPTION ---------------- */}
      <HospitalDescriptionComponent />
    </div>
  );
};

export default AdminHospitalContent;
