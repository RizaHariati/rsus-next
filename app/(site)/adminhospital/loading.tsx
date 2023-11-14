"use client";

import React, { useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";

type Props = {};

const LoadingPage = (props: Props) => {
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  return (
    <div className="page-main-container">
      <div className="flex-center-center">
        <h2>Loading ...</h2>
        <PropagateLoader
          color="#007814"
          loading={Loading}
          size={12}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
};

export default LoadingPage;
