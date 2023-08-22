"use client";
import React from "react";
import { motion } from "framer-motion";
import { enterTitleVariants } from "@/app/(tools)/framervariants/titlevariants";
import dataPaketKesehatan from "@/app/(tools)/data/data_paketkesehatan.json";
import Image from "next/image";
import { PaketLabType } from "@/app/(tools)/types";
import PaketItem from "@/app/(tools)/components/PageComponents/laboratory/PaketItem";

type Props = {};

const PilihPaket = (props: Props) => {
  return (
    <section id="paket" className=" h-fit w-full z-0  mt-14 bg-white ">
      <motion.h2
        variants={enterTitleVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="sticky top-0 pt-16 pb-2 bg-white w-full border-b border-b-greyBorder"
      >
        pilihan Paket Laboratorium
      </motion.h2>
      <div className="w-modal_lg mx-auto bg-white py-10">
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-4 w-full pt-2">
            {dataPaketKesehatan.slice(0, 3).map((item: PaketLabType) => {
              return <PaketItem item={item} key={item.id} />;
            })}
          </div>
          <div className=" h-72 w-full overflow-hidden">
            <Image
              rel="preload"
              placeholder="empty"
              src="/images/slides/webinar.png"
              alt="webinar"
              width={500}
              height={400}
              className=" object-fit  min-w-full object-center h-full w-full"
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-4  pt-4 ">
          {dataPaketKesehatan.slice(3).map((item) => {
            return <PaketItem item={item} key={item.id} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default PilihPaket;
