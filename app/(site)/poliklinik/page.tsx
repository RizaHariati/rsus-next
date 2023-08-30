"use client";
import React, { useState } from "react";
import MainImageAnimatedLeft from "../../(tools)/components/PageComponents/MainImageAnimatedLeft";
import ConsultationOptions from "../../(tools)/components/PageComponents/poliklinik/ConsultationOptions";
import PoliklinikListContainer from "@/app/(tools)/components/PageComponents/poliklinik/PoliklinikListContainer";
import FindPoliklinik from "@/app/(tools)/components/PageComponents/poliklinik/FindPoliklinik";
import { PoliklinikType } from "@/app/(tools)/types";
import dataPoliklinik from "@/app/(tools)/data/data_poliklinik.json";
import Image from "next/image";
import { motion } from "framer-motion";
import { enterOpacity } from "../../(tools)/framervariants/variants";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";

type Props = {};
const unit = {
  img: "poliklinik",
  title: "POLIKLINIK",
  description:
    "Sebagai rumah sakit dengan akreditasi Tingkat Paripurna Tipe B Non Pendidikan, RS Urip Sumoharjo  mampu memberikan pelayanan kedokteran medik spesialis luas dan subspesialis terbatas. Saat ini RS Urip Sumoharjo mempunyai lebih dari 70 dokter spesialis dan sub spesialis yang berkualitas, yang diimbangi dengan peralatan dan fasilitas yang lengkap dan canggih",
};
const Poliklinik = (props: Props) => {
  const { openModal } = useGlobalContext();
  const [keyword, setKeyword] = useState<string>("");
  const [poliList, setPoliList] = useState<PoliklinikType[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setKeyword(e.target.value);
    const filterPoli = dataPoliklinik.filter((itemPoli) =>
      itemPoli.title.toLowerCase().includes(e.target.value)
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
      <PoliklinikListContainer>
        <div className=" col-span-3 standard-border w-full flex flex-col gap-5 overflow-hidden">
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
                  className="object-center object-fill w-full h-[250px] overflow-hidden"
                  loading="lazy"
                />
              </motion.div>
            )}
            {keyword && poliList.length > 0 && (
              <div className="h-[calc(100%-100px)]">
                <h5 className="my-2">Pilih satu spesialis/klinik</h5>
                <div className="flex flex-col gap-2 h-full custom-scrollbar px-2">
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
              <div className="h-[calc(100%-100px)]">
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
};

export default Poliklinik;
