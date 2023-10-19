"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  enterTop,
  enterTopChildren,
} from "@/app/(tools)/framervariants/variants";
import Image from "next/image";
import dataDirectors from "@/app/(tools)/data/data_directors.json";
type Props = {};

function TeamPage(props: Props) {
  return (
    <div className="page-main-container">
      <motion.div
        variants={enterTop}
        initial="initial"
        animate="animate"
        className=" h-1/2 md:h-2/3 w-full overflow-hidden relative  z-10"
      >
        <motion.div
          key="background"
          variants={enterTopChildren}
          className=" bg-stone-700 bg-opacity-70 mix-blend-multiply w-full absolute h-full right-0 top-0 z-10 rounded-b-md md:rounded-b-none overflow-hidden"
        ></motion.div>
        <motion.div
          key="foreground"
          variants={enterTopChildren}
          className="absolute w-full h-full right-0 z-0 object-cover rounded-b-md md:rounded-b-none overflow-hidden"
        >
          <Image
            rel="preload"
            placeholder="empty"
            src="/images/pages/our-team.jpg"
            alt="our-team"
            height={1000}
            width={1400}
            className=" object-cover w-full z-0 absolute h-full right-0 top-0"
            priority
          />
        </motion.div>

        <motion.h1
          key="title"
          variants={enterTopChildren}
          className="absolute z-20 top-1/3 md:top-2/3 left-0  md:left-16 text-white text-[30px]  font-regular md:text-[40px] tracking-[5px] md:tracking-[15px] drop-shadow-md shadow-black w-full text-center md:text-left
          "
        >
          Tim Kami
        </motion.h1>
      </motion.div>
      <motion.div
        variants={enterTop}
        initial="initial"
        animate="animate"
        className="absolute z-20 top-1/4 bg-greyLit  right-0  md:translate-x-0 md:right-16 flex h-fit bg-opacity-20 shadow-md shadow-black rounded-sm  w-full md:w-fit"
      >
        {dataDirectors.slice(1, 6).map((item) => {
          return (
            <motion.div
              key={item.id}
              variants={enterTopChildren}
              className=" object-cover h-28 w-1/5 md:h-52 md:w-32 z-40 "
            >
              {item.img && (
                <Image
                  rel="preload"
                  placeholder="empty"
                  loading="lazy"
                  src={`/images/pages/${item.img}.jpg`}
                  alt="our-team"
                  height={400}
                  width={300}
                  className=" object-cover h-full w-full z-40   "
                />
              )}
            </motion.div>
          );
        })}
      </motion.div>

      <section
        id="team-content"
        className="bg-greyLit h-fit min-h-screen w-full z-0 p-3 pt-10 md:p-14 pb-[150px]"
      >
        <h3 className="text-xl font-medium mb-2"> TIM RS URIP SUMOHARJO</h3>
        <p className=" w-full max-w-4xl body-2 text-greyDrk text-left md:text-right  font-light z-20 mx-auto">
          RS Urip Sumoharjo berterimakasih kepada seluruh anggota tim kami, yang
          terdiri dari berbagai kalangan mulai dari board director, dokter,
          ners, tim paramedik, tim support, tim admin dan manajerial, semua
          bekerja keras dalam semangat Islami demi memberikan pelayanan terbaik
          pada pasien RS Urip Sumoharjo.
        </p>

        <h3 className="pt-5 text-xl font-medium"> Board directors</h3>
        <div className="w-full  max-w-full md:max-w-4xl mx-auto  md:mt-4 p-3">
          {dataDirectors.map((item, index) => {
            return (
              <div
                key={index}
                className="grid grid-cols-10 border-t border-t-greyBorder h-fit md:h-12 p-2 md:p-0"
              >
                <div className="col-span-full md:col-span-4 p-0 md:p-2">
                  <p className="btn-3 md:btn-2  ">{item.title}</p>
                </div>
                <div className=" col-span-full md:col-span-6  p-0 md:p-2">
                  <p className=" font-nunito text-greyDrk text-[20px] tracking-wide">
                    {item.info[0]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default TeamPage;
