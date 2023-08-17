"use client";
import React from "react";
import { motion } from "framer-motion";
import { enterTitleVariants } from "@/app/(tools)/framervariants/titlevariants";

type Props = {};

const FasilitasDanKlinik = (props: Props) => {
  return (
    <section id="two" className=" bg-slate-300 h-screen w-full z-0 snap-center">
      <motion.h2
        variants={enterTitleVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        Fasilitas dan Klinik unggulan
      </motion.h2>
    </section>
  );
};

export default FasilitasDanKlinik;
