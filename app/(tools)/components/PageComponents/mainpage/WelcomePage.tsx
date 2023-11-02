"use client";
import React from "react";

import { useGlobalContext } from "@/app/(tools)/context/AppProvider";

type Props = {};

function WelcomePage(props: Props) {
  const { openAlert } = useGlobalContext();
  return (
    <div className="page-main-container">
      <main className=" flex-center-center flex-col p-5 text-center">
        <h1>Login Berhasil, selamat datang Riza </h1>
        <div className="grid grid-cols-2 gap-5 w-full max-w-2xl">
          <button
            onClick={() => openAlert("inputmedicalrecord", {})}
            className="btn-base"
          >
            Administrasi Pasien
          </button>
          <button className="btn-base">Administrasi Rumah Sakit</button>
        </div>
      </main>
    </div>
  );
}

export default WelcomePage;
