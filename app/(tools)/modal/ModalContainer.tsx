"use client";
import Image from "next/image";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faPeopleGroup,
  faPerson,
  faRupiahSign,
  faXmarkSquare,
} from "@fortawesome/free-solid-svg-icons";
import { enterOpacity } from "@/app/(tools)/framervariants/variants";
import { useGlobalContext } from "../context/AppProvider";
import ModalInpatient from "./ModalInpatient";

type Props = {};

const ModalContainer = (props: Props) => {
  const {
    state: { showModal },
  } = useGlobalContext();
  return <AnimatePresence>{showModal && <ModalContent />}</AnimatePresence>;
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
