import { FacilityInitialValueType } from "@/app/(tools)/HospitalTypes";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { facilityForm } from "@/app/(tools)/utils/forms/FacilityFormInput";

import React, { useEffect, useState } from "react";
import EditListInput from "../EditListInput";
import DoctorDescriptionLoading from "../HospitalLoadingComponents/DoctorDescriptionLoading";
import BooleanButton from "../BooleanButton";
import FacilityImage from "./FacilityDescription/FacilityImage";
import dataPoliklinik from "../../../data/data_poliklinik.json";
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
    const newFacility: FacilityInitialValueType = {};
    const facilityPoli =
      value[0].key === "poliklinik"
        ? value[0].newValue.map((item: any) => item.title)
        : null;

    Object.entries(facilityValues).map(([itemKey, itemValue]) => {
      const findValue = value.find((item) => item.key === itemKey);
      if (!findValue) {
        //@ts-ignore
        newFacility[itemKey] = { ...itemValue };
      } else {
        newFacility[itemKey] = {
          value:
            value[0].key === "poliklinik" ? facilityPoli : findValue.newValue,
          error: false,
        };
      }
    });
    setFacilityValues(newFacility);
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
              if (
                facilityFormKey === "function" ||
                facilityFormKey === "description"
              ) {
                return (
                  <div key={index} className="w-full">
                    <small className="">{facilityFormValue.title}</small>
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
                  <div key={index} className="w-full">
                    <small className="">{facilityFormValue.title}</small>
                    <input
                      value={facilityDetail.toString()}
                      className={
                        editable && facilityFormValue.editable
                          ? "admin-input"
                          : "admin-input-disabled"
                      }
                    />
                  </div>
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
