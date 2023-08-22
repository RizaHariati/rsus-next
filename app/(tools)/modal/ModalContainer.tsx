"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";

import { enterOpacity } from "@/app/(tools)/framervariants/variants";
import { useGlobalContext } from "../context/AppProvider";
import ModalInpatient from "./ModalInpatient";
import ModalFacility from "./ModalFacility";
import ModalPaket from "./ModalPaket";
import ModalPoliklinik from "./ModalPoliklinik";

type Props = {};

const ModalContainer = (props: Props) => {
  const {
    state: { showModal },
  } = useGlobalContext();
  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          variants={enterOpacity}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-screen h-screen bg-black  bg-opacity-50 overflow-hidden fixed top-0 left-0 z-50"
        >
          <ModalContent />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalContainer;

const ModalContent = () => {
  const {
    state: { modalTitle },
  } = useGlobalContext();
  if (modalTitle === "inpatient") {
    return <ModalInpatient />;
  }
  if (modalTitle === "facility") {
    return <ModalFacility />;
  }
  if (modalTitle === "paketLab") {
    return <ModalPaket />;
  }
  if (modalTitle === "poliklinik") {
    return <ModalPoliklinik />;
  }
  return <div></div>;
};
