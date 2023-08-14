"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { floatingMenu } from "@/app/(tools)/data/datamenu";
import { FloatingMenuType } from "@/app/(tools)/types";
import "../../styles/mainpage.css";

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className=" h-screen w-full z-0 max-w-[1440px] mx-auto">
      <section
        id="zero"
        className=" h-full  min-h-screen w-full z-0 overflow-hidden flex relative snap-center"
      >
        <FloatingMenu />
        <div className="h-full w-3/12 bg-greyLit relative z-30 ">
          <div className="w-4 h-full bg-accent1 absolute right-0 top-0"></div>
        </div>
        <MainImageAnimated />
      </section>
      <section
        id="one"
        className=" bg-pink-300 h-screen w-full z-0 snap-center "
      >
        <h2> Main Page</h2>
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

export default Loading;

const FloatingMenu = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: "50%", y: "-50%" }}
      animate={{ opacity: 1, x: "0%" }}
      transition={{ type: "spring", stiffness: 60 }}
      className="floating-menu-container"
    >
      <div className="h-1/2s w-full grid grid-cols-2 gap-1 ">
        {floatingMenu.map((item: FloatingMenuType) => {
          return (
            <Link href={item.link} className="floating-link group">
              <div className="h-14 w-auto group-hover:opacity-20 transition-all"></div>
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
    <div className="h-screen w-9/12 bg-accent1 relative z-0 pulsing"></div>
  );
};
