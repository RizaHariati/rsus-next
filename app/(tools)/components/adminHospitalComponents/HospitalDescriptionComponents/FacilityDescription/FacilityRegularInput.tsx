import {
  FacilityInitialValueType,
  HospitalItemType,
} from "@/app/(tools)/HospitalTypes";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = {
  facilityFormKey: string;
  facilityFormValue: HospitalItemType;
  facilityValues: FacilityInitialValueType;
  handleChangeValue: (value: { newValue: any; key: string }[]) => void;
};

const FacilityRegularInput = ({
  facilityFormKey,
  facilityFormValue,
  facilityValues,
  handleChangeValue,
}: Props) => {
  const {
    state: { editable },
    hospitalState: { dataFacility },
  } = useGlobalContext();

  const [text, setText] = useState(facilityValues?.[facilityFormKey].value);

  useEffect(() => {
    setText(facilityValues?.[facilityFormKey].value);
  }, [facilityValues]);

  const registerValue = () => {
    if (!text) {
      setText(facilityValues?.[facilityFormKey].value);
      toast.error("kolom tidak boleh kosong");
    }
    let sendValue = { newValue: text, key: facilityFormKey };

    if (facilityFormKey === "price") {
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

    handleChangeValue([{ ...sendValue }]);
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // console.log("triggered");
    return;
    e.preventDefault();
    const num = parseInt(e.target.value);
    if (facilityFormKey === "price") {
      if (!num) {
        setText(facilityValues?.[facilityFormKey].value);
        return toast.error("harga harus dalam bentuk angka");
      }
    }
    setText(e.target.value);
  };
  // const handleKeyDown = (
  //   e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   e.preventDefault();
  //   const key = e.key;

  //   if (key === "Escape") {
  //     setText(facilityValues?.[facilityFormKey].value);
  //   } else if (key === "Enter") {
  //     if (!text) {
  //       return toast.error("tidak boleh kosong");
  //     } else {
  //       registerValue();
  //     }
  //   }
  // };

  if (facilityFormKey === "function" || facilityFormKey === "description") {
    return (
      <div className="w-full">
        <small className="">{facilityFormValue.title}</small>
        <textarea
          id={facilityFormKey}
          rows={4}
          maxLength={500}
          value={text}
          onChange={(e) => handleChange(e)}
          // onKeyUp={(e) => {
          //   handleKeyDown(e);
          // }}
          // onBlur={() => registerValue()}
          className={
            editable && facilityFormValue.editable
              ? "admin-input h-32 transition-all overflow-hidden"
              : "admin-input-disabled transition-all overflow-hidden"
          }
        />
      </div>
    );
  }
  return (
    <div className="w-full touch-none" style={{ touchAction: "none" }}>
      <small className="">{facilityFormValue.title}</small>
      <input
        id={facilityFormKey}
        type={facilityFormKey === "price" ? "number" : "string"}
        disabled={!editable || !facilityFormValue.editable}
        value={text}
        onChange={(e) => {
          console.log("why");
          e.stopPropagation();
          e.preventDefault();
        }}
        // onChange={(e) => handleChange(e)}
        onKeyUp={(e) => {
          console.log("why");
          e.stopPropagation();
          e.preventDefault();
          // handleKeyDown(e);
        }}
        onBlur={() => registerValue()}
        className={
          editable && facilityFormValue.editable
            ? "admin-input touch-none"
            : "admin-input-disabled  touch-none"
        }
      />
    </div>
  );
};

export default FacilityRegularInput;
