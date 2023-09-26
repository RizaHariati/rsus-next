import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { ConsultationMenuTypes, DoctorType } from "../../types";

import Image from "next/image";
import dataDoctor from "@/app/(tools)/data/data_dokter.json";
import { toast } from "react-toastify";

type Props = {};
const randomizeDoctor = () => {
  const newDataDoctor = dataDoctor.filter((item) => item.telemedicine === 1);
  return [...newDataDoctor].sort(() => 0.5 - Math.random()).slice(0, 4);
};
const TelemedicineDoctor = () => {
  const {
    openModal,
    state: { modalValue, filtered_doctor },
    patientState: { patient },
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

  const handleClick = (doctorInfo: DoctorType, image: string) => {
    if (
      patient.medical_record_number !== "US4234123398" &&
      patient.scheduled_appointments.length > 6
    ) {
      return toast.error(
        "Anda sudah mencapai kuota pendaftaran online minggu ini"
      );
    }
    if (patient.medical_record_number !== "US4234123398") {
      const findTelemedicine = patient.scheduled_appointments.find(
        (item) => item.appointment_type === "telemedicine"
      );

      if (findTelemedicine) {
        toast.error(
          `Anda sudah terdaftar untuk Telemedicine dengan ${
            dataDoctor.find(
              (doctorInfo) => doctorInfo.id === findTelemedicine.tujuan[0]
            )?.nama
          } Anda hanya bisa melakukan Telemedicine satu kali sehari`
        );
      } else {
        openModal("doctordetail", {
          doctorInfo,
          image,
          consultationInfo,
        });
      }
    } else {
      openModal("doctordetail", {
        doctorInfo,
        image,
        consultationInfo,
      });
    }
  };
  return (
    <section className="bg-white border-none">
      <h4 className="text-left mb-2">{`${title} Telemedicine`}</h4>
      <div className=" grid grid-cols-1 md:grid-cols-2 w-full gap-2">
        {doctorList.map((doctorInfo: DoctorType, index: number) => {
          const image: string =
            doctorInfo.gender === 1
              ? "male-" + (index + 1)
              : "female-" + (index + 1);
          return (
            <button
              onClick={() =>
                /* -------------- TELEMEDICINE CAN ONLY BE ONCE A DAY ------------- */
                /* ------------------ checking existing Schedule ------------------ */
                handleClick(doctorInfo, image)
              }
              key={index}
              className="standard-border flex flex-col md:flex-row items-center p-1 md:p-0 gap-2"
            >
              <div className=" aspect-square w-14 md:w-24 h-auto overflow-hidden">
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
                  {doctorInfo.telemedicine ? (
                    <FontAwesomeIcon
                      icon={faCircle}
                      className={
                        doctorInfo.sedang_online
                          ? "text-greenUrip"
                          : "text-greyMed1"
                      }
                    />
                  ) : null}
                  <p className="body-2">{doctorInfo.nama}</p>
                </div>
                <p>Poliklinik</p>
                <p className=" col-span-2">: {doctorInfo.poliklinik.title}</p>
                <p>Pengalaman</p>
                <p className=" col-span-2">: {doctorInfo.pengalaman} tahun</p>
                {doctorInfo.sedang_online ? (
                  <p className="text-greenUrip col-span-2">Sedang Online</p>
                ) : (
                  <p className="text-greyMed2 col-span-2">Sedang offline</p>
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
