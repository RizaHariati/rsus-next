"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/mainpage");
    }, 50);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="h-screen w-full bg-greenUripOpacity flex-center-center flex-col">
      <h1>Selamat Datang di Urip Sumoharjo</h1>
    </main>
  );
}
