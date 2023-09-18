"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { floatingMenu } from "@/app/(tools)/data/datamenu";
import { FloatingMenuType } from "@/app/(tools)/types";
import { enterMiddleVariant } from "@/app/(tools)/framervariants/variants";

import { useGlobalContext } from "@/app/(tools)/context/AppProvider";

const FloatingMenu = () => {
  const { toggleMenuNavbar } = useGlobalContext();
  return (
    <motion.div
      variants={enterMiddleVariant}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="floating-menu-container"
    >
      <div className="h-1/2 w-full grid grid-cols-2 gap-1  ">
        {floatingMenu.map((item: FloatingMenuType) => {
          return (
            <Link
              href={item.link}
              className="floating-link group"
              key={item.title}
              onClick={() => toggleMenuNavbar(null)}
            >
              <Image
                rel="preload"
                placeholder="empty"
                loading="lazy"
                src={`/images/icons/mainpage-icons/${item.image}`}
                height={100}
                width={100}
                alt={item.name}
                className="h-12 md:h-14 w-auto object-center object-cover group-hover:opacity-20 transition-all"
              />
              <p className=" font-nunito uppercase font-normal text-[14px] md:text-[16px] tracking-wide ">
                {item.title}
              </p>
            </Link>
          );
        })}
      </div>
      <div className="h-1/2 w-full flex-center-between flex-col py-2  ">
        <p className="body-3 leading-5 ">
          Selain konsultasi tatap muka, RS Urip Sumoharjo menyediakan pelayanan
          konsultasi Doktor jarak jauh, TeleMedicine awal lewat WhatsApp.
        </p>
        <p className="body-3 leading-5   ">
          Jika data anda valid, admin kami akan mengkonfirmasi pendaftara pada
          jam kerja melalui WhatsApp.
        </p>
        <button className="btn-2 w-full bg-greenUrip hover:bg-greenUripOpacity border border-greenUrip text-white hover:text-greenUrip transition-all mt-2">
          Daftar Telemedicine
        </button>
      </div>
    </motion.div>
  );
};

export default FloatingMenu;
