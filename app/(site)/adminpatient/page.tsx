"use client";

import React, { useEffect, useState } from "react";
import useAssignColumn from "@/app/(tools)/utils/useAssignColumn";
import { useRouter } from "next/navigation";
import SidebarComponent from "@/app/(tools)/components/adminpatientComponents/SidebarComponent";
import MidbarComponent from "@/app/(tools)/components/adminpatientComponents/MidbarComponent";
import DescriptionComponent from "@/app/(tools)/components/adminpatientComponents/DescriptionComponent";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";

type Props = {};

const PatientPage = (props: Props) => {
  const { showDetail } = useGlobalContext();
  const [showMidbar, setShowMidbar] = useState(
    showDetail.column_open === "all"
  );
  const Router = useRouter();

  useAssignColumn();

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

export default PatientPage;
