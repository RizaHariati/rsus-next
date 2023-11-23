import { FacilityInitialValueType } from "@/app/(tools)/HospitalTypes";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { facilityForm } from "@/app/(tools)/utils/forms/FacilityFormInput";
import { sanityLoader } from "@/loader";
import {
  faFolderMinus,
  faMinus,
  faMinusCircle,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useState } from "react";

type Props = {};

const FacilityDescription = (props: Props) => {
  const {
    state: { columnAssignment, editable },
    hospitalState: { selectedFacility, dataFacility },
  } = useGlobalContext();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const [facilityValues, setFacilityValues] =
    useState<FacilityInitialValueType>({});

  const formInputFacility = Object.entries(facilityForm);
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.preventDefault);
    console.log(e.target.value.slice(12, e.target.value.length));
  };
  console.log(Array.from(new Set(dataFacility.map((item) => item.category))));
  return (
    <form
      className="column-description-container "
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="column-description-content">
        {formInputFacility.map(([facilityKey, facilityValue], index) => {
          //@ts-ignore
          const facilityDetail = selectedFacility?.[facilityKey] || "";
          if (facilityKey === "function" || facilityKey === "description") {
            return (
              <div key={index} className="w-full">
                <small className="">{facilityValue.title}</small>
                <textarea
                  rows={4}
                  maxLength={500}
                  value={facilityDetail.toString()}
                  className={
                    editable
                      ? "admin-input h-32 transition-all overflow-hidden"
                      : "admin-input-disabled transition-all overflow-hidden"
                  }
                />
              </div>
            );
          }
          if (facilityKey === "img") {
            return (
              <div className="flex flex-col gap-2 mt-2">
                <small className="">{facilityValue.title}</small>
                <div className="w-full h-fit flex-center-center flex-col standard-border gap-2 p-2">
                  <Image
                    loader={sanityLoader}
                    placeholder="empty"
                    src={
                      facilityDetail?.src ||
                      "/images/navbar/main-logo.png?w=64&q=75"
                    }
                    width={500}
                    height={400}
                    quality={75}
                    className=" object-cover h-44 w-60 rounded-sm overflow-hidden mr-2 shrink-0"
                    alt={facilityDetail?.alt || "altimage"}
                    loading="lazy"
                  />
                </div>

                <div
                  className={
                    editable
                      ? "admin-input flex-center-between"
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
          }
          if (facilityKey === "poliklinik") {
            return (
              <div key={index} className="w-full mt-2 bg-hoverBG">
                <small className="">{facilityValue.title}</small>
                <div className="w-full flex flex-col gap-2 standard-border p-2 bg-hoverBG">
                  {facilityDetail.map((itemPoli: string, indexPoli: number) => {
                    return (
                      <div
                        key={indexPoli}
                        className={
                          editable
                            ? "admin-input flex-center-between"
                            : "admin-input-disabled flex-center-between"
                        }
                      >
                        <p>{itemPoli}</p>
                        <button className="standard-border h-6 w-6">
                          <FontAwesomeIcon icon={faMinus} className="h-4 w-4" />
                        </button>
                      </div>
                    );
                  })}

                  <button
                    className={
                      editable
                        ? "admin-input flex-center-center"
                        : "admin-input-disabled flex-center-center"
                    }
                  >
                    <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          } else {
            return (
              <div key={index} className="w-full">
                <small className="">{facilityValue.title}</small>
                <input
                  value={facilityDetail.toString()}
                  className={editable ? "admin-input" : "admin-input-disabled"}
                />
              </div>
            );
          }
        })}
      </div>
      <div className="content-menu border-t">
        <button
          type="submit"
          className={
            editable ? "btn-base-focus px-12 " : "btn-base-small w-28 px-12"
          }
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default FacilityDescription;
