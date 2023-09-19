"use client";
import React from "react";

import { motion } from "framer-motion";
import {
  enterTop,
  enterTopChildren,
} from "@/app/(tools)/framervariants/variants";
import Image from "next/image";

type Props = {
  img: string;
  title?: string;
  description?: string;
};

const MainImageSmall = ({ img, title, description }: Props) => {
  return (
    <motion.div
      variants={enterTop}
      initial="initial"
      whileInView="animate"
      className="md:hidden h-1/2 w-full bg-greenUrip relative z-10 rounded-b-lg overflow-hidden"
    >
      <div
        className="absolute h-full w-full top-0 left-0 z-10 bg-[length:100px_100px]
          bg-pattern mix-blend-multiply opacity-30"
      ></div>

      <motion.div className="w-full h-full overflow-hidden absolute right-0 z-20 rounded-b-lg">
        <div className=" mix-blend-multiply  bg-gradient-to-b from-stone-400 via-white to-zinc-400 bg-stone-800 absolute top-0 left-0 z-20 w-full h-full "></div>
        <Image
          rel="preload"
          placeholder="empty"
          src={`/images/pages/${img}.jpg`}
          alt="mainimage"
          height={700}
          width={500}
          className=" object-cover object-bottom w-full h-full "
          priority
        />
      </motion.div>
      {description && (
        <motion.h1
          key="small-image-title"
          variants={enterTopChildren}
          className="z-40 text-white text-center w-full left-0 bottom-1/3 leading-6 tracking-[5px] absolute  font-light uppercase"
        >
          {title}
        </motion.h1>
      )}
      {!description && (
        <motion.h1
          key="small-image-title"
          variants={enterTopChildren}
          className="z-30 text-white text-center w-full left-0 bottom-7 leading-6 tracking-[5px] absolute  font-light uppercase"
        >
          {title}
        </motion.h1>
      )}
      {description && (
        <motion.p
          key="small-image-description"
          variants={enterTopChildren}
          className="z-30 text-white text-center w-full left-0 bottom-3 absolute leading-5  font-light p-3 "
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
};

export default MainImageSmall;
