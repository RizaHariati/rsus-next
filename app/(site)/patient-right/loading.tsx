"use client";
import React, { useState } from "react";

type Props = {};

const Loading = (props: Props) => {
  const [selected, setSelected] = useState<number | null>(null);
  const toggle = (id: number) => {
    if (selected === id) {
      return setSelected(null);
    } else {
      setSelected(id);
    }
  };
  return (
    <div className="page-main-container pt-14 custom-scrollbar scrollbar-none pb-[150px] animate-pulse">
      <h2>Loading...</h2>
    </div>
  );
};

export default Loading;
