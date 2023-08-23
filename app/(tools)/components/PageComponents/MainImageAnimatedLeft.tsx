"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import {
  enterLeftVariant,
  enterLeftVariantChild,
} from "@/app/(tools)/framervariants/variants";
import myImageLoader from "@/loader";

type Props = {
  img: string;
  title?: string;
  description?: string;
};

const MainImageAnimatedLeft = ({ img, title, description }: Props) => {
  return (
    <motion.div
      variants={enterLeftVariant}
      initial="initial"
      animate="animate"
      className="h-screen w-9/12  relative z-0 overflow-hidden"
    >
      <motion.div
        variants={enterLeftVariantChild}
        className="darken-filter "
      ></motion.div>
      <motion.h1
        variants={enterLeftVariantChild}
        className="z-30 text-white text-left left-14 w-3/4 top-1/2 leading-[50px] tracking-[20px] absolute  font-light capitalize"
      >
        {title}
      </motion.h1>
      <motion.p
        variants={enterLeftVariantChild}
        className="body-2 z-30 text-white text-left left-14 w-3/4 top-[60vh]  absolute font-light leading-6"
      >
        {description}
      </motion.p>
      <Image
        loader={myImageLoader}
        rel="preload"
        placeholder="empty"
        src={`/images/pages/${img}.jpg`}
        alt="mainimage"
        height={1200}
        width={1200}
        className=" object-cover w-full z-10 absolute h-full right-0 top-0"
        priority
      />
    </motion.div>
  );
};

export default MainImageAnimatedLeft;
