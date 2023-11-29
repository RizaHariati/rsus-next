import React from "react";
import DoctorMenuLoading from "./DoctorMenuLoading";

type Props = { column2: boolean; column3: boolean };

const HospitalMidbarComponentLoading = ({ column2, column3 }: Props) => {
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
          className={
            !column2
              ? "column-navbar-main-btn-rotate"
              : "column-navbar-main-btn"
          }
        >
          part of patient
        </button>
      </div>
      {column2 && <div>{<DoctorMenuLoading />}</div>}
    </div>
  );
};

export default HospitalMidbarComponentLoading;
