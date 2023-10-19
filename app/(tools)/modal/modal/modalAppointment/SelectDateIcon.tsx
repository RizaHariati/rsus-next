import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faCalendarDays } from "@fortawesome/free-solid-svg-icons";

import { useGlobalContext } from "../../context/AppProvider";
import { DoctorType } from "../../types";
import { numberToDay } from "../../utils/forms/getDoctorDetailedInfo";
import { DoctorHariType } from "../../utils/getHariOrder";
import moment from "moment";

type Props = {
  item: DoctorHariType;
  toggleKuota: number | null;
  jam: string;
  handleToggle: (date: number) => void;
};

const SelectDateIcon = ({ item, jam, toggleKuota, handleToggle }: Props) => {
  const {
    state: { modalValue },
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
    <button
      disabled={item?.kuota_terisi >= doctorInfo.kuota ? true : false}
      onClick={() => {
        handleToggle(item.id_hari);
        setDate(
          moment(item.date).format("YYYY-MM-DD") +
            "T" +
            doctorInfo.jam.slice(0, 5).replace(".", ":")
        );
      }}
      className="flex-center-center flex-col standard-border gap-1 p-1 cursor-pointer bg-white hover:bg-greyLit transition-all w-20"
    >
      <p>
        {numberToDay.find((itemKonsul) => itemKonsul.id === item.id_hari)
          ?.hari || ""}
      </p>
      <p className="footnote-1">{moment(item.date).format("DD/MM/YYYY")}</p>
      <div>
        <FontAwesomeIcon
          icon={faCalendarDays}
          className={`${getWarnaKuota(item.kuota_terisi / doctorInfo.kuota)}`}
        />
      </div>
      <p>{`${
        toggleKuota === item.id_hari ? item.kuota_terisi + 1 : item.kuota_terisi
      }/${doctorInfo.kuota}`}</p>
    </button>
  );
};

export default SelectDateIcon;
