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
      <main className=" flex-center-center flex-col p-5 text-center">
        <h1 className=" font-oswald">Loading </h1>
        <div className="grid grid-cols-2 gap-5 w-full max-w-2xl">
          <div className="flex-center-center h-[calc(100vh-168px)] w-full">
            <GridLoader
              color="#007814"
              loading={loading}
              size={10}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoadingHome;
