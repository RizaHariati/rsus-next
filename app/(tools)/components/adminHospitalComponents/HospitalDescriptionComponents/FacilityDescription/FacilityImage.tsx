import {
  FacilityInitialValueType,
  HospitalItemType,
} from "@/app/(tools)/HospitalTypes";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { sanityLoader } from "@/loader";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";

type Props = {
  facilityFormKey: string;
  facilityFormValue: HospitalItemType;
  facilityValues: FacilityInitialValueType;
};

const FacilityImage = ({
  facilityFormKey,
  facilityFormValue,
  facilityValues,
}: Props) => {
  const {
    state: { editable },
    hospitalState: { dataFacility },
  } = useGlobalContext();

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.preventDefault);
    console.log(e.target.value.slice(12, e.target.value.length));
  };
  const categoryList = Array.from(
    new Set(dataFacility.map((item) => item.category))
  );

  return (
    <div className="flex flex-col gap-2 mt-2">
      <small className="">{facilityFormValue.title}</small>
      <div className="w-full h-fit flex-center-center flex-col standard-border gap-2 p-2">
        <Image
          loader={sanityLoader}
          placeholder="empty"
          src={
            facilityValues[facilityFormKey].value?.src ||
            "/images/navbar/main-logo.png?w=64&q=75"
          }
          width={500}
          height={400}
          quality={75}
          className=" object-cover h-44 w-60 rounded-sm overflow-hidden mr-2 shrink-0"
          alt={facilityValues[facilityFormKey].value?.alt || "altimage"}
          loading="lazy"
        />
      </div>

      <div
        className={
          editable
            ? "admin-input flex-center-between cursor-pointer"
            : "admin-input-disabled flex-center-between"
        }
      >
        <label htmlFor="facilityImage">Pilih gambar baru</label>

        <input
          type="file"
          id="facilityImage"
          accept="image/jpeg"
          className="opacity-0  h-full"
          onChange={(e) => handleFileInput(e)}
        />
        <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
      </div>
    </div>
  );
};

export default FacilityImage;