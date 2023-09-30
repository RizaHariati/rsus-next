import React from "react";

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className="page-main-container pt-14 custom-scrollbar scrollbar-none pb-[150px] animate-pulse">
      <h2>Loading...</h2>
    </div>
  );
};

export default Loading;
