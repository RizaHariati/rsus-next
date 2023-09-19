import React from "react";

type Props = {};

const PageGreenAccent = (props: Props) => {
  return (
    <div className="hidden md:block h-screen w-3/12 bg-greenUrip relative z-10  overflow-hidden">
      <div
        className="absolute h-full w-full top-0 left-4 z-10 bg-[length:200px_200px]
          bg-pattern  mix-blend-multiply opacity-30"
      ></div>
      <div className="w-4 h-full bg-accent1 absolute left-0 top-0"></div>
    </div>
  );
};

export default PageGreenAccent;
