import React, { useState } from "react";
import { useGlobalContext } from "../../../../context/AppProvider";

import {
  InitialValueType,
  HospitalItemType,
} from "@/app/(tools)/HospitalTypes";

type Props = {
  handleValueChange: (value: { newValue: any; key: string }[]) => void;
  FormKey: string;
  FormValue: HospitalItemType;
  Values: InitialValueType;
};

const FacilityCategory = ({
  FormKey,
  FormValue,
  handleValueChange,
  Values,
}: Props) => {
  const {
    state: { editable },
    hospitalState: { dataFacility },
  } = useGlobalContext();

  const categoryList = Array.from([
    ...new Set(dataFacility.map((item) => item.category)),
  ]);

  return (
    <div className="w-full">
      <small className="">{FormValue.title}</small>
      <p
        className={
          editable && FormValue.editable
            ? "admin-input flex-center-between capitalize "
            : "admin-input-disabled flex-center-between "
        }
      >
        {Values[FormKey].value}
      </p>
      <div
        className={
          editable
            ? "grid grid-cols-2 md:grid-cols-3 mt-2 standard-border p-2 bg-transparent h-32 overflow-hidden transition-all"
            : "grid grid-cols-2 md:grid-cols-3 mt-2 standard-border p-0 px-2 border-none bg-transparent h-0 overflow-hidden  transition-all"
        }
      >
        {categoryList.map((item, index) => {
          return (
            <div key={index} className="flex-center-start gap-2">
              <input
                id={item}
                type="radio"
                value={item}
                checked={Values[FormKey].value === item}
                className=" cursor-pointer"
                onChange={() => {
                  console.log({ newValue: item, key: FormKey });
                  handleValueChange([{ newValue: item, key: FormKey }]);
                }}
              />
              <label htmlFor={item} className="capitalize  cursor-pointer">
                {item}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FacilityCategory;
