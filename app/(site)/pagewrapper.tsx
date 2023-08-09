"use client";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const PageWrapper = ({ children }: Props) => {
  const path = usePathname();

  return (
    <>
      <AnimatePresence mode="popLayout" key={path}>
        {children}
        {/* <motion.div
        key={path}
        initial={{ opacity: 0, backgroundColor: "pink" }}
        animate={{ opacity: 1, backgroundColor: "red" }}
        exit={{ opacity: 0, backgroundColor: "black" }}
        transition={{ duration: 2 }}
      > */}

        {/* </motion.div> */}
      </AnimatePresence>
    </>
  );
};

export default PageWrapper;
