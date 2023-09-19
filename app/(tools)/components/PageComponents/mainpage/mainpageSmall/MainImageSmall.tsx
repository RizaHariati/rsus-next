"use client";
import React from "react";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  enterTop,
  enterTopChildren,
} from "@/app/(tools)/framervariants/variants";
import { usePathname } from "next/navigation";
type Props = {};

const MainImageSmall = (props: Props) => {
  const pathname = usePathname();
  return (
    <AnimatePresence>
      <motion.div
        key={pathname}
        variants={enterTop}
        initial="initial"
        whileInView="animate"
        // viewport={{ once: true }}
        className=" h-1/2 w-full overflow-hidden rounded-b-lg relative z-10 md:hidden bg-greenUrip"
      >
        <div className=" mix-blend-multiply  bg-gradient-to-b from-stone-500 via-white to-zinc-500 bg-stone-800 absolute top-0 left-0 z-40 w-full h-full "></div>
        <div
          className="absolute h-full w-full top-0 left-0 z-0 bg-[length:100px_100px]
          bg-pattern mix-blend-multiply opacity-30"
        ></div>

        <motion.h1
          key="main-title"
          variants={enterTopChildren}
          className="z-50 text-white w-full absolute font-thin capitalize text-center bottom-3 leading-6 text-[24px] tracking-[3px]"
        >
          Pelayanan Medis Profesional dengan Semangat Islami untuk semua
        </motion.h1>

        <motion.div
          variants={enterTopChildren}
          key="image"
          className="w-full h-full overflow-hidden absolute right-0 z-30 rounded-b-lg "
        >
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
    </AnimatePresence>
  );
};

export default MainImageSmall;
