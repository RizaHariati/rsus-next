"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { containerVariants } from "../facility/page";
import PageWrapper from "../pagewrapper";
type Props = {};

const MainPage = (props: Props) => {
  // const containerVariants = {
  //   init: {
  //     opacity: 0,
  //     x: "100vw",
  //   },
  //   visible: {
  //     opacity: 1,
  //     x: "0",
  //     transition: { stiffness: 100, duration: 2, type: "spring" },
  //   },
  // };

  const anotherVariants = {
    initial: { x: "100px" },
    visible: {
      x: "0",
      transition: { stiffness: 30, duration: 1, type: "spring" },
    },
    exit: {
      x: "-500px",
      transition: { stiffness: 350, duration: 3, type: "spring" },
    },
  };

  return (
    <PageWrapper>
      <div className="snap-y snap-mandatory h-screen overflow-y-scroll scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-none">
        <div
          id="div1"
          className=" h-full min-h-screen bg-green-400 relative snap-center"
        >
          <motion.div
            className="w-[500px] h-screen bg-purple-300 absolute"
            variants={anotherVariants}
            initial="init"
            animate="visible"
            exit="exit"
          >
            <motion.div
              variants={containerVariants}
              className="h-56 w-56 bg-purple-800 absolute z-10 top-1/2 -translate-y-1/2 text-white"
            >
              another
            </motion.div>
          </motion.div>

          <motion.h2
            className="pt-14"
            whileInView={{
              letterSpacing: "20px",
            }}
          >
            MainPage
          </motion.h2>
        </div>
        <section
          className=" h-full min-h-screen bg-yellow-200 pt-14 snap-center"
          id="section1"
        >
          <motion.h2 whileInView={{ letterSpacing: "20px" }}>
            AKSI RS URIP SUMOHARJO
          </motion.h2>
        </section>
        <section
          className=" h-[50vh] bg-orange-200 pt-14 snap-center"
          id="section2"
        >
          <motion.h2 whileInView={{ letterSpacing: "20px" }}>
            KUNJUNGI KAMI
          </motion.h2>
        </section>
        <section
          className=" h-full min-h-screen bg-fushia-200 pt-14 snap-center"
          id="section3"
        >
          <motion.h2 whileInView={{ letterSpacing: "20px" }}>
            FASILITAS & KLINIK UNGGULAN
          </motion.h2>
        </section>
        <section
          className=" h-full min-h-screen bg-pink-200 pt-14 snap-center"
          id="section4"
        >
          <motion.h2 whileInView={{ letterSpacing: "20px" }}>
            HANYA UNTUK ANDA
          </motion.h2>
        </section>
      </div>
    </PageWrapper>
  );
};

export default MainPage;
