"use client";
import React from "react";
import MainImageAnimatedLeft from "../../(tools)/components/PageComponents/MainImageAnimatedLeft";
import ConsultationMenu from "@/app/(tools)/components/PageComponents/consultation/ConsultationMenu";
import { motion } from "framer-motion";
import {
  enterTop,
  enterTopChildren,
} from "@/app/(tools)/framervariants/variants";
import Image from "next/image";

type Props = {};

const Consultation = (props: Props) => {
  return (
    <div className="page-main-container">
      <section
        id="zero"
        className="h-[calc(100vh-32px)] md:h-full md:min-h-screen  w-full z-0 overflow-hidden flex flex-col md:flex-row relative snap-center md:bg-accent1  bg-white"
      >
        <motion.div
          variants={enterTop}
          initial="initial"
          whileInView="animate"
          className="md:hidden h-1/2 w-full bg-greenUrip relative z-10 rounded-b-lg overflow-hidden"
        >
          <div
            className="absolute h-full w-full top-0 left-0 z-10 bg-[length:100px_100px]
          bg-pattern mix-blend-multiply opacity-30"
          ></div>

          <motion.div className="w-full h-full overflow-hidden absolute right-0 -top-5 z-20 rounded-b-lg">
            <div className=" mix-blend-multiply  bg-gradient-to-b from-stone-400 via-white to-zinc-400 bg-stone-800 absolute top-0 left-0 z-20 w-full h-full "></div>
            <Image
              rel="preload"
              placeholder="empty"
              src="/images/pages/consultation-small.jpg"
              alt="mainimage"
              height={700}
              width={500}
              className=" object-cover object-bottom w-full h-full "
              priority
            />
          </motion.div>
          <motion.h1
            key="consultation-title"
            variants={enterTopChildren}
            className="z-30 text-white text-center w-full left-0 bottom-10 leading-6 tracking-[2px] absolute  font-light uppercase"
          >
            Janji Temu Dokter
          </motion.h1>
        </motion.div>
        <ConsultationMenu />
        <MainImageAnimatedLeft img="consultation" />
        <div className=" hidden md:block h-full w-3/12 bg-greenUrip relative z-10  overflow-hidden">
          <div
            className="absolute h-full w-full top-0 left-4 z-10 bg-[length:200px_200px]
          bg-pattern mix-blend-multiply opacity-30"
          ></div>
          <div className="w-4 h-full bg-accent1 absolute left-0 top-0"></div>
        </div>
      </section>
    </div>
  );
};

export default Consultation;
