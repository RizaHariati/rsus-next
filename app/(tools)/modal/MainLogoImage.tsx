import Image from "next/image";
import React from "react";

type Props = {};

const MainLogoImage = (props: Props) => {
  return (
    <>
      <Image
        rel="preload"
        placeholder="empty"
        src="/images/navbar/main-logo.png?w=64&q=75"
        width={50}
        height={50}
        className=" object-covers rounded-full overflow-hidden"
        alt="main-logo"
        loading="lazy"
      />
    </>
  );
};

export default MainLogoImage;
