"use client";
import Image from "next/image";
import React from "react";

import dataAppointment from "@/app/(tools)/data/data_appointment.json";
import { AppointmentMenuTypes } from "@/app/(tools)/types";

import { useGlobalContext } from "@/app/(tools)/context/AppProvider";

const AppointmentMenuLoading = () => {
  const { openModal } = useGlobalContext();
  return (
    <div className="relative md:absolute w-full md:w-[600px] h-1/2 md:h-fit md:place-content-end-auto  md:top-1/3  z-20 right-0 md:right-[10%] flex flex-col gap-2 p-3 md:p-0 pb-10 md:pb-0">
      <h1
        key="appointment-title"
        className="hidden md:block z-30 text-white text-right w-full leading-6 tracking-[5px] mb-5   font-light uppercase"
      >
        Janji Temu Dokter
      </h1>
      {dataAppointment.map((item: AppointmentMenuTypes, index: number) => {
        return (
          <button
            key={index}
            className="grid grid-cols-6 w-full h-full md:h-fit bg-white bg-opacity-100 hover:bg-opacity-80 place-items-center p-1 standard-border cursor-pointer group overflow-hidden animate-pulse"
          >
            <div className=" col-span-1 w-16 md:w-20 aspect-square p-1">
              <Image
                src={`/images/icons/consultation-icons/${item.image}`}
                alt="mainimage"
                height={200}
                width={200}
                className=" object-cover w-full z-10 h-full right-0 top-0 object-center opacity-100 group-hover:opacity-50"
                loading="lazy"
              />
            </div>
            <div className=" col-span-5 flex-top-left flex-col">
              <h4 className=" text-[16px] md:text-[16px] text-left">
                {item.title}
              </h4>
              <p className="hidden md:block body-3 text-left">
                {item.description}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
};
export default AppointmentMenuLoading;