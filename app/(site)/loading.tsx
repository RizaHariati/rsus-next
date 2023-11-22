"use client";
import React, { useEffect, useState } from "react";

import { GridLoader } from "react-spinners";

type Props = {};

const LoadingHome = (props: Props) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => {
      setLoading(false);
    };
  }, []);

  return (
    <div className="page-main-container">
      <main className=" flex-center-center flex-col p-5 text-center gap-5">
        <h1 className=" font-oswald">Loading </h1>

        <GridLoader
          color="#007814"
          loading={loading}
          size={10}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </main>
    </div>
  );
};

export default LoadingHome;
