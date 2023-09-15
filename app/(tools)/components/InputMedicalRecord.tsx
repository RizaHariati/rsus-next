import React from "react";

type Props = {
  medical_record_number: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, type: string) => void;
};

const InputMedicalRecord = ({ medical_record_number, handleChange }: Props) => {
  return (
    <div className="w-full">
      <p className="text-left w-full">Nomor Rekam Medis (MR)</p>
      <input
        maxLength={12}
        id="input_mr"
        placeholder="masukkan nomor rekam medis"
        className="active-input"
        value={medical_record_number}
        onChange={(e) => handleChange(e, "mrnumber")}
      />
    </div>
  );
};

export default InputMedicalRecord;
