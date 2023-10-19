"use client";
import React from "react";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  enterTop,
  enterTopChildren,
} from "@/app/(tools)/framervariants/variants";
import { usePathname } from "next/navigation";
type Props = {};

const MainImageSmallLoading = (props: Props) => {
  const pathname = usePathname();
  return (
    <AnimatePresence>
      <div
        key={pathname}
        className=" h-1/2 w-full overflow-hidden rounded-b-lg relative z-10 md:hidden bg-greenUrip animate-pulse"
      >
        <div className=" mix-blend-multiply  bg-gradient-to-b from-stone-500 via-white to-zinc-500 bg-stone-800 absolute top-0 left-0 z-40 w-full h-full "></div>
        <div
          className="absolute h-full w-full top-0 left-0 z-0 bg-[length:100px_100px]
          bg-pattern mix-blend-multiply opacity-30"
        ></div>

        <h1 className="z-50 text-white w-full absolute font-thin capitalize text-center bottom-3 leading-6 text-[24px] tracking-[3px]">
          Pelayanan Medis Profesional dengan Semangat Islami untuk semua
        </h1>

        <div
          key="image"
          className="w-full h-full overflow-hidden absolute right-0 z-30 rounded-b-lg animate-pulse "
        ></div>
      </div>
    </AnimatePresence>
  );
};

export default MainImageSmallLoading;
