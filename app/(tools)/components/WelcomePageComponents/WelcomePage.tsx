"use client";
import React, { useEffect, useState } from "react";

import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import {
  hospitalBtnDetail,
  patientBtnDetail,
} from "../../column/sidebarColumnKeys";
import { initialColumn } from "../../context/initialState";
import { useRouter } from "next/navigation";
import LoadingHome from "../../../(site)/loading";
import dayjs from "dayjs";
import { toast } from "react-toastify";

type Props = {};

function WelcomePage(props: Props) {
  const {
    openAlert,
    handleShowDetail,
    assignColumn,
    state: { token },
    hospitalState: { selectedDoctor },
  } = useGlobalContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAdminPatientBtn = () => {
    if (!token) return router.push("/login");
    openAlert("inputmedicalrecord", {});
    handleShowDetail(patientBtnDetail[0]);
    assignColumn(initialColumn);
  };
  const handleAdminHospitalBtn = () => {
    if (!token) return router.push("/login");
    const promise1 = new Promise((resolve) => {
      setLoading(true);
      console.log("one");
      resolve(handleShowDetail(hospitalBtnDetail[0]));
    });
    const promise2 = new Promise((resolve) => {
      console.log("two");
      resolve(assignColumn(initialColumn));
    });
    const promise3 = new Promise((resolve) => {
      console.log("three");
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
  const {} = useGlobalContext();
  return (
    <main className=" flex-center-center flex-col p-5 text-center h-[calc(100vh-114px)] md:h-full">
      <div>
        <h1 className=" font-oswald text-2xl md:text-3xl">
          Laman Administrasi
        </h1>
        <h1 className=" font-oswald  text-2xl md:text-3xl">
          RS. Urip Sumoharjo
        </h1>
        <h5 className="font-normal w-2/3 mx-auto">
          Waktu mengedit dibatasi selama 5 menit, setelah itu anda harus login
          kembali
        </h5>
      </div>

      <div className="grid grid-cols-2 gap-2 md:ap-5 w-full max-w-2xl mt-5">
        <button
          onClick={() => {
            handleAdminPatientBtn();
          }}
          className="btn-base w-40 md:w-full h-20 md:h-12 border-greyBorder  px-5"
        >
          Administrasi Pasien
        </button>
        <button
          onClick={() => {
            handleAdminHospitalBtn();
          }}
          className="btn-base w-40 md:w-full h-20 md:h-12 border-greyBorder px-5"
        >
          Administrasi Rumah Sakit
        </button>
      </div>
    </main>
  );
};
