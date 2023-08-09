"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import PageWrapper from "../pagewrapper";

type Props = {};
export const containerVariants = {
  initial: {
    opacity: 0,
    x: "-100vw",
  },
  visible: {
    opacity: 1,
    x: "80vw",
    transition: { stiffness: 100, duration: 2, type: "spring" },
  },
  exit: {
    opacity: 0,
    x: "-100vw",
  },
};

export const anotherVariants = {
  init: { x: "-100vw", width: "400px", backgroundColor: "blue" },
  visible: {
    x: "0",
    width: "500px",
    backgroundColor: "yellow",
    transition: {
      stiffness: 30,
      duration: 1,
      type: "spring",
      mass: 1,
      damping: 6,
      when: "afterChildren",
      staggerChildren: 0.3,
    },
  },
  exit: {
    x: "-100vw",
    width: "20px",
    backgroundColor: "red",
    transition: { duration: 3 },
  },
};
export const variantsH2 = {
  inView: {
    letterSpacing: "20px",
    transition: {
      yoyo: Infinity,
    },
  },
  inHover: {
    letterSpacing: "25px",
    transition: {
      duration: 0.3,
    },
  },
};
const Facility = (props: Props) => {
  return (
    // <PageWrapper>
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-none">
      <div
        id="div1"
        className=" h-full min-h-screen bg-green-400 relative snap-center"
      >
        <motion.h2
          className="pt-14"
          variants={variantsH2}
          whileInView="inView"
          whileHover="inHover"
        >
          FACILITY
        </motion.h2>
        <PageWrapper>
          <motion.div
            className=" h-screen absolute top-0 "
            variants={anotherVariants}
            initial={{ x: "-400px", width: "400px", backgroundColor: "blue" }}
            animate={{
              x: "0",
              width: "500px",
              backgroundColor: "yellow",
            }}
            exit={{ x: "-400px", width: "400px", backgroundColor: "blue" }}
          ></motion.div>
        </PageWrapper>
      </div>
      <section
        className=" h-full min-h-screen bg-yellow-200 pt-14 snap-center"
        id="section1"
      >
        <motion.h2
          variants={variantsH2}
          whileInView="inView"
          whileHover="inHover"
        >
          FASILITAS TERBARU
        </motion.h2>
      </section>
      <section
        className=" h-[50vh] bg-orange-200 pt-14 snap-center"
        id="section2"
      >
        <motion.h2
          variants={variantsH2}
          whileInView="inView"
          whileHover="inHover"
        >
          POLIKLINIK
        </motion.h2>
      </section>
      <section
        className=" h-full min-h-screen bg-fushia-200 pt-14 snap-center"
        id="section3"
      >
        <motion.h2
          variants={variantsH2}
          whileInView="inView"
          whileHover="inHover"
        >
          RAWAT JALAN
        </motion.h2>
      </section>
      <section
        className=" h-full min-h-screen bg-pink-200 pt-14 snap-center"
        id="section4"
      >
        <motion.h2
          variants={variantsH2}
          whileInView="inView"
          whileHover="inHover"
        >
          PENUNJANG KLINIK{" "}
        </motion.h2>
      </section>
    </div>
    // </PageWrapper>
  );
};

export default Facility;
