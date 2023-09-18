"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { enterTitleVariants } from "@/app/(tools)/framervariants/titlevariants";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faPhone } from "@fortawesome/free-solid-svg-icons";
type Props = {};

const KunjungiKami = (props: Props) => {
  return (
    <section
      id="location"
      className=" h-[calc(100vh-136px)] md:h-[calc(100vh-56px)] w-full z-0 snap-start p-2 md:px-0 "
    >
      <motion.h2
        variants={enterTitleVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        Kunjungi kami
      </motion.h2>
      <div className="grid md:grid-cols-2 grid-cols-1 h-[calc(85vh-56px)] w-full ">
        <div className="h-full w-full bg-white">
          <Image
            rel="preload"
            placeholder="empty"
            loading="lazy"
            src={`/images/pages/rsus-real.png`}
            alt="rsus"
            height={600}
            width={1000}
            className="object-center object-cover h-full w-full overflow-hidden "
          />
        </div>
        <div className="h-full w-full bg-greenUrip relative grid-cols-1 p-2 ">
          <div className="w-full z-10 h-full md:h-1/3 hidden md:block"></div>
          <div className="w-full  h-full  md:h-fit mt-auto z-10 py-5">
            <div className="w-full h-full grid grid-cols-3 overflow-hidden ">
              <Lokasi />
              <UripMap />
            </div>
          </div>

          <div className="w-full h-full bg-pattern bg-[length:200px_200px] mix-blend-multiply opacity-30 absolute left-0 top-0 z-0"></div>
        </div>
      </div>
    </section>
  );
};

export default KunjungiKami;

const Lokasi = () => {
  return (
    <div className="p-1 md:p-5 text-white col-span-2">
      <h3 className="text-left">Lokasi</h3>
      <div className="flex gap-2 body-2 text-white text-light ">
        <FontAwesomeIcon icon={faBuilding} className="h-4 pt-1" />
        <div>
          <p className="text-white">Jl. Urip Sumoharjo no.200</p>
          <p className="text-white">Gn. Sulah - Way Halim</p>
          <p className="text-white">Kota Bandar Lampung</p>
          <p className="text-white">Lampung 35356</p>
        </div>
      </div>
      <div className="flex gap-2 body-2 text-white text-light ">
        <FontAwesomeIcon icon={faPhone} className="h-4 pt-1" />
        <p className="text-white">(0721 771322)</p>
      </div>
      <div className="flex gap-2 body-2 text-white text-light ">
        <FontAwesomeIcon icon={faPhone} className="h-4 pt-1" />
        <p className="text-white">(0721 771322)</p>
      </div>
    </div>
  );
};

const UripMap = () => {
  return (
    <div className="w-full h-full overflow-hidden">
      <Image
        rel="preload"
        placeholder="empty"
        loading="lazy"
        src={`/images/pages/rsus-map.png`}
        alt="rsus-map"
        height={210}
        width={390}
        className="object-center object-cover h-full w-auto overflow-hidden rounded-sm"
      />
    </div>
  );
};
