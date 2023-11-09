import React from "react";
import { useGlobalContext } from "../../context/AppProvider";
import { closeDescription, openDescription } from "../../column/columnCodes";
import PatientEditDelete from "./GeneralComponents/PatientEditDelete";
import PatientProfile from "../PatientPageComponents/PatientProfile";

type Props = {};

const DescriptionComponent = (props: Props) => {
  const {
    assignColumn,
    showDetail,
    state: {
      currentWindow,
      columnAssignment: { column3 },
    },
  } = useGlobalContext();
  const handleDescriptionButton = () => {
    assignColumn(
      !column3
        ? openDescription(currentWindow)
        : closeDescription(currentWindow)
    );
  };

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
          {showDetail.column_open === "all"
            ? " detailed part"
            : showDetail.name}
        </button>
        {column3 && <PatientEditDelete />}
      </div>
      {column3 && (
        <div className="h-[calc(100vh-112px)] w-full">
          {showDetail.key === "patient_profile" && <PatientProfile />}
        </div>
      )}
    </div>
  );
};

export default DescriptionComponent;
