import Image from "next/image";
import React from "react";

type Props = {};

const MainLogoImage = (props: Props) => {
  return (
    <>
      <Image
        rel="preload"
        placeholder="empty"
        src="/static/images/navbar/main-logo.png?"
        width={50}
        height={50}
        className=" h-7 w-7 md:h-8 md:w-8 object-covers rounded-full overflow-hidden"
        alt="main-logo"
        loading="lazy"
      />
    </>
  );
};

export default MainLogoImage;
