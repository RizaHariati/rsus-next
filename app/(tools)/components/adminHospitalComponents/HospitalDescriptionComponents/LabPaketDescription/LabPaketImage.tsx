import {
  HospitalItemType,
  LabPaketInitialValueType,
} from "@/app/(tools)/HospitalTypes";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { sanityLoader } from "@/loader";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";

type Props = {
  labPaketFormKey: string;
  labPaketFormValue: HospitalItemType;
  labPaketValues: LabPaketInitialValueType;
};

const LabPaketImage = ({
  labPaketFormKey,
  labPaketFormValue,
  labPaketValues,
}: Props) => {
  const {
    state: { editable },
    hospitalState: { dataPaket },
  } = useGlobalContext();
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.preventDefault);
    console.log(e.target.value.slice(12, e.target.value.length));
  };
  return (
    <div className="flex flex-col gap-2 mt-2">
      <small className="">{labPaketFormValue.title}</small>
      <div className="w-full h-fit flex-center-center flex-col standard-border gap-2 p-2">
        <Image
          loader={sanityLoader}
          placeholder="empty"
          src={
            labPaketValues[labPaketFormKey].value?.src ||
            "/images/navbar/main-logo.png?w=64&q=75"
          }
          width={300}
          height={300}
          quality={75}
          className=" object-cover h-32 w-32 rounded-sm overflow-hidden mr-2 shrink-0"
          alt={labPaketValues[labPaketFormKey].value?.alt || "altimage"}
          loading="lazy"
        />
      </div>

      <div
        className={
          editable
            ? "admin-input flex-center-between cursor-pointer group"
            : "admin-input-disabled flex-center-between"
        }
      >
        <label
          htmlFor="facilityImage"
          className="h-full group-hover:cursor-pointer w-full"
        >
          Pilih gambar baru
        </label>

        <input
          type="file"
          id="facilityImage"
          accept="image/jpeg"
          className="opacity-0 h-full group-hover:cursor-pointer w-full"
          onChange={(e) => handleFileInput(e)}
        />
        <FontAwesomeIcon icon={faPlus} className="w-4 h-4 shrink-0" />
      </div>
    </div>
  );
};

export default LabPaketImage;
