import React from "react";
import { motion } from "framer-motion";
import { enterTitleVariants } from "@/app/(tools)/framervariants/titlevariants";
import LargePoliklinikList from "./LargePoliklinikList";
import FindPoliklinik from "./FindPoliklinik";
import Image from "next/image";

type Props = {
  children: React.ReactNode;
};

const PoliklinikListContainer = ({ children }: Props) => {
  return (
    <section
      id="seluruhklinik"
      className=" bg-greyLit h-screen w-full z-0 snap-start pb-10 pt-14"
    >
      <motion.h2
        variants={enterTitleVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        Daftar Poliklinik
      </motion.h2>
      <div className="flex w-full h-full pb-5 px-10">
        <div className="bg-white rounded-sm w-full  max-w-screen-lg h-full p-5 grid grid-cols-8 gap-5 mx-auto overflow-hidden">
          {children}

          <LargePoliklinikList />
        </div>
      </div>
    </section>
  );
};

export default PoliklinikListContainer;
