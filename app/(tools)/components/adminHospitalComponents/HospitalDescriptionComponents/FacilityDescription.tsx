import { FacilityInitialValueType } from "@/app/(tools)/HospitalTypes";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { facilityForm } from "@/app/(tools)/utils/forms/FacilityFormInput";
import React, { useState } from "react";

type Props = {};

const FacilityDescription = (props: Props) => {
  const {
    state: { columnAssignment, editable },
    hospitalState: { selectedFacility },
  } = useGlobalContext();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const [facilityValues, setFacilityValues] =
    useState<FacilityInitialValueType>({});

  const formInputFacility = Object.entries(facilityForm);
  return (
    <form
      className="column-description-container "
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="column-description-content">
        {formInputFacility.map(([facilityKey, facilityValue], index) => {
          //@ts-ignore
          const facilityDetail = selectedFacility?.[facilityKey] || "";
          return (
            <div key={index} className="w-full">
              <small className="">{facilityValue.title}</small>
              <input
                value={facilityDetail.toString()}
                className={editable ? "admin-input" : "admin-input-disabled"}
              />
            </div>
          );
        })}
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

export default FacilityDescription;
