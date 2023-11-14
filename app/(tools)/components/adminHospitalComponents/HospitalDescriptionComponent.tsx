import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/AppProvider";
import { closeDescription, openDescription } from "../../column/columnCodes";
import PatientEditDelete from "../adminpatientComponents/GeneralComponents/PatientEditDelete";
import DoctorDescription from "./HospitalDescriptionComponents/DoctorDescription";
import FacilityDescription from "./HospitalDescriptionComponents/FacilityDescription";
import LabSatuanDescription from "./HospitalDescriptionComponents/LabSatuanDescription";
import LabPaketDescription from "./HospitalDescriptionComponents/LabPaketDescription";

type Props = {};

const HospitalDescriptionComponent = (props: Props) => {
  const {
    assignColumn,
    showDetail,
    hospitalState: {
      selectedDoctor,
      selectedFacility,
      selectedLabSatuan,
      selectedPaket,
    },
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
    if (showDetail.key === "facility") {
      setColumnTitle(selectedFacility?.title || "detailed part");
    }
    if (showDetail.key === "lab_satuan") {
      setColumnTitle(selectedLabSatuan?.title || "detailed part");
    }
    if (showDetail.key === "lab_paket") {
      setColumnTitle(selectedPaket?.title || "detailed part");
    }
    // eslint-disable-next-line
  }, [
    selectedDoctor,
    selectedFacility,
    selectedLabSatuan,
    selectedPaket,
    showDetail,
  ]);
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
          {showDetail.key === "facility" && <FacilityDescription />}
          {showDetail.key === "lab_satuan" && <LabSatuanDescription />}
          {showDetail.key === "lab_paket" && <LabPaketDescription />}
        </div>
      )}
    </div>
  );
};

export default HospitalDescriptionComponent;
