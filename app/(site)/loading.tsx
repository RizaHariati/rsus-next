import React from "react";

import { GridLoader } from "react-spinners";
import { loaderServer } from "../(tools)/components/adminHospitalComponents/HospitalLoadingComponents/DoctorDescriptionLoading";

type Props = {};

const LoadingHome = (props: Props) => {
  return (
    <div className="page-main-container">
      <div className=" flex-center-center flex-col p-5 text-center gap-5 h-[calc(100vh-112px)] w-full">
        <h1 className=" font-oswald">Loading </h1>
        <div className="mx-auto w-20 h-20 animate-spin"> {loaderServer}</div>
      </div>
    </div>
  );
};

export default LoadingHome;
