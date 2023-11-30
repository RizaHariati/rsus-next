import {
  InitialValueType,
  HospitalItemType,
} from "@/app/(tools)/HospitalTypes";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import myImageLoader, { sanityLoader } from "@/loader";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";

type Props = {
  facilityFormKey: string;
  facilityFormValue: HospitalItemType;
  facilityValues: InitialValueType;
  handleChangeValue: (value: { newValue: any; key: string }[]) => void;
};

const FacilityImage = ({
  facilityFormKey,
  facilityFormValue,
  facilityValues,
  handleChangeValue,
}: Props) => {
  const {
    state: { editable },
    hospitalState: { dataFacility },
  } = useGlobalContext();

  const [imgFile, setImgFile] = useState<{
    imgSrc: string;
    imgName: string;
  }>({
    imgSrc: facilityValues[facilityFormKey].value?.src,
    imgName: facilityValues[facilityFormKey].value?.alt,
  });
  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (e.target.files) {
        const imgName = e.target.files?.[0].name;
        const imgSrc = URL.createObjectURL(e.target.files?.[0]);

        if (
          imgFile.imgName !== facilityValues[facilityFormKey].value?.alt &&
          imgFile.imgSrc !== facilityValues[facilityFormKey].value?.src
        ) {
          setImgFile({ imgSrc, imgName });
        } else {
          setImgFile({
            imgSrc: facilityValues[facilityFormKey].value?.src,
            imgName: facilityValues[facilityFormKey].value?.alt,
          });
        }
      }
    },
    [imgFile]
  );
  useEffect(() => {
    if (!editable)
      setImgFile({
        imgSrc: facilityValues[facilityFormKey].value?.src,
        imgName: facilityValues[facilityFormKey].value?.alt,
      });
  }, [facilityValues, editable]);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    e.preventDefault();
    if (
      imgFile.imgName !== facilityValues[facilityFormKey].value?.alt &&
      imgFile.imgSrc !== facilityValues[facilityFormKey].value?.src
    ) {
      const newValue = {
        src: imgFile.imgSrc,
        alt: imgFile.imgName,
      };
      console.log(newValue);
    }
    // handleChangeValue([{ newValue, key: facilityFormKey }]);
  };
  return (
    <div className="flex flex-col gap-2 mt-2 w-full">
      <small className="">{facilityFormValue.title}</small>
      <div className="w-full h-fit flex-center-center flex-col standard-border gap-2 p-2">
        <Image
          loader={imgFile.imgSrc === "" ? myImageLoader : sanityLoader}
          unoptimized={imgFile.imgSrc === ""}
          placeholder="empty"
          src={
            imgFile.imgSrc !== ""
              ? imgFile.imgSrc
              : facilityValues[facilityFormKey].value?.src ||
                "/static/images/pelayanan-fasilitas/audiometri"
          }
          width={500}
          height={400}
          quality={75}
          className=" object-cover h-44 w-52 rounded-sm overflow-hidden mr-2 md:shrink-0"
          alt={facilityValues[facilityFormKey].value?.alt || "altimage"}
          loading="lazy"
        />
      </div>

      <input
        disabled={!editable}
        type="file"
        id="facilityImage"
        accept="image/jpeg"
        // title="pilih image untuk di upload"
        className={editable ? "admin-input py-1" : "admin-input-disabled py-1"}
        onChange={(e) => handleFileInput(e)}
        onBlur={(e) => {
          handleBlur(e);
        }}
      />
    </div>
  );
};

export default FacilityImage;
