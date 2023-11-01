"use client";
import React from "react";
import "../../styles/mainpage.css";
import MainImageSmallLoading from "@/app/(tools)/components/PageComponents/mainpage/mainpageSmall/MainImageSmallLoading";
import FloatingMenuLoading from "@/app/(tools)/components/PageComponents/mainpage/FloatingMenuLoading";

type Props = {};

const Loading = (props: Props) => {
  return <div className=" page-main-container "></div>;
};

export default Loading;

const MainImageAnimated = () => {
  return (
    <div className="hidden md:relative h-screen w-9/12 bg-accent1  z-0 animate-pulse"></div>
  );
};
