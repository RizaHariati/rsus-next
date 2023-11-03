"use client";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import PatientSchedule from "@/app/(tools)/components/PatientPageComponents/PatientSchedule";

import PatientProfile from "@/app/(tools)/components/PatientPageComponents/PatientProfile";
import { ScheduledType } from "@/app/(tools)/patientTypes";
import { getTujuan } from "@/app/(tools)/utils/patientUtils/getTujuan";

type Props = {};
const patientDetail = [
  { name: "Profil Pasien", key: "patient_profile" },
  { name: "Jadwal", key: "scheduled_appointments" },
  { name: "Rekam Medis", key: "medical_records" },
];
const PatientPage = (props: Props) => {
  const {
    loadingPatientDetail,
    patientState: { patient },
  } = useGlobalContext();
  const Router = useRouter();
  const [showDetail, setshowDetail] = useState("patient_profile");
  useEffect(() => {
    if (!patient || !patient.medical_record_number) {
      return Router.push("/");
    } else {
      let detail: any;
      const schedulePromise = () => {
        detail = patient.scheduled_appointments.map(
          (schedule: ScheduledType) => {
            const promise = schedule.tujuan.map((item) => {
              return new Promise((resolve) => {
                return resolve(getTujuan(item));
              });
            });
            return Promise.all(promise).then((res: any) => {
              return { id: schedule.schedule_id, value: res };
            });
          }
        );
        return detail;
      };
      Promise.all(schedulePromise()).then((res) => {
        loadingPatientDetail([...res]);
      });
    }
  }, []);
  if (!patient || !patient.medical_record_number)
    return (
      <div className="page-main-container flex-center-center  ">
        <h2 className="m-auto">Belum Ada Data</h2>
      </div>
    );

  return (
    <div className="page-main-container  ">
      <main className="data-container ">
        <div className=" col-span-2 h-full w-full  border-r border-greyBorder">
          <div className="h-14 w-full flex-center-start p-4 border-b border-greyBorder">
            <p>{patient.medical_record_number}</p>
          </div>
          <div className="h-fit w-full flex-center-start flex-col p-2 ">
            {patientDetail.map((item, index) => {
              return (
                <div key={index} className="h-14 w-full">
                  <button
                    className="sidebar-btn group"
                    onClick={() => setshowDetail(item.key)}
                  >
                    <p className="text-left group-focus:text-white h-10 flex-center-start">
                      {item.name}
                    </p>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="text-greyMed1 group-focus:text-white"
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        {showDetail === "patient_profile" && <PatientProfile />}
        {showDetail === "scheduled_appointments" && <PatientSchedule />}
        {showDetail === "medical_records" && (
          <div className="col-span-6  h-full w-full flex-center-center ">
            <h4>Masih dalam konstruksi</h4>
          </div>
        )}
      </main>
    </div>
  );
};

export default PatientPage;
