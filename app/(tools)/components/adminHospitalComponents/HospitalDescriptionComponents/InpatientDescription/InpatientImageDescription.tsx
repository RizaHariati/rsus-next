import {
  HospitalItemType,
  InitialValueType,
} from "@/app/(tools)/HospitalTypes";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import myImageLoader, { sanityLoader } from "@/loader";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = {
  inpatientFormKey: string;
  inpatientFormValue: HospitalItemType;
  inpatientValues: InitialValueType;
  handleValueChange: (value: { newValue: any; key: string }[]) => void;
};

const InpatientImageDescription = ({
  inpatientFormKey,
  inpatientFormValue,
  inpatientValues,
  handleValueChange,
}: Props) => {
  const {
    state: { editable },
    hospitalState: { selectedInpatient },
  } = useGlobalContext();

  const [imageArray, setImageArray] = useState(
    inpatientValues?.["img-array"]?.value
  );
  const [imageItem, setImageItem] = useState(inpatientValues?.["img"]?.value);
  useEffect(() => {
    if (!selectedInpatient) return;
    else {
      setImageItem(inpatientValues?.["img"]?.value);
      setImageArray(inpatientValues?.["img-array"]?.value);
    }
  }, [inpatientValues, editable]);

  const handleChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    return handleValueChange([{ newValue: e.target.value, key: "img" }]);
  };

  const handleDelete = (itemImage: string) => {
    if (!editable) return;
    if (imageItem === itemImage) {
      return toast.error("gambar merupakan image utama, tidak bisa dihapus");
    } else {
      const newImageArray = imageArray.filter(
        (item: string) => item !== itemImage
      );
      return setImageArray(newImageArray);
    }
  };
  return (
    <div>
      {inpatientFormKey === "img" && (
        <div>
          <small className="">{inpatientFormValue.title}</small>
          <div className="w-full h-fit flex-center-center flex-col standard-border gap-2 p-2 bg-transparent">
            <Image
              loader={myImageLoader}
              placeholder="empty"
              src={
                `/static/images/inpatient/big/${imageItem}` ||
                "/static/images/navbar/main-logo.png?w=64&q=75"
              }
              width={500}
              height={400}
              quality={75}
              className=" object-cover h-44 w-60 rounded-sm overflow-hidden mr-2 shrink-0"
              alt={imageItem || "altimage"}
              loading="lazy"
            />
          </div>
        </div>
      )}
      {inpatientFormKey === "img-array" && (
        <div>
          <small className="">{inpatientFormValue.title}</small>
          <div className="w-full h-fit flex-center-center standard-border gap-2 p-2 bg-transparent">
            {imageArray.map((img: string, index: number) => {
              return (
                <div key={index} className="relative">
                  <button
                    onClick={() => {
                      handleDelete(img);
                    }}
                    type="button"
                    className="cursor-pointer group absolute  transition-all border-greenUrip top-0 right-2 z-10 rounded-full"
                  >
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      className="text-white group-hover:text-greenUrip transition-all"
                    />
                  </button>
                  <Image
                    loader={myImageLoader}
                    placeholder="empty"
                    src={
                      `/static/images/inpatient/big/${img}` ||
                      "/static/images/navbar/main-logo.png?w=64&q=75"
                    }
                    width={200}
                    height={200}
                    quality={75}
                    className=" object-cover h-24 w-full max-w-32 rounded-sm overflow-hidden mr-2 shrink-0"
                    alt={img || "altimage"}
                    loading="lazy"
                  />
                  <input
                    name="inpatientImage"
                    className="cursor-pointer"
                    type="radio"
                    value={img}
                    onChange={(e) => {
                      handleChangeRadio(e);
                    }}
                    checked={img === inpatientValues?.["img"]?.value}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default InpatientImageDescription;
