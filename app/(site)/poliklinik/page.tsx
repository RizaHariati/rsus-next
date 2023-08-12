"use client";
import React, { useState } from "react";
import MainImageAnimatedLeft from "../../(tools)/components/PageComponents/MainImageAnimatedLeft";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { enterOpacity } from "@/app/styles/variants";

type Props = {};
const unit = {
  img: "poliklinik",
  title: "POLIKLINIK",
  description:
    "Sebagai rumah sakit dengan akreditasi Tingkat Paripurna Tipe B Non Pendidikan, RS Urip Sumoharjo  mampu memberikan pelayanan kedokteran medik spesialis luas dan subspesialis terbatas. Saat ini RS Urip Sumoharjo mempunyai lebih dari 70 dokter spesialis dan sub spesialis yang berkualitas, yang diimbangi dengan peralatan dan fasilitas yang lengkap dan canggih",
};
const Poliklinik = (props: Props) => {
  return (
    <div className=" h-screen w-full z-0 max-w-[1440px] mx-auto relative">
      <section
        id="zero"
        className=" h-full  min-h-screen w-full z-0 overflow-hidden flex relative snap-center "
      >
        <ConsultationOptions />
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

export default Poliklinik;

const ConsultationOptions = () => {
  return (
    <div className="absolute z-20 bg-white top-1/4 w-[450px] right-16 h-fit standard-border p-2">
      <p className="text-center btn-3-bold">Buat janji temu dokter</p>
      <p className="text-center body-3">
        Selain konsultasi tatap muka, RS Urip Sumoharjo menyediakan pelayanan
        konsultasi Doktor jarak jauh, TeleMedicine awal lewat WhatsApp dan Zoom
        untuk klinik tertentu. Anda bisa melakukan pendaftaran online.
      </p>
      <motion.div
        variants={enterOpacity}
        initial="initial"
        animate="animate"
        className="flex gap-2"
      >
        <button className="floating-link group p-1">
          <Image
            src="/images/icons/policlinic-icons/doctor.jpg"
            height={100}
            width={100}
            alt="doctor"
            className="h-14 w-auto group-hover:opacity-20 transition-all"
          />
          <p className=" font-nunito uppercase font-normal text-[16px] tracking-wide ">
            Janji Temu Dokter
          </p>
        </button>
        <button className="floating-link group p-1">
          <Image
            src="/images/icons/policlinic-icons/chat.jpg"
            height={100}
            width={100}
            alt="chat"
            className="h-14 w-auto group-hover:opacity-20 transition-all"
          />
          <p className=" font-nunito uppercase font-normal text-[16px] tracking-wide ">
            Telemedicine
          </p>
        </button>
      </motion.div>
    </div>
  );
};
