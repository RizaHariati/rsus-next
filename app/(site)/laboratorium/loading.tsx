import React from "react";
import { PageGreenAccentLoading } from "@/app/(tools)/components/PageGreenAccent";
import MainImageSmallLoadingB from "@/app/(tools)/components/PageComponents/MainImageSmallLoadingB";
import MainImageAnimatedLeftLoading from "@/app/(tools)/components/PageComponents/MainImageAnimatedLeftLoading";
type Props = {};
const unit = {
  img: "laboratorium",
  title: "LAB DAN CHECK UP",
  description:
    "RS Urip Sumoharjo  bergerak maju untuk misi kemanusiaan menyelamatkan masyarakat dengan menyediakan Laboratorium yang dapat melakukan tes pemeriksaan laboratorium yang menyeluruh dan tepat guna. Cek Fasilitas pendukung laboratorium kami disini.Anda bisa memilih test yang diinginkan atau memilih paket hemat yang kami sudah pilihkan.",
};

const Loading = (props: Props) => {
  return (
    <div className="page-main-container">
      <section
        id="laboratorium-top"
        className=" h-full md:min-h-screen w-full z-0 overflow-hidden flex flex-col md:flex-row relative  md:bg-accent1 bg-white snap-none  md:snap-center pb-2 animate-pulse  "
      >
        <MainImageSmallLoadingB img={unit.img} title={unit.title} />
        <MainImageAnimatedLeftLoading
          img={unit.img}
          title={unit.title}
          description={unit.description}
        />
        <PageGreenAccentLoading />
        <p className="h-1/4 p-2 text-center leading-normal md:hidden animate-pulse">
          {unit.description}
        </p>
        <div className="h-1/4 p-2 md:h-fit  relative md:absolute pt-8 md:bottom-14 md:right-16 z-10 flex gap-2 md:gap-5 mt-5 animate-pulse">
          <button className="button-lg animate-pulse">
            Pilih Test Sendiri
          </button>
          <button className="button-lg  animate-pulse">Pilih Paket</button>
        </div>
      </section>
    </div>
  );
};

export default Loading;
