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

import { closeMidbar, openDescription } from "@/app/(tools)/column/columnCodes";
import LoadingSpinner from "../../GeneralComponents/LoadingSpinner";
import dataLabSatuan from "@/app/(tools)/data/data_lab_satuan.json";
import { getTujuan } from "../../../utils/patientUtils/getTujuan";

type Props = {};

const PatientScheduleMenu = (props: Props) => {
  const {
    selectPatientDestination,
    settingEditable,
    assignColumn,
    state: { editable, currentWindow },
    patientState: { scheduleAppointments, selectedScheduleAppointment },
    hospitalState: {
      dataComplete: { dataFacility, dataPaket, dataLabSatuan, dataDoctor },
    },
  } = useGlobalContext();

  const [scheduleValues, setScheduleValues] = useState(
    selectedScheduleAppointment
  );
  useEffect(() => {
    if (!selectedScheduleAppointment) return;
    setScheduleValues(selectedScheduleAppointment);
  }, [selectedScheduleAppointment, editable]);

  if (!scheduleAppointments)
    return (
      <div className="h-[calc(100vh-112px)] w-full">
        <LoadingSpinner />
      </div>
    );
  const handleScheduleMenu = (scheduleAppointment: ScheduledType) => {
    setScheduleValues(scheduleAppointment);
    if (!scheduleAppointment) return;
    settingEditable(false);
    if (scheduleAppointment) {
      selectPatientDestination(scheduleAppointment);
    }
    assignColumn(openDescription(currentWindow));
  };
  if (scheduleAppointments.length < 1) {
    return <div></div>;
  }
  return (
    <div className="midbar-container">
      {scheduleAppointments.map(
        (scheduleAppointment: ScheduledType, index: number) => {
          const dataSchedule: any[] = [];

          const listDestination = scheduleAppointment.tujuan.map((item) => {
            const destination = getTujuan(
              item,
              dataFacility,
              dataPaket,
              dataLabSatuan,
              dataDoctor
            );
            return destination;
          });

          if (!dataSchedule) return <div key={index}></div>;
          else {
            return (
              <button
                key={index}
                className={
                  scheduleValues?.schedule_id ===
                  scheduleAppointment.schedule_id
                    ? "sidebar-btn-focus group"
                    : "sidebar-btn group"
                }
                onClick={() => {
                  handleScheduleMenu(scheduleAppointment);
                }}
              >
                <div>
                  <p
                    className={
                      scheduleValues?.schedule_id ===
                      scheduleAppointment.schedule_id
                        ? "sidebar-btn-text h-fit text-white "
                        : "sidebar-btn-text h-fit "
                    }
                  >
                    {listDestination
                      .map((item: any) => {
                        return item.title || item.name;
                      })
                      .join(", ")}
                  </p>
                  <small
                    className={
                      scheduleValues?.schedule_id ===
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
                    scheduleValues?.schedule_id ===
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
