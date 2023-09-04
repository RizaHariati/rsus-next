import React from "react";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import dataConsultation from "@/app/(tools)/data/data_consultation.json";

type Props = {};

const RegisterSuggestion = (props: Props) => {
  const { openModal } = useGlobalContext();
  return (
    <div className="body-3 leading-4 ">
      Nomor Rekam Medis didapatkan saat anda mendaftar sebagai pasien RS Urip
      Sumoharjo. Jika anda belum memiliki nomor Rekam medis, silahkan
      <button
        type="button"
        onClick={() => {
          openModal("registration", {});
        }}
        className=" text-redBase font-medium ml-3 hover:font-bold transition-all"
      >
        MENDAFTAR SEBAGAI PASIEN BARU
      </button>
    </div>
  );
};

export default RegisterSuggestion;
