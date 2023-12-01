import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { labPaketForm } from "@/app/(tools)/utils/forms/LabPaketFormInput";

import React, { useEffect, useState } from "react";
import { InitialValueType } from "@/app/(tools)/HospitalTypes";
import DoctorDescriptionLoading from "../HospitalLoadingComponents/DoctorDescriptionLoading";
import LabPaketHarga from "./LabPaketDescription/LabPaketHarga";
import EditListInput from "../../GeneralComponents/EditListInput";
import ImageGenericInput from "../../GeneralComponents/ImageGenericInput";
import RegularInput from "../../GeneralComponents/RegularInput";
type Props = {};

const LabPaketDescription = (props: Props) => {
  const {
    state: { columnAssignment, editable },
    hospitalState: { selectedPaket, dataFacility, dataLabSatuan },
  } = useGlobalContext();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const [labPaketValues, setLabPaketValues] = useState<InitialValueType>({});
  const formInputLabPaket = Object.entries(labPaketForm);
  // console.log(selectedPaket?.["pemeriksaan"]);
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

  const handleValueChange = (value: { newValue: any; key: string }[]) => {
    if (!editable) return;
    if (!labPaketValues) return;
    let newPaketValues: typeof labPaketValues = {};
    Object.entries(labPaketValues).map(([itemKey, itemValue]) => {
      if (!newPaketValues[itemKey]) {
        const findValue = value.find((item) => item.key === itemKey);
        if (!findValue) {
          newPaketValues[itemKey] = { ...itemValue };
        } else {
          // console.log(itemKey);
          // console.log(itemValue);
          // console.log(findValue.newValue);
          if (itemKey === "pemeriksaan" || itemKey === "laboratorium") {
            // console.log(findValue);
          }
        }
      }
    });
  };

  if (Object.keys(labPaketValues).length < 1 || !selectedPaket) {
    return (
      <div className="h-[calc(100vh-112px)] w-full">
        <DoctorDescriptionLoading />
      </div>
    );
  } else {
    return (
      <div className="column-description-container ">
        <form onSubmit={(e) => handleSubmit(e)} className="w-full">
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
                      handleValueChange={handleValueChange}
                    />
                  );
                }
                if (labPaketFormKey === "img") {
                  return (
                    <ImageGenericInput
                      key={index}
                      formKey={labPaketFormKey}
                      formValue={labPaketFormValue}
                      values={labPaketValues}
                      handleValueChange={handleValueChange}
                    />
                  );
                }

                if (
                  labPaketFormKey === "pemeriksaan" ||
                  labPaketFormKey === "laboratorium"
                ) {
                  return (
                    <EditListInput
                      key={index}
                      handleValueChange={handleValueChange}
                      FormKey={labPaketFormKey}
                      FormValue={labPaketFormValue}
                      inputList={labPaketValues?.[labPaketFormKey]?.value}
                      dataList={
                        labPaketFormKey === "pemeriksaan"
                          ? dataFacility
                          : dataLabSatuan
                      }
                    />
                  );
                }
                return (
                  <RegularInput
                    key={index}
                    formKey={labPaketFormKey}
                    formValue={labPaketFormValue}
                    values={labPaketValues}
                    handleValueChange={handleValueChange}
                  />
                );
              }
            )}
          </div>
          <div className="content-menu border-t ">
            <button
              type="submit"
              className={
                editable
                  ? "btn-base-focus px-12 mx-0"
                  : "btn-base-small w-28 px-12 mx-0"
              }
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
};

export default LabPaketDescription;
