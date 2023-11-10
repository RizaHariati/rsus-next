"use client";

import React, { useEffect, useState } from "react";
import useAssignColumn from "@/app/(tools)/utils/useAssignColumn";
import { useRouter } from "next/navigation";
import SidebarComponent from "@/app/(tools)/components/adminpatientComponents/SidebarComponent";
import MidbarComponent from "@/app/(tools)/components/adminpatientComponents/MidbarComponent";
import DescriptionComponent from "@/app/(tools)/components/adminpatientComponents/DescriptionComponent";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { ScheduledType } from "@/app/(tools)/patientTypes";
import { getTujuan } from "@/app/(tools)/utils/patientUtils/getTujuan";

type Props = {};

const PatientPage = (props: Props) => {
  const {
    loadingPatientScheduleDestination,
    showDetail,
    patientState: { patient },
  } = useGlobalContext();
  const [showMidbar, setShowMidbar] = useState(
    showDetail.column_open === "all"
  );
  const Router = useRouter();

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
        loadingPatientScheduleDestination([...res]);
      });
    }
  }, []);

  useEffect(() => {
    setShowMidbar(showDetail.column_open === "all");
  }, [showDetail]);

  return (
    <div className="ptn-container">
      <div className="ptn-content">
        {/* --------------------- COLUMN 1 SIDEBAR MENU -------------------- */}
        <SidebarComponent />
        {/* ----------------------- COLUMN 2 MID MENU ---------------------- */}
        {showMidbar && <MidbarComponent />}
        {/* ----------------- COLUMN 3 DETAILED DESCRIPTION ---------------- */}
        <DescriptionComponent />
      </div>
    </div>
  );
};

export default PatientPage;
