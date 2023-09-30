import React from "react";

import { PageGreenAccentLoading } from "@/app/(tools)/components/PageGreenAccent";
import MainImageSmallLoadingB from "@/app/(tools)/components/PageComponents/MainImageSmallLoadingB";
import MainImageAnimatedLeftLoading from "@/app/(tools)/components/PageComponents/MainImageAnimatedLeftLoading";

type Props = {};

const unit = {
  img: "facility",
  title: "FACILITY",
  description:
    "RS Urip Sumoharjo berusaha untuk terus meningkatkan  fasilitas dan mutu layanan kami dengan melengkapi tenaga medis yang profesional dan perlengkapan penunjang medis yang mengikuti perkembangan teknologi yang semakin maju dan canggih.",
};

const Loading = (props: Props) => {
  return (
    <div className="page-main-container ">
      <section
        id="facility-top"
        className=" h-[calc(100vh-32px)] md:h-full md:min-h-screen w-full z-0 overflow-hidden flex flex-col md:flex-row relative  md:bg-accent1 bg-white snap-none  md:snap-center pb-2 animate-pulse"
      >
        <MainImageSmallLoadingB img={unit.img} title={unit.title} />
        <MainImageAnimatedLeftLoading
          img={unit.img}
          title={unit.title}
          description={unit.description}
        />
        <PageGreenAccentLoading />

        <p className="h-1/4 p-2 text-center leading-normal md:hidden">
          {unit.description}
        </p>
      </section>
    </div>
  );
};
export default Loading;
