"use client";
import React from "react";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { PaketLabType } from "@/app/(tools)/types";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { findInCart } from "@/app/(tools)/utils/findInCart";

type ItemProps = {
  item: PaketLabType;
};

const PaketItem = ({ item }: ItemProps) => {
  const {
    openModal,
    state: { labCart },
  } = useGlobalContext();

  return (
    <div
      className={
        findInCart(labCart, item.id)
          ? "lab-paket-item  bg-greenUripOpacity"
          : "lab-paket-item "
      }
      onClick={() => openModal("paketLab", item)}
    >
      <div className="w-10 h-10 md:w-14 md:h-14 overflow-hidden  aspect-square">
        <Image
          rel="preload"
          placeholder="empty"
          src={`/images/icons/laboratory-icons/${item.img}.jpg`}
          alt={item.img}
          width={80}
          height={80}
          className="object-center object-cover w-full h-auto  "
          loading="lazy"
        />
      </div>
      <div className="mr-auto ">
        <h4 className="text-left">{item.title}</h4>
        <div className="flex flex-col md:flex-row w-fit text-left md:gap-2">
          {item.price.map((item, index) => {
            const { type, value } = item;
            return (
              <div key={index}>
                {type === "all" && value > 0 && (
                  <p className="body-3">Rp. {value.toLocaleString()}</p>
                )}
                {type === "pria" && (
                  <p className="body-3 leading-4">
                    Pria : Rp. {value.toLocaleString()}
                  </p>
                )}
                {type === "wanita" && (
                  <p className="body-3 leading-4">
                    Wanita : Rp. {value.toLocaleString()}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <button
        onClick={() => openModal("paketLab", item)}
        className="standard-border p-1 pl-7  transition-all  hover:animate-pulse hidden md:flex-center-center"
      >
        <FontAwesomeIcon icon={faChevronRight} className="h-3" />
      </button>
    </div>
  );
};

export default PaketItem;
