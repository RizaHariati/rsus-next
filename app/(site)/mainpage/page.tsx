"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import "../../styles/mainpage.css";

import KegiatanRSUS from "@/app/(tools)/components/PageComponents/mainpage/KegiatanRSUS";
import { enterTitleVariants } from "@/app/(tools)/framervariants/titlevariants";
import FloatingMenu from "@/app/(tools)/components/PageComponents/mainpage/FloatingMenu";
import MainImageAnimated from "@/app/(tools)/components/PageComponents/mainpage/MainImageAnimated";

type Props = {};

const MainPage = (props: Props) => {
  return (
    <div className=" page-main-container ">
      <section
        id="zero"
        className=" h-full  min-h-screen w-full z-0 overflow-hidden flex relative snap-center bg-accent1"
      >
        <FloatingMenu />
        <div className="h-full w-3/12 bg-greyLit relative z-10 ">
          <div className="w-4 h-full bg-accent1 absolute right-0 top-0"></div>
        </div>
        <MainImageAnimated />
      </section>
      <KegiatanRSUS />
      <section
        id="two"
        className=" bg-slate-300 h-screen w-full z-0 snap-center"
      >
        <motion.h2
          variants={enterTitleVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          Kunjungi kami
        </motion.h2>
      </section>
    </div>
  );
};

export default MainPage;
