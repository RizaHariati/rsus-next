"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";

import { enterOpacity } from "@/app/(tools)/framervariants/variants";
import { useGlobalContext } from "../context/AppProvider";
import ModalInpatient from "./ModalInpatient";
import ModalFacility from "./ModalFacility";
import ModalPaket from "./modalLaboratorium/ModalPaket";
import ModalPoliklinik from "./ModalPoliklinik";
import ModalAppointment from "./ModalAppointment";
import ModalRegister from "./ModalRegister";
import ModalTelemedicine from "./ModalTelemedicine";
import ModalDoctorDetail from "./ModalDoctorDetail";
import ModalChatTelemedicine from "./ModalChatTelemedicine";
import ModalBayarTelemedicine from "./modalPembayaran/ModalBayarTelemedicine";
import ModalInConstruction from "./ModalInConstruction";
import ModalTatapMuka from "./ModalTatapMuka";
import ModalLabCarts from "./modalLaboratorium/ModalLabCarts";
import ModalBayarLaboratorium from "./modalPembayaran/ModalBayarLaboratorium";
import ModalRegisterPassword from "./modalRegister/ModalRegisterPassword";

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
          className="w-screen h-screen bg-black  bg-opacity-50 overflow-hidden fixed top-0 left-0 z-[50] p-3  pb-10 md:p-0"
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
  if (modalTitle === "appointment") {
    return <ModalAppointment />;
  }
  if (modalTitle === "telemedicine") {
    return <ModalTelemedicine />;
  }
  if (modalTitle === "registration") {
    return <ModalRegister />;
  }
  if (modalTitle === "doctordetail") {
    return <ModalDoctorDetail />;
  }
  if (modalTitle === "chattelemedicine") {
    return <ModalChatTelemedicine />;
  }
  if (modalTitle === "bayartelemedicine") {
    return <ModalBayarTelemedicine />;
  }
  if (modalTitle === "inconstruction") {
    return <ModalInConstruction />;
  }
  if (modalTitle === "tatapmuka") {
    return <ModalTatapMuka />;
  }
  if (modalTitle === "keranjang") {
    return <ModalLabCarts />;
  }
  if (modalTitle === "bayarlab") {
    return <ModalBayarLaboratorium />;
  }
  if (modalTitle === "registerpassword") {
    return <ModalRegisterPassword />;
  }
  return <div></div>;
};
