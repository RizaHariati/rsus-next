import React from "react";
import { motion } from "framer-motion";
import { enterTitleVariants } from "@/app/(tools)/framervariants/titlevariants";
import LargePoliklinikList from "./LargePoliklinikList";
import FindPoliklinik from "./FindPoliklinik";
import Image from "next/image";
import { enterOpacity } from "@/app/(tools)/framervariants/variants";

type Props = {
  children: React.ReactNode;
};

const PoliklinikListContainer = ({ children }: Props) => {
  return (
    <section
      id="seluruhklinik"
      className=" bg-greyLit h-[110vh] md:h-screen w-full z-0 pb-[150px] md:snap-start pt-5"
    >
      <motion.h2
        variants={enterOpacity}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        Daftar Poliklinik
      </motion.h2>
      <div className="flex w-full h-full p-2 ">
        <div className="bg-white rounded-sm w-full  max-w-screen-lg h-full p-2 md:p-5 grid grid-cols-1 md:grid-cols-8 gap-y-2 md:gap-2 mx-auto overflow-hidden ">
          {children}

          <LargePoliklinikList />
        </div>
      </div>
    </section>
  );
};

export default PoliklinikListContainer;
