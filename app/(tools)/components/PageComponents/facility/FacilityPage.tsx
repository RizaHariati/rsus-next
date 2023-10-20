"use client";
import React from "react";
import FindFacility from "@/app/(tools)/components/PageComponents/facility/FindFacility";
// import dataFacility from "@/app/(tools)/data/data_facility.json";
import FasilitasGroup from "@/app/(tools)/components/PageComponents/mainpage/FasilitasGroup";
import BackToTop from "@/app/(tools)/components/BackToTop";
import PageGreenAccent from "@/app/(tools)/components/PageGreenAccent";
import MainImageSmallB from "@/app/(tools)/components/PageComponents/MainImageSmallB";
import MainImageAnimatedLeft from "../MainImageAnimatedLeft";
import { groupCategoryFacility } from "@/app/(tools)/utils/groupCategoryFacility";
import { FacilitySanityType } from "@/app/(tools)/types";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";

type Props = {};
const unit = {
  img: "facility",
  title: "FACILITY",
  description:
    "RS Urip Sumoharjo berusaha untuk terus meningkatkan  fasilitas dan mutu layanan kami dengan melengkapi tenaga medis yang profesional dan perlengkapan penunjang medis yang mengikuti perkembangan teknologi yang semakin maju dan canggih.",
};
function FacilityPage(props: Props) {
  const {
    state: { dataFacility },
  } = useGlobalContext();
  return (
    <div className="page-main-container ">
      <BackToTop sectionID="facility-top" />
      <section
        id="facility-top"
        className=" h-[calc(100vh-32px)] md:h-full md:min-h-screen w-full z-0 overflow-hidden flex flex-col md:flex-row relative  md:bg-accent1 bg-white snap-none  md:snap-center pb-2"
      >
        <MainImageSmallB img={unit.img} title={unit.title} />
        <MainImageAnimatedLeft
          img={unit.img}
          title={unit.title}
          description={unit.description}
        />
        <PageGreenAccent />

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
}

export default FacilityPage;
