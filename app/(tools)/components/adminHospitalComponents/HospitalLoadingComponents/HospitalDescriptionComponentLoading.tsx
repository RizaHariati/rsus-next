import React from "react";
import PatientEditDeleteLoading from "../../GeneralComponents/PatientEditDeleteLoading";
import { initialColumn } from "@/app/(tools)/context/initialState";
import LoadingSpinner from "../../GeneralComponents/LoadingSpinner";

type Props = {};

const HospitalDescriptionComponentLoading = (props: Props) => {
  const { column3 }: any = initialColumn;
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
        {column3 && <PatientEditDeleteLoading />}
      </div>
      {column3 && (
        <div className="h-[calc(100vh-112px)] w-full ">
          {<LoadingSpinner />}
        </div>
      )}
    </div>
  );
};

export default HospitalDescriptionComponentLoading;
