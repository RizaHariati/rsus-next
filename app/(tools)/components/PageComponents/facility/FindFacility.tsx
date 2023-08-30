"use client";
import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMaximize, faMinimize } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { enterOpacity } from "@/app/(tools)/framervariants/variants";
import { FacilityType } from "@/app/(tools)/types";
import dataFacility from "@/app/(tools)/data/data_facility.json";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";

type Props = {};

const FindFacility = () => {
  const { openModal } = useGlobalContext();
  const [resize, setResize] = useState(true);
  const [keyword, setKeyword] = useState<string>("");
  const [fasList, setfasList] = useState<FacilityType[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setKeyword(e.target.value);
    const filterPoli = dataFacility.filter((itemFas) =>
      itemFas.title.toLowerCase().includes(e.target.value)
    );
    setfasList(filterPoli);
  };

  const findFacility = (fas: FacilityType) => {
    if (fasList.length < 2) {
      openModal("facility", fas);
    }
    const fasGroup = document?.getElementById(fas.category.toLowerCase());
    fasGroup?.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  };
  return (
    <motion.div
      drag
      variants={enterOpacity}
      initial="initial"
      animate="animate"
      className={
        resize
          ? " z-20 bg-white top-1/4 w-[450px] right-16 h-fit standard-border p-2 fixed transition-all shadow-md shadow-greyDrk"
          : " z-20 bg-white top-1/4 w-[250px] right-16 h-10 standard-border p-2 fixed transition-all shadow-md shadow-greyDrk"
      }
    >
      <div className="h-fit w-full flex flex-col gap-2 ">
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
        <div
          className={
            resize
              ? "w-full standard-border h-fit opacity-100 transition-all "
              : "w-full standard-border h-fit opacity-0  transition-all"
          }
        >
          <input
            placeholder="Cari fasilitas"
            className="dark-input"
            value={keyword}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
      {keyword && fasList.length > 0 && (
        <div
          className={
            resize
              ? "custom-scrollbar gap-2 h-fit max-h-52 transition-all "
              : "custom-scrollbar scrollbar-none gap-2 h-0 transition-all"
          }
        >
          {fasList.map((fas) => {
            return (
              <button
                onClick={() => {
                  findFacility(fas);
                }}
                key={fas.id}
                className="active-input mt-2"
              >
                <p> {fas.title}</p>
              </button>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default FindFacility;
