"use client";
import React from "react";
import MainImageAnimatedLeft from "../../(tools)/components/PageComponents/MainImageAnimatedLeft";
import ConsultationMenu from "@/app/(tools)/components/PageComponents/consultation/ConsultationMenu";

import MainImageSmall from "@/app/(tools)/components/PageComponents/MainImageSmallB";
import PageGreenAccent from "@/app/(tools)/components/PageGreenAccent";

type Props = {};

const Consultation = (props: Props) => {
  return (
    <div className="page-main-container pb-20">
      <section
        id="consultation-top"
        className="h-[calc(100vh-80px)] md:h-full md:min-h-screen  w-full z-0 overflow-hidden flex flex-col md:flex-row relative snap-center md:bg-accent1  bg-white"
      >
        <MainImageSmall img="consultation-small" title="Janji Temu Dokter" />
        <ConsultationMenu />
        <MainImageAnimatedLeft img="consultation" />
        <PageGreenAccent />
      </section>
    </div>
  );
};

export default Consultation;
