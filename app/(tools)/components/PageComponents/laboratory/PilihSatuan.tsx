"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { enterTitleVariants } from "@/app/(tools)/framervariants/titlevariants";
import { LabItemType } from "@/app/(tools)/types";
import { getCompleteTests } from "@/app/(tools)/utils/getCompleteTests";

import SingleTestGroup from "./SingleTestGroup";

type Props = {};

const PilihSatuan = (props: Props) => {
  return (
    <section
      id="satuan"
      className=" h-fit w-full z-0  mt-14 bg-white snap-start"
    >
      <motion.h2
        variants={enterTitleVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="sticky top-0 pt-16 pb-2 bg-white w-full border-b border-b-greyBorder"
      >
        Pilih Test Sendiri
      </motion.h2>
      <div className="w-full max-w-3xl mx-auto bg-white py-5 ">
        <div>
          {Object.keys(getCompleteTests()).map(
            (item: string, index: number) => {
              const tests: LabItemType[] = getCompleteTests()[item];

              return <SingleTestGroup key={index} item={item} tests={tests} />;
            }
          )}
        </div>
      </div>
    </section>
  );
};

export default PilihSatuan;
