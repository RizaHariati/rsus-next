"use client";
import React from "react";
import MainImageAnimatedLeft from "../../(tools)/components/PageComponents/MainImageAnimatedLeft";
import FindFacility from "@/app/(tools)/components/PageComponents/facility/FindFacility";
import dataFacility from "@/app/(tools)/data/data_facility.json";
import { groupCategoryFacility } from "../../(tools)/utils/groupCategoryFacility";
import FasilitasGroup from "@/app/(tools)/components/PageComponents/mainpage/FasilitasGroup";
import BackToTop from "@/app/(tools)/components/BackToTop";
import MainImageSmall from "@/app/(tools)/components/PageComponents/MainImageSmall";

type Props = {};

const unit = {
  img: "facility",
  title: "FACILITY",
  description:
    "RS Urip Sumoharjo berusaha untuk terus meningkatkan  fasilitas dan mutu layanan kami dengan melengkapi tenaga medis yang profesional dan perlengkapan penunjang medis yang mengikuti perkembangan teknologi yang semakin maju dan canggih.",
};
const Facility = (props: Props) => {
  return (
    <div className="page-main-container ">
      <BackToTop />
      <section
        id="zero"
        className=" h-[calc(100vh-32px)] md:h-full md:min-h-screen w-full z-0 overflow-hidden flex flex-col md:flex-row relative  md:bg-accent1 bg-white snap-none  md:snap-center pb-2"
      >
        <MainImageSmall img={unit.img} title={unit.title} />
        <MainImageAnimatedLeft
          img={unit.img}
          title={unit.title}
          description={unit.description}
        />
        <div className="hidden md:block h-screen w-3/12 bg-greenUrip relative z-10  overflow-hidden">
          <div
            className="absolute h-full w-full top-0 left-4 z-10 bg-[length:200px_200px]
          bg-pattern  mix-blend-multiply opacity-30"
          ></div>
          <div className="w-4 h-full bg-accent1 absolute left-0 top-0"></div>
        </div>

        <p className="h-1/4 p-2 text-center leading-normal md:hidden">
          {unit.description}
        </p>
        <FindFacility />
      </section>

      <div className="pb-[150px] bg-greyLit z-10">
        {Object.keys(groupCategoryFacility(dataFacility)).map((item, index) => {
          return (
            <FasilitasGroup
              key={index}
              facilityTitle={item}
              facilityGroup={groupCategoryFacility(dataFacility)[item]}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Facility;
