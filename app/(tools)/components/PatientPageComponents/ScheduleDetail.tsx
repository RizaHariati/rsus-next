import React, { useEffect, useState } from "react";
import { PatientInitialValueType } from "../../patientTypes";
import { scheduleFormInput } from "../../utils/forms/scheduleFormInput";
import moment from "moment";
import { useGlobalContext } from "../../context/AppProvider";

type Props = {
  scheduled_appointments: {
    id: string;
    value: any[];
  } | null;
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
      <div className="col-span-4 w-full">
        <div className="h-14 w-full flex-center-between p-4 border-b border-greyBorder gap-5">
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
                const value = patientSchedule[scheduleKey]?.value;
                if (!value) return <div key={scheduleIndex}></div>;
                else {
                  return (
                    <div key={scheduleIndex}>
                      <small>{scheduleValue.title}</small>
                      <input
                        value={
                          scheduleKey.includes("date")
                            ? moment(value).format("DD MMMM YYYY")
                            : value
                        }
                        disabled={!editable}
                        className={
                          editable ? "admin-input " : "admin-input-disabled"
                        }
                      />
                    </div>
                  );
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
