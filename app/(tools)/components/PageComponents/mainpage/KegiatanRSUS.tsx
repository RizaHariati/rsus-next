"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import dataArticle from "@/app/(tools)/data/data_article.json";

import { enterTitleVariants } from "@/app/(tools)/framervariants/titlevariants";
import dayjs from "dayjs";
import KegiatanRSUSSlide from "./KegiatanRSUSSlide";
type Props = {};

const KegiatanRSUS = (props: Props) => {
  const [sliderContainer, setsliderContainer] = useState<Element | null>(null);

  useEffect(() => {
    let containerElement = document?.querySelector(
      ".mainpage-slider-container"
    );

    if (containerElement) {
      setsliderContainer(containerElement);
    }
  }, []);

  return (
    <section
      id="rsus"
      className="h-[calc(100vh-136px)] md:h-[calc(100vh-56px)] w-full z-0 snap-start p-2 md:px-0 "
    >
      <motion.h2
        variants={enterTitleVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        Kegiatan RS Urip Sumoharjo
      </motion.h2>
      <div className=" p-2 md:hidden flex flex-col gap-2 h-[70vh] w-full overflow-y-scroll bg-white scrollbar-thin ">
        {dataArticle.map((article) => {
          if (!sliderContainer) return <div key={article.id}></div>;
          else {
            return (
              <div
                key={article.id}
                className="w-full h-fit
                 border-b border-greyBorder p-2"
              >
                <div className=" h-20 w-full  flex items-center justify-between gap-2">
                  <div className="w-20 h-20 rounded-sm overflow-hidden">
                    <Image
                      rel="preload"
                      placeholder="empty"
                      src={`/images/news/${article.img}.jpg`}
                      alt={article.img}
                      height={100}
                      width={100}
                      className="object-center object-cover h-full w-auto aspect-square "
                      loading="lazy"
                    />
                  </div>
                  <div className="w-full h-full flex flex-col ">
                    <h5 className="h-20 text-left tracking-normal">
                      {article.title}
                    </h5>
                    <p className=" footnote-1">
                      {dayjs(article.date).format("DD MMMM YYYY")}
                    </p>
                  </div>
                </div>
                <p className="body-3 ">{article.text[0].slice(0, 150)}...</p>
                <a
                  href={article.news_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-greenUrip text-center btn-5 w-full border border-greenUrip p-1 hover:text-white hover:bg-greenUrip transition-all cursor-pointer"
                >
                  baca selengkapnya
                </a>
              </div>
            );
          }
        })}
      </div>
      <KegiatanRSUSSlide />
    </section>
  );
};

export default KegiatanRSUS;
