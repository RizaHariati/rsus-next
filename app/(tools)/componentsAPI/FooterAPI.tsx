"use client";
import dayjs from "dayjs";
import React from "react";
import { useGlobalContext } from "../context/AppProvider";

type Props = {};

const FooterAPI = (props: Props) => {
  const {
    showFooter,
    state: { showModal },
  } = useGlobalContext();

  if (showModal) return <div></div>;

  return (
    <div className={showFooter ? "footer " : "footer-hide "}>
      <a
        href="https://www.ichacodes.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white underline"
      >
        by Riza Hariati for Ichacodes copyright &copy;{dayjs().format("YYYY")}
      </a>
      <div className=" bg-pattern z-50 h-12 w-full absolute top-0 bg-[length:100px_100px] mix-blend-multiply opacity-30"></div>
    </div>
  );
};

export default FooterAPI;
