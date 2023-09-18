"use client";
import React from "react";
import "../../styles/mainpage.css";

import KegiatanRSUS from "@/app/(tools)/components/PageComponents/mainpage/KegiatanRSUS";
import dataFacility from "@/app/(tools)/data/data_facility.json";
import FloatingMenu from "@/app/(tools)/components/PageComponents/mainpage/FloatingMenu";
import MainImageAnimated from "@/app/(tools)/components/PageComponents/mainpage/MainImageAnimated";
import KunjungiKami from "@/app/(tools)/components/PageComponents/mainpage/KunjungiKami";

import { FacilityType } from "../../(tools)/types";
import FasilitasGroup from "@/app/(tools)/components/PageComponents/mainpage/FasilitasGroup";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import SloganGallery from "@/app/(tools)/components/PageComponents/mainpage/SloganGallery";
import BackToTop from "@/app/(tools)/components/BackToTop";
import MainImageSmall from "@/app/(tools)/components/PageComponents/mainpage/mainpageSmall/MainImageSmall";

type Props = {};

const MainPage = (props: Props) => {
  return (
    <div className=" page-main-container ">
      <BackToTop />
      <section
        id="zero"
        className=" h-[calc(100vh-32px)] md:h-full md:min-h-screen w-full z-0 overflow-hidden flex flex-col md:flex-row relative snap-start md:snap-center bg-white md:bg-accent1 pb-2 border-b border-greyBorder"
      >
        <MainImageSmall />
        <div className="h-1/2 w-full md:h-full relative md:absolute z-0 translate-y-1/2  md:top-0 md:translate-y-0 md:z-20">
          <FloatingMenu />
        </div>
        <div className="hidden md:block h-screen w-3/12 bg-greyLit relative z-10 ">
          <div className="w-4 h-full bg-accent1 absolute right-0 top-0"></div>
        </div>
        <MainImageAnimated />
      </section>
      <KegiatanRSUS />
      <KunjungiKami />
      <section className="relative h-[calc(100vh-136px)] md:h-[calc(100vh-56px)]">
        <FasilitasGroup
          facilityTitle="fasilitas dan klinik unggulan"
          facilityGroup={dataFacility.filter(
            (item: FacilityType) => item.featured === true
          )}
        />
        <Link
          href="/facility"
          className="hidden md:block  text-greenUrip animate-pulse w-fit h-fit rounded-full absolute bottom-14 right-24 z-10"
        >
          <FontAwesomeIcon icon={faArrowRight} className="text-4xl" />
          <p className="btn-3-bold"> Lebih </p>
          <p className="btn-3-bold"> Banyak </p>
        </Link>
      </section>

      <SloganGallery />
    </div>
  );
};

export default MainPage;
