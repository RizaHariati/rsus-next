import {
  DoctorInitialValueType,
  HospitalItemType,
} from "@/app/(tools)/HospitalTypes";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { doctorForm } from "@/app/(tools)/utils/forms/DoctorDetailedForm";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

type DoctorRegularProps = {
  doctorKey: string;
  doctorValues: DoctorInitialValueType;
  doctorValue: HospitalItemType;
  handleValueChange: (value: { newValue: any; key: string }[]) => void;
};

const DoctorRegular = ({
  doctorKey,
  doctorValues,
  doctorValue,
  handleValueChange,
}: DoctorRegularProps) => {
  const {
    state: { editable },
  } = useGlobalContext();
  const doctorDetail: any = doctorValues?.[doctorKey]?.value || "";
  const [text, setText] = useState<string | null>(null);

  useEffect(() => {
    setText(null);
  }, [doctorValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!editable) {
      return setText(null);
    }
    const newText = e.target.value;
    //@ts-ignore

    console.log(typeof newText === "number");
    if (newText === doctorDetail || newText === doctorDetail.title) {
      setText(null);
    } else {
      setText(newText);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const key = e.key;

    if (key === "Escape") {
      setText(null);
    } else if (key === "Enter") {
      if (!text) {
        return toast.error("tidak boleh kosong");
      } else {
        console.log({ newValue: text, key: "biaya_telemedicine" });
      }
    }
  };

  return (
    <div className="w-full">
      <small className="">{doctorValue?.title}</small>
      <input
        disabled={!doctorValue?.editable}
        type={
          doctorKey === "biaya_telemedicine" ||
          doctorKey === "biaya_tatapmuka" ||
          doctorKey === "kuota" ||
          doctorKey === "pengalaman"
            ? "number"
            : "string"
        }
        value={
          text
            ? text
            : doctorKey === "poliklinik"
            ? doctorDetail.title!
            : doctorDetail.toString()
        }
        onChange={(e) => handleChange(e)}
        onKeyUp={(e) => {
          handleKeyDown(e);
        }}
        onBlur={() => console.log({ newValue: text, key: doctorKey })}
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
