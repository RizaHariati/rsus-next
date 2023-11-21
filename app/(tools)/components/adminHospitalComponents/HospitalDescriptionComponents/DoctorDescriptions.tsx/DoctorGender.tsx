import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  DoctorInitialValueType,
  HospitalItemType,
} from "@/app/(tools)/HospitalTypes";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

type Props = {
  doctorValue: HospitalItemType;
  doctorDetail: any;
};

const DoctorGender = ({ doctorValue, doctorDetail }: Props) => {
  return (
    <div className="w-full">
      <small className="">{doctorValue?.title}</small>
      <div className="flex-center-start h-10 p-2 gap-4">
        <div className="flex-center-start gap-2">
          {doctorDetail === 1 ? (
            <FontAwesomeIcon icon={faCheckCircle} className="check-active " />
          ) : (
            <div className="check-empty"></div>
          )}
          <p>Pria</p>
        </div>
        <div className="flex-center-start gap-2">
          {doctorDetail !== 1 ? (
            <FontAwesomeIcon icon={faCheckCircle} className="check-active " />
          ) : (
            <div className="check-empty"></div>
          )}
          <p>Wanita</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorGender;
