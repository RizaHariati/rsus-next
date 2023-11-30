import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { labSatuanForm } from "@/app/(tools)/utils/forms/LabSatuanFormInput";
import React, { useEffect, useState } from "react";
import RegularInput from "../../GeneralComponents/RegularInput";
import { InitialValueType } from "@/app/(tools)/HospitalTypes";
import DoctorDescriptionLoading from "../HospitalLoadingComponents/DoctorDescriptionLoading";
import TextAreaInput from "../../GeneralComponents/TextAreaInput";
import dataLabSatuan from "@/app/(tools)/data/data_lab_satuan.json";
import SelectRadioInput from "../../GeneralComponents/SelectRadioInput";

type Props = {};

const LabSatuanDescription = (props: Props) => {
  const {
    state: { columnAssignment, editable },
    hospitalState: { selectedLabSatuan },
  } = useGlobalContext();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const [labSatuanValues, setLabSatuanValues] = useState<InitialValueType>({});
  const [category] = useState<string[]>(
    Array.from(new Set([...dataLabSatuan.map((data) => data.category)]))
  );

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
    const facilityPoli =
      value[0].key === "poliklinik"
        ? value[0].newValue?.map((item: any) => item.title)
        : null;

    Object.entries(labSatuanValues).map(([itemKey, itemValue]) => {
      const findValue = value.find((item) => item.key === itemKey);
      if (!findValue) {
        //@ts-ignore
        newLabSatuan[itemKey] = { ...itemValue };
      } else {
        newLabSatuan[itemKey] = {
          value:
            value[0].key === "poliklinik" ? facilityPoli : findValue.newValue,
          error: false,
        };
      }
    });
    setLabSatuanValues(newLabSatuan);
  };

  if (!labSatuanValues || Object.keys(labSatuanValues).length < 1) {
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
        <div className="content-menu border-t w-full flex items-end ">
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
    );
  }
};

export default LabSatuanDescription;
