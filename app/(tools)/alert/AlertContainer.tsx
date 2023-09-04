"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";

import { enterOpacity } from "@/app/(tools)/framervariants/variants";
import { useGlobalContext } from "../context/AppProvider";
import AlertVerifikasi from "./AlertVerifikasi";
import AlertNotLogin from "./AlertNotLogin";
import AlertRegistrasiSukses from "./AlertRegistrasiSukses";

type Props = {};

const AlertContainer = (props: Props) => {
  const {
    state: { showAlert },
  } = useGlobalContext();
  return (
    <AnimatePresence>
      {showAlert && (
        <motion.div
          variants={enterOpacity}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-screen h-screen bg-black bg-opacity-50 overflow-hidden fixed top-0 left-0 z-[60]"
        >
          <ModalContent />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AlertContainer;

const ModalContent = () => {
  const {
    state: { alertTitle },
  } = useGlobalContext();
  if (alertTitle === "notlogin") {
    return <AlertNotLogin />;
  }
  if (alertTitle === "verifikasi") {
    return <AlertVerifikasi />;
  }
  if (alertTitle === "registrasisukses") {
    return <AlertRegistrasiSukses />;
  }
  return <div></div>;
};
