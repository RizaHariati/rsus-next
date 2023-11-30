import {
  InitialValueType,
  HariType,
  HospitalItemType,
} from "@/app/(tools)/HospitalTypes";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { SatuanHariType, allHari } from "@/app/(tools)/utils/AllHari";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
type DoctorHariProps = {
  doctorFormValue: HospitalItemType;
  doctorValues: InitialValueType;
  handleValueChange: (value: { newValue: any; key: string }[]) => void;
};

const DoctorHari = ({
  doctorFormValue,
  doctorValues,
  handleValueChange,
}: DoctorHariProps) => {
  const {
    state: { editable },
  } = useGlobalContext();
  const [selectedHari, setSelectedHari] = useState<HariType[] | null>(null);

  useEffect(() => {
    if (!editable) {
      setSelectedHari(null);
      setHariChanged(false);
    }
    if (Object.keys(doctorValues).length < 1 || !doctorValues["hari"]) return;
    setSelectedHari(doctorValues["hari"]?.value);
    return () => {
      doctorValues["hari"];
    };
    // eslint-disable-next-line
  }, [doctorValues["hari"]]);

  const [hariChanged, setHariChanged] = useState(false);
  const testHariChanged = (newHari: HariType[]) => {
    let hariChanged = false;
    if (newHari.length === doctorValues["hari"].value.length) {
      doctorValues["hari"].value.map((item: HariType) => {
        const sameItem = newHari.find(
          (selectedItem) => selectedItem.id_hari === item.id_hari
        );
        if (!sameItem) hariChanged = true;
        return "";
      });
    } else {
      hariChanged = true;
    }
    return hariChanged;
  };
  const addRemoveHari = (detailHari: HariType, hari: SatuanHariType) => {
    let newAllHari: HariType[] = selectedHari
      ? selectedHari
      : doctorValues["hari"].value;

    if (!detailHari) {
      const findHari = doctorValues["hari"].value.find(
        (item: any) => item.id_hari === hari.id_hari
      );

      if (!findHari) {
        newAllHari = [
          ...newAllHari,
          {
            id_hari: hari.id_hari,
            kuota_terisi: 0,
            _key: uuidv4().slice(0, 8),
          },
        ].sort((a, b) => a.id_hari - b.id_hari);
      } else {
        newAllHari = [...newAllHari, findHari].sort(
          (a, b) => a.id_hari - b.id_hari
        );
      }

      /* --------------- find hari in selectedDoctor?.hari -------------- */
      /* --------------------------- add hari --------------------------- */
    } else {
      const filterHari = newAllHari.filter(
        (item) => item.id_hari !== hari.id_hari
      );
      if (filterHari.length < 1) return toast.error("hari tidak boleh kosong");
      newAllHari = filterHari.sort((a, b) => a.id_hari - b.id_hari);

      /* -------------------------- removehari -------------------------- */
    }
    const isHariChanged = testHariChanged(newAllHari);

    setHariChanged(isHariChanged);
    setSelectedHari(isHariChanged ? newAllHari : null);
  };
  const handleHari = () => {
    if (!editable) {
      setHariChanged(false);
      setSelectedHari(null);
    }
    if (!selectedHari) return;
    else if (selectedHari && selectedHari.length > 0) {
      handleValueChange([{ newValue: selectedHari, key: "hari" }]);
      setHariChanged(false);
      setSelectedHari(null);
    }
  };
  return (
    <div className="w-full">
      <small className="">{doctorFormValue?.title}</small>
      <div
        className={
          editable && doctorFormValue?.editable
            ? "admin-input capitalize flex-row flex-center-between"
            : "admin-input-disabled  flex-row flex-center-between"
        }
      >
        <p>
          {selectedHari
            ? selectedHari
                .map((item: HariType) => {
                  return allHari.find((hari) => hari.id_hari === item.id_hari)!
                    .hari;
                })
                .join(", ")
            : doctorValues["hari"].value
                .map((item: HariType) => {
                  return allHari.find((hari) => hari.id_hari === item.id_hari)!
                    .hari;
                })
                .join(", ")}
        </p>
        <button
          type="button"
          onClick={() => handleHari()}
          disabled={!hariChanged}
        >
          <FontAwesomeIcon
            icon={faCheckCircle}
            className={
              hariChanged ? "h-5 w-5 text-greenUrip" : "h-5 w-5 text-greyMed2"
            }
          />
        </button>
      </div>
      <div
        className={editable ? "hari-btn-container" : "hari-btn-container h-0"}
      >
        {doctorValues["hari"] &&
          allHari.map((hari: SatuanHariType) => {
            const detailHari: HariType = selectedHari
              ? selectedHari.find((detail) => detail.id_hari === hari.id_hari)!
              : doctorValues["hari"].value.find(
                  (detail: HariType) => detail.id_hari === hari.id_hari
                )!;

            return (
              <button
                type="button"
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
