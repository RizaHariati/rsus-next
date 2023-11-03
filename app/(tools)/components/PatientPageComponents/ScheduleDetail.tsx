import React, { useEffect, useState } from "react";
import {
  AppointmentListType,
  PatientInitialValueType,
} from "../../patientTypes";
import { scheduleFormInput } from "../../utils/forms/scheduleFormInput";
import moment from "moment";
import { useGlobalContext } from "../../context/AppProvider";

type Props = {
  scheduled_appointments: AppointmentListType | null;
};

const ScheduleDetail = ({ scheduled_appointments }: Props) => {
  const {
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
  const [initalSchedule, setinitalSchedule] = useState(emptySchedule);
  const [patientSchedule, setpatientSchedule] =
    useState<PatientInitialValueType>({});
  const [tujuanList, setTujuanList] = useState(null);
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
    setinitalSchedule(newSchedule);
  }, [scheduled_appointments]);

  useEffect(() => {
    if (!editable) setpatientSchedule({ ...initalSchedule });
    //eslint-disable-next-line
  }, [editable]);
  if (!scheduled_appointments || !patientSchedule) return <div></div>;
  else {
    return (
      <div className=" w-2/3 h-full ">
        <div className="h-14  flex-center-between p-4 border-b border-greyBorder gap-5">
          <div className="w-full"></div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setEditable(!editable);
              }}
              type="button"
              className={editable ? "btn-base-focus " : "btn-base-small"}
            >
              Edit
            </button>
            <button
              onClick={() => setEditable(false)}
              type="button"
              className="btn-base-small"
            >
              Delete
            </button>
          </div>
        </div>
        <div className="column-detail-full">
          {
            //@ts-ignore
            Object.entries(scheduleFormInput).map(
              ([scheduleKey, scheduleValue], scheduleIndex) => {
                //@ts-ignore
                let value = patientSchedule[scheduleKey]?.value;
                if (!value) return <div key={scheduleIndex}></div>;
                else {
                  if (scheduleKey.includes("scheduled_date")) {
                    value = moment(value).format("DD MMMM YYYY");
                    return (
                      <div key={scheduleIndex}>
                        <small>{scheduleValue.title}</small>
                        <input
                          value={value}
                          disabled={!editable}
                          className={
                            editable ? "admin-input " : "admin-input-disabled"
                          }
                        />
                      </div>
                    );
                  } else if (scheduleKey === "tujuan") {
                    value = scheduled_appointments.value
                      ?.map((item: any) => {
                        return item.name || item.title || "";
                      })
                      .join(", ");
                    return (
                      <div key={scheduleIndex}>
                        <small>{scheduleValue.title}</small>
                        <input
                          value={value}
                          disabled={!editable}
                          className={
                            editable ? "admin-input " : "admin-input-disabled"
                          }
                        />
                      </div>
                    );
                  } else {
                    return (
                      <div key={scheduleIndex}>
                        <small>{scheduleValue.title}</small>
                        <input
                          value={
                            scheduleKey.includes("date")
                              ? moment(value).format("DD MMMM YYYY")
                              : value
                          }
                          disabled={true}
                          className="admin-input-disabled"
                        />
                      </div>
                    );
                  }
                }
              }
            )
          }
        </div>
        <div className="w-full h-14  p-2 flex-center-center border-t border-greyBorder">
          <button
            type="submit"
            className={
              editable ? "btn-base-focus ml-auto" : "btn-base-small ml-auto"
            }
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
};

export default ScheduleDetail;
