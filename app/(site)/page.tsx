// "use client";
import { getDoctors } from "@/sanity/sanityUtils/getDoctors";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default async function Home() {
  const data = await getDoctors();
  console.log({ data });
  // const router = useRouter();
  // useEffect(() => {
  //   setTimeout(() => {
  //     router.push("/mainpage");
  //   }, 50);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <main className="h-screen w-full bg-greenUripOpacity flex-center-center flex-col p-5 text-center">
      <h1>Selamat Datang di Urip Sumoharjo</h1>
    </main>
  );
}
