import React from "react";
import { GridLoader } from "react-spinners";

type Props = {};

const DoctorMenuLoading = (props: Props) => {
  return (
    <div className="flex-center-center h-[calc(100vh-168px)] w-full">
      <GridLoader
        color="#007814"
        loading={true}
        size={10}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default DoctorMenuLoading;
