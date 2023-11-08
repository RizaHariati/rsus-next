import React, { useState } from "react";
import {
  AppointmentListType,
  PatientInitialValueType,
} from "../../patientTypes";
import { scheduleFormInput } from "../../utils/forms/scheduleFormInput";
import moment from "moment";
import { useGlobalContext } from "../../context/AppProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleDown,
  faChevronCircleUp,
  faChevronRight,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import ScheduleTujuan from "./ScheduleTujuan";

type Props = {
  scheduled_appointments: AppointmentListType | null;
  editable: boolean;
  patientSchedule: PatientInitialValueType;
};
const ScheduleDetailContent = ({
  scheduled_appointments,
  editable,
  patientSchedule,
}: Props) => {
  const {
    state: { columnAssignment },
    handleShowTujuan,
    showTujuan,
  } = useGlobalContext();

  return (
    <div
      className={
        columnAssignment.column3
          ? "column-detail-content "
          : "column-detail-content-rotate  "
      }
    >
      {columnAssignment.column3 &&
        Object.entries(scheduleFormInput).map(
          ([scheduleKey, scheduleValue], scheduleIndex) => {
            let value = patientSchedule[scheduleKey]?.value;
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
                value = scheduled_appointments?.value
                  ?.map((item: any) => {
                    return item.name || item.title || "";
                  })
                  .join(", ");
                return (
                  <div key={scheduleIndex} className="relative">
                    <small>{scheduleValue.title}</small>
                    <button
                      onClick={() => {
                        handleShowTujuan(
                          showTujuan
                            ? null
                            : scheduled_appointments?.value[0].id || null
                        );
                      }}
                      type="button"
                      className="admin-input-disabled h-fit flex-center-between "
                    >
                      <p className="text-left text-greyMed2"> {value}</p>
                      <FontAwesomeIcon
                        icon={showTujuan ? faChevronUp : faChevronCircleDown}
                      />
                    </button>
                    {showTujuan && (
                      <ScheduleTujuan
                        scheduled_appointments={scheduled_appointments}
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
