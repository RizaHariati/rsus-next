import {
  DoctorInitialValueType,
  HospitalItemType,
} from "@/app/(tools)/HospitalTypes";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import React, { useState } from "react";
import DoctorRegular from "./DoctorRegular";

import BooleanButton from "./BooleanButton";

type Props = {
  doctorKey: string;
  doctorValues: DoctorInitialValueType;
  doctorValue: HospitalItemType;
  handleValueChange?: (value: { newValue: any; key: string }[]) => void;
};

const DoctorTelemedicineInput = ({
  doctorKey,
  doctorValues,
  doctorValue,
  handleValueChange,
}: Props) => {
  const doctorDetail: any = doctorValues?.[doctorKey].value || "";
  return (
    <>
      {doctorKey === "telemedicine" && (
        <div className="w-full ">
          <small>{doctorKey}</small>
          <BooleanButton
            booleanKey={doctorKey}
            booleanValue={doctorDetail}
            handleClick={handleValueChange}
          />
        </div>
      )}
      {doctorKey === "biaya_telemedicine" &&
        doctorValues?.["telemedicine"].value === 1 && (
          <DoctorRegular
            doctorValue={doctorValue}
            doctorDetail={doctorDetail}
            doctorKey={doctorKey}
          />
        )}
      {doctorKey === "sedang_online" &&
        doctorValues?.["telemedicine"].value === 1 && (
          <div className="w-full">
            <small>{doctorKey}</small>
            <BooleanButton
              booleanKey={doctorKey}
              booleanValue={doctorDetail}
              handleClick={handleValueChange}
            />
          </div>
        )}
    </>
  );
};
export default DoctorTelemedicineInput;
