"use client";
import React from "react";

type Props = {};

const FindPoliklinik = (props: Props) => {
  return (
    <div className=" z-20 bg-white w-full h-24     p-2 transition-all  flex  flex-col">
      <p className="btn-3-bold">Cari Poliklinik</p>
      <form className="w-full h-full flex items-end justify-center flex-col gap-2">
        <input
          placeholder="Cari fasilitas"
          className="w-full standard-border h-full px-2  outline-none focus-visible:outline-none standard-border"
        />
        <button className="button-greenUrip text-sm">Cari</button>
      </form>
    </div>
  );
};

export default FindPoliklinik;
