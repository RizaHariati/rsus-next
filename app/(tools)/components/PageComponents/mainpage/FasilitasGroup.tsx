"use client";
import React from "react";
import { motion } from "framer-motion";
import { enterTitleVariants } from "@/app/(tools)/framervariants/titlevariants";

import { FacilityType } from "@/app/(tools)/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import FasilitasUnit from "./FasilitasUnit";
type Props = {
  facilityGroup: FacilityType[];
  facilityTitle: string;
};

const FasilitasGroup = ({ facilityGroup, facilityTitle }: Props) => {
  return (
    <section id="two" className=" bg-slate-300 h-fit w-full snap-start">
      <div className=" w-full bg-white h-fit p-10 pt-14">
        <motion.h2
          variants={enterTitleVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {facilityTitle}
        </motion.h2>
        <div className=" w-modal_xl standard-border mx-auto grid grid-cols-2 p-3 px-10 gap-2 relative">
          {facilityGroup.map((facility: FacilityType) => {
            return <FasilitasUnit facility={facility} key={facility.id} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default FasilitasGroup;
