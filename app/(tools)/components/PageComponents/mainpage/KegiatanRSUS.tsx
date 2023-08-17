"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import { dataArticle } from "@/app/(tools)/data/dataarticle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sliderVariants } from "../../../framervariants/slidervariants";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { enterTitleVariants } from "@/app/(tools)/framervariants/titlevariants";
type Props = {};

const KegiatanRSUS = (props: Props) => {
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
      sliderContainer.scrollLeft = sliderContainer.scrollLeft + width;
    }
  };

  const prevBtn = () => {
    setAmount(1);
    if (!sliderContainer) {
      return;
    } else {
      let width = sliderContainer.clientWidth;
      sliderContainer.scrollLeft = sliderContainer.scrollLeft - width;
    }
  };
  return (
    <section
      id="one"
      className=" bg-white h-fit w-full z-0 snap-center pt-10 pb-5 "
    >
      <motion.h2
        variants={enterTitleVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {" "}
        Kegiatan RS Urip Sumoharjo
      </motion.h2>
      <div className="w-full flex-center-center p-4 px-20">
        <button className="mainpage-slider-btn" onClick={() => prevBtn()}>
          <FontAwesomeIcon icon={faChevronLeft} className="text-xl" />
        </button>
        <div className="mainpage-slider-container">
          <AnimatePresence mode="sync" initial={false}>
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
                      <div className="w-auto h-44 overflow-hidden">
                        <Image
                          src={`/images/news/${article.img}.jpg`}
                          alt={article.img}
                          height={220}
                          width={400}
                          className="object-center object-cover h-full w-full overflow-hidden rounded-sm"
                        />
                      </div>
                      <div className="p-3 flex gap-2 flex-col justify-between h-52">
                        <h5 className="h-16 text-left tracking-normal">
                          {article.title}
                        </h5>
                        <p className=" footnote-1">{article.date}</p>
                        <p className="body-3 ">
                          {article.text[0].slice(0, 120)}...
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
          </AnimatePresence>
        </div>
        <button className="mainpage-slider-btn" onClick={() => nextBtn()}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </section>
  );
};

export default KegiatanRSUS;
