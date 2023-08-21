"use client";
import React from "react";
import MainImageAnimatedLeft from "../../(tools)/components/PageComponents/MainImageAnimatedLeft";
import FindFacility from "@/app/(tools)/components/PageComponents/facility/FindFacility";
import dataFacility from "@/app/(tools)/data/data_facility.json";
import { groupCategoryFacility } from "../../(tools)/utils/groupCategoryFacility";
import FasilitasGroup from "@/app/(tools)/components/PageComponents/mainpage/FasilitasGroup";
import BackToTop from "@/app/(tools)/components/BackToTop";

type Props = {};

const unit = {
  img: "facility",
  title: "FACILITY",
  description:
    "RS Urip Sumoharjo berusaha untuk terus meningkatkan  fasilitas dan mutu layanan kami dengan melengkapi tenaga medis yang profesional dan perlengkapan penunjang medis yang mengikuti perkembangan teknologi yang semakin maju dan canggih.",
};
const Facility = (props: Props) => {
  return (
    <div className="page-main-container">
      <FindFacility />
      <BackToTop />
      <section
        id="zero"
        className=" h-full  min-h-screen w-full z-0 overflow-hidden flex relative snap-center bg-accent1"
      >
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
      <div>
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
