import {
  HospitalItemType,
  InitialValueType,
} from "@/app/(tools)/HospitalTypes";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import myImageLoader, { sanityLoader } from "@/loader";
import Image from "next/image";
import React from "react";

type Props = {
  inpatientFormKey: string;
  inpatientFormValue: HospitalItemType;
  inpatientValues: InitialValueType;
};

const InpatientImageDescription = ({
  inpatientFormKey,
  inpatientFormValue,
  inpatientValues,
}: Props) => {
  const {
    state: { editable },
    hospitalState: { dataInpatient },
  } = useGlobalContext();

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.preventDefault);
    console.log(e.target.value.slice(12, e.target.value.length));
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
                `/static/images/inpatient/big/${inpatientValues?.[inpatientFormKey]?.value}` ||
                "/static/images/navbar/main-logo.png?w=64&q=75"
              }
              width={500}
              height={400}
              quality={75}
              className=" object-cover h-44 w-60 rounded-sm overflow-hidden mr-2 shrink-0"
              alt={inpatientValues?.[inpatientFormKey]?.value || "altimage"}
              loading="lazy"
            />
          </div>
        </div>
      )}
      {inpatientFormKey === "img-array" && (
        <div>
          <small className="">{inpatientFormValue.title}</small>
          <div className="w-full h-fit flex-center-center standard-border gap-2 p-2 bg-transparent">
            {inpatientValues?.[inpatientFormKey]?.value.map(
              (img: string, index: number) => {
                return (
                  <div key={index} className="">
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
                      type="radio"
                      value={img}
                      onChange={(e) => e.preventDefault()}
                      checked={img === inpatientValues?.["img"]?.value}
                    />
                  </div>
                );
              }
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InpatientImageDescription;
