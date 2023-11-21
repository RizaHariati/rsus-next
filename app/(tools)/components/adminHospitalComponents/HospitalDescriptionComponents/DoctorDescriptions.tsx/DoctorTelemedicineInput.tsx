import {
  DoctorInitialValueType,
  HospitalItemType,
} from "@/app/(tools)/HospitalTypes";
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
  const doctorDetail: any = doctorValues?.[doctorKey]?.value || "";
  if (doctorKey === "telemedicine") {
    return (
      <div className="w-full ">
        <small>{doctorKey}</small>
        <BooleanButton
          booleanKey={doctorKey}
          booleanValue={doctorDetail}
          handleClick={handleValueChange}
        />
      </div>
    );
  } else {
    if (doctorValues?.["telemedicine"].value !== 1) {
      return <div></div>;
    } else {
      return (
        <>
          {doctorKey === "biaya_telemedicine" && (
            <DoctorRegular
              doctorValue={doctorValue}
              doctorDetail={doctorDetail}
              doctorKey={doctorKey}
            />
          )}
          {doctorKey === "sedang_online" && (
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
    }
  }
};
export default DoctorTelemedicineInput;
