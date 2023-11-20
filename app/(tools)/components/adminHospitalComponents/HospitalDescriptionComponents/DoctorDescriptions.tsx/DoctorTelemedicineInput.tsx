import { HospitalItemType } from "@/app/(tools)/HospitalTypes";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import React from "react";
import DoctorRegular from "./DoctorRegular";

import BooleanButton from "./BooleanButton";

type Props = {
  doctorKey: string;
  doctorDetail: any;
  doctorValue: HospitalItemType;
};

const DoctorTelemedicineInput = ({
  doctorKey,
  doctorDetail,
  doctorValue,
}: Props) => {
  const {
    state: { columnAssignment, editable },
    hospitalState: { selectedDoctor, dataDoctor },
  } = useGlobalContext();

  if (doctorKey === "biaya_telemedicine") {
    return (
      <DoctorRegular
        doctorValue={doctorValue}
        doctorDetail={doctorDetail}
        doctorKey={doctorKey}
      />
    );
  } else {
    return (
      <div className="w-full">
        <small>{doctorKey}</small>
        <BooleanButton booleanValue={doctorDetail} />
      </div>
    );
  }
};
export default DoctorTelemedicineInput;
