"use client";
import React, { useState } from "react";

import PoliklinikListContainer from "@/app/(tools)/components/PageComponents/poliklinik/PoliklinikListContainer";
import FindPoliklinik from "@/app/(tools)/components/PageComponents/poliklinik/FindPoliklinik";
import { PoliklinikType } from "@/app/(tools)/types";
import dataPoliklinik from "@/app/(tools)/data/data_poliklinik.json";
import Image from "next/image";
import { motion } from "framer-motion";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import PageGreenAccent from "@/app/(tools)/components/PageGreenAccent";
import MainImageSmall from "@/app/(tools)/components/PageComponents/MainImageSmallB";
import ConsultationOptions, {
  ConsultationOptionsContent,
} from "./AppointmentOptions";
import MainImageAnimatedLeft from "../MainImageAnimatedLeft";
import { enterOpacity } from "../../../framervariants/variants";

type Props = {};

const unit = {
  img: "poliklinik",
  title: "POLIKLINIK",
  description:
    "Sebagai rumah sakit dengan akreditasi Tingkat Paripurna Tipe B Non Pendidikan, saat ini RS Urip Sumoharjo mempunyai lebih dari 70 dokter spesialis dan sub spesialis yang berkualitas, yang diimbangi dengan peralatan dan fasilitas yang lengkap dan canggih",
};

function PoliklinikPage(props: Props) {
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
        className=" h-full md:min-h-screen w-full z-0 overflow-hidden flex flex-col md:flex-row relative  md:bg-accent1 bg-white snap-none  md:snap-center pb-2"
      >
        <ConsultationOptions />
        <MainImageSmall img={unit.img} title={unit.title} />
        <MainImageAnimatedLeft
          img={unit.img}
          title={unit.title}
          description={unit.description}
        />

        <PageGreenAccent />
        <div className="h-1/2 p-2 md:hidden">
          <p className="text-center leading-5 md:hidden mb-2">
            {unit.description}
          </p>
          <div className="p-2 flex flex-col standard-border gap-y-2">
            <ConsultationOptionsContent />
          </div>
        </div>
      </section>
      <PoliklinikListContainer>
        <div className=" col-span-3 standard-border w-full flex flex-col gap-5 overflow-hidden  h-[340px]  md:h-full">
          <FindPoliklinik
            keyword={keyword}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
          <div className="w-full h-full mx-auto">
            {!keyword && (
              <motion.div
                variants={enterOpacity}
                initial="initial"
                animate="animate"
              >
                <Image
                  rel="preload"
                  placeholder="empty"
                  src="/images/slides/pelatihan.png"
                  alt="pelatihan"
                  width={500}
                  height={400}
                  className="object-center object-fill w-full h-full overflow-hidden"
                  loading="lazy"
                />
              </motion.div>
            )}
            {keyword && poliList.length > 0 && (
              <div className="h-[calc(100%-100px)]">
                <h5 className="my-2">Pilih satu spesialis/klinik</h5>
                <div className="flex flex-col gap-2 h-full  custom-scrollbar px-2">
                  {poliList.map((item) => {
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          findSpecialist(item);
                        }}
                        className="button-long"
                      >
                        {item.title}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            {keyword && poliList.length < 1 && (
              <div className="h-full">
                <h5 className="my-2">
                  Tidak ditemukan spesialis/klinik dengan kata kunci tersebut
                </h5>
              </div>
            )}
          </div>
        </div>
      </PoliklinikListContainer>
    </div>
  );
}

export default PoliklinikPage;
