import React from "react";

type Props = {};

const SelectDate = (props: Props) => {
  return (
    <div className="w-full flex gap-2 flex-col h-16">
      <p className="btn-3-bold">
        Pilih tanggal berobat
        <span className="normal-case tracking-normal">
          (Maksimal 7 hari ke depan)
        </span>
      </p>
      <div className="standard-border">
        <p className="btn-3 p-2">DD/MM/YYYY</p>
      </div>
    </div>
  );
};

export default SelectDate;
