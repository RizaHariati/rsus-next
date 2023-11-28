"use client";
import { FacilityInitialValueType } from "@/app/(tools)/HospitalTypes";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { facilityForm } from "@/app/(tools)/utils/forms/FacilityFormInput";

import React, { useCallback, useEffect, useState } from "react";
import EditListInput from "../EditListInput";
import DoctorDescriptionLoading from "../HospitalLoadingComponents/DoctorDescriptionLoading";
import BooleanButton from "../BooleanButton";
import FacilityImage from "./FacilityDescription/FacilityImage";
import dataPoliklinik from "../../../data/data_poliklinik.json";
import FacilityCategory from "./FacilityDescription/FacilityCategory";
import FacilityRegularInput from "./FacilityDescription/FacilityRegularInput";
import { toast } from "react-toastify";
type Props = {};

const FacilityDescription = (props: Props) => {
  const {
    state: { editable },
    hospitalState: { selectedFacility, dataFacility },
  } = useGlobalContext();

  const [facilityValues, setFacilityValues] =
    useState<FacilityInitialValueType>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFacility) return;

    const facilityResultValues = Object.entries(facilityValues);
    const originalValues = selectedFacility
      ? Object.entries(selectedFacility)
      : [];
    if (facilityResultValues.length !== originalValues.length) {
      return toast.error("data tidak lengkap, silahkan dicek ulang");
    }
    let valueChanged = false;
    let newValue = { ...selectedFacility };
    facilityResultValues.map(([key, values]) => {
      //@ts-ignore
      if (selectedFacility[key] !== values.value) {
        newValue = { ...newValue, [key]: values.value };
        return (valueChanged = true);
      } //@ts-ignore
      // console.log(selectedFacility[key] !== values.value);

      return "";
    });
    if (!valueChanged) return toast.error("tidak ada perubahan");
    else {
      // console.log({ newValue });
      toast.success("data berhasil diubah");
    }
  };

  useEffect(() => {
    if (!selectedFacility) return;
    else {
      let newFacilityValues: any = {};
      Object.entries(selectedFacility).forEach(([key, value]) => {
        if (!newFacilityValues[key]) {
          //@ts-ignore
          newFacilityValues[key] = { value, error: false };
        }
      });
      setFacilityValues(newFacilityValues);
    }
  }, [selectedFacility, editable]);

  const formInputFacility = Object.entries(facilityForm);

  const handleChangeValue = (value: { newValue: any; key: string }[]) => {
    if (!editable) return;
    if (!facilityValues) return;
    // const newFacility: FacilityInitialValueType = {};
    // const facilityPoli =
    //   value[0].key === "poliklinik"
    //     ? value[0].newValue?.map((item: any) => item.title)
    //     : null;

    // Object.entries(facilityValues).map(([itemKey, itemValue]) => {
    //   const findValue = value.find((item) => item.key === itemKey);
    //   if (!findValue) {
    //     //@ts-ignore
    //     newFacility[itemKey] = { ...itemValue };
    //   } else {
    //     newFacility[itemKey] = {
    //       value:
    //         value[0].key === "poliklinik" ? facilityPoli : findValue.newValue,
    //       error: false,
    //     };
    //   }
    // });
    // setFacilityValues(newFacility);
  };
  if (Object.keys(facilityValues).length < 1 || !selectedFacility) {
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
          {formInputFacility.map(
            ([facilityFormKey, facilityFormValue], index) => {
              //@ts-ignore
              const facilityDetail = selectedFacility?.[facilityFormKey] || "";

              if (facilityFormKey === "img") {
                return (
                  <FacilityImage
                    key={index}
                    facilityFormKey={facilityFormKey}
                    facilityFormValue={facilityFormValue}
                    facilityValues={facilityValues}
                  />
                );
              }
              if (
                facilityFormKey === "featured" ||
                facilityFormKey === "doctorref"
              ) {
                return (
                  <div className="w-full" key={index}>
                    <small>{facilityFormValue.title}</small>
                    <BooleanButton
                      key={index}
                      booleanKey={facilityFormKey}
                      booleanValue={
                        facilityValues[facilityFormKey].value ? 1 : 0
                      }
                      handleClick={handleChangeValue}
                    />
                  </div>
                );
              }
              if (facilityFormKey === "category") {
                return (
                  <FacilityCategory
                    key={index}
                    handleChangeValue={handleChangeValue}
                    FormKey={facilityFormKey}
                    FormValue={facilityFormValue}
                    Values={facilityValues}
                  />
                );
              }
              if (facilityFormKey === "poliklinik") {
                return (
                  <EditListInput
                    key={index}
                    handleChangeValue={handleChangeValue}
                    FormKey={facilityFormKey}
                    FormValue={facilityFormValue}
                    inputList={facilityValues[facilityFormKey].value}
                    dataList={dataPoliklinik}
                  />
                );
              } else {
                return (
                  <FacilityRegularInput
                    key={index}
                    facilityFormKey={facilityFormKey}
                    facilityFormValue={facilityFormValue}
                    facilityValues={facilityValues}
                    handleChangeValue={handleChangeValue}
                  />
                );
              }
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

export default FacilityDescription;
