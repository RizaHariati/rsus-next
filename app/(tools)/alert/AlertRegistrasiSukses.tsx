import React, { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";

import MainLogoImage from "../modal/MainLogoImage";
import { PatientInitialValueType } from "../modal/ModalRegister";
import { getMedicalRecord } from "../data/sample";

type Props = {};
const AlertRegistrasiSukses = (props: Props) => {
  const { state, closeAlert, closeModal } = useGlobalContext();
  const newPatientPersonal: PatientInitialValueType =
    state.alertValue.newPatientPersonal;

  useEffect(() => {
    setTimeout(() => {
      closeAlert();
      closeModal();
    }, 3000);
  }, []);

  if (!newPatientPersonal) return <div></div>;
  else {
    return (
      <div className="modal-md p-5 px-10 overflow-hidden bg-white">
        <button className="absolute top-2 right-4" onClick={() => closeAlert()}>
          <FontAwesomeIcon icon={faClose} />
        </button>
        <section className="bg-white border-none flex-center-center flex-col gap-5">
          <MainLogoImage />
          <p className="body-2-bold text-center capitalize">
            Assalamualaikum {newPatientPersonal.name.value}
          </p>
          <p>Selamat bergabung dengan RS Urip Sumoharjo</p>
          <div className="w-full">
            <p className="body-2-bold">Nomor Rekam Medis</p>
            <p className="dark-input text-lg uppercase p-1 px-2">
              {getMedicalRecord(
                newPatientPersonal["medical_record_number"].value
              )}
            </p>
          </div>
          <div className="w-full flex-center-center gap-2">
            <button
              onClick={() => {
                closeAlert();
                closeModal();
              }}
              className="button-greenUrip w-full"
            >
              Tutup
            </button>
          </div>
        </section>
      </div>
    );
  }
};

export default AlertRegistrasiSukses;
