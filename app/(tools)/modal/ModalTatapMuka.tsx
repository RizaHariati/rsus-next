import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { ConsultationMenuTypes, DoctorType } from "../types";

import dayjs from "dayjs";
import RegisterSuggestion from "./RegisterSuggestion";
import { getMedicalRecord } from "../data/sample";
import AppointmentCalendarIcon from "./modalAppointment/AppointmentCalendarIcon";
import { NotificationType, ScheduledType } from "../patientTypes";
import { toast } from "react-toastify";
import { getScheduleID } from "../utils/getScheduleID";
import { getNotificationID } from "../utils/getNotificationID";

type Props = {};

const ModalTatapMuka = (props: Props) => {
  const {
    state: { modalValue, selected_date },
    patientState: { patient },
    openModal,
    closeModal,
    addingSchedule,
  } = useGlobalContext();
  const doctorInfo: DoctorType = modalValue.doctorInfo;
  const consultationInfo: ConsultationMenuTypes = modalValue.consultationInfo;
  const [bpjs, setBpjs] = useState(true);
  const [newPhoneNumber, setNewPhoneNumber] = useState(
    patient.patient_profile.phone
  );

  const matchSelectedDate = doctorInfo.hari.find((doctorHari) => {
    const day =
      dayjs(selected_date).day() === 0 ? 7 : dayjs(selected_date).day();
    return doctorHari.id_hari === day;
  });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (newPhoneNumber.length < 16) {
      setNewPhoneNumber(e.currentTarget.value);
    }
  };

  const handleTatapMuka = () => {
    if (!newPhoneNumber) {
      return toast.error("nomor telpon tidak boleh kosong", {
        position: "top-center",
      });
    }
    if (newPhoneNumber.length < 10) {
      return toast.error("nomor telpon terlalu pendek", {
        position: "top-center",
      });
    }
    if (!selected_date) {
      return toast.error("Tanggal tidak boleh kosong", {
        position: "top-center",
      });
    }
    const date =
      dayjs(selected_date).format("MM/DD/YYYY") +
      doctorInfo.jam.slice(3, 9).replace(".", ":");

    const newScheduleID = getScheduleID(patient.scheduled_appointments);
    const schedule: ScheduledType = {
      current_phone: newPhoneNumber,
      schedule_id: newScheduleID,
      tujuan: [doctorInfo.id],
      appointment_type: "tatap_muka",
      scheduled_date: new Date(date),
      register_date: new Date(),
      using_bpjs: bpjs,
      nomor_antrian: Math.floor(Math.random() * doctorInfo.kuota + 1),
    };
    const newNotif: NotificationType = {
      id: getNotificationID(patient.notifications),
      notification_code: "ncat-002",
      schedule_code: newScheduleID,
      notification_date: new Date(),
      seen: false,
    };

    const promiseTatapMuka = new Promise((resolve) => {
      addingSchedule(schedule, newNotif);
      setTimeout(() => {
        resolve(closeModal());
      }, 1000);
    });
    toast.promise(promiseTatapMuka, {
      pending: "Mendaftarkan Jadwal",
      success: `Pertemuan tatap muka dengan ${doctorInfo.nama} berhasil dijadwalkan`,
      error: "Schedule rejected ",
    });
  };
  return (
    <div className="modal-phone md:modal-lg">
      <button
        className="modal-close-btn"
        onClick={() => openModal(consultationInfo.modal, consultationInfo)}
      >
        <FontAwesomeIcon icon={faClose} />
      </button>
      <h3 className=" modal-title">cek antrian tatap muka</h3>
      <section className="bg-white  border-0 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5 ">
        <mark className=" flex flex-col gap-2 ">
          <div>
            <p>Konsultasi dengan:</p>
            <p className="dark-input">{doctorInfo.nama}</p>
          </div>
          <div>
            <p>Nomor WhatsApp untuk nomor antrian</p>
            <input
              type="number"
              maxLength={16}
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
        <mark className=" flex flex-col gap-1 md:gap-2 items-center justify-between w-full">
          <div className=" flex flex-col  gap-1 md:gap-2 w-full">
            <div>
              <p>Nomor Rekam Medis (MR) </p>
              <p className="active-input">
                {getMedicalRecord(patient.medical_record_number)}
              </p>
            </div>
            <div>
              <p>Apakah anda menggunakan jaminan BPJS?</p>
              <div className="grid grid-cols-2  gap-1 md:gap-2">
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
                  ? "h-16 md:h-20 overflow-hidden transition-all "
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
            onClick={() => {
              handleTatapMuka();
            }}
            className="button-greenUrip w-full md:w-1/2 h-10 ml-auto"
          >
            {bpjs ? "Daftarkan BPJS" : "Daftarkan Umum"}
          </button>
        </mark>
      </section>
    </div>
  );
};

export default ModalTatapMuka;
