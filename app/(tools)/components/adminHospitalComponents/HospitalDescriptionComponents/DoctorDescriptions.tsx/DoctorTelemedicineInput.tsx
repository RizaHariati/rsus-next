import {
  DoctorInitialValueType,
  HospitalItemType,
} from "@/app/(tools)/HospitalTypes";
import React, { useState } from "react";
import DoctorRegular from "./DoctorRegular";

import BooleanButton from "../../BooleanButton";

type Props = {
  doctorKey: string;
  doctorValues: DoctorInitialValueType;
  doctorValue: HospitalItemType;
  handleValueChange: (value: { newValue: any; key: string }[]) => void;
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
    return (
      <div
        className={
          doctorValues?.["telemedicine"]?.value === 1
            ? "h-16 w-full overflow-hidden transition-all"
            : "h-0 w-full overflow-hidden transition-all"
        }
      >
        {doctorKey === "biaya_telemedicine" && (
          <DoctorRegular
            doctorValues={doctorValues}
            doctorValue={doctorValue}
            doctorKey={doctorKey}
            handleValueChange={handleValueChange}
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
      </div>
    );
  }
};
export default DoctorTelemedicineInput;
