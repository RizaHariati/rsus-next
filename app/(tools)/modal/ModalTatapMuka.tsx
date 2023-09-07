import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { ConsultationMenuTypes, DoctorType } from "../types";

import dayjs from "dayjs";
import RegisterSuggestion from "./RegisterSuggestion";
import { getMedicalRecord } from "../data/sample";
import AppointmentCalendarIcon from "./modalAppointment/AppointmentCalendarIcon";

type Props = {};

const ModalTatapMuka = (props: Props) => {
  const {
    state: { modalValue, selected_date },
    patientState: { patient },
    openModal,
    closeModal,
  } = useGlobalContext();
  const doctorInfo: DoctorType = modalValue.doctorInfo;
  const consultationInfo: ConsultationMenuTypes = modalValue.consultationInfo;
  const [bpjs, setBpjs] = useState(true);
  const [newPhoneNumber, setNewPhoneNumber] = useState(
    patient.patient_profile.phone
  );

  const matchSelectedDate = doctorInfo.hari.find(
    (doctorHari) => doctorHari.id_hari === dayjs(selected_date).day()
  );

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewPhoneNumber(e.currentTarget.value);
  };
  return (
    <div className="modal-lg p-5 px-10 overflow-hidden bg-white">
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
            <input
              placeholder={patient.patient_profile.phone}
              className="active-input"
              value={newPhoneNumber}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handlePhoneChange(e)
              }
            />

            {patient.patient_profile.phone !== newPhoneNumber && (
              <p className=" text-redBase footnote-1">
                Nomor HP tidak sama dengan nomor pada Rekam Medik, abaikan jika
                memang anda mengganti nomor
              </p>
            )}
          </div>
          <div>
            <p>Hari yang anda pilih</p>
            <p className="active-input">
              {selected_date && matchSelectedDate
                ? dayjs(selected_date).format("DD MMMM YYYY")
                : "anda belum memilih hari"}
            </p>
          </div>
          <div>
            <p>Antrian 7 hari kedepan (pilih 1)</p>
            <AppointmentCalendarIcon />
          </div>
        </mark>
        <mark className=" flex flex-col gap-2 items-center justify-between w-full">
          <div className=" flex flex-col gap-2 w-full">
            <div>
              <p>Nomor Rekam Medis (MR) </p>
              <p className="active-input">
                {getMedicalRecord(patient.medical_record_number)}
              </p>
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
              <p className="active-input">
                {patient.patient_profile.bpjs_number}
              </p>
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
