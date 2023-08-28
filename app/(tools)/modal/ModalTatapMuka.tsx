import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { ConsultationMenuTypes, DoctorType } from "../types";
import dataConsultation from "@/app/(tools)/data/data_consultation.json";
import AppoinmentCalendarIcon from "./modalAppointment/AppoinmentCalendarIcon";
import { samplePatient } from "../utils/forms/samplePatient";

type Props = {};

const ModalTatapMuka = (props: Props) => {
  const {
    state: { modalValue },
    openModal,
    closeModal,
  } = useGlobalContext();
  const doctorInfo: DoctorType = modalValue.doctorInfo;
  const consultationInfo: ConsultationMenuTypes = modalValue.consultationInfo;
  const [bpjs, setBpjs] = useState(true);
  return (
    <div className="modal-lg p-3 px-10 overflow-hidden bg-white">
      <button
        className="absolute top-2 right-4"
        onClick={() => openModal(consultationInfo.modal, consultationInfo)}
      >
        <FontAwesomeIcon icon={faClose} />
      </button>
      <h3 className=" col-span-2  w-full border-b border-greyBorder  font-light mb-4 bg-white">
        cek antrian tatap muka
      </h3>
      <section className="bg-white  border-0 grid grid-cols-2 gap-5 ">
        <mark className=" flex flex-col gap-2 ">
          <div>
            <p>Konsultasi dengan:</p>
            <p className="dark-input">{doctorInfo.nama}</p>
          </div>
          <div>
            <p>Nomor WhatsApp untuk nomor antrian</p>
            <p className="active-input">{samplePatient.profile.phone}</p>
            <p className=" text-redBase footnote-1">
              Nomor HP tidak sama dengan nomor pada Rekam Medik, abaikan jika
              memang anda mengganti nomor
            </p>
          </div>
          <div>
            <p>Hari yang anda pilih</p>
            <p className="active-input">12/09/2023</p>
          </div>
          <div>
            <p>Antrian 7 hari kedepan (pilih 1)</p>
            <AppoinmentCalendarIcon />
          </div>
          <div className="body-3 in">
            Nomor Rekam Medis didapatkan saat anda mendaftar sebagai pasien RS
            Urip Sumoharjo. Jika anda belum memiliki nomor Rekam medis, silahkan
            <button
              onClick={() => {
                openModal("registration", dataConsultation[2]);
                //   dataConsultation[2] adalah data untuk menu registrasi
              }}
              className=" text-redBase font-medium ml-3 hover:font-bold transition-all"
            >
              MENDAFTAR SEBAGAI PASIEN BARU
            </button>
          </div>
        </mark>
        <mark className=" flex flex-col gap-2 items-center justify-between w-full">
          <div className=" flex flex-col gap-2 w-full">
            <div>
              <p>Masukkan nomor Rekam Medis (MR) Anda </p>
              <p className="active-input">US-XXXX-XXXX-XX</p>
            </div>
            <div>
              <p>Apakah anda menggunakan jaminan BPJS?</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setBpjs(true)}
                  className={
                    bpjs
                      ? "button-greenUrip w-full text-sm h-10"
                      : "button-grey w-full text-sm h-10"
                  }
                >
                  Menggunakan Bpjs
                </button>
                <button
                  onClick={() => setBpjs(false)}
                  className={
                    !bpjs
                      ? "button-greenUrip w-full text-sm h-10"
                      : "button-grey w-full text-sm h-10"
                  }
                >
                  Tanpa Bpjs (umum)
                </button>
              </div>
            </div>
            <div
              className={
                bpjs
                  ? "h-20 overflow-hidden transition-all "
                  : "h-0 overflow-hidden transition-all"
              }
            >
              <p>Masukkan nomor BPJS Anda </p>
              <p className="active-input">{samplePatient.bpjs_number}</p>
            </div>
          </div>
          <button
            onClick={() => closeModal()}
            className="button-greenUrip w-1/2 h-10 ml-auto"
          >
            {bpjs ? "Daftarkan BPJS" : "Daftarkan Umum"}
          </button>
        </mark>
      </section>
    </div>
  );
};

export default ModalTatapMuka;
