import React, { SetStateAction } from "react";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { UserType } from "../patientTypes";
type Props = {
  setLoginData: React.Dispatch<SetStateAction<Partial<UserType>>>;
};

const RegisterSuggestion = ({ setLoginData }: Props) => {
  const { openModal } = useGlobalContext();
  return (
    <div className="body-3 leading-5 text-center">
      Nomor Rekam Medis didapatkan saat anda mendaftar sebagai pasien RS Urip
      Sumoharjo. Jika anda belum memiliki nomor Rekam medis, silahkan
      <button
        type="button"
        onClick={() => {
          openModal("registration", { newPatientPersonal: null });
          setLoginData({
            medical_record_number: "",
            password: "",
          });
        }}
        className=" text-redBase font-medium ml-3 hover:font-bold transition-all text-center"
      >
        MENDAFTAR SEBAGAI PASIEN BARU
      </button>
    </div>
  );
};

export default RegisterSuggestion;
