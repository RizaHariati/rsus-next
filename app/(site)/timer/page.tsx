"use client";
import dayjs from "dayjs";
import React, { AudioHTMLAttributes, useEffect, useRef, useState } from "react";
import success from "../../../public/images/success.mp3";
// import useSound from "use-sound"
type Props = {};

const Timer = (props: Props) => {
  const [timer, setTimer] = useState<Date>(
    dayjs().startOf("d").subtract(0, "h").toDate()
  );
  const [start, setStart] = useState(false);
  const [changePose, setChangePose] = useState("Start Pose");

  useEffect(() => {
    const interval = setInterval(() => {
      if (start) {
        setTimer(dayjs(timer).add(1, "s").toDate());
      }
    }, 1000);
    if (parseInt(dayjs(timer).format("ss")) % 15 === 0) {
      setChangePose("Change to Next Pose");
      const audio = new Audio("/sounds/success.mp3");
      audio.play();
    }
    if (parseInt(dayjs(timer).format("ss")) % 15 === 4) {
      setChangePose("");
    }
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="page-main-container flex-center-center flex-col">
      <h1 className=" w-full text-center ">
        {dayjs(timer).format("HH:mm:ss")}
      </h1>
      <div className="flex-center-center gap-5">
        <button
          className=" button-greenUrip"
          onClick={() => {
            setTimer(dayjs().startOf("d").subtract(0, "h").toDate());
          }}
        >
          clear
        </button>
        <button
          className="button-greenUrip"
          onClick={() => {
            setStart(!start);
            setTimer(dayjs().startOf("d").subtract(0, "h").toDate());
            setChangePose("Well done!");
          }}
        >
          {start ? "stop" : "start"}
        </button>
      </div>
      <audio id="timerAudio" src="./success.mp3"></audio>
      {changePose && <h1>{changePose}</h1>}
    </div>
  );
};

export default Timer;
