import React from "react";

import { GridLoader } from "react-spinners";

type Props = {};

const LoadingHome = (props: Props) => {
  return (
    <div className="page-main-container">
      <div className=" flex-center-center flex-col p-5 text-center gap-5">
        <h1 className=" font-oswald">Loading </h1>

        <GridLoader
          color="#007814"
          loading={true}
          size={10}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
};

export default LoadingHome;
