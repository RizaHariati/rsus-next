import React, { useEffect, useState } from "react";

import { doctorDetailedForm } from "../../utils/forms/DoctorDetailedForm";
import { testGeneralForm } from "../../utils/forms/TestGeneralForm";
import { AppointmentListType } from "../../patientTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinusCircle,
  faPlugCirclePlus,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "../../context/AppProvider";

type Props = {
  scheduled_appointments: AppointmentListType | null;
};

const ScheduleTujuan = ({ scheduled_appointments }: Props) => {
  const { handleShowTujuan, showTujuan } = useGlobalContext();
  if (!scheduled_appointments) return <div></div>;
  return (
    <div className="column-detail-sub-content mt-2 ">
      {scheduled_appointments.value.map(
        (scheduled_appointment: any, scheduleIndex: number) => {
          if (scheduled_appointment.id.includes("dr")) {
            return (
              <div
                key={scheduleIndex}
                className="w-full p-2 h-fit standard-border "
              >
                {doctorDetailedForm(scheduled_appointment).map((item) => {
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
                className="w-full p-2 h-fit standard-border shrink-0 relative"
              >
                <button
                  onClick={() => handleShowTujuan(scheduled_appointment.id)}
                  className="absolute top-2 right-2 text-greyMed2"
                >
                  <FontAwesomeIcon
                    icon={
                      scheduled_appointment.id === showTujuan
                        ? faMinusCircle
                        : faPlusCircle
                    }
                  />
                </button>
                {scheduled_appointment.id !== showTujuan && (
                  <div className="w-full ">
                    <p>
                      {testGeneralForm(scheduled_appointment)[0]?.value || ""}
                    </p>
                  </div>
                )}
                {scheduled_appointment.id === showTujuan &&
                  testGeneralForm(scheduled_appointment).map((item) => {
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

export default ScheduleTujuan;
