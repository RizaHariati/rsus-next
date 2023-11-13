import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { PatientInitialValueType } from "@/app/(tools)/patientTypes";
import React, { useEffect, useState } from "react";
import PatientProfileContent from "../../PatientPageComponents/PatientProfileContent";

type Props = {};

const PatientDescription = (props: Props) => {
  const {
    state: { editable },
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

  const [patientPersonal, setPatientPersonal] =
    useState<PatientInitialValueType>(initialPatient);

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
    <form
      className="column-description-container "
      onSubmit={(e) => handleSubmit(e)}
    >
      <PatientProfileContent
        patientPersonal={patientPersonal}
        handleChange={handleChange}
      />

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
  );
};

export default PatientDescription;
