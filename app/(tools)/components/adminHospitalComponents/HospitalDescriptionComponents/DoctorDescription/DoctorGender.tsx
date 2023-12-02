import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HospitalItemType } from "@/app/(tools)/HospitalTypes";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

type Props = {
  doctorFormValue: HospitalItemType;
  doctorDetail: any;
};

const DoctorGender = ({ doctorFormValue, doctorDetail }: Props) => {
  const handleClick = () => {
    toast.info("Saat ini tidak bisa mengubah Gender");
  };
  return (
    <div className="w-full">
      <small className="">{doctorFormValue?.title}</small>
      <div className="flex-center-start h-10 p-2 gap-4">
        <button
          type="button"
          onClick={() => handleClick()}
          className="flex-center-start gap-2"
        >
          {doctorDetail === 1 ? (
            <FontAwesomeIcon icon={faCheckCircle} className="check-active " />
          ) : (
            <div className="check-empty"></div>
          )}
          <p>Pria</p>
        </button>
        <button
          type="button"
          onClick={() => handleClick()}
          className="flex-center-start gap-2"
        >
          {doctorDetail !== 1 ? (
            <FontAwesomeIcon icon={faCheckCircle} className="check-active " />
          ) : (
            <div className="check-empty"></div>
          )}
          <p>Wanita</p>
        </button>
      </div>
    </div>
  );
};

export default DoctorGender;
