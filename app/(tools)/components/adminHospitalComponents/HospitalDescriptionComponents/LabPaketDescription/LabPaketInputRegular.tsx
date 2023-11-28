import {
  HospitalItemType,
  LabPaketInitialValueType,
} from "@/app/(tools)/HospitalTypes";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import {
  faCircle,
  faCircleDot,
  faRadio,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

type Props = {
  labPaketFormKey: string;
  labPaketFormValue: HospitalItemType;
  labPaketValues: LabPaketInitialValueType;
};

const LabPaketInputRegular = ({
  labPaketFormKey,
  labPaketFormValue,
  labPaketValues,
}: Props) => {
  const {
    state: { editable },
    hospitalState: { dataPaket },
  } = useGlobalContext();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
  return (
    <div className="w-full">
      <small className="">{labPaketFormValue.title}</small>
      <input
        value={labPaketValues?.[labPaketFormKey].value.toString()}
        onChange={(e) => {
          handleChange(e);
        }}
        className={
          editable && labPaketFormValue.editable
            ? "admin-input"
            : "admin-input-disabled"
        }
      />
    </div>
  );
};

export default LabPaketInputRegular;
