import React from "react";
import { HospitalItemType, InitialValueType } from "../../HospitalTypes";
import { useGlobalContext } from "../../context/AppProvider";

type Props = {
  handleValueChange: (value: { newValue: any; key: string }[]) => void;
  formKey: string;
  formValue: HospitalItemType;
  values: InitialValueType;
  list: string[];
};

const SelectRadioInput = ({
  formKey,
  formValue,
  handleValueChange,
  values,
  list,
}: Props) => {
  const {
    state: { columnAssignment, editable },
    hospitalState: { selectedFacility, dataFacility },
  } = useGlobalContext();
  return (
    <div className="w-full">
      <small className="">{formValue.title}</small>
      <p
        className={
          editable && formValue.editable
            ? "admin-input flex-center-between capitalize "
            : "admin-input-disabled flex-center-between "
        }
      >
        {values[formKey].value}
      </p>
      <div
        className={
          editable
            ? "grid grid-cols-2 md:grid-cols-3 mt-2 standard-border p-2 bg-transparent h-32 overflow-hidden transition-all"
            : "grid grid-cols-2 md:grid-cols-3 mt-2 standard-border p-0 px-2 border-none bg-transparent h-0 overflow-hidden  transition-all"
        }
      >
        {list.map((item, index) => {
          return (
            <div key={index} className="flex-center-start gap-2">
              <input
                id={item}
                type="radio"
                value={item}
                checked={values[formKey].value === item}
                className=" cursor-pointer"
                onChange={() => {
                  handleValueChange([{ newValue: item, key: formKey }]);
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

export default SelectRadioInput;
