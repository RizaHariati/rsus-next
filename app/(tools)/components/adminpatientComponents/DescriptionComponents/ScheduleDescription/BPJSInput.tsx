import {
  HospitalItemType,
  InitialValueType,
} from "@/app/(tools)/HospitalTypes";
import React from "react";
import BooleanButton from "../../../GeneralComponents/BooleanButtonInput";
import { useGlobalContext } from "../../../../context/AppProvider";

type Props = {
  formKey: string;
  values: InitialValueType;
  formValue: HospitalItemType;
  handleValueChange: (value: { newValue: any; key: string }[]) => void;
};

const BPJSInput = ({
  formKey,
  values,
  formValue,
  handleValueChange,
}: Props) => {
  const {
    patientState: { patient },
  } = useGlobalContext();
  return (
    <div className="w-full">
      <small className="">{formValue?.title}</small>
      <BooleanButton
        booleanKey={formKey}
        booleanValue={values[formKey].value ? 1 : 0}
        handleClick={handleValueChange}
      />
      {values[formKey].value ? (
        <p className="admin-input">{patient.patient_profile.bpjs_number}</p>
      ) : null}
    </div>
  );
};

export default BPJSInput;
