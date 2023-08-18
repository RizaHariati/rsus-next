"use client";
import React from "react";
import { motion } from "framer-motion";
import { enterTitleVariants } from "@/app/(tools)/framervariants/titlevariants";
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

type Props = {};

const MainPage = (props: Props) => {
  return (
    <div className=" page-main-container ">
      <section
        id="zero"
        className=" h-full  min-h-screen w-full z-0 overflow-hidden flex relative snap-center bg-accent1"
      >
        <FloatingMenu />
        <div className="h-full w-3/12 bg-greyLit relative z-10 ">
          <div className="w-4 h-full bg-accent1 absolute right-0 top-0"></div>
        </div>
        <MainImageAnimated />
      </section>
      <KegiatanRSUS />
      <KunjungiKami />
      <div className=" relative w-full h-fit">
        <FasilitasGroup
          facilityTitle="fasilitas dan klinik unggulan"
          facilityGroup={dataFacility.filter(
            (item: FacilityType) => item.featured === true
          )}
        />
        <Link
          href="/facility"
          className="  text-greenUrip animate-pulse w-fit h-fit rounded-full absolute bottom-14 right-24 z-10"
        >
          <FontAwesomeIcon icon={faArrowRight} className="text-4xl" />
          <p className="btn-3-bold"> Lebih </p>
          <p className="btn-3-bold"> Banyak </p>
        </Link>
      </div>

      <SloganGallery />
    </div>
  );
};

export default MainPage;
