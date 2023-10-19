import Image from "next/image";
import React from "react";

type Props = {};

const MainLogoImageAPI = (props: Props) => {
  return (
    <>
      <Image
        rel="preload"
        placeholder="empty"
        src="/images/navbar/main-logo.png"
        width={50}
        height={50}
        className=" object-covers rounded-full overflow-hidden"
        alt="main-logo"
        loading="lazy"
      />
    </>
  );
};

export default MainLogoImageAPI;
