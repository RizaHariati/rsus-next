import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { labSatuanForm } from "@/app/(tools)/utils/forms/LabSatuanFormInput";
import React, { useEffect, useState } from "react";
import RegularInput from "../../GeneralComponents/RegularInput";
import { InitialValueType, LabItemType } from "@/app/(tools)/HospitalTypes";

import TextAreaInput from "../../GeneralComponents/TextAreaInput";
import dataLabSatuan from "@/app/(tools)/data/data_lab_satuan.json";
import SelectRadioInput from "../../GeneralComponents/SelectRadioInput";
import { validatePrice } from "@/app/(tools)/utils/forms/validatePrice";
import { toast } from "react-toastify";
import SubmitButton from "../../GeneralComponents/SubmitButton";
import LoadingSpinner from "../../GeneralComponents/LoadingSpinner";

type Props = {};

const LabSatuanDescription = (props: Props) => {
  const {
    settingEditable,
    updateHospital,
    state: { editable },
    hospitalState: { dataComplete, selectedLabSatuan },
  } = useGlobalContext();

  const [labSatuanValues, setLabSatuanValues] = useState<InitialValueType>({});
  const [category] = useState<string[]>(
    Array.from(
      new Set([...dataComplete.dataLabSatuan.map((data) => data.category)])
    )
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedLabSatuan) return;

    const newPromise = new Promise((resolve) => {
      setTimeout(() => {
        let editedLabItem: LabItemType | any = {};
        Object.entries(labSatuanValues).forEach(([editedKey, editedValue]) => {
          if (!editedLabItem[editedKey]) {
            editedLabItem[editedKey] = editedValue.value;
          }
        });

        resolve(updateHospital("lab_satuan", editedLabItem));
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
    if (!selectedLabSatuan) return;
    let newLabSatuan: any = {};
    Object.entries(selectedLabSatuan).forEach(([key, value]) => {
      //@ts-ignore
      if (!newLabSatuan[key]) {
        //@ts-ignore
        newLabSatuan[key] = { value, error: false };
      }
      return "";
    });

    if (Object.keys(newLabSatuan).length > 0) {
      setLabSatuanValues(newLabSatuan);
    }
  }, [selectedLabSatuan, editable]);

  const formInputLabSatuan = Object.entries(labSatuanForm);

  const handleValueChange = (value: { newValue: any; key: string }[]) => {
    if (!editable) return;
    if (!labSatuanValues) return;

    const newLabSatuan: InitialValueType = {};

    Object.entries(labSatuanValues).map(([itemKey, itemValue]) => {
      const findValue = value.find((item) => item.key === itemKey);
      if (!findValue) {
        //@ts-ignore
        newLabSatuan[itemKey] = { ...itemValue };
      } else if (itemKey === "price") {
        const validate = validatePrice(findValue.newValue, 10000000);

        if (!validate.flag) {
          newLabSatuan[itemKey] = { ...itemValue, value: validate.roundup };
        } else {
          newLabSatuan[itemKey] = { ...itemValue };
        }
      } else {
        newLabSatuan[itemKey] = {
          value: findValue.newValue,
          error: false,
        };
      }
    });
    setLabSatuanValues(newLabSatuan);
  };

  if (!labSatuanValues || Object.keys(labSatuanValues).length < 1) {
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
          {formInputLabSatuan.map(([labSatuanKey, labSatuanValue], index) => {
            //@ts-ignore

            switch (labSatuanKey) {
              case "description":
                return (
                  <TextAreaInput
                    key={index}
                    formKey={labSatuanKey}
                    formValue={labSatuanValue}
                    values={labSatuanValues}
                    handleValueChange={handleValueChange}
                  />
                );
              case "category":
                return (
                  <SelectRadioInput
                    key={index}
                    formKey={labSatuanKey}
                    formValue={labSatuanValue}
                    values={labSatuanValues}
                    handleValueChange={handleValueChange}
                    list={category}
                  />
                );
              default:
                return (
                  <RegularInput
                    key={index}
                    formKey={labSatuanKey}
                    formValue={labSatuanValue}
                    values={labSatuanValues}
                    handleValueChange={handleValueChange}
                  />
                );
            }
          })}
        </div>
        <SubmitButton />
      </form>
    );
  }
};

export default LabSatuanDescription;
