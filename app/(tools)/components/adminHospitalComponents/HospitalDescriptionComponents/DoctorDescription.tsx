import {
  DoctorInitialValueType,
  HospitalItemType,
} from "@/app/(tools)/HospitalTypes";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { doctorForm } from "@/app/(tools)/utils/forms/DoctorDetailedForm";
import React, { useEffect, useState } from "react";
import DoctorHari from "./DoctorDescriptions.tsx/DoctorHari";

import DoctorWaktu from "./DoctorDescriptions.tsx/DoctorWaktu";

type Props = {};

const DoctorDescription = (props: Props) => {
  const {
    state: { columnAssignment, editable },
    hospitalState: { selectedDoctor, dataDoctor },
  } = useGlobalContext();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const [doctorValues, setDoctorValues] = useState<DoctorInitialValueType>({});
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    doctorKey: string
  ) => {
    e.preventDefault();
  };
  const formInputDoctor = Object.entries(doctorForm);
  return (
    <form
      className="column-description-container "
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="column-description-content">
        {formInputDoctor.map(([doctorKey, doctorValue], index) => {
          //@ts-ignore
          const doctorDetail: any = selectedDoctor?.[doctorKey] || "";

          if (doctorKey === "hari") {
            return (
              <DoctorHari
                key={index}
                doctorValue={doctorValue}
                doctorDetail={doctorDetail}
              />
            );
          }
          if (doctorKey === "poliklinik") {
            return (
              <div key={index} className="w-full">
                <small className="">{doctorValue.title}</small>
                <input
                  value={doctorDetail?.title!}
                  onChange={(e) => handleChange(e, doctorKey)}
                  className={
                    editable && doctorValue.editable
                      ? "admin-input"
                      : "admin-input-disabled"
                  }
                />
              </div>
            );
          }
          if (doctorKey === "waktu") {
            return (
              <DoctorWaktu
                key={index}
                doctorValue={doctorValue}
                doctorDetail={doctorDetail}
              />
            );
          }
          return (
            <RegularInput
              key={index}
              doctorValue={doctorValue}
              doctorDetail={doctorDetail}
              handleChange={handleChange}
              doctorKey={doctorKey}
            />
          );
        })}
      </div>
      <div className="content-menu border-t">
        <button
          type="submit"
          className={
            editable ? "btn-base-focus px-12 " : "btn-base-small w-28 px-12"
          }
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default DoctorDescription;

type DoctorRegularProps = {
  doctorValue: HospitalItemType;
  doctorDetail: any;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    doctorKey: string
  ) => void;
  doctorKey: string;
};
const RegularInput = ({
  doctorValue,
  doctorDetail,
  handleChange,
  doctorKey,
}: DoctorRegularProps) => {
  const {
    state: { editable },
  } = useGlobalContext();
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
