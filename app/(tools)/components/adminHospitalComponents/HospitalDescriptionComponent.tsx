import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/AppProvider";
import { closeDescription, openDescription } from "../../column/columnCodes";
import PatientEditDelete from "../adminpatientComponents/GeneralComponents/PatientEditDelete";
import DoctorDescription from "./HospitalDescriptionComponents/DoctorDescription";

type Props = {};

const HospitalDescriptionComponent = (props: Props) => {
  const {
    assignColumn,
    showDetail,
    hospitalState: { selectedDoctor },
    state: {
      currentWindow,
      columnAssignment: { column3 },
    },
  } = useGlobalContext();
  const [columnTitle, setColumnTitle] = useState<string>("detailed part");

  const handleDescriptionButton = () => {
    assignColumn(
      !column3
        ? openDescription(currentWindow)
        : closeDescription(currentWindow)
    );
  };
  useEffect(() => {
    if (showDetail.key === "doctor") {
      setColumnTitle(`Dr.${selectedDoctor?.name}` || "detailed part");
    }
  }, [selectedDoctor]);
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
          onClick={() => handleDescriptionButton()}
          className={
            !column3
              ? "column-navbar-main-btn-rotate"
              : "column-navbar-main-btn"
          }
        >
          {showDetail.column_open === "all" ? columnTitle : showDetail.name}
        </button>
        {column3 && <PatientEditDelete />}
      </div>
      {column3 && (
        <div className="h-[calc(100vh-112px)] w-full">
          {showDetail.key === "doctor" && <DoctorDescription />}
          {/* {showDetail.key === "scheduled_appointments" && (
            <ScheduleDescription />
          )}
          {showDetail.key === "medical_records" && <MedicalRecordDescription />} */}
        </div>
      )}
    </div>
  );
};

export default HospitalDescriptionComponent;
