import React from "react";
import moment from "moment";
import { PatientInitialValueType } from "../../patientTypes";
import { patientFormInput } from "../../utils/forms/patientFormInput";
import { getAge } from "../../utils/patientUtils/getAge";

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
    <div className="column-detail-container">
      <div className="column-detail-content">
        {formInputArray.map(([patientKey, patientValue], index) => {
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
                  disabled={patientKey === "name" ? true : !editable}
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
                  <p className=" text-greyMed2">
                    {moment(profileItem).locale("id").format("DD MMMM YYYY")}
                  </p>
                  <p className=" text-greyMed1">
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
    </div>
  );
};

export default PatientProfileContent;
