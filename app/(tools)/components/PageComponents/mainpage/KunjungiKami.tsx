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
      className=" bg-greyLit h-fit w-full z-0 snap-center pb-10 pt-5"
    >
      <motion.h2
        variants={enterTitleVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        Kunjungi kami
      </motion.h2>
      <div className="flex h-[400px] w-full ">
        <div className="h-full w-full bg-white">
          <Image
            rel="preload"
            placeholder="empty"
            loading="lazy"
            src={`/images/pages/rsus-real.png`}
            alt="rsus"
            height={600}
            width={1000}
            className="object-center object-cover h-full w-full overflow-hidden rounded-sm"
          />
        </div>
        <div className="h-full  w-full bg-greenUrip relative flex  flex-col  ">
          <div className="w-full h-full bg-pattern bg-[length:200px_200px] mix-blend-multiply opacity-30 absolute left-0 top-0 z-0"></div>
          <div className="w-full"></div>
          <div className=" w-full mt-auto z-10 p-5">
            <div></div>
            <div className="w-full flex items-center justify-between">
              <Lokasi />
              <UripMap />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KunjungiKami;

const Lokasi = () => {
  return (
    <div className="p-5 text-white">
      <h3 className="text-left">Lokasi</h3>
      <div className="flex gap-2 body-2 text-white text-light ">
        <FontAwesomeIcon icon={faBuilding} className="h-4 pt-1" />
        <div>
          <p>Jl. Urip Sumoharjo no.200</p>
          <p>Gn. Sulah - Way Halim</p>
          <p>Kota Bandar Lampung</p>
          <p>Lampung 35356</p>
        </div>
      </div>
      <div className="flex gap-2 body-2 text-white text-light ">
        <FontAwesomeIcon icon={faPhone} className="h-4 pt-1" />
        <p>(0721 771322)</p>
      </div>
      <div className="flex gap-2 body-2 text-white text-light ">
        <FontAwesomeIcon icon={faPhone} className="h-4 pt-1" />
        <p>(0721 771322)</p>
      </div>
    </div>
  );
};

const UripMap = () => {
  return (
    <div className="w-1/2 h-full overflow-hidden">
      <Image
        rel="preload"
        placeholder="empty"
        loading="lazy"
        src={`/images/pages/rsus-map.png`}
        alt="rsus-map"
        height={210}
        width={390}
        className="object-center object-cover h-full w-full overflow-hidden rounded-sm"
      />
    </div>
  );
};
