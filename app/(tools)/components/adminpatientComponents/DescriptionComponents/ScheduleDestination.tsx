import React, { useEffect, useState } from "react";

import { doctorDetailedForm } from "../../../utils/forms/DoctorDetailedForm";
import { testGeneralForm } from "../../../utils/forms/TestGeneralForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinusCircle,
  faPlugCirclePlus,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "../../../context/AppProvider";
import { ScheduleDestinationsListType } from "@/app/(tools)/patientTypes";

type Props = {
  showDestination: any;
  setShowDestination: React.Dispatch<any>;
};

const ScheduleDestination = ({
  showDestination,
  setShowDestination,
}: Props) => {
  const {
    patientState: { selectedScheduleDestination },
  } = useGlobalContext();
  if (!selectedScheduleDestination) return <div></div>;
  return (
    <div className="column-description-sub-content  ">
      {selectedScheduleDestination.value.map(
        (destination: any, scheduleIndex: number) => {
          if (destination.id.includes("dr")) {
            return (
              <div
                key={scheduleIndex}
                className="w-full p-2 h-fit standard-border   bg-hoverBG"
              >
                {doctorDetailedForm(destination).map((item) => {
                  return (
                    <div key={item.id} className="w-full ">
                      <small>{item.title}</small>
                      <p className="admin-input-disabled">{item.value}</p>
                    </div>
                  );
                })}
              </div>
            );
          } else {
            return (
              <div
                key={scheduleIndex}
                className="w-full p-2 h-fit standard-border shrink-0 relative  bg-hoverBG"
              >
                <button
                  onClick={() => setShowDestination(destination.id)}
                  className="absolute top-2 right-2 text-greyMed2"
                >
                  <FontAwesomeIcon
                    icon={
                      destination.id === showDestination
                        ? faMinusCircle
                        : faPlusCircle
                    }
                  />
                </button>
                {destination.id !== showDestination && (
                  <div className="w-full ">
                    <p>{testGeneralForm(destination)[0]?.value || ""}</p>
                  </div>
                )}
                {destination.id === showDestination &&
                  testGeneralForm(destination).map((item) => {
                    return (
                      <div key={item.id} className="w-full ">
                        <small>{item.title}</small>
                        {item.value.description ? (
                          <p className="admin-input-disabled h-fit">
                            {item.value.description}
                          </p>
                        ) : item.value.pemeriksaan ? (
                          <div>
                            <small>Pemeriksaan</small>
                            <div className="admin-input-disabled h-fit">
                              {item.value.pemeriksaan.map((periksa: any) => {
                                return (
                                  <p className="text-greyMed2" key={periksa.id}>
                                    {periksa.title}
                                  </p>
                                );
                              })}
                            </div>
                            <div>
                              <small>Laboratorium</small>
                              <div className="admin-input-disabled h-fit">
                                {item.value.laboratorium.map((periksa: any) => {
                                  return (
                                    <p
                                      className="text-greyMed2"
                                      key={periksa.id}
                                    >
                                      {periksa.title}
                                    </p>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <p className="admin-input-disabled">{item.value}</p>
                        )}
                      </div>
                    );
                  })}
              </div>
            );
          }
        }
      )}
    </div>
  );
};

export default ScheduleDestination;
