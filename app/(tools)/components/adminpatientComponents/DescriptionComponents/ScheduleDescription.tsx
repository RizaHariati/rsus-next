import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import React from "react";
import ScheduleDetailContent from "./ScheduleDetailContent";

type Props = {};

const ScheduleDescription = (props: Props) => {
  const {
    state: { editable },
    patientState: { selectedScheduleAppointment },
  } = useGlobalContext();

  if (!selectedScheduleAppointment) return <div></div>;
  else {
    return (
      <div className="column-description-container">
        <div className="column-description-content ">
          <ScheduleDetailContent />
        </div>
        <div className="content-menu border-t">
          <button
            type="submit"
            className={editable ? "btn-base-focus" : "btn-base-small"}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
};

export default ScheduleDescription;
