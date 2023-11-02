import React, { useEffect, useState } from "react";
import {
  PatientInitialValueType,
  ScheduledType,
  PersonalItemType,
} from "../../patientTypes";
import { scheduleFormInput } from "../../utils/forms/scheduleFormInput";
import moment from "moment";
import { patientFormInput } from "../../utils/forms/patientFormInput";

type Props = {
  scheduled_appointments: ScheduledType;
};

const ScheduleDetail = ({ scheduled_appointments }: Props) => {
  const {
    schedule_id,
    current_phone,
    tujuan,
    appointment_type,
    scheduled_date,
    register_date,
    using_bpjs,
    nomor_antrian,
  } = scheduled_appointments;

  const initialSchedule: PatientInitialValueType = {
    schedule_id: {
      value: schedule_id,
      error: false,
    },
    current_phone: {
      value: current_phone,
      error: false,
    },
    tujuan: { value: tujuan, error: false },
    appointment_type: { value: appointment_type, error: false },
    scheduled_date: { value: scheduled_date, error: false },
    register_date: { value: register_date, error: false },
    using_bpjs: { value: using_bpjs, error: false },
    nomor_antrian: { value: nomor_antrian, error: false },
  };

  const [editable, setEditable] = useState(false);
  const [patientSchedule, setpatientSchedule] =
    useState<PatientInitialValueType>(initialSchedule);

  useEffect(() => {
    let newSchedule: PatientInitialValueType = {};
    Object.keys(initialSchedule).map((schedule: string) => {
      newSchedule[schedule] = {
        ...initialSchedule[schedule], //@ts-ignore
        value: scheduled_appointments[schedule],
      };
      return "";
    });
    setpatientSchedule(newSchedule);
  }, [scheduled_appointments]);

  useEffect(() => {
    if (!editable) setpatientSchedule({ ...initialSchedule });
    //eslint-disable-next-line
  }, [editable]);
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
            ([scheduleKey, scheduleValue], index) => {
              //@ts-ignore
              const value = patientSchedule[scheduleKey].value;
              return (
                <div key={index}>
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
          )
        }
      </div>
      <div className="w-full h-14  p-2 flex-center-center">
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
};

export default ScheduleDetail;
