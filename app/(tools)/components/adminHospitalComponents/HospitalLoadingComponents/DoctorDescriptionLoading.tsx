import React, { useEffect, useState } from "react";
import { GridLoader } from "react-spinners";

type Props = {};

const DoctorDescriptionLoading = (props: Props) => {
  return (
    <>
      <form className="column-description-container h-full flex-center-center">
        <GridLoader
          color="#007814"
          loading={true}
          size={10}
          aria-label="Loading Spinner"
          data-testid="loader"
          className=""
        />
      </form>
    </>
  );
};

export default DoctorDescriptionLoading;
