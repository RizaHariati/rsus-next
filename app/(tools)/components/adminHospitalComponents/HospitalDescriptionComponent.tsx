import React, { Suspense, useCallback, useEffect, useState } from "react";
import { useGlobalContext } from "../../context/AppProvider";
import { closeDescription, openDescription } from "../../column/columnCodes";
import PatientEditDelete from "../GeneralComponents/PatientEditDelete";
import DoctorDescription from "./HospitalDescriptionComponents/DoctorDescription";
import FacilityDescription from "./HospitalDescriptionComponents/FacilityDescription";
import LabSatuanDescription from "./HospitalDescriptionComponents/LabSatuanDescription";
import LabPaketDescription from "./HospitalDescriptionComponents/LabPaketDescription";
import InpatientDescription from "./HospitalDescriptionComponents/InpatientDescription";

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
      selectedInpatient,
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
  const handleSelected = useCallback(() => {
    switch (showDetail.key) {
      case "doctor":
        setColumnTitle(
          `Dr.${selectedDoctor?.name || "loading..."}` || "detailed part"
        );
        break;

      case "facility":
        setColumnTitle(selectedFacility?.title || "loading...");
        break;

      case "lab_satuan":
        setColumnTitle(selectedLabSatuan?.title || "loading...");
        break;

      case "lab_paket":
        setColumnTitle(selectedPaket?.title || "loading...");
        break;

      case "inpatient":
        setColumnTitle(selectedInpatient?.kelas || "loading...");
    }
  }, [
    selectedDoctor,
    selectedFacility,
    selectedLabSatuan,
    selectedPaket,
    showDetail,
    selectedInpatient,
  ]);

  useEffect(() => {
    handleSelected();
    // eslint-disable-next-line
  }, [handleSelected]);

  return (
    <div
      className={!column3 ? "column-container-rotate" : "column-container  "}
    >
      <div
        className={
          column3
            ? "column-navbar-container"
            : "column-navbar-container-rotate "
        }
      >
        <button
          id="descriptionTitleBtn"
          onClick={() => handleDescriptionButton()}
          className={
            !column3
              ? "column-navbar-main-btn-rotate  "
              : columnTitle.length > 25
              ? "column-navbar-main-btn text-xs "
              : "column-navbar-main-btn text-base "
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
          {showDetail.key === "inpatient" && <InpatientDescription />}
        </div>
      )}
    </div>
  );
};

export default HospitalDescriptionComponent;
