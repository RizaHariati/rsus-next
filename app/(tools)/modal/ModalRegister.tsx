import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { ConsultationMenuTypes } from "../types";

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
    <div className="modal-xl p-5 px-10 overflow-hidden bg-white">
      <h3 className=" col-span-2  w-full border-b border-greyBorder  font-light mb-4 bg-white">
        {consultationInfo.title}
      </h3>

      <button className="absolute top-2 right-4" onClick={() => closeModal()}>
        <FontAwesomeIcon icon={faClose} />
      </button>
      <motion.div
        variants={enterTop}
        initial="initial"
        whileInView="animate"
        className="w-full  grid grid-cols-3 gap-5 h-full body-3 max-h-96 custom-scrollbar"
      >
        <div className=" col-span-2 flex flex-col gap-2 w-full">
          <div></div>
        </div>
      </motion.div>
      <div className=" w-full flex items-center justify-end gap-3 pt-5 ">
        <button className="button-greenUrip">Pilih</button>
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
