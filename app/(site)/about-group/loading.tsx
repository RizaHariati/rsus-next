"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import {
  enterTop,
  enterTopChildrenCenter,
} from "../../(tools)/framervariants/variants";
import dataAbout from "@/app/(tools)/data/data_about.json";

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className="page-main-container">
      <section className=" h-1/2 md:h-2/3 w-full overflow-hidden relative  ">
        <div className=" bg-stone-700 bg-opacity-90  mix-blend-multiply w-full absolute h-full right-1/2 translate-x-1/2 top-0 z-10 rounded-b-md md:rounded-b-none overflow-hidden animate-pulse"></div>
        <div className="absolute w-full h-full right-1/2  z-0 object-cover  rounded-b-md  md:rounded-b-none overflow-hidden"></div>
        <h1 className="absolute z-20 top-1/3 right-1/2 translate-x-1/2 text-white text-center font-regular text-[20px] md:text-[40px] tracking-[5px] md:tracking-[15px] w-full drop-shadow-md shadow-black">
          Tentang RS Urip Sumoharjo..
        </h1>
      </section>
    </div>
  );
};

export default Loading;
