import React, { useEffect, useState } from "react";
import {
  AppointmentListType,
  PatientInitialValueType,
} from "../../patientTypes";

import { useGlobalContext } from "../../context/AppProvider";
import PatientEditDelete from "../adminpatientComponents/GeneralComponents/PatientEditDelete";
import ScheduleDetailContent from "./ScheduleDetailContent";
import PatientSubMenu from "./PatientSubMenu";

type Props = {
  scheduled_appointments: AppointmentListType | null;
};

const ScheduleDetail = ({ scheduled_appointments }: Props) => {
  const {
    state: { columnAssignment, currentWindow },
    patientState: { patient },
  } = useGlobalContext();

  const emptySchedule: PatientInitialValueType = {
    schedule_id: {
      value: "",
      error: false,
    },
    current_phone: {
      value: "",
      error: false,
    },
    tujuan: { value: "", error: false },
    appointment_type: { value: "", error: false },
    scheduled_date: { value: "", error: false },
    register_date: { value: "", error: false },
    using_bpjs: { value: "", error: false },
    nomor_antrian: { value: "", error: false },
  };

  const [editable, setEditable] = useState(false);
  const [initialSchedule, setinitialSchedule] = useState(emptySchedule);
  const [patientSchedule, setpatientSchedule] =
    useState<PatientInitialValueType>({});

  useEffect(() => {
    if (!scheduled_appointments) return;
    const findSchedule = patient.scheduled_appointments.find(
      (item) => item.schedule_id === scheduled_appointments.id
    );
    if (!findSchedule) return;
    let newSchedule: PatientInitialValueType = {};
    Object.keys(emptySchedule).map((schedule: string) => {
      newSchedule[schedule] = {
        ...emptySchedule[schedule], //@ts-ignore
        value: findSchedule[schedule],
      };
      return "";
    });
    setpatientSchedule(newSchedule);
    setinitialSchedule(newSchedule);
  }, [scheduled_appointments]);

  useEffect(() => {
    if (!editable) setpatientSchedule({ ...initialSchedule });
    //eslint-disable-next-line
  }, [editable]);
  if (!scheduled_appointments || !patientSchedule) return <div></div>;
  else {
    return (
      <div className="cl-lv-3-content ">
        <PatientSubMenu
          editable={editable}
          setEditable={setEditable}
          title="Tujuan"
        />

        <div
          className={
            columnAssignment.column3
              ? "column-detail-container"
              : "column-detail-container-rotate"
          }
        >
          <ScheduleDetailContent
            editable={editable}
            patientSchedule={patientSchedule}
            scheduled_appointments={scheduled_appointments}
          />
        </div>
        <div
          className={
            columnAssignment.column3 ? "content-menu border-t" : "hidden"
          }
        >
          <button
            type="submit"
            className={editable ? "btn-base-focus" : "btn-base-small"}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
};

export default ScheduleDetail;
