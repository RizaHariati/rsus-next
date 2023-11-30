import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { labPaketForm } from "@/app/(tools)/utils/forms/LabPaketFormInput";

import React, { useEffect, useState } from "react";
import LabPaketImage from "./LabPaketDescription/LabPaketImage";
import { InitialValueType } from "@/app/(tools)/HospitalTypes";
import DoctorDescriptionLoading from "../HospitalLoadingComponents/DoctorDescriptionLoading";
import LabPaketHarga from "./LabPaketDescription/LabPaketHarga";
import EditListInput from "../../GeneralComponents/EditListInput";
import LabPaketInputRegular from "./LabPaketDescription/LabPaketInputRegular";
import ImageGenericInput from "../../GeneralComponents/ImageGenericInput";
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
    console.log({ value });
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
                  const inputList = labPaketValues?.[
                    labPaketFormKey
                  ]?.value.map((item: any) => item.title);

                  return (
                    <EditListInput
                      key={index}
                      handleValueChange={handleValueChange}
                      FormKey={labPaketFormKey}
                      FormValue={labPaketFormValue}
                      inputList={inputList}
                      dataList={
                        labPaketFormKey === "pemeriksaan"
                          ? dataFacility
                          : dataLabSatuan
                      }
                    />
                  );
                }
                return (
                  <LabPaketInputRegular
                    key={index}
                    labPaketFormKey={labPaketFormKey}
                    labPaketFormValue={labPaketFormValue}
                    labPaketValues={labPaketValues}
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
