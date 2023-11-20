import {
  DoctorInitialValueType,
  HospitalItemType,
} from "@/app/(tools)/HospitalTypes";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { doctorForm } from "@/app/(tools)/utils/forms/DoctorDetailedForm";
import React, { useEffect, useState } from "react";

type DoctorRegularProps = {
  doctorValue: HospitalItemType;
  doctorDetail: any;
  doctorKey: string;
};

const DoctorRegular = ({
  doctorValue,
  doctorDetail,
  doctorKey,
}: DoctorRegularProps) => {
  const {
    state: { editable },
  } = useGlobalContext();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    doctorKey: string
  ) => {
    e.preventDefault();
  };

  return (
    <div className="w-full">
      <small className="">{doctorValue.title}</small>
      <input
        value={doctorDetail.toString()}
        onChange={(e) => handleChange(e, doctorKey)}
        className={
          editable && doctorValue.editable
            ? "admin-input"
            : "admin-input-disabled"
        }
      />
    </div>
  );
};

export default DoctorRegular;
