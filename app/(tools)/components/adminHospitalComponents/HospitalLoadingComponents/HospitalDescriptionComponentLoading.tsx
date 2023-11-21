import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import React from "react";
import PatientEditDelete from "../../adminpatientComponents/GeneralComponents/PatientEditDelete";
import DoctorDescriptionLoading from "./DoctorDescriptionLoading";

type Props = {};

const HospitalDescriptionComponentLoading = (props: Props) => {
  const {
    showDetail,
    state: {
      columnAssignment: { column3 },
    },
  } = useGlobalContext();

  return (
    <div className={!column3 ? "column-container-rotate" : "column-container"}>
      <div
        className={
          column3
            ? "column-navbar-container"
            : "column-navbar-container-rotate "
        }
      >
        <button
          className={
            !column3
              ? "column-navbar-main-btn-rotate"
              : "column-navbar-main-btn"
          }
        >
          detailed part
        </button>
        {column3 && <PatientEditDelete />}
      </div>
      {column3 && (
        <div className="h-[calc(100vh-112px)] w-full">
          {showDetail.key === "doctor" && <DoctorDescriptionLoading />}
        </div>
      )}
    </div>
  );
};

export default HospitalDescriptionComponentLoading;
