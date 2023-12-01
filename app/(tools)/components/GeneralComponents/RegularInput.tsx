import {
  InitialValueType,
  HospitalItemType,
} from "@/app/(tools)/HospitalTypes";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

type RegularInputProps = {
  formKey: string;
  values: InitialValueType;
  formValue: HospitalItemType;
  handleValueChange: (value: { newValue: any; key: string }[]) => void;
};

const RegularInput = ({
  formKey,
  values,
  formValue,
  handleValueChange,
}: RegularInputProps) => {
  const {
    state: { editable },
  } = useGlobalContext();
  const formDetail: any = useMemo(() => {
    return values?.[formKey]?.value || "";
  }, [values, formKey]);
  const [text, setText] = useState<string | number>(
    formKey === "poliklinik" ? formDetail.title! : formDetail.toString()
  );

  useEffect(() => {
    setText(
      formKey === "poliklinik" ? formDetail.title! : formDetail.toString()
    );
    // eslint-disable-next-line
  }, [values]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (!editable) {
      return setText(
        formKey === "poliklinik" ? formDetail.title! : formDetail.toString()
      );
    }

    const newText = e.target.value;

    //@ts-ignore
    if (formValue.number) {
      if (newText.length > 10) return toast.error("angka terlalu besar");
      return setText(parseInt(newText));
    } else {
      return setText(newText);
    }
  };

  const registerValue = () => {
    if (!text) {
      setText(
        formKey === "poliklinik" ? formDetail.title! : formDetail.toString()
      );
      return toast.error("tidak boleh kosong");
    }
    if (text === formDetail.title! || text === formDetail.toString()) {
      return;
    }
    let sendValue = { newValue: text, key: formKey };

    handleValueChange([{ ...sendValue }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const key = e.key;

    if (key === "Escape") {
      setText(
        formKey === "poliklinik" ? formDetail.title! : formDetail.toString()
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
      <small className="">{formValue?.title}</small>
      <input
        disabled={!formValue?.editable}
        type={formValue.number === false ? "string" : "number"}
        value={text}
        onChange={(e) => handleChange(e)}
        onBlur={() => registerValue()}
        className={
          !values
            ? "admin-input-disabled animate-pulse"
            : editable && formValue.editable
            ? "admin-input"
            : "admin-input-disabled"
        }
      />
    </div>
  );
};

export default RegularInput;
