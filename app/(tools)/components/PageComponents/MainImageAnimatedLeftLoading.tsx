"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import {
  enterLeftVariant,
  enterLeftVariantChild,
} from "@/app/(tools)/framervariants/variants";

type Props = {
  img: string;
  title?: string;
  description?: string;
};

const MainImageAnimatedLeftLoading = ({ img, title, description }: Props) => {
  return (
    <div className="md:h-screen w-9/12 relative z-0 overflow-hidden hidden md:block">
      <div className="darken-filter "></div>
      <h1 className="z-30 text-white text-left left-14 w-3/4 top-1/2 leading-[50px] tracking-[20px] absolute  font-light capitalize animate-pulse">
        {title}
      </h1>
      <p className="body-2 z-30 text-white text-left left-14 w-3/4 top-[60vh]  absolute font-light leading-6 animate-pulse">
        {description}
      </p>
    </div>
  );
};

export default MainImageAnimatedLeftLoading;
