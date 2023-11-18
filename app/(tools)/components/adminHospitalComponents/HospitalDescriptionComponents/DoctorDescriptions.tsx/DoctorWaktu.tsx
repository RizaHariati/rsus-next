import { HospitalItemType } from "@/app/(tools)/HospitalTypes";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { allWaktu } from "@/app/(tools)/utils/AllHari";
type DoctorWaktuProps = {
  doctorValue: HospitalItemType;
  doctorDetail: any;
};
const DoctorWaktu = ({ doctorValue, doctorDetail }: DoctorWaktuProps) => {
  const {
    state: { editable },
    hospitalState: { selectedDoctor },
  } = useGlobalContext();
  const [selectedWaktu, setSelectedWaktu] = useState(
    selectedDoctor ? selectedDoctor.waktu.toLowerCase() : "pagi"
  );

  useEffect(() => {
    if (!selectedDoctor) return;
    else {
      setSelectedWaktu(selectedDoctor.waktu);
    }
  }, [selectedDoctor]);

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
        <p>{selectedWaktu}</p>
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
              onClick={() => setSelectedWaktu(item.waktu)}
              key={index}
              className={
                selectedWaktu === item.waktu
                  ? "hari-btn-active w-full p-2"
                  : "hari-btn w-full p-2"
              }
            >
              <p>{item.waktu}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DoctorWaktu;
