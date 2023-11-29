import React from "react";

import HospitalSidebarComponentLoading from "../../(tools)/components/adminHospitalComponents/HospitalLoadingComponents/HospitalSidebarComponentLoading";
import HospitalMidbarComponentLoading from "@/app/(tools)/components/adminHospitalComponents/HospitalLoadingComponents/HospitalMidbarComponentLoading";
import HospitalDescriptionComponentLoading from "@/app/(tools)/components/adminHospitalComponents/HospitalLoadingComponents/HospitalDescriptionComponentLoading";
import { ColumnAssignmentType } from "@/app/(tools)/types";
import { initialColumn } from "@/app/(tools)/context/initialState";

type Props = {};

const LoadingPage = (props: Props) => {
  const columnAssignment: ColumnAssignmentType = initialColumn;
  return (
    <div className="ptn-container">
      <div className="ptn-content">
        {/* --------------------- COLUMN 1 SIDEBAR MENU -------------------- */}
        {/* <HospitalSidebarComponentLoading
          column1={columnAssignment.column1}
          column3={columnAssignment.column3}
        /> */}
        {/* ----------------------- COLUMN 2 MID MENU ---------------------- */}
        {/* {
          <HospitalMidbarComponentLoading
            column2={columnAssignment.column2}
            column3={columnAssignment.column3}
          />
        } */}
        {/* ----------------- COLUMN 3 DETAILED DESCRIPTION ---------------- */}
        {/* <HospitalDescriptionComponentLoading
          column3={columnAssignment.column3}
        /> */}
      </div>
    </div>
  );
};

export default LoadingPage;
