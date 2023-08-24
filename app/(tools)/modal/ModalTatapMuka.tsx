import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faMagnifyingGlass,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { ConsultationMenuTypes, DoctorType } from "../types";

type Props = {};

const ModalTatapMuka = (props: Props) => {
  const {
    state: { modalValue },
    openModal,
  } = useGlobalContext();
  const doctorInfo: DoctorType = modalValue.doctorInfo;
  const consultationInfo: ConsultationMenuTypes = modalValue.consultationInfo;
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
      <section className="bg-white border-0">
        <mark className=" grid grid-cols-2">
          <div>
            <p>Konsultasi dengan:</p>
            <p className="dark-input">{doctorInfo.nama}</p>
          </div>
          <div></div>
        </mark>
      </section>
    </div>
  );
};

export default ModalTatapMuka;
