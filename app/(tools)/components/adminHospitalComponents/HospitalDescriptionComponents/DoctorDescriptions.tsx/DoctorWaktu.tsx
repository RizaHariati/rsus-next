"use client";
import {
  DoctorInitialValueType,
  HospitalItemType,
} from "@/app/(tools)/HospitalTypes";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { allWaktu } from "@/app/(tools)/utils/AllHari";
import moment from "moment";
import { SatuanWaktuType } from "../../../../utils/AllHari";
type DoctorWaktuProps = {
  doctorKey: string;
  doctorValues: DoctorInitialValueType;
  doctorValue: HospitalItemType;
  handleValueChange: (value: { newValue: any; key: string }[]) => void;
};
const DoctorWaktu = ({
  doctorValue,
  doctorValues,
  doctorKey,
  handleValueChange,
}: DoctorWaktuProps) => {
  const {
    state: { editable },
  } = useGlobalContext();

  const [selectedWaktu, setSelectedWaktu] = useState<SatuanWaktuType | null>(
    null
  );
  const [endWaktu, setEndWaktu] = useState<
    { value: number; text: string }[] | null
  >(null);
  const [resultWaktu, setResultWaktu] = useState<string | null>(null);
  useEffect(() => {
    setSelectedWaktu(null);
    setEndWaktu(null);
    setResultWaktu(null);
  }, [doctorValues]);

  const rangeStart = (min: number, max: number) => {
    let numberArray: { value: number; text: string }[] = [];
    for (let index = min; index <= max; ) {
      numberArray.push({
        value: index,
        text: moment().startOf("day").add(index, "hour").format("HH:mm"),
      });
      index = index + 0.5;
    }

    return numberArray;
  };
  const rangeEnd = (waktu: number) => {
    let numberArray: { value: number; text: string }[] = [];
    for (let index = waktu; index <= 21; ) {
      numberArray.push({
        value: index,
        text: moment().startOf("day").add(index, "hour").format("HH:mm"),
      });
      index = index + 0.5;
    }
    numberArray.push({ value: 0, text: "selesai" });
    return numberArray;
  };

  const handleWaktu = (waktu: number) => {
    const newWaktu = moment().startOf("day").add(waktu, "hour").format("HH:mm");
    if (rangeEnd(waktu)) {
      setEndWaktu(rangeEnd(waktu + 2));
      setResultWaktu(newWaktu + " s/d ");
    }
  };

  const sendingWaktu = (waktu: number) => {
    if (!selectedWaktu || !selectedWaktu.waktu || !endWaktu || !resultWaktu) {
      return;
    } else {
      const newWaktu = moment()
        .startOf("day")
        .add(waktu, "hour")
        .format("HH:mm");

      //@ts-ignore

      handleValueChange([
        { newValue: selectedWaktu.waktu, key: "waktu" },
        { newValue: resultWaktu + newWaktu!, key: "jam" },
      ]);
      setSelectedWaktu(null);
      setEndWaktu(null);
      setResultWaktu(null);
    }
  };
  return (
    <div className="w-full relative ">
      <small className="">{doctorValue.title}</small>
      <div
        className={
          editable && doctorValue.editable
            ? "admin-input flex-center-between "
            : "admin-input-disabled flex-center-between "
        }
      >
        <p>
          {selectedWaktu ? selectedWaktu.waktu : doctorValues[doctorKey]?.value}
        </p>
        <button>
          <FontAwesomeIcon icon={editable ? faChevronDown : faChevronUp} />
        </button>
      </div>
      <div
        className={
          editable ? " waktu-btn-container " : " waktu-btn-container h-0"
        }
      >
        {allWaktu.map((item, index) => {
          return (
            <button
              onClick={() => {
                if (
                  doctorValues[doctorKey].value.toLowerCase() === item.waktu
                ) {
                  return setSelectedWaktu(null);
                } else {
                  setSelectedWaktu(item);

                  setEndWaktu(null);
                  setResultWaktu(null);
                }
              }}
              key={index}
              className={
                doctorValues[doctorKey]?.value === item.waktu ||
                selectedWaktu?.waktu === item.waktu
                  ? "hari-btn-active w-full p-2"
                  : "hari-btn w-full p-2"
              }
            >
              <p>{item.waktu}</p>
            </button>
          );
        })}
      </div>

      <div
        className={
          !selectedWaktu
            ? "flex-center-between h-0 standard-border p-0 px-2 mt-0 border-none transition-all overflow-hidden"
            : "flex-center-between h-32 standard-border p-2 mt-2 transition-all overflow-hidden"
        }
      >
        {selectedWaktu && (
          <div className="w-full h-full">
            <div className="w-full flex-center-center flex-col gap-1">
              <p className="text-center">awal praktek</p>
              <div className="w-28 flex flex-col items-center justify-start h-20 overflow-y-scroll border border-greyBorder p-1 gap-1">
                {selectedWaktu &&
                  rangeStart(selectedWaktu.jam_min, selectedWaktu.jam_max).map(
                    (item, index) => {
                      return (
                        <button
                          onClick={() => handleWaktu(item.value)}
                          className=" h-8 w-24 rounded-sm border border-hoverBG hover:border-greyBorder transition-all"
                          key={index}
                        >
                          {item.text}
                        </button>
                      );
                    }
                  )}
              </div>
            </div>
          </div>
        )}
        {endWaktu && (
          <div className="w-full h-full">
            <div className="w-full flex-center-center flex-col gap-1">
              <p className="text-center">akhir praktek</p>
              <div className="w-28 flex flex-col items-center justify-start h-20 overflow-y-scroll border border-greyBorder p-1 gap-1">
                {endWaktu.map((item, index) => {
                  return (
                    <button
                      onClick={() => sendingWaktu(item.value)}
                      className=" h-8 w-24 rounded-sm border border-hoverBG hover:border-greyBorder transition-all"
                      key={index}
                    >
                      {item.text}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorWaktu;
