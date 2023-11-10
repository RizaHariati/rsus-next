"use client";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React, { useEffect, useState } from "react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import {
  ScheduleDestinationsListType,
  ScheduledType,
} from "@/app/(tools)/patientTypes";

import moment from "moment";
import ScheduleDetail from "./ScheduleDetail";

type Props = {};

const PatientSchedule = (props: Props) => {
  const {
    assignColumn,

    state: { columnAssignment },
    patientState: { scheduleDestinationList },
  } = useGlobalContext();

  const [scheduleDetail, setScheduleDetail] =
    useState<ScheduleDestinationsListType | null>(null);
  useEffect(() => {
    if (!scheduleDestinationList || scheduleDestinationList.length < 1) return;
    else {
      setScheduleDetail(scheduleDestinationList[0]);
    }
  }, []);

  if (!scheduleDestinationList || scheduleDestinationList.length < 1)
    return <div></div>;
  else {
    return (
      <>
        <div
          className={columnAssignment.column2 ? "cl-lv-3 " : "cl-lv-3-rotate "}
        >
          <div
            role="button"
            className={
              columnAssignment.column2 ? "column-title" : "column-title-rotate "
            }
            onClick={() => {
              const newColumn = {
                ...columnAssignment,

                column2: !columnAssignment.column2,
                column3: true,
              };
              assignColumn(newColumn);
            }}
          >
            <p
              className={
                columnAssignment.column2
                  ? " sidebar-title "
                  : " sidebar-title-rotate"
              }
            >
              Jadwal
            </p>
          </div>
          {columnAssignment.column2 && (
            <ScheduleSubTitle
              scheduleDetail={scheduleDetail}
              setScheduleDetail={setScheduleDetail}
            />
          )}
        </div>
        <ScheduleDetail />
      </>
    );
  }
};

export default PatientSchedule;

type SubProps = {
  scheduleDetail: ScheduleDestinationsListType | null;
  setScheduleDetail: React.Dispatch<
    React.SetStateAction<ScheduleDestinationsListType | null>
  >;
};
const ScheduleSubTitle = ({ scheduleDetail, setScheduleDetail }: SubProps) => {
  const {
    patientState: { patient, scheduleDestinationList, scheduleAppointments },
  } = useGlobalContext();

  return (
    <div className="midbar-content">
      {scheduleAppointments?.map(
        (schedule_appointment: ScheduledType, index: number) => {
          const dataSchedule = scheduleDestinationList?.find((item) => {
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
                onClick={() => {
                  setScheduleDetail(dataSchedule);
                }}
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
                      scheduleDetail?.id === schedule_appointment.schedule_id
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
  );
};
