import React, { useEffect, useState } from "react";
import moment from "moment";
import { getAge } from "../../utils/getAge";
import {
  PatientInitialValueType,
  PatientProfileType,
} from "../../patientTypes";
import { patientFormInput } from "../../utils/forms/patientFormInput";

type PatientProps = {
  patientPersonal: PatientInitialValueType;
  editable: boolean;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    patientKey: string
  ) => void;
};
const PatientProfileContent = ({
  patientPersonal,
  editable,
  handleChange,
}: PatientProps) => {
  const formInputArray = Object.entries(patientFormInput);

  return (
    <div className="w-full h-[calc(100vh-168px)] grid grid-cols-1 col-start-1 gap-1  max-w-2xl p-2 mx-auto overflow-y-scroll scrollbar-none">
      {formInputArray
        .slice(1, formInputArray.length)
        .map(([patientKey, patientValue], index) => {
          //@ts-ignore
          const profileItem = patientPersonal[patientKey].value;

          return (
            <div key={index} className="w-full">
              <small className="">{patientValue.title}</small>
              {patientKey !== "sex" && patientKey !== "birthdate" && (
                <input
                  type={
                    patientKey === "bpjs_number" ||
                    patientKey === "phone" ||
                    patientKey === "NIK"
                      ? "number"
                      : "text"
                  }
                  maxLength={
                    patientKey === "bpjs_number" ||
                    patientKey === "phone" ||
                    patientKey === "NIK"
                      ? 12
                      : 50
                  }
                  value={profileItem}
                  disabled={!editable}
                  onChange={(e) => handleChange(e, patientKey)}
                  className={editable ? "admin-input" : "admin-input-disabled"}
                />
              )}
              {patientKey === "sex" && (
                <p className="admin-input-disabled capitalize ">
                  {!profileItem ? "wanita" : "pria"}
                </p>
              )}
              {patientKey === "birthdate" && (
                <div className="admin-input-disabled capitalize flex-center-between">
                  <p>
                    {moment(profileItem).locale("id").format("DD MMMM YYYY")}
                  </p>
                  <p>
                    {`${getAge(profileItem).ageyear} thn/ ${
                      getAge(profileItem).agemonth
                    }
                    bln`}
                  </p>
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default PatientProfileContent;
