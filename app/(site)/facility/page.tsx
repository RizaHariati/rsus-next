"use client";
import React, { useState } from "react";
import MainImageAnimatedLeft from "../../(tools)/components/PageComponents/MainImageAnimatedLeft";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinimize } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { enterOpacity } from "@/app/styles/variants";

type Props = {};

const unit = {
  img: "facility",
  title: "FACILITY",
  description:
    "RS Urip Sumoharjo berusaha untuk terus meningkatkan  fasilitas dan mutu layanan kami dengan melengkapi tenaga medis yang profesional dan perlengkapan penunjang medis yang mengikuti perkembangan teknologi yang semakin maju dan canggih.",
};
const Facility = (props: Props) => {
  return (
    <div className=" h-screen w-full z-0 max-w-[1440px] mx-auto relative">
      <section
        id="zero"
        className=" h-full  min-h-screen w-full z-0 overflow-hidden flex relative snap-center bg-accent1"
      >
        <FindFacility />
        <MainImageAnimatedLeft
          img={unit.img}
          title={unit.title}
          description={unit.description}
        />
        <div className="h-full w-3/12 bg-greenUrip relative z-10  overflow-hidden">
          <div
            className="absolute h-full w-full top-0 left-4 z-10 bg-[length:200px_200px]
          bg-pattern  mix-blend-multiply opacity-30"
          ></div>
          <div className="w-4 h-full bg-accent1 absolute left-0 top-0"></div>
        </div>
      </section>
      <section
        id="one"
        className=" bg-pink-300 h-screen w-full z-0 snap-center "
      >
        <h2> Main Page</h2>
      </section>
      <section
        id="two"
        className=" bg-slate-300 h-screen w-full z-0 snap-center"
      >
        <h2> Main Page</h2>
      </section>
    </div>
  );
};
export default Facility;

const FindFacility = () => {
  const [resize, setResize] = useState(true);
  return (
    <motion.div
      drag
      variants={enterOpacity}
      initial="initial"
      animate="animate"
      className={
        resize
          ? " z-20 bg-white top-1/4 w-[450px] right-16 h-24 standard-border p-2 fixed transition-all"
          : " z-20 bg-white top-1/4 w-[250px] right-16 h-10 standard-border p-2 fixed transition-all"
      }
    >
      <button
        onClick={() => setResize(!resize)}
        className="w-full flex items-center gap-2 text-greyMed1 hover:text-greyBorder transition-all justify-end"
      >
        <FontAwesomeIcon icon={faMinimize} className="h-3 " />
        <p className="btn-3">{resize ? "Kecilkan" : "Besarkan"}</p>
      </button>
      <form
        className={
          resize
            ? "w-full standard-border h-12 opacity-100  "
            : "w-full standard-border h-12 opacity-0 "
        }
      >
        <input
          placeholder="Cari fasilitas"
          className="w-full standard-border h-full px-2  outline-none focus-visible:outline-none "
        />
      </form>
    </motion.div>
  );
};
