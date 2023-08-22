"use client";
import React from "react";
import MainImageAnimatedLeft from "../../(tools)/components/PageComponents/MainImageAnimatedLeft";
import ConsultationOptions from "../../(tools)/components/PageComponents/poliklinik/ConsultationOptions";
import PoliklinikListContainer from "@/app/(tools)/components/PageComponents/poliklinik/PoliklinikListContainer";

type Props = {};
const unit = {
  img: "poliklinik",
  title: "POLIKLINIK",
  description:
    "Sebagai rumah sakit dengan akreditasi Tingkat Paripurna Tipe B Non Pendidikan, RS Urip Sumoharjo  mampu memberikan pelayanan kedokteran medik spesialis luas dan subspesialis terbatas. Saat ini RS Urip Sumoharjo mempunyai lebih dari 70 dokter spesialis dan sub spesialis yang berkualitas, yang diimbangi dengan peralatan dan fasilitas yang lengkap dan canggih",
};
const Poliklinik = (props: Props) => {
  return (
    <div className="page-main-container">
      <section
        id="zero"
        className=" h-full  min-h-screen w-full z-0 overflow-hidden flex relative snap-center bg-accent1"
      >
        <ConsultationOptions />
        <MainImageAnimatedLeft
          img={unit.img}
          title={unit.title}
          description={unit.description}
        />
        <div className="h-full w-3/12 bg-greenUrip relative z-10  overflow-hidden">
          <div
            className="absolute h-full w-full top-0 left-4 z-10 bg-[length:200px_200px]
          bg-pattern  mix-blend-multiply opacity-30"
          ></div>
          <div className="w-4 h-full bg-accent1 absolute left-0 top-0"></div>
        </div>
      </section>
      <PoliklinikListContainer />
    </div>
  );
};

export default Poliklinik;
