import {
  DoctorInitialValueType,
  HospitalItemType,
} from "@/app/(tools)/HospitalTypes";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { doctorForm } from "@/app/(tools)/utils/forms/DoctorDetailedForm";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

type DoctorRegularProps = {
  doctorFormKey: string;
  doctorValues: DoctorInitialValueType;
  doctorFormValue: HospitalItemType;
  handleValueChange: (value: { newValue: any; key: string }[]) => void;
};

const DoctorRegular = ({
  doctorFormKey,
  doctorValues,
  doctorFormValue,
  handleValueChange,
}: DoctorRegularProps) => {
  const {
    state: { editable },
  } = useGlobalContext();
  const doctorDetail: any = doctorValues?.[doctorFormKey]?.value || "";
  const [text, setText] = useState<string | number>(
    doctorFormKey === "poliklinik"
      ? doctorDetail.title!
      : doctorDetail.toString()
  );

  useEffect(() => {
    setText(
      doctorFormKey === "poliklinik"
        ? doctorDetail.title!
        : doctorDetail.toString()
    );
    // eslint-disable-next-line
  }, [doctorValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!editable) {
      return setText(
        doctorFormKey === "poliklinik"
          ? doctorDetail.title!
          : doctorDetail.toString()
      );
    }
    const newText = e.target.value;
    //@ts-ignore

    if (
      doctorFormKey === "biaya_telemedicine" ||
      doctorFormKey === "biaya_tatapmuka"
    ) {
      if (parseInt(newText) > 1000000) {
        return toast.error("melebihi batas maximum konsultasi");
      }
      if (parseInt(newText) < 0) {
        return setText(0);
      }
    }
    if (doctorFormKey === "kuota" || doctorFormKey === "pengalaman") {
      if (parseInt(newText) > 50) {
        return toast.error("melebihi batas maksimal");
      }
      if (parseInt(newText) < 0) {
        return setText(1);
      }
    }

    setText(newText);
  };

  const registerValue = () => {
    let sendValue = { newValue: text, key: doctorFormKey };
    if (
      doctorFormKey === "biaya_telemedicine" ||
      doctorFormKey === "biaya_tatapmuka"
    ) {
      const newText = parseInt(text.toString());
      if (newText < 10000) {
        setText(10000);
        sendValue = { ...sendValue, newValue: 10000 };
      } else {
        const newText = parseInt(text.toString());
        const round = (num: number) => {
          return Math.round(num / 500) * 500;
        };
        setText(round(newText));
        sendValue = { ...sendValue, newValue: round(newText) };
      }
    }
    if (doctorFormKey === "kuota") {
      const newText = parseInt(text.toString());
      if (newText < 5) {
        setText(5);
        sendValue = { ...sendValue, newValue: 5 };
      }
    }
    handleValueChange([{ ...sendValue }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const key = e.key;

    if (key === "Escape") {
      setText(
        doctorFormKey === "poliklinik"
          ? doctorDetail.title!
          : doctorDetail.toString()
      );
    } else if (key === "Enter") {
      if (!text) {
        return toast.error("tidak boleh kosong");
      } else {
        registerValue();
      }
    }
  };

  return (
    <div className="w-full">
      <small className="">{doctorFormValue?.title}</small>
      <input
        disabled={!doctorFormValue?.editable}
        type={
          doctorFormKey === "biaya_telemedicine" ||
          doctorFormKey === "biaya_tatapmuka" ||
          doctorFormKey === "kuota" ||
          doctorFormKey === "pengalaman"
            ? "number"
            : "string"
        }
        value={text}
        onChange={(e) => handleChange(e)}
        // onKeyUp={(e) => {
        //   handleKeyDown(e);
        // }}
        // onBlur={() => registerValue()}
        className={
          editable && doctorFormValue.editable
            ? "admin-input"
            : "admin-input-disabled"
        }
      />
    </div>
  );
};

export default DoctorRegular;
