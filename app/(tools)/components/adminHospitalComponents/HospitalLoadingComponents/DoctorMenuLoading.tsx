import React from "react";
import { loaderServer } from "./DoctorDescriptionLoading";

type Props = {};

const DoctorMenuLoading = (props: Props) => {
  return (
    <div className="flex-center-center h-[calc(100vh-168px)] w-full">
      <h3>Loading</h3>
      <div className="mx-auto w-20 h-20">{loaderServer}</div>
    </div>
  );
};

export default DoctorMenuLoading;
