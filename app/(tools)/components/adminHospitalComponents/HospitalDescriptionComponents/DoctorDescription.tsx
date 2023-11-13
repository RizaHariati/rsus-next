import { DoctorInitialValueType } from "@/app/(tools)/HospitalTypes";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { doctorForm } from "@/app/(tools)/utils/forms/DoctorDetailedForm";
import React, { useEffect, useState } from "react";

type Props = {};

const DoctorDescription = (props: Props) => {
  const {
    state: { columnAssignment, editable },
    hospitalState: { selectedDoctor },
  } = useGlobalContext();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const [doctorValues, setDoctorValues] = useState<DoctorInitialValueType>({});
  useEffect(() => {}, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    patientKey: string
  ) => {
    e.preventDefault();
  };
  const formInputDoctor = Object.entries(doctorForm);
  return (
    <form
      className="column-description-container "
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="column-description-content">
        {formInputDoctor.map(([doctorKey, doctorValue], index) => {
          //@ts-ignore
          const doctorDetail = selectedDoctor[doctorKey] || "";
          return (
            <div key={index} className="w-full">
              <small className="">{doctorValue.title}</small>
              <input
                value={doctorDetail.toString()}
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

export default DoctorDescription;
