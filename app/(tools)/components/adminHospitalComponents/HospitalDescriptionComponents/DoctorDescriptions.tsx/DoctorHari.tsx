import {
  DoctorInitialValueType,
  HariType,
  HospitalItemType,
} from "@/app/(tools)/HospitalTypes";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { SatuanHariType, allHari } from "@/app/(tools)/utils/AllHari";
import { doctorForm } from "@/app/(tools)/utils/forms/DoctorDetailedForm";
import React, { useEffect, useState } from "react";

type DoctorHariProps = {
  doctorValue: HospitalItemType;
  doctorDetail: any;
};

const DoctorHari = ({ doctorValue, doctorDetail }: DoctorHariProps) => {
  const {
    state: { editable },
    hospitalState: { selectedDoctor },
  } = useGlobalContext();

  useEffect(() => {
    if (!selectedDoctor) return;
    setSelectedHari(selectedDoctor.hari);
    return () => {
      selectedDoctor;
    };
  }, [selectedDoctor]);

  const [selectedHari, setSelectedHari] = useState<HariType[]>(
    selectedDoctor ? selectedDoctor.hari : []
  );
  const addRemoveHari = (detailHari: HariType, hari: SatuanHariType) => {
    let newAllHari: HariType[] = selectedHari;
    if (!detailHari) {
      const findHari = selectedDoctor!.hari.find(
        (item) => item.id_hari === hari.id_hari
      );

      if (!findHari) {
        return setSelectedHari(
          [
            ...selectedHari,
            {
              id_hari: hari.id_hari,
              kuota_terisi: 0,
            },
          ].sort((a, b) => a.id_hari - b.id_hari)
        );
      } else {
        return setSelectedHari(
          [...selectedHari, findHari].sort((a, b) => a.id_hari - b.id_hari)
        );
      }
      /* --------------- find hari in selectedDoctor?.hari -------------- */
      /* --------------------------- add hari --------------------------- */
    } else {
      const filterHari = newAllHari.filter(
        (item) => item.id_hari !== hari.id_hari
      );
      return setSelectedHari(filterHari.sort((a, b) => a.id_hari - b.id_hari));
      /* -------------------------- removehari -------------------------- */
    }
  };
  return (
    <div className="w-full">
      <small className="">{doctorValue.title}</small>
      <p
        className={
          editable && doctorValue.editable
            ? "admin-input capitalize"
            : "admin-input-disabled"
        }
      >
        {selectedHari
          .map((item) => {
            return allHari.find((hari) => hari.id_hari === item.id_hari)!.hari;
          })
          .join(", ")}
      </p>
      <div
        className={editable ? "hari-btn-container" : "hari-btn-container h-0"}
      >
        {doctorDetail &&
          allHari.map((hari: SatuanHariType) => {
            const detailHari: HariType = selectedHari?.find(
              (detail) => detail.id_hari === hari.id_hari
            )!;

            return (
              <button
                onClick={() => addRemoveHari(detailHari, hari)}
                key={hari.id_hari.toString()}
                className={
                  detailHari ? "hari-btn-active group" : "hari-btn group"
                }
              >
                <p className=" group-hover:text-white">{hari.hari}</p>
                <small className=" group-hover:text-white">
                  kuota :
                  {detailHari ? detailHari.kuota_terisi.toString() : " -"}
                </small>
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default DoctorHari;
