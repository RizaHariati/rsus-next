import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import {
  ConsultationMenuTypes,
  FormProfileType,
  PatientFormType,
} from "../types";

import { motion } from "framer-motion";
import { enterTop } from "../framervariants/variants";

type Props = {};

const ModalRegister = (props: Props) => {
  const {
    state: { modalValue },
    closeModal,
    openModal,
  } = useGlobalContext();
  const consultationInfo: ConsultationMenuTypes = modalValue;

  return (
    <div className="modal-lg p-5 px-10 overflow-hidden bg-white">
      <h3 className=" col-span-2  w-full border-b border-greyBorder  font-light mb-4 bg-white">
        {consultationInfo.title}
      </h3>
      <button className="absolute top-2 right-4" onClick={() => closeModal()}>
        <FontAwesomeIcon icon={faClose} />
      </button>
      <article>
        {consultationInfo.intro.map((item: string, index: number) => {
          return (
            <p className="body-3" key={index}>
              {item}
            </p>
          );
        })}
      </article>
      <article className="w-2/3 flex flex-col h-16">
        <p className="btn-3-bold">tanggal daftar pasien</p>
        <div className="standard-border">
          <p className="btn-3 p-2">DD/MM/YYYY</p>
        </div>
      </article>
      <article className="grid grid-cols-4">
        <div>all forms</div>
      </article>
      <div className=" w-full flex items-center justify-end gap-3 pt-5 ">
        <button className="button-greenUrip">Hapus</button>
        <button
          className="button-greenUrip"
          onClick={() => {
            closeModal();
          }}
        >
          Batal
        </button>
      </div>
    </div>
  );
};

export default ModalRegister;
