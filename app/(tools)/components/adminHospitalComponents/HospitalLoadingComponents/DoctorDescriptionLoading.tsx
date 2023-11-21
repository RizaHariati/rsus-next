import React, { useEffect, useState } from "react";
import { GridLoader, PropagateLoader } from "react-spinners";

type Props = {};

const DoctorDescriptionLoading = (props: Props) => {
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
    <div className="flex-center-center h-[calc(100vh-168px)] w-full">
      <GridLoader
        color="#007814"
        loading={loading}
        size={10}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default DoctorDescriptionLoading;
