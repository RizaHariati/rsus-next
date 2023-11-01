"use client";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useGlobalContext } from "../context/AppProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import dataWebImage from "../data/data_web_image.json";
type Props = {};

const Footer = (props: Props) => {
  const {
    showFooter,
    state: { showModal },
  } = useGlobalContext();
  const [showThanks, setShowThanks] = useState(false);
  if (showModal) return <div></div>;

  return (
    <div
      className={showFooter ? "footer overflow-visible hidden" : "footer-hide "}
    >
      <a
        href="https://www.ichacodes.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white underline"
      >
        by Riza Hariati for Ichacodes copyright &copy;{dayjs().format("YYYY")}
      </a>
      <button className="thanks-btn" onClick={() => setShowThanks(!showThanks)}>
        <FontAwesomeIcon
          icon={faThumbsUp}
          className=" mix-blend-screen text-greyBorder"
        />
      </button>
      <div className=" bg-pattern z-50 h-12 w-full absolute top-0 bg-[length:100px_100px] mix-blend-multiply opacity-30"></div>
      <ThankYouSection showThanks={showThanks} />
    </div>
  );
};

export default Footer;

type ThanksProps = {
  showThanks: boolean;
};
const ThankYouSection = ({ showThanks }: ThanksProps) => {
  return (
    <div className={showThanks ? "thanks" : "thanks-hide"}>
      <h2 className="modal-title">IchaCodes berterimakasih pada :</h2>
      <div className=" h-[90%] overscroll-y-auto p-3 w-fit mx-auto">
        {dataWebImage.map((item) => {
          const { id, title, src, website } = item;
          return (
            <div key={id}>
              <a
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className=" text-greyMed1 underline hover:text-greyDrk"
              >
                {title}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};
