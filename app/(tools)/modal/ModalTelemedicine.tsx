import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faMagnifyingGlass,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { ConsultationMenuTypes, DoctorType, PoliklinikType } from "../types";

import Image from "next/image";
import dataDoctor from "@/app/(tools)/data/data_dokter.json";
import dataPoliklinik from "@/app/(tools)/data/data_poliklinik.json";
import TelemedicineDoctor from "./modalTelemedicine/TelemedicineDoctor";
import ResultSpesialisasi from "./modalAppointment/ResultSpesialisasi";
type Props = {};
const randomizeDoctor = () => {
  const newDataDoctor = dataDoctor.filter((item) => item.telemedicine === 1);
  return [...newDataDoctor].sort(() => 0.5 - Math.random()).slice(0, 4);
};
const ModalTelemedicine = (props: Props) => {
  const {
    state: { modalValue },
    closeModal,
    openModal,
  } = useGlobalContext();
  const consultationInfo: ConsultationMenuTypes = modalValue;
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
    <div className="modal-xl p-5 px-10 overflow-hidden bg-white">
      <h3 className=" col-span-2  w-full border-b border-greyBorder  font-light mb-4 bg-white">
        {consultationInfo.title}
      </h3>

      <button className="absolute top-2 right-4" onClick={() => closeModal()}>
        <FontAwesomeIcon icon={faClose} />
      </button>
      <div className="flex flex-col gap-3">
        <section className="w-full grid grid-cols-2 bg-white border-none">
          <mark className=" ">
            <div>
              {consultationInfo.intro.map((item: string, index: number) => {
                return (
                  <p className="body-2" key={index}>
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
              consultationInfo={consultationInfo}
              specializationList={specializationList}
              searchCategory="spesialisasi"
            />
          </mark>
        </section>
        <TelemedicineDoctor />
        <section className=" w-full flex items-center justify-end gap-3 pt-5 bg-white border-none">
          <button className="button-greenUrip">Pilih</button>
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
