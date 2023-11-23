import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { labPaketForm } from "@/app/(tools)/utils/forms/LabPaketFormInput";

import React, { useEffect, useState } from "react";
import LabPaketImage from "./LabPaketDescription/LabPaketImage";
import { LabPaketInitialValueType } from "@/app/(tools)/HospitalTypes";
import DoctorDescriptionLoading from "../HospitalLoadingComponents/DoctorDescriptionLoading";
import LabPaketHarga from "./LabPaketDescription/LabPaketHarga";
import LabPaketPemeriksaan from "./LabPaketDescription/LabPaketPemeriksaan";
type Props = {};

const LabPaketDescription = (props: Props) => {
  const {
    state: { columnAssignment, editable },
    hospitalState: { selectedPaket },
  } = useGlobalContext();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const [labPaketValues, setLabPaketValues] =
    useState<LabPaketInitialValueType>({});
  const formInputLabPaket = Object.entries(labPaketForm);

  useEffect(() => {
    if (!selectedPaket) return;
    else {
      let newLabPaketValues: any = {};
      Object.entries(selectedPaket).forEach(([key, value]) => {
        if (!newLabPaketValues[key]) {
          //@ts-ignore
          newLabPaketValues[key] = { value, error: false };
        }
      });

      setLabPaketValues(newLabPaketValues);
    }
  }, [selectedPaket]);
  if (Object.keys(labPaketValues).length < 1 || !selectedPaket) {
    return (
      <div className="h-[calc(100vh-112px)] w-full">
        <DoctorDescriptionLoading />
      </div>
    );
  } else {
    return (
      <form
        className="column-description-container "
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="column-description-content">
          {formInputLabPaket.map(
            ([labPaketFormKey, labPaketFormValue], index) => {
              //@ts-ignore

              const labPaketDetail =
                labPaketValues?.[labPaketFormKey]?.value || "";

              if (labPaketFormKey === "price") {
                return (
                  <LabPaketHarga
                    key={index}
                    labPaketFormKey={labPaketFormKey}
                    labPaketFormValue={labPaketFormValue}
                    labPaketValues={labPaketValues}
                  />
                );
              }
              if (labPaketFormKey === "img") {
                return (
                  <LabPaketImage
                    key={index}
                    labPaketFormKey={labPaketFormKey}
                    labPaketFormValue={labPaketFormValue}
                    labPaketValues={labPaketValues}
                  />
                );
              }

              if (
                labPaketFormKey === "pemeriksaan" ||
                labPaketFormKey === "laboratorium"
              ) {
                return (
                  <LabPaketPemeriksaan
                    key={index}
                    labPaketFormKey={labPaketFormKey}
                    labPaketFormValue={labPaketFormValue}
                    labPaketValues={labPaketValues}
                  />
                );
              }
              return (
                <div key={index} className="w-full">
                  <small className="">{labPaketFormValue.title}</small>
                  <input
                    value={labPaketDetail.toString()}
                    className={
                      editable && labPaketFormValue.editable
                        ? "admin-input"
                        : "admin-input-disabled"
                    }
                  />
                </div>
              );
            }
          )}
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
  }
};

export default LabPaketDescription;
