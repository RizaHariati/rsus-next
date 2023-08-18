"use client";
import React from "react";
import { motion } from "framer-motion";
import { enterTitleVariants } from "@/app/(tools)/framervariants/titlevariants";
import dataFacility from "@/app/(tools)/data/data_facility.json";
import { FacilityType } from "@/app/(tools)/types";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import FasilitasUnit from "./FasilitasUnit";
type Props = {};

const FasilitasDanKlinik = (props: Props) => {
  return (
    <section id="two" className=" bg-slate-300 h-screen w-full z-0 snap-center">
      <div className=" w-full bg-white h-fit p-10 pt-14">
        <motion.h2
          variants={enterTitleVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          Fasilitas dan Klinik unggulan
        </motion.h2>
        <div className=" w-modal_xl standard-border mx-auto grid grid-cols-2 p-3 px-10 gap-2 relative">
          {dataFacility
            .filter((item: FacilityType) => item.featured === true)
            .map((facility: FacilityType) => {
              return <FasilitasUnit facility={facility} key={facility.id} />;
            })}
          <Link
            href="/facility"
            className="  text-greenUrip animate-pulse w-fit h-fit rounded-full absolute bottom-5 right-5 z-10"
          >
            <FontAwesomeIcon icon={faArrowRight} className="text-4xl" />
            <p className="btn-3-bold"> Lebih </p>{" "}
            <p className="btn-3-bold"> Banyak </p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FasilitasDanKlinik;
