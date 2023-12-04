import React, { useState } from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { scheduleFormInput } from "@/app/(tools)/utils/forms/scheduleFormInput";
import ScheduleDestination from "./ScheduleDestination";

type Props = {};
const ScheduleDetailContent = ({}: Props) => {
  const {
    state: { editable },
    patientState: { selectedScheduleAppointment, selectedScheduleDestination },
  } = useGlobalContext();
  const [showDestination, setShowDestination] = useState<any>(null);

  if (!selectedScheduleAppointment || !selectedScheduleDestination) {
    return <div></div>;
  }
  return (
    <div className="column-detail-content ">
      {Object.entries(scheduleFormInput).map(
        ([scheduleKey, scheduleValue], scheduleIndex) => {
          //@ts-ignore
          let value = selectedScheduleAppointment[scheduleKey];
          if (!value) return <div key={scheduleIndex}></div>;
          else {
            if (scheduleKey.includes("scheduled_date")) {
              value = moment(value).format("DD MMMM YYYY");
              return (
                <div key={scheduleIndex}>
                  <small>{scheduleValue.title}</small>
                  <input
                    value={value}
                    disabled={!editable}
                    className={
                      editable ? "admin-input " : "admin-input-disabled"
                    }
                  />
                </div>
              );
            } else if (scheduleKey === "tujuan") {
              value = selectedScheduleDestination?.value
                ?.map((item: any) => {
                  return item.name || item.title || "";
                })
                .join(", ");
              return (
                <div key={scheduleIndex} className="relative">
                  <small>{scheduleValue.title}</small>
                  <button
                    onClick={() => {
                      setShowDestination(
                        showDestination
                          ? null
                          : selectedScheduleDestination?.value[0].id || null
                      );
                    }}
                    type="button"
                    className="admin-input-disabled h-fit flex-center-between "
                  >
                    <p className="text-left text-greyMed2"> {value}</p>
                    <FontAwesomeIcon
                      icon={showDestination ? faChevronUp : faChevronCircleDown}
                    />
                  </button>
                  {showDestination && (
                    <ScheduleDestination
                      showDestination={showDestination}
                      setShowDestination={setShowDestination}
                    />
                  )}
                </div>
              );
            } else {
              return (
                <div key={scheduleIndex}>
                  <small>{scheduleValue.title}</small>
                  <input
                    value={
                      scheduleKey.includes("date")
                        ? moment(value).format("DD MMMM YYYY")
                        : value
                    }
                    disabled={true}
                    className="admin-input-disabled "
                  />
                </div>
              );
            }
          }
        }
      )}
    </div>
  );
};
export default ScheduleDetailContent;
