import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";

import dataDoctor from "@/app/(tools)/data/data_dokter.json";
import Image from "next/image";
import { ConsultationMenuTypes, DoctorType } from "../../types";

type Props = {};
const randomizeDoctor = () => {
  return [...dataDoctor].sort(() => 0.5 - Math.random()).slice(0, 4);
};
const AppointmentDoctor = () => {
  const {
    openModal,
    state: { modalValue, filtered_doctor },
  } = useGlobalContext();

  const consultationInfo: ConsultationMenuTypes = modalValue;

  const value = filtered_doctor.value;
  const category = filtered_doctor.category;
  const keyword = filtered_doctor.keyword;

  const [doctorList, setdoctorList] = useState<DoctorType[]>(
    value.length > 0 && value.length !== dataDoctor.length
      ? value
      : randomizeDoctor()
  );
  const [title, setTitle] = useState(
    value.length > 0 ? category : "Beberapa dokter kami"
  );

  useEffect(() => {
    if (!value) return;
    if (!keyword) {
      setTitle("Beberapa dokter kami");
    } else {
      if (value.length < 1) {
        setTitle(
          "Tidak ditemukan Spesialis/Doker dengan kata kunci atau jadwal yang anda masukkan."
        );
      } else {
        setdoctorList(value.slice(0, 6));
        if (category === "spesialisasi") {
          setTitle(value[0].poliklinik.title);
        } else {
          setTitle("Beberapa dokter kami");
        }
      }
    }
    // eslint-disable-next-line
  }, [filtered_doctor]);

  return (
    <mark className="w-full h-fit max-h-96 md:max-h-44  scrollbar-none md:scrollbar-thin overflow-y-scroll">
      <h4 className="text-left">
        {!keyword || keyword !== ""
          ? title
          : "Tidak ditemukan Spesialis/Doker dengan kata kunci atau jadwal yang anda masukkan."}
      </h4>
      <div className=" grid grid-cols-1 md:grid-cols-2 w-full gap-2">
        {doctorList.map((item: DoctorType, index: number) => {
          const image: string =
            item.gender === 1 ? "male-" + (index + 1) : "female-" + (index + 1);
          return (
            <button
              onClick={() =>
                openModal("doctordetail", { item, image, consultationInfo })
              }
              key={index}
              className="standard-border flex flex-col md:flex-row gap-2  p-2 md:p-0"
            >
              <div className=" aspect-square w-14 md:w-24 h-auto overflow-hidden mx-auto">
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
              <div className="grid grid-cols-3 w-full body-3 text-left">
                <div className=" col-span-full flex-center-left gap-2">
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
                <p className=" col-span-2">: {item.poliklinik.title}</p>
                <p>Pengalaman</p>
                <p className=" col-span-2">: {item.pengalaman} tahun</p>
                <p>Telemedicine </p>
                <p className=" col-span-2">
                  {item.telemedicine ? ": Ya" : ": Tidak"}{" "}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </mark>
  );
};

export default AppointmentDoctor;
