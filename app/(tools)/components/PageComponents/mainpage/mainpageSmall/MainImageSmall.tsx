"use client";
import React from "react";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  enterTop,
  enterTopChildren,
} from "@/app/(tools)/framervariants/variants";

type Props = {};

const MainImageSmall = (props: Props) => {
  return (
    <motion.div
      variants={enterTop}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className=" h-1/2 overflow-hidden rounded-b-lg relative z-10 md:hidden"
    >
      <div className=" mix-blend-multiply  bg-gradient-to-b from-stone-500 via-white to-zinc-500 bg-stone-800 absolute top-0 left-0 z-20 w-full h-full "></div>
      <motion.h1
        key="main-title"
        variants={enterTopChildren}
        className="z-30 text-white w-full absolute font-thin capitalize text-center bottom-3 leading-8 "
      >
        Pelayanan Medis Profesional dengan Semangat Islami untuk semua
      </motion.h1>

      <motion.div className="w-full h-full overflow-hidden ">
        <Image
          rel="preload"
          placeholder="empty"
          src="/images/pages/main-image-edited-01.jpg"
          alt="mainimage"
          height={700}
          width={500}
          className=" object-cover object-bottom h-full w-auto  z-10  right-0 top-0"
          priority
        />
      </motion.div>
    </motion.div>
  );
};

export default MainImageSmall;
