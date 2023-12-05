"use client";

import React, { useEffect, useState } from "react";
import useAssignColumn from "@/app/(tools)/utils/useAssignColumn";
import { useRouter } from "next/navigation";
import SidebarComponent from "@/app/(tools)/components/adminpatientComponents/SidebarComponent";
import MidbarComponent from "@/app/(tools)/components/adminpatientComponents/MidbarComponent";
import DescriptionComponent from "@/app/(tools)/components/adminpatientComponents/DescriptionComponent";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { ScheduledType } from "@/app/(tools)/patientTypes";
import { getTujuan } from "@/app/(tools)/utils/patientUtils/getTujuan";
import { patientBtnDetail } from "../../(tools)/column/sidebarColumnKeys";
import { isMobile } from "react-device-detect";

type Props = {};

const AdminPatientPage = (props: Props) => {
  const {
    handleShowDetail,
    showDetail,
    patientState: { patient },
  } = useGlobalContext();
  const [showMidbar, setShowMidbar] = useState(
    showDetail.column_open === "all"
  );
  const Router = useRouter();

  useAssignColumn();

  useEffect(() => {
    handleShowDetail(patientBtnDetail[0]);
    if (!patient || !patient.medical_record_number) {
      return Router.push("/");
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setShowMidbar(showDetail.column_open === "all");
  }, [showDetail]);

  return (
    <div className="ptn-container">
      <div className="ptn-content">
        {/* --------------------- COLUMN 1 SIDEBAR MENU -------------------- */}
        <SidebarComponent />
        {/* ----------------------- COLUMN 2 MID MENU ---------------------- */}
        {showMidbar && <MidbarComponent />}
        {/* ----------------- COLUMN 3 DETAILED DESCRIPTION ---------------- */}
        <DescriptionComponent />
      </div>
    </div>
  );
};

export default AdminPatientPage;
