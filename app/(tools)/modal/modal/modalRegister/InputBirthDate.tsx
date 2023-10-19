import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";

import { PatientInitialValueType, PersonalItemType } from "../../patientTypes";
import moment from "moment";
type Props = {
  newPatientPersonal: PatientInitialValueType;
  setNewPatientPersonal: React.Dispatch<
    React.SetStateAction<PatientInitialValueType>
  >;
  values: PersonalItemType;
};

const InputBirthDate = ({
  newPatientPersonal,
  setNewPatientPersonal,
  values,
}: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };
  useEffect(() => {
    newPatientPersonal.birthdate;
    const patientBirthDate = {
      ...newPatientPersonal,
      birthdate: {
        value: selectedDate ? moment(selectedDate).format("YYYY-MM-DD") : null,
        error: false,
      },
    };
    setNewPatientPersonal(patientBirthDate);
    // eslint-disable-next-line
  }, [selectedDate]);

  return (
    <div className="w-full col-span-2 md:col-span-1 z-50 ">
      <p> {values.title}</p>
      <ReactDatePicker
        locale="id"
        onKeyDown={(e) => {
          e.preventDefault();
        }}
        showIcon
        onChange={(date: Date) => handleDateChange(date)}
        selected={selectedDate}
        dateFormat={"dd/MM/yyyy"}
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        placeholderText={values.placeholder}
        calendarClassName="text-md font-light outline-none h-fit w-full text-left cursor-pointer"
        className="react-datepicker w-full h-10 text-greyMed1 font-nunito text-base cursor-pointer "
        minDate={new Date(moment().subtract(110, "y").toString())}
        maxDate={new Date(moment().toString())}
        openToDate={new Date("09/09/1990")}
      />
      <p className="footnote-1 text-redBase h-5">
        {newPatientPersonal.birthdate.error && values.error}
      </p>
    </div>
  );
};

export default InputBirthDate;
0;
