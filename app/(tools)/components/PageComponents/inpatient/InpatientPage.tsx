"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import {
  enterTop,
  enterTopChildren,
} from "@/app/(tools)/framervariants/variants";
import ImageGallery from "./ImageGallery";

type Props = {};

function InpatientPage(props: Props) {
  return (
    <div className="page-main-container ">
      <motion.section
        variants={enterTop}
        initial="initial"
        animate="animate"
        className="h-1/2 md:h-2/3 w-full overflow-hidden relative rounded-b-lg md:rounded-b-none "
      >
        <motion.div
          key="background"
          variants={enterTopChildren}
          className=" bg-stone-500 bg-opacity-70 mix-blend-multiply w-full absolute h-full right-0 top-0 z-10"
        ></motion.div>
        <motion.div
          key="main-image"
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
          key="title"
          variants={enterTopChildren}
          className="absolute z-20 bottom-8 md:top-2/3 right-0 md:right-16 text-white text-center md:text-right font-regular md:text-[40px] md:tracking-[15px] w-full md:w-1/2 drop-shadow-md shadow-black"
        >
          Fasilitas Rawat Inap
        </motion.h1>
      </motion.section>

      <section
        id="one"
        className=" bg-greyLit h-fit w-full z-0 pt-5 md:pt-14  mx-auto pb-[150px] px-2"
      >
        <h4>
          Jam besuk : Pagi Pukul 11.00 - 12.00 Wib || Sore Pukul 17.00 - 18.00
          Wib
        </h4>
        <p className=" w-full md:max-w-4xl body-2 text-greyDrk text-center  font-light z-20 mx-auto">
          Untuk pendaftaran rawat inap dan pemesanan kamar silahkan menghubungi
          <span> 0811 x270 x37</span>
        </p>

        <ImageGallery />
      </section>
    </div>
  );
}

export default InpatientPage;
