import React from "react";
import { FacilitySanityType, FacilityType } from "../../../types";
import Image from "next/image";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { sanityLoader } from "../../../../../loader";

type Props = {
  facility: FacilitySanityType;
};

const FasilitasUnit = ({ facility }: Props) => {
  const { openModal } = useGlobalContext();
  console.log({ facility: facility.img.src === null, facilityID: facility.id });
  return (
    <button
      key={facility.id}
      onClick={() => openModal("facility", facility)}
      className=" facility-unit-container group"
    >
      <div className=" facility-unit-img-container  ">
        {facility.img.src && (
          <Image
            loader={sanityLoader}
            rel="preload"
            placeholder="empty"
            src={facility.img.src}
            alt={facility.img.alt}
            height={200}
            width={200}
            className="facility-unit-img"
            loading="lazy"
          />
        )}
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
          loader={sanityLoader}
          rel="preload"
          placeholder="empty"
          src={facility.img.src}
          alt={facility.img.alt}
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
