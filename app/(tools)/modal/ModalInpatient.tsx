"use client";
import Image from "next/image";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faClose,
  faPeopleGroup,
  faPerson,
  faRupiahSign,
  faXmarkSquare,
} from "@fortawesome/free-solid-svg-icons";

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import {
  sliderVariants,
  sliderVariants2,
} from "../framervariants/slidervariants";

type Props = {};

const ModalInpatient = (props: Props) => {
  const {
    state: { modalValue },
    closeModal,
  } = useGlobalContext();
  return (
    <div className="modal-lg">
      <h3 className=" col-span-2 font-normal">{modalValue.kelas}</h3>
      <button className="absolute top-2 right-4" onClick={() => closeModal()}>
        <FontAwesomeIcon icon={faClose} />
      </button>
      <div className="w-full  grid grid-cols-2 gap-3">
        <ImageSlide imgArray={modalValue["img-array"]} />
        <Info modalValue={modalValue} />
      </div>
    </div>
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
      <p className="btn-5 font-medium">
        {text} : {item}
      </p>
    </div>
  );
};

type ImageProps = {
  imgArray: string[];
};
const ImageSlide = ({ imgArray }: ImageProps) => {
  const [position, setPosition] = useState(0);
  const [amount, setAmount] = useState(1);
  const movePosition = (moveAmount: number) => {
    if (moveAmount > 0) {
      if (position < imgArray.length - 1) {
        setPosition(position + 1);
      } else {
        setPosition(position + 0);
      }
    } else {
      if (position > 0) {
        setPosition(position - 1);
      } else {
        setPosition(position + 0);
      }
    }
    setAmount(moveAmount);
    return;
  };

  return (
    <div className="h-[350px] w-full rounded-sm overflow-hidden relative z-0 ">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          variants={sliderVariants2}
          initial="initial"
          animate="animate"
          exit="exit"
          key={position}
          className="w-full h-full z-10 absolute  "
          custom={amount}
        >
          <Image
            src={`/images/inpatient/big/${imgArray[position]}`}
            alt={imgArray[position].slice(0, -4)}
            width={500}
            height={350}
            loading="lazy"
            className="w-full h-auto object-center object-cover"
          />
        </motion.div>
        {position < imgArray.length - 1 && (
          <button
            onClick={() => movePosition(1)}
            className="modal-slider-btn right-2"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        )}
        {position > 0 && (
          <button
            onClick={() => movePosition(-1)}
            className="modal-slider-btn left-2"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        )}
      </AnimatePresence>
    </div>
  );
};

type InfoProps = {
  modalValue: any;
};

const Info = ({ modalValue }: InfoProps) => {
  return (
    <div className="p-3">
      <InpatientItems
        item={modalValue.pasien}
        icon={faPeopleGroup}
        text="Jumlah pasien per ruangan "
      />
      <InpatientItems
        item={modalValue.harga}
        icon={faRupiahSign}
        text="Harga kamar/malam  "
      />
      <InpatientItems
        item=""
        icon={faXmarkSquare}
        text="tidak termasuk biaya pengobatan / pemeriksaan"
      />
      <InpatientItems item="" icon={faPerson} text="fasilitas " />
      <ul className=" grid grid-cols-2 pl-7">
        {modalValue.fasilitas.map((item: string, index: number) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    </div>
  );
};
