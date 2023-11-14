import React from "react";
import { useGlobalContext } from "../../context/AppProvider";
import { closeMidbar, openMidbar } from "../../column/columnCodes";
import DoctorMenu from "./HospitalMidbarComponents/DoctorMenu";
import FacilityMenu from "./HospitalMidbarComponents/FacitlityMenu";
type Props = {};

const HospitalMidbarComponent = (props: Props) => {
  const {
    assignColumn,
    showDetail,
    state: {
      currentWindow,
      columnAssignment: { column2, column3 },
    },
  } = useGlobalContext();
  const handleMidbarButton = () => {
    assignColumn(
      !column2 ? openMidbar(currentWindow) : closeMidbar(currentWindow)
    );
  };
  return (
    <div
      className={
        !column2
          ? "column-container-rotate    "
          : !column3
          ? "column-container "
          : "column-container-triple "
      }
    >
      <div
        className={
          column2
            ? "column-navbar-container"
            : "column-navbar-container-rotate "
        }
      >
        <button
          onClick={() => handleMidbarButton()}
          className={
            !column2
              ? "column-navbar-main-btn-rotate"
              : "column-navbar-main-btn"
          }
        >
          {showDetail.column_open === "all"
            ? showDetail.name
            : "part of patient"}
        </button>
      </div>
      {column2 && (
        <div>
          {showDetail.key === "doctor" && <DoctorMenu />}
          {showDetail.key === "facility" && <FacilityMenu />}
        </div>
      )}
    </div>
  );
};

export default HospitalMidbarComponent;
