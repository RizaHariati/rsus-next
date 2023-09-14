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
import { motion } from "framer-motion";
import Image from "next/image";
import {
  enterTop,
  enterTopChildren,
} from "@/app/(tools)/framervariants/variants";

type Props = {};

const MainPage = (props: Props) => {
  return (
    <div className=" page-main-container ">
      <BackToTop />
      <section
        id="zero"
        className=" h-full  min-h-screen w-full z-0 overflow-hidden flex relative snap-center md:bg-accent1 "
      >
        <motion.div
          variants={enterTop}
          initial="initial"
          whileInView="animate"
          className=" h-2/3 overflow-hidden rounded-b-lg relative z-0 "
        >
          <div className=" mix-blend-multiply  bg-gradient-to-b from-stone-500 via-white to-zinc-500 bg-stone-800 absolute top-0 left-0 z-10 w-full h-full "></div>
          <motion.h1
            key="main-title"
            variants={enterTopChildren}
            className="z-30 text-white w-full absolute font-light capitalize text-center bottom-12 leading-8 "
          >
            Pelayanan Medis Profesional dengan Semangat Islami untuk semua
          </motion.h1>
          <motion.p
            key="sub-title"
            variants={enterTopChildren}
            className="btn-3-bold z-30 text-white text-right w-full absolute font-light capitalize animate-pulse bottom-4"
          >
            <Link href="/about-group" className="btn-1">
              TENTANG RS.URIP SUMOHARJO
            </Link>
          </motion.p>
          <motion.div className="w-full h-full overflow-hidden ">
            <Image
              rel="preload"
              placeholder="empty"
              src="/images/pages/main-image-edited-01.jpg"
              alt="mainimage"
              height={700}
              width={500}
              className=" object-cover object-bottom h-full w-auto  z-10  right-0 top-0"
              priority
            />
          </motion.div>
        </motion.div>
        <FloatingMenu />

        <div className="hidden md:block h-full w-3/12 bg-greyLit relative z-10 ">
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
