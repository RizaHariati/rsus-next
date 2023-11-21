import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import React from "react";
import DoctorMenuLoading from "./DoctorMenuLoading";

type Props = {};

const HospitalMidbarComponentLoading = (props: Props) => {
  const {
    showDetail,
    state: {
      columnAssignment: { column2, column3 },
    },
  } = useGlobalContext();

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
          {showDetail.column_open === "all"
            ? showDetail.name
            : "part of patient"}
        </button>
      </div>
      {column2 && (
        <div>{showDetail.key === "doctor" && <DoctorMenuLoading />}</div>
      )}
    </div>
  );
};

export default HospitalMidbarComponentLoading;
