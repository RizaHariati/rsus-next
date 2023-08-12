"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { enterOpacity, enterOpacityChildren } from "@/app/styles/variants";
import { consultationMenu } from "@/app/(tools)/data/datamenu";
import { ConsultationMenuTypes } from "@/app/(tools)/types";
import MainImageAnimatedLeft from "../../(tools)/components/PageComponents/MainImageAnimatedLeft";

type Props = {};

const Consultation = (props: Props) => {
  return (
    <div className=" h-screen w-full z-0 max-w-[1440px] mx-auto relative">
      <section
        id="zero"
        className=" h-full  min-h-screen w-full z-0 overflow-hidden flex relative snap-center "
      >
        <ConsultationMenu />
        <MainImageAnimatedLeft img="consultation" />
        <div className="h-full w-3/12 bg-greenUrip relative z-10  overflow-hidden">
          <div
            className="absolute h-full w-full top-0 left-4 z-10 bg-[length:200px_200px]
          bg-pattern  mix-blend-multiply opacity-30"
          ></div>
          <div className="w-4 h-full bg-accent1 absolute left-0 top-0"></div>
        </div>
      </section>
    </div>
  );
};

export default Consultation;

const ConsultationMenu = () => {
  return (
    <motion.div
      variants={enterOpacity}
      initial="initial"
      animate="animate"
      className="absolute w-[600px] h-auto  top-1/2 -translate-y-1/2  z-20 right-[10%] flex flex-col gap-2 "
    >
      {consultationMenu.map((item: ConsultationMenuTypes, index: number) => {
        return (
          <motion.div
            variants={enterOpacityChildren}
            key={index}
            className="grid grid-cols-6 w-full h-fit bg-white bg-opacity-100 hover:bg-opacity-80 place-items-center p-1 standard-border transition-all cursor-pointer group"
          >
            <div className=" col-span-1 w-20">
              <Image
                src={`/images/icons/consultation-icons/${item.image}`}
                alt="mainimage"
                height={1200}
                width={1200}
                className=" object-cover w-full z-10 h-full right-0 top-0 object-center opacity-100 group-hover:opacity-50"
                priority
              />
            </div>
            <div className=" col-span-5 flex-top-left flex-col">
              <h4>{item.title}</h4>
              <p className="body-3">{item.description}</p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
