"use client";
import React, { useState } from "react";

import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import Link from "next/link";
import {
  hospitalBtnDetail,
  patientBtnDetail,
} from "../../column/sidebarColumnKeys";
import { initialColumn } from "../../context/initialState";
import { useRouter } from "next/navigation";
import LoadingPage from "@/app/(site)/adminhospital/loading";
import LoadingHome from "../../../(site)/loading";

type Props = {};

function WelcomePage(props: Props) {
  const {
    openAlert,
    handleShowDetail,
    assignColumn,
    hospitalState: { dataDoctor, selectedDoctor },
  } = useGlobalContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAdminPatientBtn = () => {
    openAlert("inputmedicalrecord", {});
    handleShowDetail(patientBtnDetail[0]);
    assignColumn(initialColumn);
  };
  const handleAdminHospitalBtn = () => {
    const promise1 = new Promise((resolve) => {
      setLoading(true);
      resolve(handleShowDetail(hospitalBtnDetail[0]));
    });
    const promise2 = new Promise((resolve) => {
      resolve(assignColumn(initialColumn));
    });
    const promise3 = new Promise((resolve) => {
      resolve(selectedDoctor);
    });

    Promise.all([promise1, promise2, promise3]).then((res) => {
      if (res) {
        setLoading(false);
        router.push("/adminhospital/");
        return res;
      }
    });
  };
  return (
    <div className="page-main-container">
      {!loading && (
        <MainSection
          handleAdminPatientBtn={handleAdminPatientBtn}
          handleAdminHospitalBtn={handleAdminHospitalBtn}
        />
      )}
      {loading && <LoadingHome />}
    </div>
  );
}

export default WelcomePage;

type MainSectionProps = {
  handleAdminHospitalBtn: () => void;
  handleAdminPatientBtn: () => void;
};

const MainSection = ({
  handleAdminPatientBtn,
  handleAdminHospitalBtn,
}: MainSectionProps) => {
  return (
    <main className=" flex-center-center flex-col p-5 text-center">
      <h1 className=" font-oswald">Login Berhasil, selamat datang Admin </h1>
      <div className="grid grid-cols-2 gap-5 w-full max-w-2xl">
        <button
          onClick={() => {
            handleAdminPatientBtn();
          }}
          className="btn-base w-32 md:w-full h-20 md:h-12"
        >
          Administrasi Pasien
        </button>
        <button
          onClick={() => {
            handleAdminHospitalBtn();
          }}
          className="btn-base w-32 md:w-full h-20 md:h-12"
        >
          Administrasi Rumah Sakit
        </button>
      </div>
    </main>
  );
};
