"use client";
import React, { useState } from "react";
import MainImageAnimatedLeft from "../../(tools)/components/PageComponents/MainImageAnimatedLeft";
import { motion } from "framer-motion";
import { enterOpacity } from "../../styles/variants";

type Props = {};
const unit = {
  img: "laboratorium",
  title: "LAB DAN CHECK UP",
  description:
    "RS Urip Sumoharjo  bergerak maju untuk misi kemanusiaan menyelamatkan masyarakat dengan menyediakan Laboratorium yang dapat melakukan tes pemeriksaan laboratorium yang menyeluruh dan tepat guna. Cek Fasilitas pendukung laboratorium kami disini.Anda bisa memilih test yang diinginkan atau memilih paket hemat yang kami sudah pilihkan.",
};

const Laboratorium = (props: Props) => {
  return (
    <div className=" h-screen w-full z-0 max-w-[1440px] mx-auto relative">
      <section
        id="zero"
        className=" h-full  min-h-screen w-full z-0 overflow-hidden flex relative snap-center "
      >
        {/* <ConsultationMenu /> */}
        <MainImageAnimatedLeft
          img={unit.img}
          title={unit.title}
          description={unit.description}
        />
        <div className="h-full w-3/12 bg-greenUrip relative z-10  overflow-hidden">
          <div
            className="absolute h-full w-full top-0 left-4 z-10 bg-[length:200px_200px]
          bg-pattern  mix-blend-multiply opacity-30"
          ></div>
          <div className="w-4 h-full bg-accent1 absolute left-0 top-0"></div>
        </div>
        <motion.div
          variants={enterOpacity}
          initial="initial"
          animate="animate"
          className="absolute bottom-20 right-16 z-10 flex gap-5"
        >
          <button className="button-lg">Pilih Test Sendiri</button>
          <button className="button-lg">Pilih Paket</button>
        </motion.div>
      </section>

      <section
        id="one"
        className=" bg-pink-300 h-screen w-full z-0 snap-center "
      >
        <h2> Main Page</h2>
      </section>
      <section
        id="two"
        className=" bg-slate-300 h-screen w-full z-0 snap-center"
      >
        <h2> Main Page</h2>
      </section>
    </div>
  );
};

export default Laboratorium;
