"use client";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { ScheduledType } from "@/app/(tools)/patientTypes";
import { getFacility } from "@/sanity/sanityUtils/getFacility";
import { getActivities } from "@/app/(tools)/utils/getActivities";

type Props = {};

const PatientSchedule = (props: Props) => {
  const {
    patientState: { patient },
    state: { dataDoctor, dataFacility },
  } = useGlobalContext();
  return (
    <div className="col-span-6 grid grid-cols-6  h-full w-full ">
      <div className="h-full max-h-[calc(100vh-56px)] col-span-2 w-full border-r border-r-greyBorder p-2 overflow-y-scroll scrollbar-none flex flex-col gap-2">
        {patient.scheduled_appointments.map(
          (item: ScheduledType, index: number) => {
            const scheduleWithDoctor = getActivities(
              item,
              dataDoctor,
              dataFacility
            ).doctorActivities;
            const scheduleTest = getActivities(
              item,
              dataDoctor,
              dataFacility
            ).testActivities;

            return (
              <div key={index} className="h-fit min-h-14 w-full">
                <button className="sidebar-btn group">
                  {scheduleWithDoctor.doctor && (
                    <p className="text-left group-focus:text-white h-10 flex-center-start">
                      {scheduleWithDoctor.name}
                    </p>
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
      <div></div>
    </div>
  );
};

export default PatientSchedule;
