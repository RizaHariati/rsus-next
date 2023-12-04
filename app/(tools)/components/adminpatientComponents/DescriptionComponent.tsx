import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useGlobalContext } from "../../context/AppProvider";
import { closeDescription, openDescription } from "../../column/columnCodes";
import PatientEditDelete from "../GeneralComponents/PatientEditDelete";
import PatientDescription from "./DescriptionComponents/PatientDescription";
import ScheduleDescription from "./DescriptionComponents/ScheduleDescription";
import MedicalRecordDescription from "./DescriptionComponents/MedicalRecordDescription";
import LoadingSpinner from "../GeneralComponents/LoadingSpinner";

type Props = {};

const DescriptionComponent = (props: Props) => {
  const {
    assignColumn,
    showDetail,
    patientState: { selectedScheduleAppointment },
    state: {
      currentWindow,
      columnAssignment: { column3 },
    },
  } = useGlobalContext();

  const [columnTitle, setColumnTitle] = useState<string>("detailed part");
  const handleDescriptionButton = () => {
    assignColumn(
      !column3
        ? openDescription(currentWindow)
        : closeDescription(currentWindow)
    );
  };
  useEffect(() => {
    if (showDetail.key === "scheduled_appointments") {
      setColumnTitle(
        selectedScheduleAppointment?.appointment_type.replace("_", " ") ||
          "detailed part"
      );
    }
    // eslint-disable-next-line
  }, [selectedScheduleAppointment]);

  return (
    <div className={!column3 ? "column-container-rotate" : "column-container "}>
      <div
        className={
          column3
            ? "column-navbar-container "
            : "column-navbar-container-rotate "
        }
      >
        <button
          type="button"
          id="patientDescriptionTitleBtn"
          onClick={() => handleDescriptionButton()}
          className={
            !column3
              ? "column-navbar-main-btn-rotate"
              : "column-navbar-main-btn "
          }
        >
          {showDetail.column_open === "all" ? columnTitle : showDetail.name}
        </button>
        {column3 && <PatientEditDelete />}
      </div>
      {column3 && (
        <div className="h-[calc(100vh-112px)] w-full">
          <Suspense fallback={<LoadingSpinner />}>
            {showDetail.key === "patient_profile" && <PatientDescription />}
            {showDetail.key === "scheduled_appointments" && (
              <ScheduleDescription />
            )}
            {showDetail.key === "medical_records" && (
              <MedicalRecordDescription />
            )}
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default DescriptionComponent;
