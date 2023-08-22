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

const Team = (props: Props) => {
  return (
    <div className="page-main-container">
      <motion.div
        variants={enterTopChildren}
        initial="initial"
        animate="animate"
        className="h-2/3 w-full overflow-hidden relative z-10"
      >
        <motion.div
          variants={enterTopChildren}
          className=" bg-stone-700 bg-opacity-70 mix-blend-multiply w-full absolute h-full right-0 top-0 z-10"
        ></motion.div>
        <motion.div
          variants={enterTopChildren}
          className="absolute w-full h-full right-0 z-0 object-cover"
        >
          <Image
            src="/images/pages/our-team.jpg"
            alt="our-team"
            height={1000}
            width={1400}
            className=" object-cover w-full z-0 absolute h-full right-0 top-0"
            priority
          />
        </motion.div>

        <motion.h1
          variants={enterTopChildren}
          className="absolute z-20 top-2/3  left-16 text-white font-regular text-[40px] tracking-[15px] drop-shadow-md shadow-black w-full text-left
          "
        >
          Tim Kami
        </motion.h1>
      </motion.div>
      <motion.div
        variants={enterTop}
        initial="initial"
        animate="animate"
        className="absolute z-20 top-1/4 bg-greyLit right-16 flex h-fit bg-opacity-20 shadow-md shadow-black rounded-sm overflow-hidden"
      >
        {dataDirectors.slice(1, 6).map((item) => {
          return (
            <motion.div
              key={item.id}
              variants={enterTopChildren}
              className=" object-cover h-52 w-32 z-40 "
            >
              {item.img && (
                <Image
                  src={`/images/pages/${item.img}.jpg`}
                  alt="our-team"
                  height={400}
                  width={300}
                  className=" object-cover h-full w-full z-40   "
                  priority
                />
              )}
            </motion.div>
          );
        })}
      </motion.div>

      <section
        id="one"
        className=" bg-greyLit h-screen w-full z-0 snap-center p-14 "
      >
        <h3> TIM RS URIP SUMOHARJO</h3>
        <p className=" w-full max-w-4xl body-2 text-greyDrk text-right  font-light z-20 mx-auto">
          RS Urip Sumoharjo berterimakasih kepada seluruh anggota tim kami, yang
          terdiri dari berbagai kalangan mulai dari board director, dokter,
          ners, tim paramedik, tim support, tim admin dan manajerial, semua
          bekerja keras dalam semangat Islami demi memberikan pelayanan terbaik
          pada pasien RS Urip Sumoharjo.
        </p>

        <h3 className="pt-5"> Board directors</h3>
        <div className="w-full max-w-4xl mx-auto  mt-4">
          {dataDirectors.map((item, index) => {
            return (
              <div
                key={index}
                className="grid grid-cols-10 border-t border-t-greyBorder"
              >
                <div className=" col-span-4 p-2">
                  <p className="btn-2 ">{item.title}</p>
                </div>
                <div className=" col-span-6 p-2">
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
};

export default Team;
