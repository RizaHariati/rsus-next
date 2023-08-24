"use client";
import React from "react";
import MainImageAnimatedLeft from "../../(tools)/components/PageComponents/MainImageAnimatedLeft";
import { motion } from "framer-motion";
import { enterOpacity } from "../../(tools)/framervariants/variants";
import PilihPaket from "@/app/(tools)/components/PageComponents/laboratory/PilihPaket";
import PilihSatuan from "@/app/(tools)/components/PageComponents/laboratory/PilihSatuan";
import BackToTop from "@/app/(tools)/components/BackToTop";
type Props = {};
const unit = {
  img: "laboratorium",
  title: "LAB DAN CHECK UP",
  description:
    "RS Urip Sumoharjo  bergerak maju untuk misi kemanusiaan menyelamatkan masyarakat dengan menyediakan Laboratorium yang dapat melakukan tes pemeriksaan laboratorium yang menyeluruh dan tepat guna. Cek Fasilitas pendukung laboratorium kami disini.Anda bisa memilih test yang diinginkan atau memilih paket hemat yang kami sudah pilihkan.",
};

const Laboratorium = (props: Props) => {
  return (
    <div className="page-main-container">
      <section
        id="zero"
        className=" h-full  min-h-screen w-full z-0 overflow-hidden flex relative snap-center bg-accent1 "
      >
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
          className="absolute bottom-14 right-16 z-10 flex gap-5"
        >
          <button
            className="button-lg"
            onClick={() => {
              const access = document?.getElementById("satuan");
              access?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Pilih Test Sendiri
          </button>
          <button
            onClick={() => {
              const access = document?.getElementById("paket");
              access?.scrollIntoView({ behavior: "smooth" });
            }}
            className="button-lg"
          >
            Pilih Paket
          </button>
        </motion.div>
      </section>
      <PilihPaket />
      <PilihSatuan />
      <BackToTop />
    </div>
  );
};

export default Laboratorium;
