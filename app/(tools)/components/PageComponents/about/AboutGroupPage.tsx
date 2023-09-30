"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import dataAbout from "@/app/(tools)/data/data_about.json";
import {
  enterTop,
  enterTopChildrenCenter,
} from "@/app/(tools)/framervariants/variants";
type Props = {};

function AboutGroupPage(props: Props) {
  return (
    <div className="page-main-container">
      <motion.section
        variants={enterTop}
        initial="initial"
        animate="animate"
        className=" h-1/2 md:h-2/3 w-full overflow-hidden relative "
      >
        <motion.div
          variants={enterTopChildrenCenter}
          className=" bg-stone-700 bg-opacity-90  mix-blend-multiply w-full absolute h-full right-1/2  top-0 z-10 rounded-b-md md:rounded-b-none overflow-hidden"
        ></motion.div>
        <motion.div
          variants={enterTopChildrenCenter}
          className="absolute w-full h-full right-1/2  z-0 object-cover  rounded-b-md  md:rounded-b-none overflow-hidden"
        >
          <Image
            rel="preload"
            placeholder="empty"
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
          className="absolute z-20 top-1/3 right-1/2 -translate-x-1/2 md:translate-x-0  text-white text-center font-regular text-[20px] md:text-[40px] tracking-[5px] md:tracking-[15px] w-full md:w-1/2 drop-shadow-md shadow-black"
        >
          RS Urip Sumoharjo
        </motion.h1>
        <motion.p
          variants={enterTopChildrenCenter}
          className="absolute w-full md:w-1/2 bottom-4 md:top-1/2 right-1/2 -translate-x-1/2 md:translate-x-0 body-3 leading-[18px] md:body-2 md:leading-5 mx-auto text-center text-white font-light z-20 px-3 md:px-0 "
        >
          RS Urip Sumoharjo Merupakan RS Swasta Islam di BandarLampung, yang
          menyediakan pelayanan kesehatan untuk semua kalangan sebagai bagian
          dari rahmat untuk alam semesta. Telah beroperasi sejak tanggal 10
          September 2001 dan sesuai dengan Keputusan Menteri Kesehatan RI No.
          492/menkes/SK/V/2008, RS Urip Sumoharjo saat ini merupakan rumah sakit
          swasta utama setara tipe B Non Pendidikan
        </motion.p>
      </motion.section>

      <section
        id="one"
        className=" bg-greyLit h-fit min-h-screen w-full z-0 pt-3 pb-[150px] "
      >
        <h2> Tentang Kami</h2>
        <div className="w-full max-w-4xl mx-auto mt-2 md:mt-4">
          {dataAbout.map((item, index) => {
            return (
              <div
                key={index}
                className="grid grid-cols-10 border-t border-t-greyBorder"
              >
                <div className=" col-span-full md:col-span-4 p-2">
                  <p className="btn-2 ">{item.title}</p>
                </div>
                <div className=" col-span-full md:col-span-6 p-2 pt-0 md:pt-2 ">
                  {item.info.length > 1 &&
                    item.info.map((info: string, indexList) => {
                      return (
                        <li className=" list-inside body-3" key={indexList}>
                          {info}
                        </li>
                      );
                    })}
                  {item.info.length === 1 && (
                    <p className="body-3">{item.info[0]}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default AboutGroupPage;
