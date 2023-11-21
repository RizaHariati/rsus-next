import { DoctorInitialValueType } from "@/app/(tools)/HospitalTypes";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { doctorForm } from "@/app/(tools)/utils/forms/DoctorDetailedForm";
import React, { useEffect, useState } from "react";
import DoctorHari from "./DoctorDescriptions.tsx/DoctorHari";

import DoctorWaktu from "./DoctorDescriptions.tsx/DoctorWaktu";
import DoctorRegular from "./DoctorDescriptions.tsx/DoctorRegular";
import DoctorTelemedicineInput from "./DoctorDescriptions.tsx/DoctorTelemedicineInput";
import BooleanButton from "./DoctorDescriptions.tsx/BooleanButton";

import DoctorGender from "./DoctorDescriptions.tsx/DoctorGender";
import DoctorDescriptionLoading from "../HospitalLoadingComponents/DoctorDescriptionLoading";

type Props = {};

const DoctorDescription = (props: Props) => {
  const {
    state: { columnAssignment, editable },
    hospitalState: { selectedDoctor, dataDoctor },
  } = useGlobalContext();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const [doctorValues, setDoctorValues] = useState<DoctorInitialValueType>({});
  const [initialValues, setInitialValues] = useState<DoctorInitialValueType>(
    {}
  );
  useEffect(() => {
    if (!selectedDoctor) return;

    const promiseDoctor = new Promise((resolve) => {
      let newDoctorValues = {};
      Object.entries(selectedDoctor).forEach(([key, value]) => {
        //@ts-ignore
        if (!newDoctorValues[key]) {
          //@ts-ignore
          newDoctorValues[key] = { value, error: false };
        }
      });

      resolve(newDoctorValues);
    });
    promiseDoctor.then((newDoctorValues: any) => {
      setDoctorValues(newDoctorValues);
      setInitialValues(newDoctorValues);
    });
  }, [selectedDoctor]);

  useEffect(() => {
    if (!editable) setDoctorValues(initialValues);
  }, [editable]);

  const handleValueChange = (value: { newValue: any; key: string }[]) => {
    if (!editable) return;
    if (!doctorValues) return;
    const newDoctorValues: DoctorInitialValueType = {};

    Object.entries(doctorValues).map(([itemKey, itemValue]) => {
      const findValue = value.find((item) => item.key === itemKey);
      if (!findValue) {
        //@ts-ignore
        newDoctorValues[itemKey] = { ...itemValue };
      } else {
        newDoctorValues[itemKey] = { value: findValue.newValue, error: false };
      }
    });
    return setDoctorValues(newDoctorValues);
  };
  const formInputDoctor = Object.entries(doctorForm);

  if (Object.keys(doctorValues).length < 1 || !selectedDoctor) {
    return (
      <div className="h-[calc(100vh-112px)] w-full">
        <DoctorDescriptionLoading />
      </div>
    );
  } else {
    return (
      <>
        <form
          className="column-description-container "
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="column-description-content">
            {formInputDoctor.map(([doctorKey, doctorValue], index) => {
              //@ts-ignore
              const doctorDetail: any = doctorValues?.[doctorKey]?.value || "";
              switch (doctorKey) {
                case "hari":
                  return (
                    <DoctorHari
                      key={index}
                      doctorValue={doctorValue}
                      doctorDetail={doctorDetail}
                    />
                  );
                case "telemedicine":
                case "biaya_telemedicine":
                case "sedang_online":
                  return (
                    <DoctorTelemedicineInput
                      key={index}
                      doctorKey={doctorKey}
                      doctorValues={doctorValues}
                      doctorValue={doctorValue}
                      handleValueChange={handleValueChange}
                    />
                  );

                case "waktu":
                  return (
                    <DoctorWaktu
                      key={index}
                      doctorKey={doctorKey}
                      doctorValues={doctorValues}
                      doctorValue={doctorValue}
                      handleValueChange={handleValueChange}
                    />
                  );
                case "gender":
                  return (
                    <DoctorGender
                      key={index}
                      doctorValue={doctorValue}
                      doctorDetail={doctorDetail}
                    />
                  );
                case "on_call":
                  return (
                    <div className="w-full" key={index}>
                      <small>{doctorKey}</small>
                      <BooleanButton
                        booleanKey={doctorKey}
                        booleanValue={doctorDetail}
                        handleClick={handleValueChange}
                      />
                    </div>
                  );
                default:
                  return (
                    <DoctorRegular
                      key={index}
                      doctorValue={doctorValue}
                      doctorDetail={doctorDetail}
                      doctorKey={doctorKey}
                    />
                  );
              }
            })}
          </div>
          <div className="content-menu border-t">
            <button
              type="submit"
              className={
                editable ? "btn-base-focus px-12 " : "btn-base-small w-28 px-12"
              }
            >
              Submit
            </button>
          </div>
        </form>
      </>
    );
  }
};
// };

export default DoctorDescription;
