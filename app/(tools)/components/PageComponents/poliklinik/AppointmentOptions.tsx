"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  enterLeftVariant,
  enterOpacity,
  enterTop,
} from "@/app/(tools)/framervariants/variants";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import dataAppointment from "@/app/(tools)/data/data_appointment.json";
import Link from "next/link";

type Props = {};

const AppointmentOptions = () => {
  return (
    <motion.div
      key="consultation"
      variants={enterTop}
      initial="initial"
      animate="animate"
      className="hidden md:block absolute z-20 bg-white bottom-10 w-[450px] right-10 h-fit standard-border p-2 "
    >
      <AppointmentOptionsContent />
    </motion.div>
  );
};

export default AppointmentOptions;

export const AppointmentOptionsContent = () => {
  const { toggleMenuNavbar, openModal } = useGlobalContext();
  return (
    <>
      <p className="text-center btn-3-bold order-1">Buat janji temu dokter</p>
      <p className="text-center body-3 order-3">
        Selain konsultasi tatap muka, RS Urip Sumoharjo menyediakan pelayanan
        konsultasi Doktor jarak jauh, TeleMedicine awal lewat WhatsApp.
      </p>
      <motion.div
        variants={enterOpacity}
        initial="initial"
        animate="animate"
        className="flex gap-2 order-2"
      >
        <Link
          href="/consultation"
          className="floating-link group p-1 h-24"
          onClick={() => {
            toggleMenuNavbar(null);
            openModal(
              "appointment",
              dataAppointment.filter(
                (appointmentItem) => appointmentItem.name === "appointment"
              )[0]
            );
          }}
        >
          <Image
            rel="preload"
            placeholder="empty"
            src="/images/icons/policlinic-icons/doctor.jpg"
            height={100}
            width={100}
            alt="doctor"
            className="h-14 w-14 group-hover:opacity-20 transition-all"
            loading="lazy"
          />
          <p className=" font-nunito uppercase font-normal text-[16px] tracking-wide ">
            Janji Temu Dokter
          </p>
        </Link>
        <Link
          className="floating-link group p-1 h-24"
          href="/consultation"
          onClick={() => {
            toggleMenuNavbar(null);
            openModal(
              "telemedicine",
              dataAppointment.filter(
                (appointmentItem) => appointmentItem.name === "telemedicine"
              )[0]
            );
          }}
        >
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
        </Link>
      </motion.div>
    </>
  );
};