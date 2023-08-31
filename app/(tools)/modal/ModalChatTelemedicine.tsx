import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { ConsultationMenuTypes, DoctorType } from "../types";

import dataConsultation from "@/app/(tools)/data/data_consultation.json";
import RegisterSuggestion from "./RegisterSuggestion";

type Props = {};

const ModalChatTelemedicine = (props: Props) => {
  const {
    state: { modalValue },
    openModal,
  } = useGlobalContext();
  const doctorInfo: DoctorType = modalValue.doctorInfo;
  const consultationInfo: ConsultationMenuTypes = modalValue.consultationInfo;
  return (
    <div className="modal-md p-10 py-5 overflow-hidden bg-white">
      <button
        className="absolute top-2 right-4"
        onClick={() => openModal(consultationInfo.modal, consultationInfo)}
      >
        <FontAwesomeIcon icon={faClose} />
      </button>
      <section className="bg-white flex flex-col gap-3 border-none">
        <p className="body-3">
          Kami akan terlebih dahulu mengkonfirmasi jadwal dokter yang
          bersangkutan, setelah itu anda diberikan waktu 5 menit untuk membayar
          uang konsultasi
        </p>
        <div className="body-2 sub-form">
          <p>Chat sekarang dengan: </p>
          <p className="dark-input">{doctorInfo.nama}</p>
        </div>
        <div>
          <p className="body-2">Spesialis</p>
          <p className="dark-input">{doctorInfo.poliklinik.title}</p>
        </div>

        <RegisterSuggestion />
        <div className="w-full flex-center-center">
          <button
            onClick={() =>
              openModal("bayartelemedicine", { doctorInfo, consultationInfo })
            }
            className="button-greenUrip w-fit mx-auto px-3"
          >
            Chat Telemedicine
          </button>
        </div>
      </section>
    </div>
  );
};

export default ModalChatTelemedicine;
