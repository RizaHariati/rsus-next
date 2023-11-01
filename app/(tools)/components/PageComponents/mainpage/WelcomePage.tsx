"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";

type Props = {};

function WelcomePage(props: Props) {
  const { openAlert } = useGlobalContext();
  return (
    <main className="h-screen w-full bg-hoverBG flex-center-center flex-col p-5 text-center">
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
  );
}

export default WelcomePage;
