"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {};

function WelcomeAPIPage(props: Props) {
  return (
    <main className="h-screen w-full bg-greenUripOpacity flex-center-center flex-col p-5 text-center">
      <h1>Selamat Datang di API RS.Urip Sumoharjo</h1>
    </main>
  );
}

export default WelcomeAPIPage;
