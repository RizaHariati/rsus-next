import React from "react";
import moment from "moment";
import { PatientInitialValueType } from "../../patientTypes";
import { patientFormInput } from "../../utils/forms/patientFormInput";
import { getAge } from "../../utils/patientUtils/getAge";
import { useGlobalContext } from "../../context/AppProvider";

type PatientProps = {
  patientPersonal: PatientInitialValueType;

  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    patientKey: string
  ) => void;
};
const PatientProfileContent = ({
  patientPersonal,
  handleChange,
}: PatientProps) => {
  const {
    state: { editable },
  } = useGlobalContext();
  const formInputArray = Object.entries(patientFormInput);

  return (
    <div className="column-description-content">
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
  );
};

export default PatientProfileContent;
