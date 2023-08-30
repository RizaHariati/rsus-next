"use client";
import React, { useState } from "react";

type Props = {
  keyword: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const FindPoliklinik = ({ keyword, handleChange, handleSubmit }: Props) => {
  return (
    <div className=" z-20 bg-white w-full h-24     p-2 transition-all  flex  flex-col">
      <p className="btn-3-bold">Cari Poliklinik</p>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="w-full h-full flex items-end justify-center flex-col gap-2"
      >
        <input
          placeholder="Cari fasilitas"
          className="active-input"
          value={keyword}
          onChange={(e) => handleChange(e)}
        />
        <button type="submit" className="button-greenUrip text-sm">
          Hapus
        </button>
      </form>
    </div>
  );
};

export default FindPoliklinik;
