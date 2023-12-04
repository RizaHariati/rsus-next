import React from "react";

import LoadingSpinner from "../(tools)/components/GeneralComponents/LoadingSpinner";

type Props = {};

const LoadingHome = (props: Props) => {
  return (
    <div className="page-main-container">
      <div className=" flex-center-center flex-col p-5 text-center gap-5 h-[calc(100vh-112px)] w-full">
        <LoadingSpinner />
      </div>
    </div>
  );
};

export default LoadingHome;
