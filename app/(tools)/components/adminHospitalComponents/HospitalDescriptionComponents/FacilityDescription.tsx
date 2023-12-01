"use client";
import { InitialValueType } from "@/app/(tools)/HospitalTypes";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { facilityForm } from "@/app/(tools)/utils/forms/FacilityFormInput";

import React, { useEffect, useState } from "react";
import EditListInput from "../../GeneralComponents/EditListInput";
import DoctorDescriptionLoading from "../HospitalLoadingComponents/DoctorDescriptionLoading";
import BooleanButton from "../../GeneralComponents/BooleanButtonInput";
import dataPoliklinik from "../../../data/data_poliklinik.json";
import FacilityCategory from "./FacilityDescription/FacilityCategory";
import { toast } from "react-toastify";
import ImageGenericInput from "../../GeneralComponents/ImageGenericInput";
import RegularInput from "../../GeneralComponents/RegularInput";
import TextAreaInput from "../../GeneralComponents/TextAreaInput";
import SelectRadioInput from "../../GeneralComponents/SelectRadioInput";
type Props = {};

const FacilityDescription = (props: Props) => {
  const {
    state: { editable },
    hospitalState: { selectedFacility, dataFacility },
  } = useGlobalContext();

  const [facilityValues, setFacilityValues] = useState<InitialValueType>({});
  const [category] = useState<string[]>(
    Array.from([...new Set(dataFacility.map((item) => item.category))])
  );
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
      console.log({ ori: selectedFacility[key], new: values.value });
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

  const handleValueChange = (value: { newValue: any; key: string }[]) => {
    if (!editable) return;
    if (!facilityValues) return;

    let newFacility: InitialValueType = {};
    const facilityPoli =
      value[0].key === "poliklinik"
        ? value[0].newValue?.map((item: any) => item.title)
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
              switch (facilityFormKey) {
                case "img":
                  return (
                    <ImageGenericInput
                      key={index}
                      formKey={facilityFormKey}
                      formValue={facilityFormValue}
                      values={facilityValues}
                      handleValueChange={handleValueChange}
                    />
                  );
                case "featured":
                case "doctorref":
                  return (
                    <div className="w-full" key={index}>
                      <small>{facilityFormValue.title}</small>
                      <BooleanButton
                        key={index}
                        booleanKey={facilityFormKey}
                        booleanValue={
                          facilityValues[facilityFormKey].value ? 1 : 0
                        }
                        handleClick={handleValueChange}
                      />
                    </div>
                  );
                case "function":
                case "description":
                  return (
                    <TextAreaInput
                      key={index}
                      handleValueChange={handleValueChange}
                      formKey={facilityFormKey}
                      formValue={facilityFormValue}
                      values={facilityValues}
                    />
                  );
                case "category":
                  return (
                    <SelectRadioInput
                      key={index}
                      handleValueChange={handleValueChange}
                      formKey={facilityFormKey}
                      formValue={facilityFormValue}
                      values={facilityValues}
                      list={category}
                    />
                  );
                case "poliklinik":
                  const newInputList: any[] = facilityValues?.[
                    facilityFormKey
                  ]?.value.map((facilityItem: string) => {
                    return dataPoliklinik.find((item) => {
                      return item.title === facilityItem;
                    });
                  });

                  return (
                    <EditListInput
                      key={index}
                      handleValueChange={handleValueChange}
                      FormKey={facilityFormKey}
                      FormValue={facilityFormValue}
                      inputList={newInputList}
                      dataList={dataPoliklinik}
                    />
                  );
                default:
                  return (
                    <RegularInput
                      key={index}
                      formKey={facilityFormKey}
                      formValue={facilityFormValue}
                      values={facilityValues}
                      handleValueChange={handleValueChange}
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
              editable
                ? "btn-base-focus px-12 mx-0 "
                : "btn-base-small w-28 px-12 mx-0 "
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
