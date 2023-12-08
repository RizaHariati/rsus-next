"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
type Props = {};

const NotFoundPage = (props: Props) => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="h-screen w-full bg-greenUripOpacity flex-center-center flex-col p-5 text-center">
      <h1 className="text-white">Halaman tidak ditemukan </h1>
      <div className="flex-center-center gap-5">
        <h3 className="text-white">Ke halaman utama..</h3>
      </div>
    </main>
  );
};

export default NotFoundPage;
