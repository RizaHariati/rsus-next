"use client";
import React from "react";

type Props = {
  img: string;
  title?: string;
  description?: string;
};

const MainImageSmallLoadingB = ({ img, title, description }: Props) => {
  return (
    <div className="md:hidden h-1/2 w-full bg-greenUrip relative z-10 rounded-b-lg overflow-hidden">
      <div
        className="absolute h-full w-full top-0 left-0 z-10 bg-[length:100px_100px]
          bg-pattern mix-blend-multiply opacity-30"
      ></div>

      <div
        key="image"
        className="w-full h-full overflow-hidden absolute right-0 z-20 rounded-b-lg"
      >
        <div className=" mix-blend-multiply  bg-gradient-to-b from-stone-400 via-white to-zinc-400 bg-stone-800 absolute top-0 left-0 z-20 w-full h-full animate-pulse "></div>
      </div>
      {description && (
        <h1
          key="small-image-title"
          className="z-40 text-white text-center w-full left-0 bottom-1/3 leading-6 tracking-[5px] absolute  font-light uppercase  animate-pulse"
        >
          {title}
        </h1>
      )}
      {!description && (
        <h1
          key="small-image-title"
          className="z-30 text-white text-center w-full left-0 bottom-7 leading-6 tracking-[5px] absolute  font-light uppercase  animate-pulse"
        >
          {title}
        </h1>
      )}
      {description && (
        <p
          key="small-image-description"
          className="z-30 text-white text-center w-full left-0 bottom-3 absolute leading-5  font-light p-3 "
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default MainImageSmallLoadingB;
