"use client";
import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMaximize, faMinimize } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { enterOpacity } from "@/app/(tools)/framervariants/variants";

type Props = {};

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
          ? " z-20 bg-white bottom-16 w-[450px] right-16 h-24 standard-border p-2 fixed transition-all shadow-md shadow-greyDrk"
          : " z-20 bg-white bottom-16 w-[250px] right-16 h-10 standard-border p-2 fixed transition-all shadow-md shadow-greyDrk"
      }
    >
      <motion.div>
        <button
          onClick={() => setResize(!resize)}
          className="w-full flex items-center gap-2 text-greyMed1 hover:text-greyBorder transition-all justify-end"
        >
          <FontAwesomeIcon
            icon={resize ? faMinimize : faMaximize}
            className="h-3 "
          />
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
    </motion.div>
  );
};

export default FindFacility;
