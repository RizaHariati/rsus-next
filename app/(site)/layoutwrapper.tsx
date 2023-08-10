"use client";
import React from "react";
import Navbar from "./NavbarComponents/Navbar";
import PageWrapper from "./pagewrapper";

type Props = {
  children: React.ReactNode;
};

const LayoutWrapper = ({ children }: Props) => {
  return (
    <div>
      <Navbar />
      <PageWrapper>{children}</PageWrapper>
    </div>
  );
};

export default LayoutWrapper;

//  const scrollRef = useRef(null);
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
