"use client";
import React from "react";
import MainImageAnimatedLeft from "../../(tools)/components/PageComponents/MainImageAnimatedLeft";
import { motion } from "framer-motion";
import { enterOpacity } from "../../(tools)/framervariants/variants";
import PilihPaket from "@/app/(tools)/components/PageComponents/laboratory/PilihPaket";
import PilihSatuan from "@/app/(tools)/components/PageComponents/laboratory/PilihSatuan";
import BackToTop from "@/app/(tools)/components/BackToTop";
import Keranjang from "@/app/(tools)/components/PageComponents/laboratory/Keranjang";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import MainImageSmall from "@/app/(tools)/components/PageComponents/MainImageSmall";
import PageGreenAccent from "@/app/(tools)/components/PageGreenAccent";
type Props = {};
const unit = {
  img: "laboratorium",
  title: "LAB DAN CHECK UP",
  description:
    "RS Urip Sumoharjo  bergerak maju untuk misi kemanusiaan menyelamatkan masyarakat dengan menyediakan Laboratorium yang dapat melakukan tes pemeriksaan laboratorium yang menyeluruh dan tepat guna. Cek Fasilitas pendukung laboratorium kami disini.Anda bisa memilih test yang diinginkan atau memilih paket hemat yang kami sudah pilihkan.",
};

const Laboratorium = (props: Props) => {
  const {
    state: { labCart },
  } = useGlobalContext();
  return (
    <div className="page-main-container">
      {labCart.length > 0 && <Keranjang />}
      <section
        id="zero"
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
          className="h-1/4 p-2 md:h-fit  relative md:absolute pt-8 md:bottom-14 md:right-16 z-10 flex gap-2 md:gap-5"
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
