import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { ConsultationMenuTypes, DoctorType } from "../types";
import AppointmentSelect from "./modalComponents/modalAppointment/AppointmentSelect";
import AppointmentDoctor from "./modalComponents/modalAppointment/AppointmentDoctor";

type Props = {};

const ModalAppointment = (props: Props) => {
  const {
    state: { modalValue },
    closeModal,
  } = useGlobalContext();
  const consultationInfo: ConsultationMenuTypes = modalValue;

  return (
    <div className="modal-xl p-3 px-10 overflow-hidden bg-white">
      <h3 className=" col-span-2  w-full border-b border-greyBorder  font-light mb-4 bg-white">
        {consultationInfo.title}
      </h3>

      <button className="absolute top-2 right-4" onClick={() => closeModal()}>
        <FontAwesomeIcon icon={faClose} />
      </button>
      <article className="flex flex-col gap-3 ">
        <mark>
          {consultationInfo.intro.map((item: string, index: number) => {
            return (
              <p className="body-2" key={index}>
                {item}
              </p>
            );
          })}
        </mark>
        <AppointmentSelect /> {/* cari poli yang dituju */}
        <AppointmentDoctor /> {/* contoh2 dokter yang tersedia */}
      </article>
      <article className=" w-full flex items-center justify-end gap-3 pt-5 ">
        <button className="button-greenUrip">Pilih</button>
        <button
          className="button-greenUrip"
          onClick={() => {
            closeModal();
          }}
        >
          Batal
        </button>
      </article>
    </div>
  );
};

export default ModalAppointment;
