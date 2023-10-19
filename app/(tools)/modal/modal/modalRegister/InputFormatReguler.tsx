import React from "react";
import { PatientInitialValueType, PersonalItemType } from "../../patientTypes";

type RegularProps = {
  newPatientPersonal: PatientInitialValueType;
  values: PersonalItemType;
  patientKey: string;
  patientValue: {
    value: any;
    error: boolean;
  };
  handlePatientChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    patientKey: string
  ) => void;
};

const InputFormatReguler = ({
  newPatientPersonal,
  values,
  patientKey,
  patientValue,
  handlePatientChange,
}: RegularProps) => {
  return (
    <div
      key={values.id}
      id={values.id}
      className={
        values.col_width
          ? "col-span-full md:col-span-2 sub-form group"
          : "col-span-full md:col-span-1 sub-form group"
      }
    >
      <p>{values.title}</p>

      <input
        type={
          patientKey === "phone" ||
          patientKey === "bpjs_number" ||
          patientKey === "NIK"
            ? "number"
            : "text"
        }
        maxLength={
          patientKey === "phone" ||
          patientKey === "bpjs_number" ||
          patientKey === "NIK"
            ? 14
            : 50
        }
        placeholder={values.placeholder}
        className="active-input "
        value={patientValue.value.toString()}
        onChange={(e) => {
          handlePatientChange(e, patientKey);
        }}
      />
      <p className="footnote-1 text-redBase h-5">
        {!newPatientPersonal[patientKey].value &&
          newPatientPersonal[patientKey].error &&
          values.error}
      </p>
    </div>
  );
};

export default InputFormatReguler;
