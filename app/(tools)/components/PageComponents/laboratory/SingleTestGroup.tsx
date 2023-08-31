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
import { samplePatient } from "@/app/(tools)/data/samplePatient";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { findInCart } from "@/app/(tools)/utils/findInCart";
import { toast } from "react-toastify";

type Props = {
  item: string;
  tests: LabItemType[];
};

const SingleTestGroup = ({ item, tests }: Props) => {
  const [labContent, setLabContent] = useState<string | null>(null);
  const {
    openModal,
    openAlert,
    toggleCart,
    state: { labCart },
  } = useGlobalContext();

  const toggleContent = (category: string | null) => {
    if (labContent === category) {
      setLabContent(null);
    } else {
      setLabContent(category);
    }
  };

  const openingLabCart = (labItem: LabItemType) => {
    {
      //  check login
      if (samplePatient.login) {
        const findLabItem = labCart.find((item) => item.id === labItem.id);
        findLabItem
          ? toast(`Test ${labItem.title} berhasil dihapus`)
          : toast(`Test ${labItem.title} berhasil ditambahkan`);
        toggleCart(labItem, "all");

        openModal("keranjang", {});
      } else {
        openAlert("lablogin", {
          labItem: labItem,
        });
      }
    }
  };
  return (
    <div className=" w-full  border-b border-greyBorder py-2">
      <div
        className={
          tests.filter((testItem) =>
            labCart.find((item) => item.id === testItem.id)
          ).length > 0
            ? "w-full flex-center-between pb-2 bg-greenUripOpacity  "
            : "w-full flex-center-between pb-2   "
        }
      >
        <h3>{item}</h3>
        <button
          onClick={() => toggleContent(item)}
          className="transition-all text-greyDrk hover:text-greyMed2 "
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
            ? "h-0 overflow-hidden w-full transition-all flex flex-col gap-2"
            : "h-fit overflow-hidden w-full transition-all flex flex-col gap-2"
        }
      >
        {tests.map((labItem) => {
          return (
            <button
              onClick={() => {
                openingLabCart(labItem);
              }}
              key={labItem.id}
              className={
                findInCart(labCart, labItem.id)
                  ? "lab-satuan-item bg-greyLit"
                  : "lab-satuan-item "
              }
            >
              <div key={labItem.id} className=" w-full flex-top-left gap-2">
                <FontAwesomeIcon
                  icon={faCircleDot}
                  className="h-3 pt-2 text-greyMed2"
                />
                <div>
                  <p className=" flex-wrap btn-3-bold">{labItem.title}</p>
                  <p className="body-3 ">{labItem.description}</p>
                </div>
              </div>
              <p className=" w-40 text-right ">
                Rp. {labItem.price.toLocaleString()}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SingleTestGroup;
