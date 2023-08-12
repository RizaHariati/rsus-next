"use client";
import React, { useState } from "react";

import Navbar from "../(tools)/components/NavbarComponents/Navbar";

type Props = {
  children: React.ReactNode;
};

const LayoutWrapper = ({ children }: Props) => {
  const [scrollTop, setScrollTop] = useState<boolean>(false);
  return (
    <div
      onScroll={(e) => {
        const top = e.currentTarget.scrollTop;
        if (top > 100) {
          setScrollTop(true);
        } else {
          setScrollTop(false);
        }
      }}
      className="bg-greyLit h-screen overflow-y-scroll scrollbar-none snap-y snap-proximity"
    >
      <Navbar scrollTop={scrollTop} />
      {children}
    </div>
  );
};

export default LayoutWrapper;

//  const scrollRef = useRef(null);s
//  const { scrollYProgress } = useScroll({
//    target: scrollRef,
//    offset: ["1 1", "1 1.1"],
//  });
//  console.log(scrollYProgress);

// <div ref={scrollRef} className="h-screen overflow-y-scroll">
//     <motion.div style={{ scale: scrollYProgress }}>
//       <Navbar />
//     </motion.div>
//     <PageWrapper>{children}</PageWrapper>
//   </div>
