import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import { useGlobalContext } from "../../context/AppProvider";
import { DoctorType } from "../../types";
import { getHariOrder } from "../../utils/getHariOrder";
import { numberToDay } from "../../utils/forms/getDoctorDetailedInfo";

type Props = {};
const gridColumn = [
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
    setDate,
  } = useGlobalContext();
  const doctorInfo: DoctorType = modalValue.doctorInfo;

  const getWarnaKuota = (kuota: number) => {
    let kuotaClass = "kuota-icon text-greenUrip";
    if (kuota > 0.6 && kuota < 1) {
      kuotaClass = "kuota-icon text-accent1";
    }
    if (kuota === 1) {
      kuotaClass = "kuota-icon text-greyLit";
    }
    return kuotaClass;
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
              <button
                onClick={() =>
                  setDate(
                    new Date(
                      dayjs()
                        .add(item.id_hari - 1, "d")
                        .toString()
                    )
                  )
                }
                key={index}
                className="flex-center-center flex-col standard-border gap-1 p-1 cursor-pointer bg-white hover:bg-greyLit transition-all"
              >
                <p>
                  {numberToDay.find(
                    (itemKonsul) => itemKonsul.id === item.id_hari
                  )?.hari || ""}
                </p>
                <p className="footnote-1">
                  {dayjs()
                    .add(item.id_hari - 1, "d")
                    .format("DD/mm/YY")}
                </p>
                <div>
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    className={`${getWarnaKuota(
                      item.kuota_terisi / doctorInfo.kuota
                    )}`}
                  />
                </div>
                <p>{`${item.kuota_terisi}/${doctorInfo.kuota}`}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AppoinmentCalendarIcon;
