import {
  DoctorInitialValueType,
  HospitalItemType,
} from "@/app/(tools)/HospitalTypes";
import React, { useState } from "react";
import DoctorRegular from "./DoctorRegular";

import BooleanButton from "../../BooleanButton";

type Props = {
  doctorFormKey: string;
  doctorValues: DoctorInitialValueType;
  doctorFormValue: HospitalItemType;
  handleValueChange: (value: { newValue: any; key: string }[]) => void;
};

const DoctorTelemedicineInput = ({
  doctorFormKey,
  doctorValues,
  doctorFormValue,
  handleValueChange,
}: Props) => {
  const doctorDetail: any = doctorValues?.[doctorFormKey]?.value || "";
  if (doctorFormKey === "telemedicine") {
    return (
      <div className="w-full ">
        <small>{doctorFormKey}</small>
        <BooleanButton
          booleanKey={doctorFormKey}
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
        {doctorFormKey === "biaya_telemedicine" && (
          <DoctorRegular
            doctorValues={doctorValues}
            doctorFormValue={doctorFormValue}
            doctorFormKey={doctorFormKey}
            handleValueChange={handleValueChange}
          />
        )}
        {doctorFormKey === "sedang_online" && (
          <div className="w-full">
            <small>{doctorFormKey}</small>
            <BooleanButton
              booleanKey={doctorFormKey}
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
