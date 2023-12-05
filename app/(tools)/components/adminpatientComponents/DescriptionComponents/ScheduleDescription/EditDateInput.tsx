import { InitialValueType } from "@/app/(tools)/HospitalTypes";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { PatientItemType } from "@/app/(tools)/patientTypes";
import moment from "moment";
import React, { useState } from "react";

type Props = {
  formKey: string;
  values: InitialValueType;
  formValue: PatientItemType;
  handleValueChange: (value: { newValue: any; key: string }[]) => void;
};

const EditDateInput = ({
  formKey,
  formValue,
  values,
  handleValueChange,
}: Props) => {
  const {
    state: { editable },
  } = useGlobalContext();
  const [text, setText] = useState(values[formKey].value || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setText(e.target.value);
  };
  return (
    <div className="w-full">
      <small className="">{formValue?.title}</small>
      <input
        value={moment(text).format("DD MMMM YYYY")}
        onChange={(e) => handleChange(e)}
        disabled={!editable}
        className={
          editable && formValue.editable
            ? "admin-input "
            : "admin-input-disabled"
        }
      />
    </div>
  );
};

export default EditDateInput;
