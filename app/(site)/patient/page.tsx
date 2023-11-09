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
import PatientMedicalRecord from "@/app/(tools)/components/PatientPageComponents/PatientMedicalRecord";
import { CCO, OCC, OCO, OOC, COO } from "@/app/(tools)/column/columnPattern";
import { OOO } from "../../(tools)/column/columnPattern";
import useAssignColumn from "@/app/(tools)/utils/useAssignColumn";
import { maxWidth, minWidth } from "@/app/(tools)/context/initialState";

type Props = {};
const patientDetail = [
  { name: "Profil Pasien", key: "patient_profile", column_category: "profile" },
  {
    name: "Jadwal",
    key: "scheduled_appointments",
    column_category: "schedule",
  },
  { name: "Rekam Medis", key: "medical_records", column_category: "medical" },
];
const PatientPage = (props: Props) => {
  const {
    loadingPatientDetail,
    assignColumn,
    state: { columnAssignment, currentWindow },
    patientState: { patient },
  } = useGlobalContext();
  const Router = useRouter();
  const [showDetail, setshowDetail] = useState("patient_profile");
  useAssignColumn();

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
    <div className="page-main-container ">
      <div className="cl-lvl-1">
        <div
          className={
            columnAssignment.column1
              ? "cl-lv-2-sidebar "
              : "cl-lv-2-sidebar-rotate "
          }
        >
          <div
            className={
              columnAssignment.column1 ? "column-title" : "column-title-rotate "
            }
            onClick={() => {
              const fromClose =
                currentWindow < minWidth
                  ? OCC
                  : currentWindow >= minWidth && currentWindow <= maxWidth
                  ? OCC
                  : OOO;
              const fromOpen =
                currentWindow < minWidth
                  ? CCO
                  : currentWindow >= minWidth && currentWindow <= maxWidth
                  ? COO
                  : OOO;
              assignColumn(!columnAssignment.column1 ? fromClose : fromOpen);
            }}
          >
            <p
              className={
                columnAssignment.column1
                  ? "sidebar-title "
                  : "sidebar-title-rotate"
              }
            >
              {patient.medical_record_number}
            </p>
          </div>
          <div
            className={
              columnAssignment.column1
                ? "sidebar-content "
                : "sidebar-content-rotate "
            }
          >
            {columnAssignment.column1 &&
              patientDetail.map((item, index) => {
                return (
                  <div key={index} className="h-14 w-full bg-red-400">
                    <button
                      className={
                        item.key === showDetail
                          ? "sidebar-btn-focus group"
                          : "sidebar-btn group"
                      }
                      onClick={() => {
                        setshowDetail(item.key);
                        if (currentWindow < minWidth) {
                          assignColumn(OCC);
                        } else if (
                          currentWindow >= minWidth &&
                          currentWindow <= maxWidth
                        ) {
                          assignColumn(OCO);
                        } else {
                          assignColumn(OOO);
                        }
                      }}
                    >
                      <p
                        className={
                          item.key === showDetail
                            ? "sidebar-btn-text text-white"
                            : "sidebar-btn-text"
                        }
                      >
                        {item.name}
                      </p>
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className={
                          item.key === showDetail
                            ? "sidebar-btn-icon text-white"
                            : "sidebar-btn-icon"
                        }
                      />
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="cl-lv-2-content ml-auto">
          {/* {showDetail === "patient_profile" && <PatientProfile />}
          {showDetail === "scheduled_appointments" && <PatientSchedule />}
          {showDetail === "medical_records" && <PatientMedicalRecord />} */}
        </div>
      </div>
    </div>
  );
};

export default PatientPage;
