"use client";

import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import {
  ScheduleDestinationsListType,
  ScheduledType,
} from "@/app/(tools)/patientTypes";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React, { useEffect, useState } from "react";
import DoctorDescriptionLoading from "../../adminHospitalComponents/HospitalLoadingComponents/DoctorDescriptionLoading";
import { closeMidbar, openDescription } from "@/app/(tools)/column/columnCodes";

type Props = {};

const PatientScheduleMenu = (props: Props) => {
  const {
    selectPatientDestination,
    settingEditable,
    assignColumn,
    state: { currentWindow },
    patientState: {
      scheduleDestinationList,
      scheduleAppointments,
      selectedScheduleAppointment,
    },
  } = useGlobalContext();

  if (!scheduleAppointments)
    return (
      <div className="h-[calc(100vh-112px)] w-full">
        <DoctorDescriptionLoading />
      </div>
    );
  if (!scheduleDestinationList || scheduleDestinationList.length < 1)
    return (
      <div className="h-[calc(100vh-112px)] w-full">
        <DoctorDescriptionLoading />
      </div>
    );
  return (
    <div className="midbar-container">
      {scheduleAppointments.map(
        (scheduleAppointment: ScheduledType, index: number) => {
          const dataSchedule: ScheduleDestinationsListType | undefined =
            scheduleDestinationList!.find((item) => {
              return item.id === scheduleAppointment.schedule_id;
            });

          if (!dataSchedule) return <div key={index}></div>;
          else {
            return (
              <button
                key={index}
                className={
                  selectedScheduleAppointment?.schedule_id ===
                  scheduleAppointment.schedule_id
                    ? "sidebar-btn-focus group"
                    : "sidebar-btn group"
                }
                onClick={() => {
                  if (!dataSchedule) return;
                  settingEditable(false);
                  if (dataSchedule) {
                    selectPatientDestination(scheduleAppointment, dataSchedule);
                  }
                  assignColumn(openDescription(currentWindow));
                }}
              >
                <div>
                  {dataSchedule.value.map((tujuan, tujuanIndex) => {
                    // const
                    return (
                      <p
                        key={tujuanIndex}
                        className={
                          selectedScheduleAppointment?.schedule_id ===
                          scheduleAppointment.schedule_id
                            ? "sidebar-btn-text h-5 text-white "
                            : "sidebar-btn-text h-5 "
                        }
                      >
                        {tujuan.title || tujuan.name}
                      </p>
                    );
                  })}
                  <small
                    className={
                      selectedScheduleAppointment?.schedule_id ===
                      scheduleAppointment.schedule_id
                        ? "sidebar-btn-text h-4 text-white"
                        : "sidebar-btn-text h-4"
                    }
                  >
                    {moment(scheduleAppointment.scheduled_date).format(
                      "DD MMMM YYYY"
                    )}
                  </small>
                </div>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className={
                    selectedScheduleAppointment?.schedule_id ===
                    scheduleAppointment.schedule_id
                      ? "sidebar-btn-icon text-white"
                      : "sidebar-btn-icon"
                  }
                />
              </button>
            );
          }
        }
      )}
    </div>
  );
};

export default PatientScheduleMenu;
