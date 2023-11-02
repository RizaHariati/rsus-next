"use client";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React, { useEffect, useState } from "react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import {
  PatientInitialValueType,
  ScheduledType,
} from "@/app/(tools)/patientTypes";
import { getFacility } from "@/sanity/sanityUtils/getFacility";
import { getActivities } from "@/app/(tools)/utils/getActivities";
import moment from "moment";
import ScheduleDetail from "./ScheduleDetail";

type Props = {};

const PatientSchedule = (props: Props) => {
  const {
    patientState: { patient },
    state: { dataDoctor, dataFacility },
  } = useGlobalContext();
  const scheduled_appointments: ScheduledType[] =
    patient.scheduled_appointments;
  const [scheduleDetail, setScheduleDetail] = useState<ScheduledType>(
    scheduled_appointments[0]
  );
  return (
    <div className="col-span-6 grid grid-cols-6  h-full w-full ">
      <div className="h-full max-h-[calc(100vh-56px)] col-span-2 w-full border-r border-r-greyBorder p-2 overflow-y-scroll scrollbar-none flex flex-col gap-2">
        {scheduled_appointments.map(
          (schedule_appointment: ScheduledType, index: number) => {
            const scheduleWithDoctor = getActivities(
              schedule_appointment,
              dataDoctor,
              dataFacility
            ).doctorActivities;
            const scheduleTest = getActivities(
              schedule_appointment,
              dataDoctor,
              dataFacility
            ).testActivities;

            return (
              <div key={index} className="h-fit min-h-14 w-full">
                <button
                  className="sidebar-btn group"
                  onClick={() => setScheduleDetail(schedule_appointment)}
                >
                  {scheduleWithDoctor.doctor && (
                    <div>
                      <p className="text-left group-focus:text-white  flex-center-start">
                        {scheduleWithDoctor.name}
                      </p>
                      <small className="text-left group-focus:text-white flex-center-start">
                        {moment(schedule_appointment.scheduled_date).format(
                          "DD MMMM YYYY"
                        )}
                      </small>
                    </div>
                  )}
                  {!scheduleWithDoctor.doctor && (
                    <div>
                      {scheduleTest.map((test, testIndex) => {
                        return (
                          <p
                            key={testIndex}
                            className="text-left group-focus:text-white"
                          >
                            {test.title}
                          </p>
                        );
                      })}
                      <small className="text-left group-focus:text-white flex-center-start">
                        {moment(schedule_appointment.scheduled_date).format(
                          "DD MMMM YYYY"
                        )}
                      </small>
                    </div>
                  )}
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="text-greyMed1 group-focus:text-white"
                  />
                </button>
              </div>
            );
          }
        )}
      </div>
      <ScheduleDetail scheduled_appointments={scheduleDetail} />
    </div>
  );
};

export default PatientSchedule;
