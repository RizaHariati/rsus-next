"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/mainpage");
    }, 1500);
  }, []);

  return (
    <main className="h-screen w-full bg-greenUripOpacity flex-center-center flex-col">
      <h1 className=" delay-0">Selamat Datang di Urip Sumoharjo</h1>
      <motion.h1
        className=" font-light text-greenUrip "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Loading...
      </motion.h1>
    </main>
  );
}
