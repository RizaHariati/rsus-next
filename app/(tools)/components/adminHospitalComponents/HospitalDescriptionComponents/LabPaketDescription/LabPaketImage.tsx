import {
  HospitalItemType,
  InitialValueType,
} from "@/app/(tools)/HospitalTypes";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { sanityLoader } from "@/loader";
import Image from "next/image";
import React, { useState } from "react";

type Props = {
  labPaketFormKey: string;
  labPaketFormValue: HospitalItemType;
  labPaketValues: InitialValueType;
};

const LabPaketImage = ({
  labPaketFormKey,
  labPaketFormValue,
  labPaketValues,
}: Props) => {
  const {
    state: { editable },
  } = useGlobalContext();

  const [imgFile, setImgFile] = useState<{
    imgSrc: string;
    imgName: string;
  }>({
    imgSrc: labPaketValues[labPaketFormKey].value?.src,
    imgName: labPaketValues[labPaketFormKey].value?.alt,
  });

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
          className=" object-cover h-28 w-28 rounded-sm overflow-hidden mr-2 md:shrink-0"
          alt={labPaketValues[labPaketFormKey].value?.alt || "altimage"}
          loading="lazy"
        />
      </div>

      <input
        type="file"
        id="facilityImage"
        accept="image/jpeg"
        className={editable ? "admin-input" : "admin-input-disabled"}
        onChange={(e) => handleFileInput(e)}
      />
    </div>
  );
};

export default LabPaketImage;
