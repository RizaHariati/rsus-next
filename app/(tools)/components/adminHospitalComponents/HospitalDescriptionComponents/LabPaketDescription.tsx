import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { labPaketForm } from "@/app/(tools)/utils/forms/LabPaketFormInput";

import React, { useEffect, useState } from "react";
import { InitialValueType, PaketLabType } from "@/app/(tools)/HospitalTypes";

import LabPaketHarga from "./LabPaketDescription/LabPaketHarga";
import EditListInput from "../../GeneralComponents/EditListInput";
import ImageGenericInput from "../../GeneralComponents/ImageGenericInput";
import RegularInput from "../../GeneralComponents/RegularInput";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { validatePrice } from "@/app/(tools)/utils/forms/validatePrice";
import SubmitButton from "../../GeneralComponents/SubmitButton";
import LoadingSpinner from "../../GeneralComponents/LoadingSpinner";
type Props = {};

const LabPaketDescription = (props: Props) => {
  const {
    settingEditable,
    settingEditAlert,
    updateHospital,
    state: { editable },
    hospitalState: {
      selectedPaket,
      dataComplete: { dataFacility, dataLabSatuan },
    },
  } = useGlobalContext();
  const [labPaketValues, setLabPaketValues] = useState<InitialValueType>({});
  const formInputLabPaket = Object.entries(labPaketForm);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPromise = new Promise((resolve) => {
      setTimeout(() => {
        let editedLabPaket: PaketLabType | any = {};
        Object.entries(labPaketValues).forEach(([editedKey, editedValue]) => {
          if (!editedLabPaket[editedKey]) {
            editedLabPaket[editedKey] = editedValue.value;
          }
        });

        resolve(updateHospital("lab_paket", editedLabPaket));
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
  }, [selectedPaket, editable]);

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
          if (itemKey === "price") {
            let flag = false;
            const newValue = findValue.newValue.map((item: any) => {
              const validate = validatePrice(item.value, 100000000);

              if (validate.flag) {
                flag = true;
              }
              return { ...item, value: validate.roundup };
            });
            if (!flag)
              newPaketValues[itemKey] = { ...itemValue, value: newValue };
            else {
              newPaketValues[itemKey] = { ...itemValue };
            }
          } else if (itemKey === "pemeriksaan" || itemKey === "laboratorium") {
            const newValue = findValue.newValue.map((item: any) => {
              const findValue = itemValue.value.find(
                (valueItem: any) => valueItem.id === item.id
              );
              if (findValue) return item;
              else {
                const shortValue = {
                  _key: uuidv4().slice(0, 8),
                  id: item.id,
                  title: item.title,
                };
                const completeValue = {
                  id: item.id,
                  title: item.title,
                  _key: uuidv4().slice(0, 8),
                  description: item.description.slice(0, 200),
                };
                const createValue =
                  itemKey === "laboratorium" ? shortValue : completeValue;
                return createValue;
              }
            });

            newPaketValues[itemKey] = {
              error: false,
              value: newValue,
            };
          } else {
            newPaketValues[itemKey] = {
              ...itemValue,
              value: findValue.newValue,
            };
          }
        }
      }
      return "";
    });

    setLabPaketValues(newPaketValues);
  };

  if (Object.keys(labPaketValues).length < 1 || !selectedPaket) {
    return (
      <div className="h-[calc(100vh-112px)] w-full">
        <LoadingSpinner />
      </div>
    );
  } else {
    return (
      <div className="column-description-container ">
        <form onSubmit={(e) => handleSubmit(e)} className="w-full">
          <div
            className="column-description-content"
            onClick={() => settingEditAlert()}
          >
            {formInputLabPaket.map(
              ([labPaketFormKey, labPaketFormValue], index) => {
                //@ts-ignore

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
          <SubmitButton />
        </form>
      </div>
    );
  }
};

export default LabPaketDescription;
