import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { ConsultationMenuTypes, DoctorType } from "../types";
import AppointmentSelect from "./modalAppointment/AppointmentSelect";
import AppointmentDoctor from "./modalAppointment/AppointmentDoctor";

type Props = {};

const ModalAppointment = (props: Props) => {
  const {
    state: { modalValue },
    closeModal,
  } = useGlobalContext();
  const consultationInfo: ConsultationMenuTypes = modalValue;

  return (
    <div className=" modal-phone md:modal-xl ">
      <h3 className="modal-title">{consultationInfo.title}</h3>

      <button
        className="modal-close-btn"
        onClick={() => {
          closeModal();
        }}
      >
        <FontAwesomeIcon icon={faClose} />
      </button>
      <article className="flex flex-col gap-2 bg-white ">
        <mark>
          {consultationInfo.intro.map((item: string, index: number) => {
            return (
              <p className="body-3 md:body-2" key={index}>
                {item}
              </p>
            );
          })}
        </mark>
        <AppointmentSelect /> {/* cari poli yang dituju */}
        <AppointmentDoctor /> {/* contoh2 dokter yang tersedia */}
      </article>
      <article className=" w-full flex items-center justify-end pt-2 bg-white ">
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
