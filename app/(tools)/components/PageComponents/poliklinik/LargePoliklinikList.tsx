import dataPoliklinik from "@/app/(tools)/data/data_poliklinik.json";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { enterTop } from "@/app/(tools)/framervariants/variants";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";

type Props = {};

const LargePoliklinikList = (props: Props) => {
  const { openModal } = useGlobalContext();
  return (
    <div className=" col-span-5  standard-border w-full h-full custom-scrollbar ">
      <motion.div
        variants={enterTop}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {dataPoliklinik.map((item) => {
          return (
            <button
              key={item.id}
              id={item.id}
              onClick={() => openModal("poliklinik", item)}
              className="grid grid-cols-10 standard-border py-3 cursor-pointer hover:opacity-50 active:opacity-0 transition-all"
            >
              <div className=" col-span-2 aspect-square h-20 w-auto mx-auto">
                <Image
                  rel="preload"
                  placeholder="empty"
                  src={`/images/icons/policlinic-icons/${item.img}.jpg`}
                  alt={item.img}
                  width={60}
                  height={60}
                  className="object-center object-cover w-auto h-20 mx-auto"
                  loading="lazy"
                />
              </div>
              <div className=" col-span-7 text-left">
                <h5 className=" font-light text-left">{item.title}</h5>
                <p className="body-3">
                  {item.description[0].slice(0, 150)}... selanjutnya
                </p>
              </div>
              <div>
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
            </button>
          );
        })}
      </motion.div>
    </div>
  );
};

export default LargePoliklinikList;
