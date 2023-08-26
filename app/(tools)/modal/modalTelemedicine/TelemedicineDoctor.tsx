import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { ConsultationMenuTypes, DoctorType } from "../../types";

import Image from "next/image";
import dataDoctor from "@/app/(tools)/data/data_dokter.json";

type Props = {};
const randomizeDoctor = () => {
  const newDataDoctor = dataDoctor.filter((item) => item.telemedicine === 1);
  return [...newDataDoctor].sort(() => 0.5 - Math.random()).slice(0, 4);
};
const TelemedicineDoctor = () => {
  const {
    openModal,
    state: { modalValue, filtered_doctor },
  } = useGlobalContext();

  const consultationInfo: ConsultationMenuTypes = modalValue;
  const [doctorList, setdoctorList] = useState<DoctorType[]>(randomizeDoctor());
  const [title, setTitle] = useState("Dokter kami yang melayani Telemedicine");

  useEffect(() => {
    const value = filtered_doctor.value;
    const category = filtered_doctor.category;
    if (value?.length > 0 && value?.length < dataDoctor.length) {
      setdoctorList(value.slice(0, 6));
      if (category === "spesialisasi") {
        setTitle(value[0].poliklinik.title);
      } else {
        setTitle("Dokter kami yang melayani Telemedicine");
      }
    }
  }, [filtered_doctor]);
  return (
    <section className="bg-white border-none">
      <h4 className="text-left mb-2">{`${title} Telemedicine`}</h4>
      <div className=" grid grid-cols-2 w-full gap-2">
        {doctorList.map((item: DoctorType, index: number) => {
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
                {item.sedang_online ? (
                  <p className="text-greenUrip">Sedang Online</p>
                ) : (
                  <p className="text-greyMed2">Sedang offline</p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default TelemedicineDoctor;
