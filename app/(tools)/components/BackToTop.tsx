import { faArrowAltCircleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type Props = {};

const BackToTop = (props: Props) => {
  return (
    <button
      onClick={() => {
        const access = document?.getElementById("zero");
        access?.scrollIntoView({ block: "start", behavior: "smooth" });
      }}
      className=" fixed bottom-20 md:bottom-14 right-2 md:right-5 animate-pulse flex-center-center flex-col z-[60] text-greyMed1"
    >
      <FontAwesomeIcon icon={faArrowAltCircleUp} className="h-10" />
      <p className="hidden md:block btn-2-bold">Top</p>
    </button>
  );
};

export default BackToTop;
