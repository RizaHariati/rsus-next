"use client";
import React from "react";
import MainImageAnimatedLeft from "../../(tools)/components/PageComponents/MainImageAnimatedLeft";
import ConsultationMenu from "@/app/(tools)/components/PageComponents/consultation/ConsultationMenu";

import MainImageSmall from "@/app/(tools)/components/PageComponents/MainImageSmallB";
import MainImageSmallLoadingB from "@/app/(tools)/components/PageComponents/MainImageSmallLoadingB";
import MainImageAnimatedLeftLoading from "@/app/(tools)/components/PageComponents/MainImageAnimatedLeftLoading";
import { PageGreenAccentLoading } from "@/app/(tools)/components/PageGreenAccent";

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className="page-main-container pb-20">
      <section
        id="zero"
        className="h-[calc(100vh-80px)] md:h-full md:min-h-screen  w-full z-0 overflow-hidden flex flex-col md:flex-row relative snap-center md:bg-accent1  bg-white animate-pulse"
      >
        <MainImageSmallLoadingB
          img="consultation-small"
          title="Janji Temu Dokter"
        />
        <ConsultationMenu />
        <MainImageAnimatedLeftLoading img="consultation" />
        <PageGreenAccentLoading />
      </section>
    </div>
  );
};

export default Loading;
