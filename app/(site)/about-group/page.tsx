"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import {
  enterTop,
  enterTopChildrenCenter,
} from "../../(tools)/framervariants/variants";
import { dataAbout } from "@/app/(tools)/data/dataabout";

type Props = {};

const AboutGroup = (props: Props) => {
  return (
    <div className="page-main-container">
      <motion.section
        variants={enterTop}
        initial="initial"
        animate="animate"
        className="h-2/3 w-full overflow-hidden relative "
      >
        <motion.div
          variants={enterTopChildrenCenter}
          className=" bg-stone-700 bg-opacity-90  mix-blend-multiply w-full absolute h-full right-1/2  top-0 z-10"
        ></motion.div>
        <motion.div
          variants={enterTopChildrenCenter}
          className="absolute w-full h-full right-1/2  z-0 object-cover"
        >
          <Image
            src="/images/pages/rsus.jpg"
            alt="mainimage"
            height={1200}
            width={1200}
            className=" object-cover w-full z-0 absolute h-full right-0 top-0"
            priority
          />
        </motion.div>
        <motion.h1
          variants={enterTopChildrenCenter}
          className="absolute z-20 top-1/3 right-1/2  text-white text-center font-regular text-[40px] tracking-[15px] w-1/2 drop-shadow-md shadow-black"
        >
          RS Urip Sumoharjo
        </motion.h1>
        <motion.p
          variants={enterTopChildrenCenter}
          className="absolute w-1/2 top-1/2 right-1/2 body-2 mx-auto text-center text-white  font-light z-20 "
        >
          RS Urip Sumoharjo Merupakan RS Swasta dengan semangat Islami, yang
          menyediakan pelayanan kesehatan untuk semua kalangan sebagai bagian
          dari rahmat untuk alam semesta. Telah beroperasi sejak tanggal 10
          September 2001 dan sesuai dengan Keputusan Menteri Kesehatan RI No.
          492/menkes/SK/V/2008, RS Urip Sumoharjo saat ini merupakan rumah sakit
          swasta utama setara tipe B Non Pendidikan
        </motion.p>
      </motion.section>

      <section
        id="one"
        className=" bg-greyLit h-screen w-full z-0 snap-center pt-14 "
      >
        <h2> Tentang Kami</h2>
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

export default AboutGroup;
