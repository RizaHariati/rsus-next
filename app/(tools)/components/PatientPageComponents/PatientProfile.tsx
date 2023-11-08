import React, { useEffect, useState } from "react";

import { PatientInitialValueType } from "../../patientTypes";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import PatientProfileContent from "./PatientProfileContent";
import PatientSubMenu from "./PatientSubMenu";
type Props = {};

const PatientProfile = (props: Props) => {
  const {
    state: { columnAssignment },
    patientState: {
      patient: { patient_profile, medical_record_number },
    },
    assignColumn,
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
    <form className="w-fit h-full " onSubmit={(e) => handleSubmit(e)}>
      <PatientSubMenu
        editable={editable}
        setEditable={setEditable}
        title="Profil Pasien"
      />
      {columnAssignment.column3 && (
        <PatientProfileContent
          patientPersonal={patientPersonal}
          editable={editable}
          handleChange={handleChange}
        />
      )}
      {columnAssignment.column3 && (
        <div className="content-menu border-t">
          <button
            type="submit"
            className={!editable ? "btn-base-focus  " : "btn-base-small "}
          >
            Submit
          </button>
        </div>
      )}
    </form>
  );
};

export default PatientProfile;
