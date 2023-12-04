import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import React from "react";
import ScheduleDetailContent from "./ScheduleDetailContent";
import SubmitButton from "../../GeneralComponents/SubmitButton";

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
        <SubmitButton />
      </div>
    );
  }
};

export default ScheduleDescription;
