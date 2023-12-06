"use client";
import {
  FacilitySanityType,
  InitialValueType,
} from "@/app/(tools)/HospitalTypes";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { facilityForm } from "@/app/(tools)/utils/forms/FacilityFormInput";

import React, { useEffect, useState } from "react";
import EditListInput from "../../GeneralComponents/EditListInput";
import BooleanButton from "../../GeneralComponents/BooleanButtonInput";
import dataPoliklinik from "../../../data/data_poliklinik.json";
import { toast } from "react-toastify";
import ImageGenericInput from "../../GeneralComponents/ImageGenericInput";
import RegularInput from "../../GeneralComponents/RegularInput";
import TextAreaInput from "../../GeneralComponents/TextAreaInput";
import SelectRadioInput from "../../GeneralComponents/SelectRadioInput";
import { validatePrice } from "@/app/(tools)/utils/forms/validatePrice";
import SubmitButton from "../../GeneralComponents/SubmitButton";
import LoadingSpinner from "../../GeneralComponents/LoadingSpinner";
type Props = {};

const FacilityDescription = (props: Props) => {
  const {
    settingEditable,
    updateHospital,
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

    const newPromise = new Promise((resolve) => {
      setTimeout(() => {
        let editedFacilityValues: FacilitySanityType | any = {};
        Object.entries(facilityValues).forEach(([editedKey, editedValue]) => {
          if (!editedFacilityValues[editedKey]) {
            editedFacilityValues[editedKey] = editedValue.value;
          }
        });
        resolve(updateHospital("facility", editedFacilityValues));
      }, 1000);
    }).then((res) => {
      settingEditable(false);
      return res;
    });
    toast.promise(newPromise, {
      pending: "Data diproses",
      success: "Data berhasil diubah",
      error: "Promise rejected 🤯",
    });
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

    Object.entries(facilityValues).map(([itemKey, itemValue]) => {
      const findValue = value.find((item) => item.key === itemKey);
      if (!findValue) {
        //@ts-ignore
        newFacility[itemKey] = { ...itemValue };
      } else {
        if (itemKey === "poliklinik") {
          const poliArray: string[] = findValue.newValue.map(
            (item: any) => item.title
          );
          newFacility[itemKey] = { ...itemValue, value: poliArray };
        } else if (itemKey === "price") {
          const validate = validatePrice(findValue.newValue, 100000000);
          if (!validate.flag) {
            newFacility[itemKey] = { ...itemValue, value: validate.roundup };
          } else {
            newFacility[itemKey] = { ...itemValue };
          }
        } else if (itemKey === "img") {
          newFacility[itemKey] = {
            ...itemValue,
            value: findValue.newValue,
          };
        } else {
          newFacility[itemKey] = { ...itemValue, value: findValue.newValue };
        }
      }
    });
    setFacilityValues(newFacility);
  };

  if (Object.keys(facilityValues).length < 1 || !selectedFacility) {
    return (
      <div className="h-[calc(100vh-112px)] w-full">
        <LoadingSpinner />
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
                    const findPoli =
                      dataPoliklinik.find((item) => {
                        return item.title === facilityItem;
                      }) || {};

                    return findPoli;
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
        <SubmitButton />
      </form>
    );
  }
};

export default FacilityDescription;
