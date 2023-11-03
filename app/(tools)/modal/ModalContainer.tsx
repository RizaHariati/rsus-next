"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";

import { enterOpacity } from "@/app/(tools)/framervariants/variants";
import { useGlobalContext } from "../context/AppProvider";

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
          className="w-screen h-screen bg-black  bg-opacity-50 overflow-hidden fixed top-0 left-0 z-[50] p-3  md:p-0"
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
  // if (modalTitle === "inpatient") {
  //   return <ModalInpatient />;
  // }

  return <div></div>;
};
