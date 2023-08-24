import React from "react";
import { motion } from "framer-motion";
import { enterTitleVariants } from "@/app/(tools)/framervariants/titlevariants";
import LargePoliklinikList from "./LargePoliklinikList";
import FindPoliklinik from "./FindPoliklinik";
import Image from "next/image";

type Props = {};

const PoliklinikListContainer = (props: Props) => {
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
          <div className=" col-span-3 standard-border w-full flex flex-col gap-5 overflow-hidden">
            <FindPoliklinik />
            {/* --------------------------- AD IMAGA --------------------------- */}
            <div className="w-full h-auto mx-auto">
              <Image
                rel="preload"
                placeholder="empty"
                src="/images/slides/pelatihan.png"
                alt="pelatihan"
                width={500}
                height={400}
                className="object-center object-fill w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
          <LargePoliklinikList />
        </div>
      </div>
    </section>
  );
};

export default PoliklinikListContainer;
