"use client";
import Image from "next/image";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

import dataBed from "@/app/(tools)/data/data_inap.json";
import { InpatientType } from "@/app/(tools)/types";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { inpatientvariant } from "@/app/(tools)/framervariants/inpatientvariants";

type Props = {};

const ImageGallery = () => {
  const { openModal } = useGlobalContext();

  return (
    <motion.div className="w-full max-w-6xl grid grid-cols-4 mx-auto  mt-4 gap-2 p-0 md:p-5">
      {dataBed.map((item: InpatientType, index) => {
        return (
          <div
            key={index}
            className=" col-span-2 md:col-span-1 standard-border cursor-pointer opacity-100 relative  hover:opacity-70 h-52 overflow-hidden z-0 rounded-sm"
          >
            <AnimatePresence>
              <motion.button
                variants={inpatientvariant}
                initial="initial"
                whileInView={{
                  opacity: 1,
                  y: "0%",
                  transition: {
                    delay: (index % 3) / 10,
                    duration: 0.5,
                    staggerChildren: 0.2,
                    type: "spring",
                    stiffness: 100,
                  },
                }}
                whileTap="exit"
                id={item.kelas}
                onClick={() => openModal("inpatient", item)}
                className="w-full h-52"
              >
                <div className="w-full h-2/3 overflow-hidden">
                  <Image
                    rel="preload"
                    placeholder="empty"
                    src={`/images/inpatient/thumbnails/${item.img}`}
                    alt={item.kelas}
                    width={300}
                    height={300}
                    loading="lazy"
                    className="object-center object-cover h-full w-full"
                  />
                </div>

                <div className="w-8 h-8 rounded-full overflow-hidden absolute z-10 top-2 left-2">
                  <Image
                    rel="preload"
                    placeholder="empty"
                    src={`/images/navbar/main-logo.png`}
                    alt="main-logo"
                    width={40}
                    height={40}
                    loading="lazy"
                    className="object-center object-cover h-full w-full "
                  />
                </div>
                <div className="p-2 w-full h-1/3 ">
                  <h5 className="font-normal">{item.kelas}</h5>

                  <p className="border rounded-sm w-full p-1 px-2 mx-auto md:ml-auto">
                    Rp. {item.harga}
                  </p>
                </div>
              </motion.button>
            </AnimatePresence>
          </div>
        );
      })}
    </motion.div>
  );
};

export default ImageGallery;
