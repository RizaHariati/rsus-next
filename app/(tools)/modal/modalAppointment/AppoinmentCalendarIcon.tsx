import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import { useGlobalContext } from "../../context/AppProvider";
import { DoctorType } from "../../types";
import { getHariOrder } from "../../utils/getHariOrder";
import { numberToDay } from "../../utils/forms/getDoctorDetailedInfo";
import SelectDateIcon from "./SelectDateIcon";

type Props = {};
export const gridColumn = [
  { length: 1, class: "antrian-grid grid-cols-1" },
  { length: 2, class: "antrian-grid grid-cols-2" },
  { length: 3, class: "antrian-grid grid-cols-3" },
  { length: 4, class: "antrian-grid grid-cols-4" },
  { length: 5, class: "antrian-grid grid-cols-5" },
  { length: 6, class: "antrian-grid grid-cols-6" },
];
const AppoinmentCalendarIcon = ({}: Props) => {
  const {
    state: { modalValue, selected_date },
  } = useGlobalContext();
  const doctorInfo: DoctorType = modalValue.doctorInfo;
  const [toggleKuota, setToggleKuota] = useState<number | null>(
    selected_date ? dayjs(selected_date).day() : null
  );
  const handleToggle = (date: number) => {
    return setToggleKuota(date);
  };
  return (
    <div>
      <div className="flex standard-border  p-2 gap-2 ">
        <div className="flex flex-col py-3 capitalize justify-between">
          <p>Waktu</p>
          <p>kuota</p>
        </div>
        {/* Memasukkan pasien yang sudah terdaftar per hari */}
        <div
          className={
            gridColumn.find((item) => item.length === doctorInfo.hari.length)
              ?.class
          }
        >
          {getHariOrder(doctorInfo.hari).map((item, index: number) => {
            return (
              <SelectDateIcon
                key={index}
                item={item}
                toggleKuota={toggleKuota}
                handleToggle={handleToggle}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AppoinmentCalendarIcon;
