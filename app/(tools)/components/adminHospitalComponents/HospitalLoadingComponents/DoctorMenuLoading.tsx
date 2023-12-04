import React from "react";
import LoadingSpinner from "../../GeneralComponents/LoadingSpinner";

type Props = {};

const DoctorMenuLoading = (props: Props) => {
  return (
    <div className="flex-center-center h-[calc(100vh-168px)] w-full gap-2">
      <h3>Loading</h3>
      <LoadingSpinner />
    </div>
  );
};

export default DoctorMenuLoading;
