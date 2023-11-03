"use client";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React, { useEffect, useState } from "react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { AppointmentListType, ScheduledType } from "@/app/(tools)/patientTypes";

import moment from "moment";
import ScheduleDetail from "./ScheduleDetail";

type Props = {};

const PatientSchedule = (props: Props) => {
  const {
    patientState: { patient, appointmentList },
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
      <div className=" h-full w-3/4  flex">
        <div className="h-full max-h-[calc(100vh-56px)] col-span-2 w-1/3 border-r border-r-greyBorder p-2 overflow-y-scroll scrollbar-none flex flex-col gap-2">
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
                    className={
                      scheduleDetail?.id === schedule_appointment.schedule_id
                        ? "sidebar-btn-focus group"
                        : "sidebar-btn group"
                    }
                    onClick={() => setScheduleDetail(dataSchedule)}
                  >
                    <div>
                      {value.map((tujuan, tujuanIndex) => {
                        // const
                        return (
                          <p
                            key={tujuanIndex}
                            className={
                              scheduleDetail?.id ===
                              schedule_appointment.schedule_id
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
                          scheduleDetail?.id ===
                          schedule_appointment.schedule_id
                            ? "sidebar-btn-text h-4 text-white"
                            : "sidebar-btn-text h-4"
                        }
                      >
                        {moment(schedule_appointment.scheduled_date).format(
                          "DD MMMM YYYY"
                        )}
                      </small>
                    </div>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className={
                        scheduleDetail?.id === schedule_appointment.schedule_id
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
        <ScheduleDetail scheduled_appointments={scheduleDetail} />
      </div>
    );
  }
};

export default PatientSchedule;
