import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import { useGlobalContext } from "../../context/AppProvider";
import { DoctorType, HariType } from "../../types";
import { numberToDay } from "../../utils/forms/getDoctorDetailedInfo";

type Props = {
  item: HariType;
  toggleKuota: number | null;
  handleToggle: (date: number) => void;
};

const SelectDateIcon = ({ item, toggleKuota, handleToggle }: Props) => {
  const {
    state: { modalValue },
    setDate,
  } = useGlobalContext();

  const doctorInfo: DoctorType = modalValue.doctorInfo;
  const newDate = new Date(
    dayjs()
      .add(item.id_hari - 1, "d")
      .toString()
  );
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
        setDate(newDate);
      }}
      className="flex-center-center flex-col standard-border gap-1 p-1 cursor-pointer bg-white hover:bg-greyLit transition-all"
    >
      <p>
        {numberToDay.find((itemKonsul) => itemKonsul.id === item.id_hari)
          ?.hari || ""}
      </p>
      <p className="footnote-1">
        {dayjs()
          .add(item.id_hari - 1, "d")
          .format("DD/MM/YY")}
      </p>
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