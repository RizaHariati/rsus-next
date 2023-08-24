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
import { env } from "process";
import { getDoctorDetailedIfo } from "../utils/forms/getDoctorDetailedInfo";

type Props = {};

const ModalDoctorDetail = (props: Props) => {
  const {
    state: { modalValue },
    openModal,
  } = useGlobalContext();
  const doctorInfo: DoctorType = modalValue.item;
  const image: string = modalValue.image;
  const consultationInfo: ConsultationMenuTypes = modalValue.consultationInfo;
  return (
    <div className="modal-md p-3 px-10 overflow-hidden bg-white">
      <button
        className="absolute top-2 right-4"
        onClick={() => openModal(consultationInfo.modal, consultationInfo)}
      >
        <FontAwesomeIcon icon={faClose} />
      </button>
      <article className="flex-center-between flex-col w-full gap-3s">
        <div className=" aspect-square w-32 h-auto mx-auto relative">
          <Image
            rel="preload"
            placeholder="empty"
            src={`/images/doctors/${image}.jpg`}
            alt={image}
            width={100}
            height={100}
            className="w-auto h-full rounded-sm object-cover object-center"
            loading="lazy"
          />
          <Image
            rel="preload"
            placeholder="empty"
            src={`/images/navbar/main-logo.png`}
            alt="main-logo"
            width={30}
            height={30}
            className="w-10 h-auto rounded-full object-cover object-center absolute bottom-0 -right-5"
            loading="lazy"
          />
        </div>
        <div className="w-full border-t border-greyBorder ">
          <p className="body-1-bold tracking-normal">
            {doctorInfo.nama}&nbsp;
            {doctorInfo.telemedicine ? (
              doctorInfo.sedang_online ? (
                <span className=" text-greenUrip body-3">
                  &nbsp;sedang online
                </span>
              ) : (
                <span className=" text-greyMed2 body-3">
                  &nbsp;sedang offline
                </span>
              )
            ) : null}
          </p>
          <div className=" w-full">
            {getDoctorDetailedIfo(doctorInfo).map((item) => {
              return (
                <div key={item.id} className="w-full grid grid-cols-2">
                  <p>{item.title}</p>
                  <p>: {item.value}</p>
                </div>
              );
              //   }
            })}
          </div>
        </div>
      </article>
    </div>
  );
};

export default ModalDoctorDetail;
