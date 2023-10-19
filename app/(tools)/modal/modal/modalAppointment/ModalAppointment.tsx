import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { AppointmentMenuTypes } from "../../types";
import AppointmentSelect from "./AppointmentSelect";
import AppointmentDoctor from "./AppointmentDoctor";

type Props = {};

const ModalAppointment = (props: Props) => {
  const {
    state: { modalValue },
    closeModal,
  } = useGlobalContext();
  const appointmentInfo: AppointmentMenuTypes = modalValue;

  return (
    <div className=" modal-phone md:modal-xl ">
      <h3 className="modal-title">{appointmentInfo.title}</h3>

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
          {appointmentInfo.intro.map((item: string, index: number) => {
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
