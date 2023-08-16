"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { floatingMenu } from "@/app/(tools)/data/datamenu";
import { FloatingMenuType } from "@/app/(tools)/types";
import "../../styles/mainpage.css";
import {
  enterMiddleVariant,
  enterRightVariant,
  enterRightVariantChild,
} from "@/app/(tools)/framervariants/variants";
import { dataArticle } from "@/app/(tools)/data/dataarticle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

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
      <section
        id="one"
        className=" bg-white h-fit w-full z-0 snap-center pt-14 pb-5 "
      >
        <h2> Aksi RS Urip Sumoharjo</h2>
        <div className="w-full flex-center-center p-4 px-20">
          <button className="text-white p-1 py-4 bg-accent2 hover:bg-greyMed1 h-fit rounded-sm transition-all">
            <FontAwesomeIcon icon={faChevronLeft} className="text-xl" />
          </button>
          <div className="w-full max-w-5xl grid grid-cols-3 gap-5">
            {dataArticle
              .filter((data) => data.category === "aksi")
              .slice(0, 3)
              .map((article) => {
                return (
                  <div
                    key={article.id}
                    className="w-full rounded-sm overflow-hidden standard-border"
                  >
                    <div className="w-full h-auto">
                      <Image
                        src={`/images/news/${article.img}.jpg`}
                        alt={article.img}
                        height={220}
                        width={400}
                        className="object-center object-cover h-auto w-full overflow-hidden rounded-sm"
                      />
                    </div>
                    <div className="p-3 flex gap-2 flex-col">
                      <h5 className="h-16 text-left tracking-[2px]">
                        {article.title}
                      </h5>
                      <p className=" footnote-1">{article.date}</p>
                      <p>{article.text[0].slice(0, 120)}...</p>
                      <button className="text-greenUrip text-center btn-4 w-full border border-greenUrip p-1 hover:text-white hover:bg-greenUrip transition-all cursor-pointer">
                        baca selengkapnya
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
          <button className="text-white p-1 py-4 bg-accent2 hover:bg-greyMed1 h-fit rounded-sm transition-all">
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </section>
      <section
        id="two"
        className=" bg-slate-300 h-screen w-full z-0 snap-center"
      >
        <h2> Main Page</h2>
      </section>
    </div>
  );
};

export default MainPage;

const FloatingMenu = () => {
  return (
    <motion.div
      variants={enterMiddleVariant}
      initial="initial"
      animate="animate"
      className="floating-menu-container"
    >
      <div className="h-1/2 w-full grid grid-cols-2 gap-1 ">
        {floatingMenu.map((item: FloatingMenuType) => {
          return (
            <Link href={item.link} className="floating-link group">
              <Image
                src={`/images/icons/mainpage-icons/${item.image}`}
                height={100}
                width={100}
                alt={item.name}
                className="h-14 w-auto group-hover:opacity-20 transition-all"
              />
              <p className=" font-nunito uppercase font-normal text-[16px] tracking-wide ">
                {item.title}
              </p>
            </Link>
          );
        })}
      </div>
      <div className="h-1/2 w-full flex-center-between flex-col py-2 ">
        <p className="body-3">
          Selain konsultasi tatap muka, RS Urip Sumoharjo menyediakan pelayanan
          konsultasi Doktor jarak jauh, TeleMedicine awal lewat WhatsApp.
        </p>
        <p className="body-3">
          Jika data anda valid, admin kami akan menghubungi anda pada jam kerja
          baik melalui WhatsApp maupun telpon untuk mengkonfirmasi pendaftaran.
        </p>
        <button className="btn-2 w-full bg-greenUrip hover:bg-greenUripOpacity border border-greenUrip text-white hover:text-greenUrip transition-all">
          Daftar Telemedicine
        </button>
      </div>
    </motion.div>
  );
};

const MainImageAnimated = () => {
  return (
    <motion.div
      variants={enterRightVariant}
      initial="initial"
      animate="animate"
      className="h-screen w-9/12  relative z-0 overflow-hidden"
    >
      <motion.div
        variants={enterRightVariantChild}
        className="darken-filter"
      ></motion.div>

      <motion.h1
        variants={enterRightVariantChild}
        className="z-30 text-white text-right right-14 w-1/2 top-1/2 leading-[50px] absolute  font-light capitalize"
      >
        Pelayanan Medis Profesional dengan Semangat Islami untuk semua
      </motion.h1>
      <motion.p
        variants={enterRightVariantChild}
        className="btn-1 z-30 text-white text-right right-14 w-1/2 top-[75vh] absolute font-light capitalize animate-pulse"
      >
        <Link href="/about-group" className="btn-1">
          TENTANG RS.URIP SUMOHARJO
        </Link>
      </motion.p>
      <Image
        src="/images/pages/main-image-edited-01.jpg"
        alt="mainimage"
        height={1200}
        width={1200}
        className=" object-cover w-full z-10 absolute h-full right-0 top-0"
        priority
      />
    </motion.div>
  );
};
