import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import {
  PatientInitialValueType,
  PatientProfileType,
} from "@/app/(tools)/patientTypes";
import React, { useEffect, useState } from "react";
import PatientProfileContent from "./PatientProfileContent";
import { InitialValueType } from "@/app/(tools)/HospitalTypes";
import SubmitButton from "../../GeneralComponents/SubmitButton";
import { patientFormInput } from "@/app/(tools)/utils/forms/patientFormInput";
import RegularInput from "../../GeneralComponents/RegularInput";
import { toast } from "react-toastify";
import DoctorDescriptionLoading from "../../adminHospitalComponents/HospitalLoadingComponents/DoctorDescriptionLoading";
import BooleanButton from "../../GeneralComponents/BooleanButtonInput";
import DoctorGender from "../../adminHospitalComponents/HospitalDescriptionComponents/DoctorDescription/DoctorGender";

type Props = {};

const PatientDescription = (props: Props) => {
  const {
    settingEditable,
    state: { editable },
    patientState: {
      patient: { patient_profile, medical_record_number },
    },
  } = useGlobalContext();

  const [patientPersonalValues, setPatientPersonalValues] =
    useState<InitialValueType>({});

  useEffect(() => {
    if (!patient_profile || !medical_record_number) return;
    else {
      const promiseDoctor = new Promise((resolve) => {
        let newDoctorValues: any = {};
        Object.entries(patient_profile).forEach(([key, value]) => {
          //@ts-ignore
          if (!newDoctorValues[key]) {
            //@ts-ignore
            newDoctorValues[key] = { value, error: false };
          }
        });

        resolve(newDoctorValues);
      });
      promiseDoctor.then((newDoctorValues: any) => {
        setPatientPersonalValues(newDoctorValues);
      });

      if (!editable) {
        promiseDoctor.then((res: any) => {
          setPatientPersonalValues(res);

          return res;
        });
      }
    }
  }, [patient_profile, medical_record_number, editable]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newPromise = new Promise((resolve) => {
      setTimeout(() => {
        let editedDoctor: PatientProfileType | any = {};
        Object.entries(patientPersonalValues).forEach(
          ([editedKey, editedValue]) => {
            if (!editedDoctor[editedKey]) {
              editedDoctor[editedKey] = editedValue.value;
            }
          }
        );
        resolve(console.log({ editedDoctor }));
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

  const handleValueChange = (value: { newValue: any; key: string }[]) => {
    if (!editable) return;
    if (!patientPersonalValues) return;
    const newPatientValues: InitialValueType = {};

    Object.entries(patientPersonalValues).map(([itemKey, itemValue]) => {
      const findValue = value.find((item) => item.key === itemKey);
      if (!findValue) {
        //@ts-ignore
        newPatientValues[itemKey] = { ...itemValue };
      } else {
        console.log({ itemKey });
        if (itemKey === "NIK" || itemKey === "phone") {
          const newValue =
            findValue.newValue.toString().slice(0, 1) === "0"
              ? findValue.newValue.toString()
              : "0" + findValue.newValue;
          newPatientValues[itemKey] = {
            value: newValue,
            error: false,
          };
        } else {
          newPatientValues[itemKey] = {
            value: findValue.newValue,
            error: false,
          };
        }
      }
      return "";
    });
    setPatientPersonalValues(newPatientValues);
    return;
  };
  const formProfilePatient = Object.entries(patientFormInput);
  if (
    !patient_profile ||
    !medical_record_number ||
    Object.keys(patientPersonalValues).length < 1
  ) {
    return (
      <div className="h-[calc(100vh-112px)] w-full">
        <DoctorDescriptionLoading />
      </div>
    );
  } else {
    return (
      <>
        <form
          className="column-description-container h-full flex items-center justify-start mx-auto "
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="column-description-content gap-20">
            {formProfilePatient.map(
              ([patientFormKey, patientFormValue], index) => {
                const patientDetail: any =
                  patientPersonalValues?.[patientFormKey]?.value || "";
                switch (patientFormKey) {
                  case "sex":
                    return (
                      <DoctorGender
                        key={index}
                        doctorFormValue={patientFormValue}
                        doctorDetail={patientDetail}
                      />
                    );
                  default:
                    return (
                      <RegularInput
                        key={index}
                        values={patientPersonalValues}
                        formValue={patientFormValue}
                        formKey={patientFormKey}
                        handleValueChange={handleValueChange}
                      />
                    );
                }
              }
            )}
          </div>{" "}
          <SubmitButton />
        </form>
      </>
    );
  }
};

export default PatientDescription;
