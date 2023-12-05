import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import React, { useEffect, useState } from "react";
import SubmitButton from "../../GeneralComponents/SubmitButton";
import LoadingSpinner from "../../GeneralComponents/LoadingSpinner";
import { InitialValueType } from "@/app/(tools)/HospitalTypes";
import { scheduleFormInput } from "@/app/(tools)/utils/forms/scheduleFormInput";
import EditDateInput from "./ScheduleDescription/EditDateInput";
import ScheduleDestination from "./ScheduleDescription/ScheduleDestination";
import RegularInput from "../../GeneralComponents/RegularInput";
import BPJSInput from "./ScheduleDescription/BPJSInput";
import { ScheduledType } from "@/app/(tools)/patientTypes";
import { toast } from "react-toastify";

type Props = {};

const ScheduleDescription = (props: Props) => {
  const {
    settingEditable,
    state: { editable },
    patientState: { selectedScheduleAppointment },
  } = useGlobalContext();

  const [scheduleValues, setScheduleValues] = useState<InitialValueType>({});

  useEffect(() => {
    if (!selectedScheduleAppointment) return;
    else {
      const promiseSchedule = new Promise((resolve) => {
        let newPatientValues: any = {};
        Object.entries(selectedScheduleAppointment).forEach(([key, value]) => {
          //@ts-ignore
          if (!newPatientValues[key]) {
            //@ts-ignore
            newPatientValues[key] = { value, error: false };
          }
        });

        resolve(newPatientValues);
      });
      promiseSchedule.then((newPatientValues: any) => {
        setScheduleValues(newPatientValues);
        return newPatientValues;
      });

      if (!editable) {
        promiseSchedule.then((res: any) => {
          setScheduleValues(res);

          return res;
        });
      }
    }
    //eslint-disable-next-line
  }, [selectedScheduleAppointment, editable]);

  const handleValueChange = (value: { newValue: any; key: string }[]) => {
    if (!editable) return;
    if (!scheduleValues) return;

    let newScheduleValues: InitialValueType = {};

    Object.entries(scheduleValues).map(([itemKey, itemValue]) => {
      const findValue = value.find((item) => item.key === itemKey);
      if (!findValue) {
        //@ts-ignore
        newScheduleValues[itemKey] = { ...itemValue };
      } else {
        if (itemKey === "current_phone") {
          const newValue =
            findValue.newValue.toString().slice(0, 1) === "0"
              ? findValue.newValue.toString()
              : "0" + findValue.newValue;
          newScheduleValues[itemKey] = {
            value: newValue,
            error: false,
          };
        } else {
          newScheduleValues[itemKey] = {
            ...itemValue,
            value: findValue.newValue,
          };
        }
      }
    });
    setScheduleValues(newScheduleValues);
  };

  if (!selectedScheduleAppointment) {
    return (
      <div className="h-[calc(100vh-112px)] w-full">
        <LoadingSpinner />
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPromise = new Promise((resolve) => {
      setTimeout(() => {
        let editedSchedule: ScheduledType | any = {};
        Object.entries(scheduleValues).forEach(([editedKey, editedValue]) => {
          if (!editedSchedule[editedKey]) {
            editedSchedule[editedKey] = editedValue.value;
          }
        });
        console.log(editedSchedule);
        resolve(console.log({ editedSchedule }));
      }, 1000);
    }).then((res) => {
      settingEditable(false);
      return res;
    });
    toast.promise(newPromise, {
      pending: "Data diproses",
      success: "Data berhasil diubah",
      error: "Promise rejected 🤯",
    });
  };

  if (!scheduleValues || Object.keys(scheduleValues).length < 1) {
    return (
      <div className="h-[calc(100vh-112px)] w-full">
        <LoadingSpinner />
      </div>
    );
  } else {
    return (
      <form
        className="column-description-container"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="column-description-content ">
          <div className="column-description-container h-full flex items-center justify-start mx-auto  ">
            {Object.entries(scheduleFormInput).map(
              ([scheduleKey, scheduleValue], scheduleIndex) => {
                //@ts-ignore
                switch (scheduleKey) {
                  case "scheduled_date":
                  case "register_date":
                    return (
                      <EditDateInput
                        key={scheduleIndex}
                        values={scheduleValues}
                        formValue={scheduleValue}
                        formKey={scheduleKey}
                        handleValueChange={handleValueChange}
                      />
                    );

                  case "tujuan": {
                    return (
                      <ScheduleDestination
                        key={scheduleIndex}
                        values={scheduleValues}
                        formValue={scheduleValue}
                        formKey={scheduleKey}
                        handleValueChange={handleValueChange}
                      />
                    );
                  }
                  case "using_bpjs": {
                    return (
                      <BPJSInput
                        key={scheduleIndex}
                        values={scheduleValues}
                        formValue={scheduleValue}
                        formKey={scheduleKey}
                        handleValueChange={handleValueChange}
                      />
                    );
                  }
                  default:
                    return (
                      <RegularInput
                        key={scheduleIndex}
                        values={scheduleValues}
                        formValue={scheduleValue}
                        formKey={scheduleKey}
                        handleValueChange={handleValueChange}
                      />
                    );
                }
              }
            )}
          </div>
        </div>
        <SubmitButton />
      </form>
    );
  }
};

export default ScheduleDescription;
