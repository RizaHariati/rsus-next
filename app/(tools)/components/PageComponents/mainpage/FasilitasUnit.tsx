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
    <div
      key={facility.id}
      onClick={() => openModal("facility", facility)}
      className=" grid grid-cols-7 bg-white hover:bg-greyLit rounded-sm overflow-hidden border border-white hover:border-greyBorder transition-all opacity-100 hover:opacity-50 gap-2 cursor-pointer "
    >
      <div className=" col-span-2 standard-border h-36 w-full flex items-center justify-center ">
        <Image
          src={`/images/pelayanan-fasilitas/small/${facility.img}.jpg`}
          alt={facility.img}
          height={200}
          width={200}
          className="object-center object-cover h-full w-auto overflow-hidden rounded-sm"
          loading="lazy"
        />
      </div>
      <div className=" col-span-5 pt-3">
        <h4 className="text-left mb-2">{facility.title}</h4>
        <p className="body-3 leading-normal">
          {facility.description.slice(0, 200)}... (lanjut)
        </p>
      </div>
    </div>
  );
};

export default FasilitasUnit;
