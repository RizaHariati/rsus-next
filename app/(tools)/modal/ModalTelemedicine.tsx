import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { AppointmentMenuTypes, PoliklinikType } from "../types";

import dataPoliklinik from "@/app/(tools)/data/data_poliklinik.json";
import TelemedicineDoctor from "./modalTelemedicine/TelemedicineDoctor";
import ResultSpesialisasi from "./modalAppointment/ResultSpesialisasi";
type Props = {};

const ModalTelemedicine = (props: Props) => {
  const {
    state: { modalValue },
    closeModal,
  } = useGlobalContext();
  const appointmentInfo: AppointmentMenuTypes = modalValue;
  const [searchKeyword, setSearchKeyword] = useState("");
  const [specializationList, setSpecializationList] = useState<
    PoliklinikType[]
  >([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const keywordInput = e.currentTarget.value;
    setSearchKeyword(keywordInput);
    const list = dataPoliklinik.filter((item) =>
      item.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setSpecializationList(list);
  };
  return (
    <div className="modal-phone md:modal-xl ">
      <h3 className=" modal-title">{appointmentInfo.title}</h3>
      <button className="modal-close-btn" onClick={() => closeModal()}>
        <FontAwesomeIcon icon={faClose} />
      </button>
      <div className="flex flex-col gap-2">
        <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 bg-white border-none">
          <mark className="h-full w-full ">
            <div>
              {appointmentInfo.intro.map((item: string, index: number) => {
                return (
                  <p className="body-3  " key={index}>
                    {item}
                  </p>
                );
              })}
            </div>
            <div className="standard-border w-full p-2 mt-3">
              <p className="btn-3-bold">Pilih Poliklinik yang dituju</p>
              <div className=" standard-border h-10 flex-center-between">
                <input
                  className="active-input"
                  value={searchKeyword}
                  placeholder={`Ketik spesialisasi yang dituju`}
                  onChange={(e) => handleChange(e)}
                />
                <button className="h-10 w-10 ml-auto button-greenUrip">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </div>
            </div>
          </mark>
          <mark>
            <ResultSpesialisasi
              searchKeyword={searchKeyword}
              appointmentInfo={appointmentInfo}
              specializationList={specializationList}
              searchCategory="spesialisasi"
            />
          </mark>
        </section>
        <TelemedicineDoctor />
        <section className=" w-full flex items-center justify-end gap-3 bg-white border-none ">
          <button
            className="button-greenUrip"
            onClick={() => {
              closeModal();
            }}
          >
            Batal
          </button>
        </section>
      </div>
    </div>
  );
};

export default ModalTelemedicine;
