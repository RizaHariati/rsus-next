import {
  InitialValueType,
  HospitalItemType,
} from "@/app/(tools)/HospitalTypes";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

type TextAreaInputProps = {
  formKey: string;
  values: InitialValueType;
  formValue: HospitalItemType;
  handleValueChange: (value: { newValue: any; key: string }[]) => void;
};

const TextAreaInput = ({
  formKey,
  values,
  formValue,
  handleValueChange,
}: TextAreaInputProps) => {
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

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();

    if (!editable) {
      return setText(
        formKey === "poliklinik" ? formDetail.title! : formDetail.toString()
      );
    }

    const newText = e.target.value;
    //@ts-ignore
    if (formValue.number) {
      if (!parseInt(newText) && newText !== "")
        return toast.error("harus dalam bentuk angka");
      if (newText.length > 10) return toast.error("angka terlalu besar");
    }

    setText(newText);
  };

  const registerValue = () => {
    if (!text) {
      setText(
        formKey === "poliklinik" ? formDetail.title! : formDetail.toString()
      );
      return toast.error("tidak boleh kosong");
    }
    let sendValue = { newValue: text, key: formKey };

    handleValueChange([{ ...sendValue }]);
  };

  return (
    <div className="w-full">
      <small className="">{formValue.title}</small>
      <textarea
        id={formKey}
        rows={4}
        maxLength={500}
        value={text}
        onChange={(e) => handleChange(e)}
        onBlur={() => registerValue()}
        className={
          editable && formValue.editable
            ? "admin-input h-fit transition-all overflow-y-scroll"
            : "admin-input-disabled transition-all overflow-hidden"
        }
      />
    </div>
  );
};

export default TextAreaInput;
