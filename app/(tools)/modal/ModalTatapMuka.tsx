import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faMagnifyingGlass,
  faCircle,
  faCalendarDays,
  faCalendarTimes,
  faCalendarWeek,
} from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { ConsultationMenuTypes, DoctorType } from "../types";
import { samplePatient } from "../utils/forms/samplePatient";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { numberToDay } from "../utils/forms/getDoctorDetailedInfo";
import dataConsultation from "@/app/(tools)/data/data_consultation.json";

type Props = {};

const gridColumn = [
  { length: 1, class: "antrian-grid grid-cols-1" },
  { length: 2, class: "antrian-grid grid-cols-2" },
  { length: 3, class: "antrian-grid grid-cols-3" },
  { length: 4, class: "antrian-grid grid-cols-4" },
  { length: 5, class: "antrian-grid grid-cols-5" },
  { length: 6, class: "antrian-grid grid-cols-6" },
];
const ModalTatapMuka = (props: Props) => {
  const {
    state: { modalValue },
    openModal,
    closeModal,
  } = useGlobalContext();
  const doctorInfo: DoctorType = modalValue.doctorInfo;
  const consultationInfo: ConsultationMenuTypes = modalValue.consultationInfo;
  const getWarnaKuota = (kuota: number) => {
    let kuotaClass = "kuota-icon text-greenUrip";
    if (kuota > 0.6 && kuota < 1) {
      kuotaClass = "kuota-icon text-accent1";
    }
    if (kuota === 1) {
      kuotaClass = "kuota-icon text-greyLit";
    }
    return kuotaClass;
  };
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
            <div>
              <div className="flex standard-border  p-2 gap-2 ">
                <div className="flex flex-col py-3 capitalize justify-between">
                  <p>Waktu</p>
                  <p>kuota</p>
                </div>
                {/* Memasukkan pasien yang sudah terdaftar per hari */}
                <div
                  className={
                    gridColumn.find(
                      (item) => item.length === doctorInfo.hari.length
                    )?.class
                  }
                >
                  {doctorInfo.hari.map((item, index: number) => {
                    const randomPatient = Math.floor(
                      Math.random() * doctorInfo.kuota + 1
                    );

                    return (
                      <div
                        key={item}
                        className="flex-center-center flex-col standard-border gap-1 p-1 cursor-pointer bg-white hover:bg-greyLit transition-all"
                      >
                        <p>
                          {numberToDay.find(
                            (itemKonsul) => itemKonsul.id === item
                          )?.hari || ""}
                        </p>

                        <div key={item}>
                          <FontAwesomeIcon
                            icon={faCalendarDays}
                            className={`${getWarnaKuota(
                              randomPatient / doctorInfo.kuota
                            )}`}
                          />
                        </div>
                        <p>{`${randomPatient}/${doctorInfo.kuota}`}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
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
                <button className="button-greenUrip w-full text-sm h-10">
                  Menggunakan Bpjs
                </button>
                <button className="button-grey w-full text-sm h-10">
                  Menggunakan Bpjs
                </button>
              </div>
            </div>
            <div>
              <p>Masukkan nomor BPJS Anda </p>
              <p className="active-input">0001454326918</p>
            </div>
          </div>
          <button
            onClick={() => closeModal()}
            className="button-greenUrip w-1/2 h-10 ml-auto"
          >
            Daftarkan BPJS
          </button>
        </mark>
      </section>
    </div>
  );
};

export default ModalTatapMuka;
