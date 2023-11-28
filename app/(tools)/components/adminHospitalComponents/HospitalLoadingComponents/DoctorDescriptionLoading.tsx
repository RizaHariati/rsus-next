import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import React, { useEffect, useState } from "react";
import { GridLoader, PropagateLoader } from "react-spinners";

type Props = {};

const DoctorDescriptionLoading = (props: Props) => {
  const {
    settingEditable,
    state: { columnAssignment, editable },
    hospitalState: { selectedDoctor, dataDoctor },
  } = useGlobalContext();
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
    <>
      <form className="column-description-container ">
        <GridLoader
          color="#007814"
          loading={loading}
          size={10}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </form>
    </>
  );
};

export default DoctorDescriptionLoading;
