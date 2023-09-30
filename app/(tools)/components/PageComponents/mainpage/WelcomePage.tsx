"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {};

function WelcomePage(props: Props) {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/mainpage");
    }, 50);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="h-screen w-full bg-greenUripOpacity flex-center-center flex-col p-5 text-center">
      <h1>Selamat Datang di Urip Sumoharjo</h1>
    </main>
  );
}

export default WelcomePage;
