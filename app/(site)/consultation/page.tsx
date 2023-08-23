"use client";
import React from "react";
import MainImageAnimatedLeft from "../../(tools)/components/PageComponents/MainImageAnimatedLeft";
import ConsultationMenu from "@/app/(tools)/components/PageComponents/consultation/ConsultationMenu";

type Props = {};

const Consultation = (props: Props) => {
  return (
    <div className="page-main-container">
      <section
        id="zero"
        className=" h-full  min-h-screen w-full z-0 overflow-hidden flex relative snap-center bg-accent1"
      >
        <ConsultationMenu />
        <MainImageAnimatedLeft img="consultation" />
        <div className="h-full w-3/12 bg-greenUrip relative z-10  overflow-hidden">
          <div
            className="absolute h-full w-full top-0 left-4 z-10 bg-[length:200px_200px]
          bg-pattern mix-blend-multiply opacity-30"
          ></div>
          <div className="w-4 h-full bg-accent1 absolute left-0 top-0"></div>
        </div>
      </section>
    </div>
  );
};

export default Consultation;
