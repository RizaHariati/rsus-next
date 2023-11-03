import React, { useEffect, useState } from "react";

import { PatientInitialValueType } from "../../patientTypes";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import PatientProfileContent from "./PatientProfileContent";
type Props = {};

const PatientProfile = (props: Props) => {
  const {
    patientState: {
      patient: { patient_profile, medical_record_number },
    },
  } = useGlobalContext();
  const initialPatient: PatientInitialValueType = {
    medical_record_number: {
      value: medical_record_number,
      error: false,
    },
    register_date: {
      value: patient_profile.register_date,
      error: false,
    },
    name: { value: patient_profile.name, error: false },
    NIK: { value: patient_profile.NIK, error: false },
    address: { value: patient_profile.address, error: false },
    sex: { value: patient_profile.sex, error: false },
    birthdate: { value: patient_profile.birthdate, error: false },
    phone: { value: patient_profile.phone, error: false },
    password: { value: patient_profile.password, error: false },
    bpjs_number: { value: patient_profile.bpjs_number, error: false },
  };

  const [editable, setEditable] = useState(false);
  const [patientPersonal, setPatientPersonal] =
    useState<PatientInitialValueType>(initialPatient);

  useEffect(() => {
    if (!editable) setPatientPersonal(initialPatient);
    //eslint-disable-next-line
  }, [editable]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    patientKey: string
  ) => {
    e.preventDefault();
    let value = e.target.value;
    if (
      patientKey === "bpjs_number" ||
      patientKey === "phone" ||
      patientKey === "NIK"
    ) {
      if (value.length > 12) {
        value = value.slice(0, 12);
      }
      console.log(typeof value);
    }

    const newPersonal = {
      ...patientPersonal,
      [patientKey]: { value, error: false },
    };

    setPatientPersonal(newPersonal);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form className=" w-3/4" onSubmit={(e) => handleSubmit(e)}>
      <div className="h-14 w-full flex-center-between p-4 border-b border-greyBorder gap-5">
        <div className="w-full">
          <p>{patientPersonal["name"].value}</p>
        </div>
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
      <PatientProfileContent
        patientPersonal={patientPersonal}
        editable={editable}
        handleChange={handleChange}
      />
      <div className="w-full h-14  p-2 flex-center-center  border-t border-greyBorder">
        <button
          type="submit"
          className={
            editable ? "btn-base-focus ml-auto" : "btn-base-small ml-auto"
          }
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default PatientProfile;
