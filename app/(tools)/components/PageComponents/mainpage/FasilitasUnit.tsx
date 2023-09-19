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
      className=" facility-unit-container group"
    >
      <div className=" facility-unit-img-container  ">
        <Image
          rel="preload"
          placeholder="empty"
          src={`/images/pelayanan-fasilitas/small/${facility.img}.jpg`}
          alt={facility.img}
          height={200}
          width={200}
          className="facility-unit-img"
          loading="lazy"
        />
      </div>
      <div className=" facility-unit-info ">
        <h4 className=" facility-unit-title  ">{facility.title}</h4>
        <p className="facility-unit-description">
          {facility.description.slice(0, 130)}... (lanjut)
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
      className=" facility-unit-container-wide group"
    >
      <div className=" facility-unit-img-container ">
        <Image
          rel="preload"
          placeholder="empty"
          src={`/images/pelayanan-fasilitas/small/${facility.img}.jpg`}
          alt={facility.img}
          height={200}
          width={200}
          className="facility-unit-img"
          loading="lazy"
        />
      </div>
      <div className="facility-unit-info ">
        <h4 className=" facility-unit-title ">{facility.title}</h4>
        <p className="facility-unit-description">
          {facility.description.slice(0, 200)}... (lanjut)
        </p>
      </div>
    </button>
  );
};
