"use client";
import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMaximize, faMinimize } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { enterOpacity } from "@/app/(tools)/framervariants/variants";
import { FacilitySanityType, FacilityType } from "@/app/(tools)/types";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import Image from "next/image";

type Props = {};

const FindFacility = (props: Props) => {
  const {
    openModal,
    state: { dataFacility },
  } = useGlobalContext();
  const [resize, setResize] = useState(true);
  const [keyword, setKeyword] = useState<string>("");
  const [fasList, setfasList] = useState<FacilitySanityType[]>([]);
  const [windowIsBig, setwindowIsBig] = useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setKeyword(e.target.value);
    const filterPoli = dataFacility.filter((itemFas) =>
      itemFas.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setfasList(filterPoli);
  };

  useEffect(() => {
    if (!typeof document) return;
    else {
      if (window.innerWidth > 500) {
        setwindowIsBig(true);
      } else {
        setwindowIsBig(false);
      }
    }
  }, []);

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
      drag={windowIsBig}
      variants={enterOpacity}
      style={{ touchAction: "auto" }}
      initial="initial"
      animate="animate"
      className={resize ? "find-facility-big" : " find-facility-small"}
    >
      <div className="h-fit w-full flex flex-col gap-2  ">
        <button
          onClick={() => setResize(!resize)}
          className="hidden md:flex w-full items-center gap-2 text-greyMed1 hover:text-greyBorder transition-all justify-end h-5"
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
              ? "w-full standard-border h-10 opacity-100 transition-all "
              : "w-full standard-border h-10 opacity-0  transition-all"
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
      <div className="h-full w-full p-2">
        {!keyword && (
          <div className="w-full h-full overflow-hidden flex-center-center">
            <Image
              rel="preload"
              placeholder="empty"
              src={`/images/pages/sorry.jpg`}
              alt="sorry"
              height={200}
              width={200}
              className="object-center object-cover h-full w-auto overflow-hidden rounded-sm"
              loading="lazy"
            />
          </div>
        )}
        {keyword && fasList.length > 0 && (
          <div
            className={
              resize
                ? "custom-scrollbar gap-2 h-fit max-h-28 md:max-h-44 transition-all"
                : "custom-scrollbar scrollbar-none gap-2 h-0 transition-all "
            }
          >
            {fasList.map((fas) => {
              return (
                <button
                  onClick={() => {
                    findFacility(fas);
                  }}
                  key={fas.id}
                  className="active-input mt-1 md:mt-2 h-10 "
                >
                  <p> {fas.title}</p>
                </button>
              );
            })}
          </div>
        )}
        {keyword && fasList.length < 1 && (
          <div
            className={
              resize
                ? "custom-scrollbar gap-2 h-fit max-h-28 md:max-h-52 transition-all"
                : "custom-scrollbar scrollbar-none gap-2 h-0 transition-all "
            }
          >
            <h4>Tidak ditemukan fasilitas dengan kata kunci tersebut </h4>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default FindFacility;
