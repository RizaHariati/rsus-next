import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { inpatientForm } from "@/app/(tools)/utils/forms/InpatientFormInput";
import InpatientImageDescription from "./InpatientDescription/InpatientImageDescription";
import { InpatientInitialValueType } from "@/app/(tools)/HospitalTypes";
import { useEffect, useState } from "react";
import EditListInput from "../EditListInput";
import DoctorDescriptionLoading from "../HospitalLoadingComponents/DoctorDescriptionLoading";

type Props = {};

const InpatientDescription = (props: Props) => {
  const {
    state: { columnAssignment, editable },
    hospitalState: { selectedInpatient, dataInpatient },
  } = useGlobalContext();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const [inpatientValues, setFacilityValues] =
    useState<InpatientInitialValueType>({});
  // console.log(selectedInpatient?.["fasilitas"]);
  useEffect(() => {
    if (!selectedInpatient) return;
    else {
      let newFacilityValues: any = {};
      Object.entries(selectedInpatient).forEach(([key, value]) => {
        if (!newFacilityValues[key]) {
          //@ts-ignore
          newFacilityValues[key] = { value, error: false };
        }
      });
      setFacilityValues(newFacilityValues);
    }
  }, [selectedInpatient, editable]);
  const getInpatientFacility = () => {
    let inpatientFacilityList: { id: number; title: string }[] = [];
    if (!dataInpatient) return;
    else {
      let id = 0;
      dataInpatient.map((inpatientItem) => {
        inpatientItem.fasilitas.map((fasilitasItem) => {
          const findFacility = inpatientFacilityList.find(({ title }) => {
            // console.log({ title, fasilitasItem });
            return title === fasilitasItem;
          });
          if (!findFacility) {
            id++;
            inpatientFacilityList.push({ id, title: fasilitasItem });
          }
          return "";
        });
        return "";
      });
    }
    return inpatientFacilityList;
  };
  const formInputInpatient = Object.entries(inpatientForm);

  const handleChangeValue = (value: { newValue: any; key: string }[]) => {
    console.log({ value });
  };
  if (Object.keys(inpatientValues).length < 1 || !selectedInpatient) {
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
          {formInputInpatient.map(
            ([inpatientFormKey, inpatientFormValue], index) => {
              //@ts-ignore
              const inpatientDetail: any = //@ts-ignore
                selectedInpatient?.[inpatientFormKey] || "";
              if (
                inpatientFormKey === "img" ||
                inpatientFormKey === "img-array"
              ) {
                return (
                  <InpatientImageDescription
                    key={index}
                    inpatientFormKey={inpatientFormKey}
                    inpatientFormValue={inpatientFormValue}
                    inpatientValues={inpatientValues}
                  />
                );
              }
              if (inpatientFormKey === "fasilitas") {
                const dataList: { id: number; title: string }[] =
                  getInpatientFacility() || [];
                return (
                  <EditListInput
                    key={index}
                    handleChangeValue={handleChangeValue}
                    FormKey={inpatientFormKey}
                    FormValue={inpatientFormValue}
                    inputList={inpatientValues[inpatientFormKey].value}
                    dataList={dataList}
                  />
                );
              }
              return (
                <div key={index} className="w-full">
                  <small className="">{inpatientFormValue.title}</small>
                  <input
                    value={inpatientDetail.toString()}
                    className={
                      editable ? "admin-input" : "admin-input-disabled"
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

export default InpatientDescription;
