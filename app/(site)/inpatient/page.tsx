"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { enterTop, enterTopChildren } from "../../styles/variants";
import { dataAbout } from "@/app/(tools)/data/dataabout";

type Props = {};

const InPatient = (props: Props) => {
  return (
    <div className=" h-screen w-full z-0 max-w-[1440px] mx-auto ">
      <motion.section
        variants={enterTop}
        initial="initial"
        animate="animate"
        className="h-2/3 w-full overflow-hidden relative"
      >
        <motion.div
          variants={enterTopChildren}
          className=" bg-stone-500 bg-opacity-70 mix-blend-multiply w-full absolute h-full right-0 top-0 z-10"
        ></motion.div>
        <motion.div
          variants={enterTopChildren}
          className="absolute w-full h-full right-0 z-0 object-cover"
        >
          <Image
            src="/images/inpatient/featured.jpg"
            alt="mainimage"
            height={1200}
            width={1200}
            className=" object-cover w-full z-0 absolute h-full right-0 top-0"
            priority
          />
        </motion.div>
        <motion.h1
          variants={enterTopChildren}
          className="absolute z-20 top-2/3  right-16 text-white text-right font-regular text-[40px] tracking-[15px] w-1/2 drop-shadow-md shadow-black"
        >
          Fasilitas Rawat Inap
        </motion.h1>
      </motion.section>

      <section
        id="one"
        className=" bg-greyLit h-screen w-full z-0 snap-center pt-14  mx-auto"
      >
        <h4>
          Jam besuk : Pagi Pukul 11.00 - 12.00 Wib || Sore Pukul 17.00 - 18.00
          Wib
        </h4>
        <p className=" w-full max-w-4xl body-2 text-greyDrk text-right  font-light z-20 mx-auto">
          Untuk pendaftaran rawat inap dan pemesanan kamar silahkan menghubungi
          0811 7270 537
        </p>

        <div className="w-full max-w-4xl mx-auto  mt-4">
          {dataAbout.map((item, index) => {
            return (
              <div
                key={index}
                className="grid grid-cols-10 border-t border-t-greyBorder"
              >
                <div className=" col-span-4 p-2">
                  <p className="btn-2 ">{item.title}</p>
                </div>
                <div className=" col-span-6 p-2">
                  {item.info.length > 1 &&
                    item.info.map((info: string, indexList) => {
                      return (
                        <li className=" list-inside" key={indexList}>
                          {info}
                        </li>
                      );
                    })}
                  {item.info.length === 1 && <p>{item.info[0]}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default InPatient;
