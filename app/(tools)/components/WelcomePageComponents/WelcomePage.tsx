"use client";
import React from "react";

import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import Link from "next/link";
import {
  hospitalBtnDetail,
  patientBtnDetail,
} from "../../column/sidebarColumnKeys";
import { initialColumn } from "../../context/initialState";
import { useRouter } from "next/navigation";

type Props = {};

function WelcomePage(props: Props) {
  const {
    openAlert,
    handleShowDetail,
    assignColumn,
    hospitalState: { dataDoctor, selectedDoctor },
  } = useGlobalContext();
  const router = useRouter();
  return (
    <div className="page-main-container">
      <main className=" flex-center-center flex-col p-5 text-center">
        <h1 className=" font-oswald">Login Berhasil, selamat datang Admin </h1>
        <div className="grid grid-cols-2 gap-5 w-full max-w-2xl">
          <button
            onClick={() => {
              openAlert("inputmedicalrecord", {});
              handleShowDetail(patientBtnDetail[0]);
              assignColumn(initialColumn);
            }}
            className="btn-base"
          >
            Administrasi Pasien
          </button>
          <button
            onClick={() => {
              handleShowDetail(hospitalBtnDetail[0]);
              assignColumn(initialColumn);
              new Promise((resolve) => {
                resolve(selectedDoctor);
              }).then((res) => {
                if (res) {
                  router.push("/adminhospital/");
                  return res;
                }
              });
            }}
            className="btn-base"
          >
            Administrasi Rumah Sakit
          </button>
        </div>
      </main>
    </div>
  );
}

export default WelcomePage;
