import React, { useState } from "react";

import dataSatuan from "@/app/(tools)/data/data_lab_satuan.json";
import dataFacility from "@/app/(tools)/data/data_facility.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { LabItemType, PaketLabType } from "../types";

type Props = {};

const ModalPaket = (props: Props) => {
  const {
    state: { modalValue },
    closeModal,
    openModal,
  } = useGlobalContext();

  const paketLab: PaketLabType = modalValue;
  return (
    <div className="modal-lg p-5 px-10">
      <h3 className=" col-span-2 font-normal w-full border-b border-greyBorder">
        {paketLab.title}
      </h3>
      <p className="w-full btn-3 text-right mb-4">
        Harga : Rp. {paketLab.price}
      </p>
      <button className="absolute top-2 right-4" onClick={() => closeModal()}>
        <FontAwesomeIcon icon={faClose} />
      </button>
      <div className="w-full  grid grid-cols-2 gap-3 max-h-80 custom-scrollbar">
        <div className="w-full h-full border-r border-greyBorder ">
          <p className="btn-2-bold">Pemeriksaan</p>
          <ul>
            {paketLab.pemeriksaan.map((item: LabItemType) => {
              const findFacility = dataFacility.find(
                (facility) => facility.id === item.id
              );
              const description = item.description
                ? item.description
                : findFacility?.description;
              return (
                <li
                  key={item.id}
                  className=" list-disc mx-5"
                  onClick={() => {
                    if (findFacility) {
                      openModal("facility", findFacility);
                    }
                  }}
                >
                  <p className="body-3">{item.title}</p>

                  {description && description.length > 150 ? (
                    <p className="body-3 cursor-pointer hover:text-greyMed2 transition-all">
                      {description.slice(0, 150)}
                      <span className=" text-greenUrip"> ...selengkapnya</span>
                    </p>
                  ) : (
                    <p className="body-3">{description} </p>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="w-full h-full ">
          <p className="btn-2-bold">Laboratorium</p>
          <ul>
            {paketLab.laboratorium.map((item: LabItemType) => {
              const description = item.description
                ? item.description
                : dataSatuan.find((satuan) => satuan.id === item.id)
                    ?.description;
              return (
                <li key={item.id} className="list-disc ml-4">
                  <p className="body-3">{item.title}</p>
                  <p className="body-3">{description}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className=" w-full flex items-center justify-end gap-3 pt-5 ">
        <button className="button-greenUrip">Pilih</button>
        <button
          className="button-greenUrip"
          onClick={() => {
            closeModal();
          }}
        >
          Batal
        </button>
      </div>
    </div>
  );
};
export default ModalPaket;
