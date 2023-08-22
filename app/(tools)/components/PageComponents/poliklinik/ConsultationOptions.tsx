"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { enterOpacity } from "@/app/(tools)/framervariants/variants";

type Props = {};

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
            rel="preload"
            placeholder="empty"
            src="/images/icons/policlinic-icons/doctor.jpg"
            height={100}
            width={100}
            alt="doctor"
            className="h-14 w-auto group-hover:opacity-20 transition-all"
            loading="lazy"
          />
          <p className=" font-nunito uppercase font-normal text-[16px] tracking-wide ">
            Janji Temu Dokter
          </p>
        </button>
        <button className="floating-link group p-1">
          <Image
            rel="preload"
            placeholder="empty"
            src="/images/icons/policlinic-icons/chat.jpg"
            height={100}
            width={100}
            alt="chat"
            className="h-14 w-auto group-hover:opacity-20 transition-all"
            loading="lazy"
          />
          <p className=" font-nunito uppercase font-normal text-[16px] tracking-wide ">
            Telemedicine
          </p>
        </button>
      </motion.div>
    </div>
  );
};

export default ConsultationOptions;
