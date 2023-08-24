import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCircleDot,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { ConsultationMenuTypes, DoctorType } from "../types";
import dataDoctor from "@/app/(tools)/data/data_dokter.json";
import Image from "next/image";

type Props = {};
const randomizeDoctor = () => {
  return [...dataDoctor].sort(() => 0.5 - Math.random()).slice(0, 4);
};
const ModalAppointment = (props: Props) => {
  const {
    state: { modalValue },
    closeModal,
  } = useGlobalContext();
  const consultationInfo: ConsultationMenuTypes = modalValue;

  return (
    <div className="modal-xl p-3 px-10 overflow-hidden bg-white">
      <h3 className=" col-span-2  w-full border-b border-greyBorder  font-light mb-4 bg-white">
        {consultationInfo.title}
      </h3>

      <button className="absolute top-2 right-4" onClick={() => closeModal()}>
        <FontAwesomeIcon icon={faClose} />
      </button>
      <article className="flex flex-col gap-3 ">
        <mark>
          {consultationInfo.intro.map((item: string, index: number) => {
            return (
              <p className="body-2" key={index}>
                {item}
              </p>
            );
          })}
        </mark>
        <AppointmentSelect /> {/* cari poli yang dituju */}
        <AppointmentDoctor /> {/* contoh2 dokter yang tersedia */}
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
  );
};

export default ModalAppointment;

const AppointmentSelect = () => {
  const {
    state: { modalValue },
  } = useGlobalContext();
  const consultationInfo: ConsultationMenuTypes = modalValue;
  return (
    <mark className="w-full  grid grid-cols-2 gap-5 h-full body-3 max-h-96">
      <div className=" w-full standard-border p-3  flex flex-col gap-5">
        <div className="w-full flex gap-2 flex-col h-16">
          <p className="btn-3-bold">
            Pilih tanggal berobat
            <span className="normal-case">(Maksimal 7 hari ke depan)</span>
          </p>
          <div className="standard-border">
            <p className="btn-3 p-3">DD/MM/YYYY</p>
          </div>
        </div>
        <div className="w-full flex gap-2 flex-col h-16">
          <div className="flex gap-2">
            <p className="btn-3-bold">Spesialisasi/klinik</p>
            <div className=" flex body-3 ml-auto gap-5">
              <div className="flex-center-between gap-2">
                <FontAwesomeIcon
                  icon={faCircleDot}
                  className=" text-greenUrip"
                />
                <p>Spesialisasi</p>
              </div>
              <div className="flex-center-between gap-2">
                <FontAwesomeIcon icon={faCircle} className=" text-greenUrip" />
                <p>Nama</p>
              </div>
            </div>
          </div>
          <div className="standard-border w-full">
            <p className="btn-3 p-3">ketik spesialisasi yang dituju</p>
          </div>
        </div>
      </div>

      {consultationInfo.modal_img && (
        <div className="w-full h-40 my-auto">
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
  );
};
const AppointmentDoctor = () => {
  const {
    openModal,
    state: { modalValue },
  } = useGlobalContext();
  const consultationInfo: ConsultationMenuTypes = modalValue;
  return (
    <mark>
      <h4 className="text-left">Beberapa dokter kami</h4>
      <div className=" grid grid-cols-2 w-full gap-2">
        {randomizeDoctor().map((item: DoctorType, index: number) => {
          const image: string =
            item.gender === 1 ? "male-" + (index + 1) : "female-" + (index + 1);
          return (
            <button
              onClick={() =>
                openModal("doctordetail", { item, image, consultationInfo })
              }
              key={index}
              className="standard-border flex gap-2"
            >
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
              <div className="grid grid-cols-2 w-full body-3 text-left">
                <div className=" col-span-2 flex-center-left gap-2">
                  {item.telemedicine ? (
                    <FontAwesomeIcon
                      icon={faCircle}
                      className={
                        item.sedang_online ? "text-greenUrip" : "text-greyMed1"
                      }
                    />
                  ) : null}
                  <p className="body-2">{item.nama}</p>
                </div>
                <p>Poliklinik</p>
                <p>: {item.poliklinik.title}</p>
                <p>Pengalaman</p>
                <p>: {item.pengalaman} tahun</p>
                <p>Telemedicine </p>
                <p>{item.telemedicine ? ": Ya" : ": Tidak"} </p>
              </div>
            </button>
          );
        })}
      </div>
    </mark>
  );
};
