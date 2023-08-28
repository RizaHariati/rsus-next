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
  const [doctorList, setdoctorList] = useState<DoctorType[]>(randomizeDoctor());
  const [title, setTitle] = useState("Beberapa dokter kami");
  const value = filtered_doctor.value;
  const category = filtered_doctor.category;
  const keyword = filtered_doctor.keyword;
  useEffect(() => {
    if (!value) return;
    if (!keyword) {
      setTitle("Beberapa dokter kami");
    } else {
      if (value.length < 1) {
        setTitle(
          "Tidak ditemukan Spesialis dengan kata kunci atau jadwal yang anda masukkan. Silahkan hapus tanggal untuk memilih hari lain"
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
  }, [filtered_doctor]);

  return (
    <mark className="w-full  h-60 custom-scrollbar">
      <h4 className="text-left">
        {keyword !== ""
          ? title
          : "Tidak ditemukan Spesialis dengan kata kunci atau jadwal yang anda masukkan. Silahkan hapus tanggal untuk memilih hari lain"}
      </h4>
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
              <div className="grid grid-cols-3 w-full body-3 text-left">
                <div className=" col-span-3 flex-center-left gap-2">
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
