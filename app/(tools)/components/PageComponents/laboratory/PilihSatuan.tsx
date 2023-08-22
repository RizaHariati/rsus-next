"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { enterTitleVariants } from "@/app/(tools)/framervariants/titlevariants";
import { LabItemType } from "@/app/(tools)/types";
import { getCompleteTests } from "@/app/(tools)/utils/getCompleteTests";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faCircleDot,
} from "@fortawesome/free-solid-svg-icons";

type Props = {};

const PilihSatuan = (props: Props) => {
  const [labContent, setLabContent] = useState<string | null>(null);
  const toggleContent = (category: string | null) => {
    if (labContent === category) {
      setLabContent(null);
    } else {
      setLabContent(category);
    }
  };
  return (
    <section id="satuan" className=" h-fit w-full z-0  mt-14 bg-white ">
      <motion.h2
        variants={enterTitleVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="sticky top-0 pt-16 pb-2 bg-white w-full border-b border-b-greyBorder"
      >
        Pilih Test Sendiri
      </motion.h2>
      <div className="w-full max-w-3xl mx-auto bg-white py-5">
        <div>
          {Object.keys(getCompleteTests()).map(
            (item: string, index: number) => {
              const tests: LabItemType[] = getCompleteTests()[item];

              return (
                <div
                  key={index}
                  className=" w-full  border-b border-greyBorder py-2"
                >
                  <div className="w-full flex-center-between pb-2">
                    <h3>{item}</h3>
                    <button
                      onClick={() => toggleContent(item)}
                      className="transition-all text-greyDrk hover:text-greyMed2"
                    >
                      {labContent !== item ? (
                        <FontAwesomeIcon icon={faChevronDown} />
                      ) : (
                        <FontAwesomeIcon icon={faChevronUp} />
                      )}
                    </button>
                  </div>

                  <div
                    className={
                      labContent !== item
                        ? "h-0 overflow-hidden w-full transition-all"
                        : "h-fit overflow-hidden w-full transition-all"
                    }
                  >
                    {tests.map((test) => {
                      return (
                        <div
                          key={test.id}
                          className=" w-full flex-center-between hover:opacity-60 active:opacity-0 cursor-pointer transition-all"
                        >
                          <div
                            key={test.id}
                            className=" w-full flex-top-left gap-2"
                          >
                            <FontAwesomeIcon
                              icon={faCircleDot}
                              className="h-3 pt-2 text-greyMed2"
                            />
                            <div>
                              <p className=" flex-wrap btn-3-bold">
                                {test.title}
                              </p>
                              <p className="body-3 ">{test.description}</p>
                            </div>
                          </div>
                          <p className=" w-40  text-right ">
                            Rp. {test.harga?.toLocaleString()}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
};

export default PilihSatuan;
