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

const InPatient = (props: Props) => {
  return (
    <div className="page-main-container">
      <motion.section
        variants={enterTop}
        initial="initial"
        animate="animate"
        className="h-2/3 w-full overflow-hidden relative"
      >
        <motion.div
          variants={enterTopChildren}
          className=" bg-stone-500 bg-opacity-70 mix-blend-multiply w-full absolute h-full right-0 top-0 z-10"
        ></motion.div>
        <motion.div
          variants={enterTopChildren}
          className="absolute w-full h-full right-0 z-0 object-cover"
        >
          <Image
            src="/images/inpatient/featured.jpg"
            alt="mainimage"
            height={1200}
            width={1200}
            className=" object-cover w-full z-0 absolute h-full right-0 top-0"
            priority
          />
        </motion.div>
        <motion.h1
          variants={enterTopChildren}
          className="absolute z-20 top-2/3  right-16 text-white text-right font-regular text-[40px] tracking-[15px] w-1/2 drop-shadow-md shadow-black"
        >
          Fasilitas Rawat Inap
        </motion.h1>
      </motion.section>

      <section id="one" className=" bg-greyLit h-fit w-full z-0 py-14  mx-auto">
        <h4>
          Jam besuk : Pagi Pukul 11.00 - 12.00 Wib || Sore Pukul 17.00 - 18.00
          Wib
        </h4>
        <p className=" w-full max-w-4xl body-2 text-greyDrk text-right  font-light z-20 mx-auto">
          Untuk pendaftaran rawat inap dan pemesanan kamar silahkan menghubungi
          <span> 0811 x270 x37</span>
        </p>

        <ImageGallery />
      </section>
    </div>
  );
};

export default InPatient;

const ImageGallery = () => {
  const {
    state: { showModal },
    openModal,
  } = useGlobalContext();

  return (
    <motion.div className="w-full max-w-6xl grid grid-cols-4 mx-auto  mt-4 gap-5 ">
      {dataBed.map((item: InpatientType, index) => {
        return (
          <div key={item.id}>
            <motion.div
              id={item.kelas}
              onClick={() => openModal("inpatient", item)}
              key={index}
              initial={{ opacity: 0, y: "40px" }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.3 * (index % 3),
                type: "spring",
              }}
              viewport={{ once: true }}
              className=" standard-border cursor-pointer opacity-100 relative transition-all hover:opacity-70 h-52 overflow-hidden z-0"
            >
              <div className="w-full h-32 overflow-hidden">
                <Image
                  src={`/images/inpatient/thumbnails/${item.img}`}
                  alt={item.kelas}
                  width={300}
                  height={200}
                  loading="lazy"
                />
              </div>

              <div className="w-8 h-8 rounded-full overflow-hidden absolute z-10 top-2 left-2">
                <Image
                  src={`/images/navbar/main-logo.png`}
                  alt="main-logo"
                  width={40}
                  height={40}
                  loading="lazy"
                  className="object-center object-cover h-full w-full "
                />
              </div>
              <div className="p-2">
                <h5 className="font-normal">{item.kelas}</h5>

                <p className="border rounded-sm w-fit p-1 px-2 ml-auto">
                  Rp. {item.harga}
                </p>
              </div>
            </motion.div>
          </div>
        );
      })}
    </motion.div>
  );
};
