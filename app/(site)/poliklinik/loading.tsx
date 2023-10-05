import React, { useState } from "react";

import { PageGreenAccentLoading } from "@/app/(tools)/components/PageGreenAccent";
import MainImageSmallLoadingB from "@/app/(tools)/components/PageComponents/MainImageSmallLoadingB";
import MainImageAnimatedLeftLoading from "@/app/(tools)/components/PageComponents/MainImageAnimatedLeftLoading";
import AppointmentOptions from "../../(tools)/components/PageComponents/poliklinik/AppointmentOptions";
import { AppointmentOptionsContent } from "../../(tools)/components/PageComponents/poliklinik/AppointmentOptions";
type Props = {};
const unit = {
  img: "poliklinik",
  title: "POLIKLINIK",
  description:
    "Sebagai rumah sakit dengan akreditasi Tingkat Paripurna Tipe B Non Pendidikan, saat ini RS Urip Sumoharjo mempunyai lebih dari 70 dokter spesialis dan sub spesialis yang berkualitas, yang diimbangi dengan peralatan dan fasilitas yang lengkap dan canggih",
};
const Loading = (props: Props) => {
  return (
    <div className="page-main-container">
      <section
        id="poliklinik-top"
        className=" h-full md:min-h-screen w-full z-0 overflow-hidden flex flex-col md:flex-row relative  md:bg-accent1 bg-white snap-none  md:snap-center pb-2 animate-pulse"
      >
        <AppointmentOptions />
        <MainImageSmallLoadingB img={unit.img} title={unit.title} />
        <MainImageAnimatedLeftLoading
          img={unit.img}
          title={unit.title}
          description={unit.description}
        />

        <PageGreenAccentLoading />
        <div className="h-1/2 p-2 md:hidden">
          <p className="text-center leading-5 md:hidden mb-2">
            {unit.description}
          </p>
          <div className="p-2 flex flex-col standard-border gap-y-2">
            <AppointmentOptionsContent />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Loading;
