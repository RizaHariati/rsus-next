import React, { useEffect, useState } from "react";
import { editMRValue } from "../utils/editMRValue";

type Props = {
  medical_record_number: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, type: string) => void;
};

const InputMedicalRecord = ({ medical_record_number, handleChange }: Props) => {
  const [keypressed, setKeypressed] = useState("maju");
  const element = document?.getElementById("input_mr");
  useEffect(() => {
    const getKeyName = (e: KeyboardEvent) => {
      if (e.key === "Backspace" || e.key === "Delete") {
        setKeypressed("mundur");
      } else {
        setKeypressed("maju");
      }
    };
    element?.addEventListener("keydown", getKeyName);
    return () => {
      element?.removeEventListener("keydown", getKeyName);
    };
  }, [element]);
  return (
    <div className="w-full">
      <p className="text-left w-full">Nomor Rekam Medis (MR)</p>
      <input
        id="input_mr"
        placeholder="masukkan nomor rekam medis"
        className="active-input"
        value={editMRValue(medical_record_number, keypressed)}
        onChange={(e) => handleChange(e, "mrnumber")}
      />
    </div>
  );
};

export default InputMedicalRecord;
