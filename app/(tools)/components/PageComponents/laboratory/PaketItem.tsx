"use client";
import React from "react";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { PaketLabType } from "@/app/(tools)/types";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";

type ItemProps = {
  item: PaketLabType;
};

const PaketItem = ({ item }: ItemProps) => {
  const { openModal } = useGlobalContext();

  return (
    <div
      className="standard-border flex items-start justify-between p-2 gap-4 text-greyDrk cursor-pointer bg-white hover:bg-greyBorder opacity-100 hover:opacity-50 active:bg-accent1 transition-all"
      onClick={() => openModal("paketLab", item)}
    >
      <div className="w-14 h-14 overflow-hidden  aspect-square">
        <Image
          rel="preload"
          placeholder="empty"
          src={`/images/icons/laboratory-icons/${item.img}.jpg`}
          alt={item.img}
          width={80}
          height={80}
          className="object-center object-fit w-full h-auto  aspect-square"
          loading="lazy"
        />
      </div>
      <div className="mr-auto ">
        <h4 className="text-left">{item.title}</h4>
        <div className="flex w-fit text-left gap-2">
          {item.price.map((item, index) => {
            const { type, value } = item;
            return (
              <div key={index}>
                {type === "all" && value > 0 && (
                  <p>Rp. {value.toLocaleString()}</p>
                )}
                {type === "pria" && <p>Pria : Rp. {value.toLocaleString()}</p>}
                {type === "wanita" && (
                  <p>Wanita : Rp. {value.toLocaleString()}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <button
        onClick={() => openModal("paketLab", item)}
        className="standard-border p-1 pl-7  transition-all  hover:animate-pulse flex items-center justify-center"
      >
        <FontAwesomeIcon icon={faChevronRight} className="h-3" />
      </button>
    </div>
  );
};

export default PaketItem;
