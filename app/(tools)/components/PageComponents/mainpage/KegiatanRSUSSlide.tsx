"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import dataArticle from "@/app/(tools)/data/data_article.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sliderVariants } from "../../../framervariants/slidervariants";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";

type Props = {};

const KegiatanRSUSSlide = (props: Props) => {
  const [sliderContainer, setsliderContainer] = useState<Element | null>(null);
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    let containerElement = document?.querySelector(
      ".mainpage-slider-container"
    );

    if (containerElement) {
      setsliderContainer(containerElement);
    }
  }, []);

  const nextBtn = () => {
    setAmount(-1);
    if (!sliderContainer) {
      return;
    } else {
      let width = sliderContainer.clientWidth;
      sliderContainer.scrollLeft = sliderContainer.scrollLeft + width / 2;
    }
  };

  const prevBtn = () => {
    setAmount(1);
    if (!sliderContainer) {
      return;
    } else {
      let width = sliderContainer.clientWidth;
      sliderContainer.scrollLeft = sliderContainer.scrollLeft - width / 2;
    }
  };
  return (
    <div className="hidden w-full md:flex-center-center p-4 px-20 bg-white">
      <button className="mainpage-slider-btn" onClick={() => prevBtn()}>
        <FontAwesomeIcon icon={faChevronLeft} className="text-xl" />
      </button>
      <div className="mainpage-slider-container">
        {dataArticle
          // .filter((data) => data.category === "aksi")
          // .slice(0, 3)
          .map((article) => {
            if (!sliderContainer) return <div key={article.id}></div>;
            else {
              return (
                <motion.div
                  variants={sliderVariants}
                  initial="initial"
                  whileInView="animate"
                  exit="exit"
                  custom={amount}
                  key={article.id}
                  className=" w-[280px] rounded-sm standard-border flex-shrink-0"
                >
                  <div className="w-auto h-48 overflow-hidden">
                    <Image
                      rel="preload"
                      placeholder="empty"
                      src={`/images/news/${article.img}.jpg`}
                      alt={article.img}
                      height={220}
                      width={400}
                      className="object-center object-cover h-full w-full overflow-hidden rounded-sm"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-3 flex gap-2 flex-col justify-between h-60">
                    <h5 className="h-20 text-left tracking-normal">
                      {article.title}
                    </h5>

                    <p className=" footnote-1">
                      {dayjs(article.date).format("DD MMMM YYYY")}
                    </p>
                    <p className="body-3 ">
                      {article.text[0].slice(0, 150)}...
                    </p>
                    <a
                      href={article.news_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-greenUrip text-center btn-5 w-full border border-greenUrip p-1 hover:text-white hover:bg-greenUrip transition-all cursor-pointer"
                    >
                      baca selengkapnya
                    </a>
                  </div>
                </motion.div>
              );
            }
          })}
      </div>
      <button className="mainpage-slider-btn" onClick={() => nextBtn()}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default KegiatanRSUSSlide;
