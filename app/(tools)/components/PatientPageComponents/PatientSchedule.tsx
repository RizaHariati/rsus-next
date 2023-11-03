"use client";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React, { useEffect, useState } from "react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { AppointmentListType, ScheduledType } from "@/app/(tools)/patientTypes";

import moment from "moment";
import ScheduleDetail from "./ScheduleDetail";
import { getTujuan } from "../../utils/patientUtils/getTujuan";

type Props = {};

const PatientSchedule = (props: Props) => {
  const {
    patientState: { patient, appointmentList },
    state: { dataDoctor, dataFacility },
  } = useGlobalContext();
  const scheduled_appointments: ScheduledType[] =
    patient.scheduled_appointments;

  const [scheduleDetail, setScheduleDetail] =
    useState<AppointmentListType | null>(null);

  useEffect(() => {
    if (!appointmentList || appointmentList.length < 1) return;
    else {
      setScheduleDetail(appointmentList[0]);
    }
  }, []);

  if (!appointmentList || appointmentList.length < 1) return <div></div>;
  else {
    return (
      <div className="col-span-6 grid grid-cols-6  h-full w-full ">
        <div className="h-full max-h-[calc(100vh-56px)] col-span-2 w-full border-r border-r-greyBorder p-2 overflow-y-scroll scrollbar-none flex flex-col gap-2">
          {scheduled_appointments.map(
            (schedule_appointment: ScheduledType, index: number) => {
              const dataSchedule = appointmentList?.find((item) => {
                return item.id === schedule_appointment.schedule_id;
              });
              const value = dataSchedule?.value;

              if (!value) return <div key={index}></div>;
              else {
                return (
                  <button
                    key={index}
                    // className="h-fit min-h-14 w-full"
                    className="sidebar-btn group"
                    onClick={() => setScheduleDetail(dataSchedule)}
                  >
                    <div>
                      {value.map((tujuan, tujuanIndex) => {
                        // const
                        return (
                          <p
                            key={tujuanIndex}
                            className="text-left group-focus:text-white"
                          >
                            {tujuan.title || tujuan.name}
                          </p>
                        );
                      })}
                      <small className="text-left group-focus:text-white flex-center-start">
                        {moment(schedule_appointment.scheduled_date).format(
                          "DD MMMM YYYY"
                        )}
                      </small>
                    </div>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="text-greyMed1 group-focus:text-white"
                    />
                  </button>
                );
              }
            }
          )}
        </div>
        <ScheduleDetail scheduled_appointments={scheduleDetail} />
      </div>
    );
  }
};

export default PatientSchedule;
