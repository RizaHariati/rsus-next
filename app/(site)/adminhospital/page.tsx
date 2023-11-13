"use client";
import HospitalDescriptionComponent from "@/app/(tools)/components/adminHospitalComponents/HospitalDescriptionComponent";
import HospitalMidbarComponent from "@/app/(tools)/components/adminHospitalComponents/HospitalMidbarComponent";
import HospitalSidebarComponent from "@/app/(tools)/components/adminHospitalComponents/HospitalSidebarComponent";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import useAssignColumn from "@/app/(tools)/utils/useAssignColumn";
import React, { useEffect, useState } from "react";

type Props = {};

const AdminHospitalPage = (props: Props) => {
  const {
    loadingPatientScheduleDestination,
    showDetail,
    hospitalState: { dataDoctor, dataFacility },
  } = useGlobalContext();
  useAssignColumn();
  const [showMidbar, setShowMidbar] = useState(
    showDetail.column_open === "all"
  );
  useEffect(() => {
    setShowMidbar(showDetail.column_open === "all");
  }, [showDetail]);

  if (dataDoctor.length < 1 || dataFacility.length < 1) {
    return <div>Loading..</div>;
  } else {
    return (
      <div className="ptn-container">
        <div className="ptn-content">
          {/* --------------------- COLUMN 1 SIDEBAR MENU -------------------- */}
          <HospitalSidebarComponent />
          {/* ----------------------- COLUMN 2 MID MENU ---------------------- */}
          {showMidbar && <HospitalMidbarComponent />}
          {/* ----------------- COLUMN 3 DETAILED DESCRIPTION ---------------- */}
          <HospitalDescriptionComponent />
        </div>
      </div>
    );
  }
};

export default AdminHospitalPage;
