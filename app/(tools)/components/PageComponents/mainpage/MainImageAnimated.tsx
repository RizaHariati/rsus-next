"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

import {
  enterRightVariant,
  enterRightVariantChild,
} from "@/app/(tools)/framervariants/variants";
import myImageLoader from "@/loader";

type Props = {};

const MainImageAnimated = () => {
  return (
    <motion.div
      variants={enterRightVariant}
      initial="initial"
      animate="animate"
      className="h-screen w-9/12  relative z-0 overflow-hidden"
    >
      <motion.div
        variants={enterRightVariantChild}
        className="darken-filter"
      ></motion.div>

      <motion.h1
        variants={enterRightVariantChild}
        className="z-30 text-white text-right right-14 w-1/2 top-1/2 leading-[50px] absolute  font-light capitalize"
      >
        Pelayanan Medis Profesional dengan Semangat Islami untuk semua
      </motion.h1>
      <motion.p
        variants={enterRightVariantChild}
        className="btn-1 z-30 text-white text-right right-14 w-1/2 top-[75vh] absolute font-light capitalize animate-pulse pt-5"
      >
        <Link href="/about-group" className="btn-1">
          TENTANG RS.URIP SUMOHARJO
        </Link>
      </motion.p>
      <Image
        rel="preload"
        placeholder="empty"
        src="/images/pages/main-image-edited-01.jpg"
        alt="mainimage"
        height={1200}
        width={1200}
        className=" object-cover w-full z-10 absolute h-full right-0 top-0"
        priority
      />
    </motion.div>
  );
};

export default MainImageAnimated;
