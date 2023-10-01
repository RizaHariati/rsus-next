"use client";
import React from "react";

import { motion } from "framer-motion";
import PilihPaket from "@/app/(tools)/components/PageComponents/laboratory/PilihPaket";
import PilihSatuan from "@/app/(tools)/components/PageComponents/laboratory/PilihSatuan";
import BackToTop from "@/app/(tools)/components/BackToTop";
import Keranjang from "@/app/(tools)/components/PageComponents/laboratory/Keranjang";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import MainImageSmall from "@/app/(tools)/components/PageComponents/MainImageSmallB";
import PageGreenAccent from "@/app/(tools)/components/PageGreenAccent";
import MainImageAnimatedLeft from "../MainImageAnimatedLeft";
import { enterOpacity } from "@/app/(tools)/framervariants/variants";

const unit = {
  img: "laboratorium",
  title: "LAB DAN CHECK UP",
  description:
    "RS Urip Sumoharjo  bergerak maju untuk misi kemanusiaan menyelamatkan masyarakat dengan menyediakan Laboratorium yang dapat melakukan tes pemeriksaan laboratorium yang menyeluruh dan tepat guna. Cek Fasilitas pendukung laboratorium kami disini.Anda bisa memilih test yang diinginkan atau memilih paket hemat yang kami sudah pilihkan.",
};

type Props = {};

function LaboratoryPage(props: Props) {
  const {
    state: { labCart },
  } = useGlobalContext();
  return (
    <div className="page-main-container">
      {labCart?.length > 0 && <Keranjang />}
      <section
        id="laboratorium-top"
        className=" h-full md:min-h-screen w-full z-0 overflow-hidden flex flex-col md:flex-row relative  md:bg-accent1 bg-white snap-none  md:snap-center pb-2"
      >
        <MainImageSmall img={unit.img} title={unit.title} />
        <MainImageAnimatedLeft
          img={unit.img}
          title={unit.title}
          description={unit.description}
        />
        <PageGreenAccent />
        <p className="h-1/4 p-2 text-center leading-normal md:hidden">
          {unit.description}
        </p>
        <motion.div
          variants={enterOpacity}
          initial="initial"
          animate="animate"
          className="h-1/4 p-2 md:h-fit  relative md:absolute pt-8 md:bottom-14 md:right-16 z-10 flex gap-2 md:gap-5 mt-5"
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
      <BackToTop sectionID="laboratorium-top" />
    </div>
  );
}

export default LaboratoryPage;
