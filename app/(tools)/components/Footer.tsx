import dayjs from "dayjs";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="hidden md:flex-center-center  absolute h-12 bg-greenUrip w-full z-40 -bottom-32 snap-end">
      <p className="text-white">
        by Riza Hariati for Ichacodes copyright &copy;{dayjs().format("YYYY")}
      </p>
      <div className=" bg-pattern z-50 h-12 w-full absolute top-0 bg-[length:100px_100px] mix-blend-multiply opacity-30"></div>
    </div>
  );
};

export default Footer;
