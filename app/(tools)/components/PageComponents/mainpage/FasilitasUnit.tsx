import React from "react";
import { FacilityType } from "../../../types";
import Image from "next/image";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";

type Props = {
  facility: FacilityType;
};

const FasilitasUnit = ({ facility }: Props) => {
  const { openModal } = useGlobalContext();
  return (
    <button
      key={facility.id}
      onClick={() => openModal("facility", facility)}
      className=" grid grid-cols-7 bg-white hover:bg-greyLit rounded-sm overflow-hidden border border-white hover:border-greyBorder transition-all opacity-100 hover:opacity-50 gap-1 md:gap-2 cursor-pointer "
    >
      <div className=" col-span-full md:col-span-2 standard-border h-28 md:h-36 w-full flex items-center justify-center ">
        <Image
          rel="preload"
          placeholder="empty"
          src={`/images/pelayanan-fasilitas/small/${facility.img}.jpg`}
          alt={facility.img}
          height={200}
          width={200}
          className="object-center object-cover h-full w-auto overflow-hidden rounded-sm"
          loading="lazy"
        />
      </div>
      <div className=" col-span-full md:col-span-5 pt-0 md:pt-3 text-center md:text-left ">
        <h4 className=" mb-2 text-center md:text-left  ">{facility.title}</h4>
        <p className="body-3 leading-5 hidden md:block">
          {facility.description.slice(0, 200)}... (lanjut)
        </p>
      </div>
    </button>
  );
};

export default FasilitasUnit;

export const FasilitasUnitwide = ({ facility }: Props) => {
  const { openModal } = useGlobalContext();
  return (
    <button
      key={facility.id}
      onClick={() => openModal("facility", facility)}
      className=" col-span-2 w-1/2 mx-auto grid grid-cols-7 bg-white hover:bg-greyLit rounded-sm overflow-hidden border border-white hover:border-greyBorder transition-all opacity-100 hover:opacity-50 gap-2 cursor-pointer "
    >
      <div className=" col-span-full md:col-span-2 standard-border h-28 md:h-36 w-full flex items-center justify-center">
        <Image
          rel="preload"
          placeholder="empty"
          src={`/images/pelayanan-fasilitas/small/${facility.img}.jpg`}
          alt={facility.img}
          height={200}
          width={200}
          className="object-center object-cover h-full w-auto overflow-hidden rounded-sm"
          loading="lazy"
        />
      </div>
      <div className="col-span-full md:col-span-5 pt-0 md:pt-3 text-center md:text-left">
        <h4 className=" mb-2 tracking-normal text-center md:text-left">
          {facility.title}
        </h4>
        <p className="body-3 leading-5 hidden md:block">
          {facility.description.slice(0, 200)}... (lanjut)
        </p>
      </div>
    </button>
  );
};
