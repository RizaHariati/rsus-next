import {
  InitialValueType,
  HospitalItemType,
} from "@/app/(tools)/HospitalTypes";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import myImageLoader, { sanityLoader } from "@/loader";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";

type Props = {
  formKey: string;
  formValue: HospitalItemType;
  values: InitialValueType;
  handleValueChange: (value: { newValue: any; key: string }[]) => void;
};

const ImageGenericInput = ({
  formKey,
  formValue,
  values,
  handleValueChange,
}: Props) => {
  const {
    state: { editable },
  } = useGlobalContext();

  const [imgFile, setImgFile] = useState<{
    imgSrc: string;
    imgName: string;
  }>({
    imgSrc: "",
    imgName: "",
  });
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const imgName = e.target.files?.[0].name;
      const imgSrc = URL.createObjectURL(e.target.files?.[0]);

      if (
        imgName !== values[formKey].value?.alt &&
        imgSrc !== values[formKey].value?.src
      ) {
        handleValueChange([
          { newValue: { src: imgSrc, alt: imgName }, key: formKey },
        ]);
        return setImgFile({ imgSrc, imgName });
      }
    }
    handleValueChange([
      { newValue: { ...values[formKey].value }, key: formKey },
    ]);
    return setImgFile({
      imgSrc: "",
      imgName: "",
    });
  };

  useEffect(() => {
    if (!editable)
      return setImgFile({
        imgSrc: "",
        imgName: "",
      });
  }, [values, editable]);

  return (
    <div className="flex flex-col gap-2 mt-2 w-full">
      <small className="">{formValue.title}</small>
      <div className="w-full h-fit flex-center-center flex-col standard-border gap-2 p-2">
        <Image
          loader={imgFile.imgSrc === "" ? myImageLoader : sanityLoader}
          unoptimized={imgFile.imgSrc === ""}
          placeholder="empty"
          src={
            imgFile.imgSrc !== ""
              ? imgFile.imgSrc
              : values[formKey].value?.src ||
                "/static/images/pelayanan-fasilitas/audiometri"
          }
          width={500}
          height={400}
          quality={75}
          className=" object-cover h-44 w-52 rounded-sm overflow-hidden mr-2 md:shrink-0"
          alt={values[formKey].value?.alt || "altimage"}
          loading="lazy"
        />
      </div>

      <input
        disabled={!editable}
        type="file"
        id={`${formKey}Image`}
        accept="image/jpeg"
        title="pilih image untuk di upload"
        className={editable ? "admin-input py-1" : "admin-input-disabled py-1"}
        onChange={(e) => {
          handleFileInput(e);
        }}
      />
    </div>
  );
};

export default ImageGenericInput;
