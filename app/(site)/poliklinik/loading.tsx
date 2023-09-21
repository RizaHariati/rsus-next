"use client";
import React, { useState } from "react";
import MainImageAnimatedLeft from "../../(tools)/components/PageComponents/MainImageAnimatedLeft";
import ConsultationOptions, {
  ConsultationOptionsContent,
} from "../../(tools)/components/PageComponents/poliklinik/ConsultationOptions";
import PoliklinikListContainer from "@/app/(tools)/components/PageComponents/poliklinik/PoliklinikListContainer";
import FindPoliklinik from "@/app/(tools)/components/PageComponents/poliklinik/FindPoliklinik";
import { PoliklinikType } from "@/app/(tools)/types";
import dataPoliklinik from "@/app/(tools)/data/data_poliklinik.json";
import Image from "next/image";
import { motion } from "framer-motion";
import { enterOpacity } from "../../(tools)/framervariants/variants";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import PageGreenAccent, {
  PageGreenAccentLoading,
} from "@/app/(tools)/components/PageGreenAccent";
import MainImageSmall from "@/app/(tools)/components/PageComponents/MainImageSmallB";
import MainImageSmallLoadingB from "@/app/(tools)/components/PageComponents/MainImageSmallLoadingB";
import MainImageAnimatedLeftLoading from "@/app/(tools)/components/PageComponents/MainImageAnimatedLeftLoading";
type Props = {};
const unit = {
  img: "poliklinik",
  title: "POLIKLINIK",
  description:
    "Sebagai rumah sakit dengan akreditasi Tingkat Paripurna Tipe B Non Pendidikan, saat ini RS Urip Sumoharjo mempunyai lebih dari 70 dokter spesialis dan sub spesialis yang berkualitas, yang diimbangi dengan peralatan dan fasilitas yang lengkap dan canggih",
};
const Loading = (props: Props) => {
  const { openModal } = useGlobalContext();
  const [keyword, setKeyword] = useState<string>("");
  const [poliList, setPoliList] = useState<PoliklinikType[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setKeyword(e.target.value);
    const filterPoli = dataPoliklinik.filter((itemPoli) =>
      itemPoli.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setPoliList(filterPoli);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setKeyword("");
    setPoliList([]);
  };

  const findSpecialist = (item: PoliklinikType) => {
    if (poliList.length < 2) {
      openModal("poliklinik", item);
    }
    const poliBigBtn = document?.getElementById(item.id + "-lg");
    poliBigBtn?.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  };
  return (
    <div className="page-main-container">
      <section
        id="poliklinik-top"
        className=" h-full md:min-h-screen w-full z-0 overflow-hidden flex flex-col md:flex-row relative  md:bg-accent1 bg-white snap-none  md:snap-center pb-2 animate-pulse"
      >
        <ConsultationOptions />
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
            <ConsultationOptionsContent />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Loading;
