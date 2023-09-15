import React from "react";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
type Props = {};

const RegisterSuggestion = (props: Props) => {
  const { openModal } = useGlobalContext();
  return (
    <div className="body-3 leading-5 text-center">
      Nomor Rekam Medis didapatkan saat anda mendaftar sebagai pasien RS Urip
      Sumoharjo. Jika anda belum memiliki nomor Rekam medis, silahkan
      <button
        type="button"
        onClick={() => {
          openModal("registration", { newPatientPersonal: null });
        }}
        className=" text-redBase font-medium ml-3 hover:font-bold transition-all text-center"
      >
        MENDAFTAR SEBAGAI PASIEN BARU
      </button>
    </div>
  );
};

export default RegisterSuggestion;
