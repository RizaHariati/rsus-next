"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { enterTitleVariants } from "@/app/(tools)/framervariants/titlevariants";
import Image from "next/image";

import { galleryArray } from "@/app/(tools)/data/galleryArray";
import {
  galleryBottom,
  galleryLeftVariant,
  galleryTop,
} from "@/app/(tools)/framervariants/galleryvariants";

type Props = {};

const SloganGallery = (props: Props) => {
  const [currentGallery, setCurrentGallery] = useState(galleryArray);
  const ref = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const gallery = () => {
        if (window.outerWidth < 450) {
          setCurrentGallery(galleryArray.slice(0, -1));
        } else {
          setCurrentGallery(galleryArray);
        }
      };
      window.addEventListener("resize", gallery);
      return () => window.removeEventListener("resize", gallery);
    }
  }, []);

  return (
    <section
      id="gallery"
      className=" h-screen md:h-fit w-full z-0 snap-center pt-14"
      ref={ref}
    >
      <motion.h2
        variants={enterTitleVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        Hanya untuk anda kami berikan :
      </motion.h2>

      <div className="w-full max-w-5xl mx-auto overflow-hidden py-2 md:py-10 rounded-sm shadow-sm">
        <div className="w-full h-fit grid grid-cols-3 md:grid-cols-5 text-white btn-2-bold overflow-hidden ">
          {currentGallery.map((item) => {
            return (
              <Slogan
                s1={item.s1}
                s2={item.s2}
                accentA={item.accentA}
                accentB={item.accentB}
                img={item.img}
                key={item.id}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SloganGallery;

type SloganProps = {
  s1?: string;
  s2?: string;
  accentA?: string;
  accentB?: string;
  img?: string;
};
const Slogan = ({ s1, s2, img, accentA, accentB }: SloganProps) => {
  if (!s1 && !s2) {
    return <SloganImageBig img={img} />;
  } else {
    return (
      <motion.div className="gallery-base">
        {s1 ? (
          <SloganText accent={accentA} text={s1} />
        ) : (
          <SloganImageAccent img={img} />
        )}
        {s2 ? (
          <SloganText accent={accentB} text={s2} />
        ) : (
          <SloganImageAccent img={img} />
        )}
      </motion.div>
    );
  }
};

const SloganImageBig = ({ img }: SloganProps) => {
  return (
    <motion.div
      className="gallery-base"
      variants={galleryBottom}
      initial="initial"
      whileInView="animate"
    >
      <Image
        rel="preload"
        placeholder="empty"
        loading="lazy"
        src={`/images/mainpage-gallery/${img ? img : "img-gallery (1)"}.jpg`}
        alt="img-gallery"
        height={300}
        width={300}
        className="h-full w-full object-cover object-center"
      />
    </motion.div>
  );
};

const SloganImageAccent = ({ img }: SloganProps) => {
  return (
    <motion.div
      variants={galleryTop}
      initial="initial"
      whileInView="animate"
      className="gallery-cell"
    >
      {img ? (
        <Image
          rel="preload"
          placeholder="empty"
          src={`/images/mainpage-gallery/${img}.jpg`}
          alt="img-gallery"
          loading="lazy"
          height={300}
          width={300}
          className=" h-auto w-full object-center object-cover"
        />
      ) : (
        <div className="accent1"></div>
      )}
    </motion.div>
  );
};
type SloganTextProps = {
  accent?: string;
  text: string;
};

const SloganText = ({ accent, text }: SloganTextProps) => {
  return (
    <motion.p
      variants={galleryLeftVariant}
      initial="initial"
      whileInView="animate"
      className={accent}
    >
      {text}
    </motion.p>
  );
};
