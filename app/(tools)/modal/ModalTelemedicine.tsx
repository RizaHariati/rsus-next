import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faMagnifyingGlass,
  faCircle,
  faCircleDot,
} from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { ConsultationMenuTypes, DoctorType } from "../types";

import { motion } from "framer-motion";
import { enterTop } from "../framervariants/variants";
import Image from "next/image";
import dataDoctor from "@/app/(tools)/data/data_dokter.json";
type Props = {};

const ModalTelemedicine = (props: Props) => {
  const {
    state: { modalValue },
    closeModal,
    openModal,
  } = useGlobalContext();
  const consultationInfo: ConsultationMenuTypes = modalValue;
  const randomizeDoctor = () => {
    const newDataDoctor = dataDoctor.filter((item) => item.telemedicine === 1);
    return [...newDataDoctor].sort(() => 0.5 - Math.random()).slice(0, 4);
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
        <article className="w-full grid grid-cols-3">
          <mark className=" col-span-2">
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
              <div className=" standard-border h-12 flex-center-between">
                <p className="body-2 w-full p-3 bg-greyLit text-greyMed1">
                  ketik nama poli{" "}
                </p>
                <button className="h-12 w-12 ml-auto button-greenUrip">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </div>
            </div>
          </mark>
          <mark>
            {consultationInfo.modal_img && (
              <div className="w-full h-52 my-auto">
                <Image
                  rel="preload"
                  placeholder="empty"
                  src={`/images/pages/${consultationInfo.modal_img}.jpg`}
                  alt={consultationInfo.modal_img}
                  width={400}
                  height={400}
                  className="w-auto h-full m-auto"
                  loading="lazy"
                />
              </div>
            )}
          </mark>
        </article>
        <article>
          <h4 className="text-left mb-2">
            Dokter kami yang melayani Telemedicine
          </h4>
          <div className=" grid grid-cols-2 w-full gap-2">
            {randomizeDoctor().map((item: DoctorType, index: number) => {
              const image: string =
                item.gender === 1
                  ? "male-" + (index + 1)
                  : "female-" + (index + 1);
              return (
                <div key={index} className="standard-border flex gap-2">
                  <div className=" aspect-square w-24 h-auto overflow-hidden">
                    <Image
                      rel="preload"
                      placeholder="empty"
                      src={`/images/doctors/${image}.jpg`}
                      alt={image}
                      width={70}
                      height={70}
                      className="w-auto h-full rounded-sm object-cover object-center"
                      loading="lazy"
                    />
                  </div>
                  <div className="grid grid-cols-2 w-full body-3">
                    <div className=" col-span-2 flex-center-left gap-2">
                      {item.telemedicine ? (
                        <FontAwesomeIcon
                          icon={faCircle}
                          className={
                            item.sedang_online
                              ? "text-greenUrip"
                              : "text-greyMed1"
                          }
                        />
                      ) : null}
                      <p className="body-2">{item.nama}</p>
                    </div>
                    <p>Poliklinik</p>
                    <p>: {item.poliklinik.title}</p>
                    <p>Pengalaman</p>
                    <p>: {item.pengalaman} tahun</p>
                    {item.sedang_online ? (
                      <p className="text-greenUrip">Sedang Online</p>
                    ) : (
                      <p className="text-greyMed2">Sedang offline</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </article>
        <article className=" w-full flex items-center justify-end gap-3 pt-5 ">
          <button className="button-greenUrip">Pilih</button>
          <button
            className="button-greenUrip"
            onClick={() => {
              closeModal();
            }}
          >
            Batal
          </button>
        </article>
      </div>
    </div>
  );
};

export default ModalTelemedicine;
