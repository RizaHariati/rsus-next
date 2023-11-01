import React from "react";
import moment from "moment";
import { getAge } from "../../utils/getAge";
import { PatientProfileType } from "../../patientTypes";
import { patientFormInput } from "../../utils/forms/patientFormInput";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
type Props = {};

const PatientProfile = (props: Props) => {
  const {
    patientState: { patient },
  } = useGlobalContext();
  return (
    <div className=" col-span-6">
      <div className="h-14 w-full flex-center-between p-4 border-b border-greyBorder">
        <div>
          <p className="font-bold">{patient.patient_profile.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-base w-28 h-10">Edit</button>
          <button className="btn-base w-28 h-10">Delete</button>
        </div>
      </div>
      <PatientProfileContent patientProfile={patient.patient_profile} />
    </div>
  );
};

export default PatientProfile;

type PatientProps = {
  patientProfile: PatientProfileType;
};
const PatientProfileContent = ({ patientProfile }: PatientProps) => {
  const {
    patientState: { patient },
  } = useGlobalContext();
  const formInputArray = Object.entries(patientFormInput);
  return (
    <div className="w-full h-[calc(100vh-112px)] grid grid-cols-1 col-start-1 gap-1  max-w-2xl p-10 mx-auto">
      {formInputArray
        .slice(1, formInputArray.length)
        .map(([patientKey, patientValue], index) => {
          //@ts-ignore
          const profileItem = patientProfile[patientKey];

          return (
            <div key={index} className="w-full">
              <small className="">{patientValue.title}</small>
              {patientKey !== "sex" && patientKey !== "birthdate" && (
                <input
                  value={profileItem}
                  disabled
                  className="active-input capitalize"
                />
              )}
              {patientKey === "sex" && (
                <p className="active-input capitalize ">
                  {!profileItem ? "wanita" : "pria"}
                </p>
              )}
              {patientKey === "birthdate" && (
                <div className="active-input capitalize flex-center-between">
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
