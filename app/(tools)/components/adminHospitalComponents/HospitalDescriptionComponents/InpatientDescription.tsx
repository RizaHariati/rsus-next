import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { inpatientForm } from "@/app/(tools)/utils/forms/InpatientFormInput";
import InpatientImageDescription from "./InpatientDescription/InpatientImageDescription";
import { InpatientInitialValueType } from "@/app/(tools)/HospitalTypes";
import { useEffect, useState } from "react";
import FacilityPoliklinik from "./FacilityDescription/FacilityPoliklinik";

type Props = {};

const InpatientDescription = (props: Props) => {
  const {
    state: { columnAssignment, editable },
    hospitalState: { selectedInpatient },
  } = useGlobalContext();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const [inpatientValues, setFacilityValues] =
    useState<InpatientInitialValueType>({});

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
  const formInputInpatient = Object.entries(inpatientForm);

  return (
    <form
      className="column-description-container "
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="column-description-content">
        {formInputInpatient.map(
          ([inpatientFormKey, inpatientFormValue], index) => {
            //@ts-ignore
            const inpatientDetail = selectedInpatient?.[inpatientFormKey] || "";
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
              return (
                <FacilityPoliklinik
                  key={index}
                  facilityFormKey={inpatientFormKey}
                  facilityFormValue={inpatientFormValue}
                  facilityValues={inpatientValues}
                />
              );
            }
            return (
              <div key={index} className="w-full">
                <small className="">{inpatientFormValue.title}</small>
                <input
                  value={inpatientDetail.toString()}
                  className={editable ? "admin-input" : "admin-input-disabled"}
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
};

export default InpatientDescription;
