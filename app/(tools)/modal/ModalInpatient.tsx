"use client";
import Image from "next/image";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

import dataBed from "@/app/(tools)/data/data_inap.json";
import { useState } from "react";
import { InpatientType } from "@/app/(tools)/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faClose,
  faCross,
  faPeopleGroup,
  faPerson,
  faRupiahSign,
  faX,
  faXmarkSquare,
} from "@fortawesome/free-solid-svg-icons";
import {
  enterOpacity,
  enterTop,
  enterTopChildren,
} from "@/app/(tools)/framervariants/variants";
import { Icon, IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import { faXbox } from "@fortawesome/free-brands-svg-icons";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";

type Props = {};

const ModalInpatient = (props: Props) => {
  const {
    state: { modalValue },
    closeModal,
  } = useGlobalContext();
  console.log({ modalValue });
  return (
    <>
      <motion.div
        key={modalValue.id}
        variants={enterOpacity}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 1 }}
        className="w-screen h-screen bg-greyDrk  bg-opacity-50 overflow-hidden fixed top-0 left-0 z-50"
      >
        {/* <motion.div className="absolute left-1/2 -translate-x-1/2  top-1/2 -translate-y-1/2 w-modal_lg h-fit bg-white standard-border  grid grid-cols-2 gap-3 py-2">
          <h3 className=" col-span-2">{item.kelas}</h3>
          <button
            className="absolute top-2 right-4"
            onClick={() => closeModal()}
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
          <div className="h-[350px] w-full rounded-sm overflow-hidden">
            <Image
              src={`/images/inpatient/big/${item["img-array"][0]}`}
              alt={item.kelas}
              width={500}
              height={350}
              loading="lazy"
            />
          </div>
          <div>
            <InpatientItems
              item={item.pasien}
              icon={faPeopleGroup}
              text="Jumlah pasien per ruangan "
            />
            <InpatientItems
              item={item.harga}
              icon={faRupiahSign}
              text="Harga kamar/malam  "
            />
            <InpatientItems
              item=""
              icon={faXmarkSquare}
              text="tidak termasuk biaya pengobatan / pemeriksaan"
            />
            <InpatientItems item="" icon={faPerson} text="fasilitas " />
          </div>
        </motion.div> */}
      </motion.div>
    </>
  );
};

export default ModalInpatient;

type itemProps = {
  item: number | string;
  icon: IconDefinition;
  text: string;
};
const InpatientItems = ({ item, icon, text }: itemProps) => {
  return (
    <div className="flex-center-left gap-2 text-greenUrip leading-5 ">
      <div className="w-6">
        <FontAwesomeIcon icon={icon} className="w-5 " />
      </div>
      <p className="btn-3">
        {text} : {item}
      </p>
    </div>
  );
};
