"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";

import { enterOpacity } from "@/app/(tools)/framervariants/variants";
import { useGlobalContext } from "../context/AppProvider";
import ModalInpatient from "./ModalInpatient";

type Props = {};

const ModalContainer = (props: Props) => {
  const {
    state: { showModal, modalValue },
  } = useGlobalContext();
  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          variants={enterOpacity}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 1 }}
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
  return <div></div>;
};