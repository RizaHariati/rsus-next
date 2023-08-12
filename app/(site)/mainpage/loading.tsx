"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { floatingMenu } from "@/app/(tools)/data/datamenu";
import { FloatingMenuType } from "@/app/(tools)/types";
import "../../styles/mainpage.css";

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className=" h-screen w-full z-0 max-w-[1440px] mx-auto">
      <section
        id="zero"
        className=" h-full  min-h-screen w-full z-0 overflow-hidden flex relative snap-center"
      >
        <FloatingMenu />
        <div className="h-full w-3/12 bg-greyLit relative z-30 ">
          <div className="w-4 h-full bg-accent1 absolute right-0 top-0"></div>
        </div>
        <MainImageAnimated />
      </section>
      <section
        id="one"
        className=" bg-pink-300 h-screen w-full z-0 snap-center "
      >
        <h2> Main Page</h2>
      </section>
      <section
        id="two"
        className=" bg-slate-300 h-screen w-full z-0 snap-center"
      >
        <h2> Main Page</h2>
      </section>
    </div>
  );
};

export default Loading;

const FloatingMenu = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: "50%", y: "-50%" }}
      animate={{ opacity: 1, x: "0%" }}
      transition={{ type: "spring", stiffness: 60 }}
      className="floating-menu-container"
    >
      <div className="h-1/2s w-full grid grid-cols-2 gap-1 ">
        {floatingMenu.map((item: FloatingMenuType) => {
          return (
            <Link href={item.link} className="floating-link group">
              <Image
                src={`/images/icons/mainpage-icons/${item.image}`}
                height={100}
                width={100}
                alt={item.name}
                className="h-14 w-auto group-hover:opacity-20 transition-all"
              />
              <p className=" font-nunito uppercase font-normal text-[16px] tracking-wide ">
                {item.title}
              </p>
            </Link>
          );
        })}
      </div>
      <div className="h-1/2 w-full flex-center-between flex-col py-2 ">
        <p className="body-3">
          Selain konsultasi tatap muka, RS Urip Sumoharjo menyediakan pelayanan
          konsultasi Doktor jarak jauh, TeleMedicine awal lewat WhatsApp.
        </p>
        <p className="body-3">
          Jika data anda valid, admin kami akan menghubungi anda pada jam kerja
          baik melalui WhatsApp maupun telpon untuk mengkonfirmasi pendaftaran.
        </p>
        <button className="btn-2 w-full bg-greenUrip hover:bg-greenUripOpacity border border-greenUrip text-white hover:text-greenUrip transition-all">
          Daftar Telemedicine
        </button>
      </div>
    </motion.div>
  );
};

const MainImageAnimated = () => {
  return (
    <div className="h-screen w-9/12 bg-accent1 relative z-0 pulsing">
      <h1>Loading....</h1>
      {/* <Image
        src="/images/pages/main-image-edited-01.jpg"
        alt="mainimage"
        height={1200}
        width={1200}
        className=" object-cover w-full z-10 absolute h-full right-0 top-0"
        priority
      /> */}
    </div>
  );
};

// <PageWrapper>
//     <div className="snap-y snap-mandatory h-screen overflow-y-scroll scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-none">
//       <div
//         id="div1"
//         className=" h-full min-h-screen bg-green-400 relative snap-center"
//       >
//         <motion.div
//           drag
//           className="w-[500px] h-screen bg-purple-300 absolute"
//           variants={anotherVariants}
//           initial="init"
//           animate="visible"
//           exit="exit"
//         >
//           <motion.div
//             variants={containerVariants}
//             className="h-56 w-56 bg-purple-800 absolute z-10 top-1/2 -translate-y-1/2 text-white"
//           >
//             another
//           </motion.div>
//         </motion.div>

//         <motion.h2
//           drag
//           dragConstraints={{ left: -500, right: 500 }}
//           className="pt-14"
//           whileInView={{
//             letterSpacing: "20px",
//           }}
//         >
//           MainPage
//         </motion.h2>
//       </div>
//       <section
//         className=" h-full min-h-screen bg-yellow-200 pt-14 snap-center"
//         id="section1"
//       >
//         <motion.h2 whileInView={{ letterSpacing: "20px" }}>
//           AKSI RS URIP SUMOHARJO
//         </motion.h2>
//       </section>
//       <section
//         className=" h-[50vh] bg-orange-200 pt-14 snap-center"
//         id="section2"
//       >
//         <motion.h2 whileInView={{ letterSpacing: "20px" }}>
//           KUNJUNGI KAMI
//         </motion.h2>
//       </section>
//       <section
//         className=" h-full min-h-screen bg-fushia-200 pt-14 snap-center"
//         id="section3"
//       >
//         <motion.h2 whileInView={{ letterSpacing: "20px" }}>
//           FASILITAS & KLINIK UNGGULAN
//         </motion.h2>
//       </section>
//       <section
//         className=" h-full min-h-screen bg-pink-200 pt-14 snap-center"
//         id="section4"
//       >
//         <motion.h2 whileInView={{ letterSpacing: "20px" }}>
//           HANYA UNTUK ANDA
//         </motion.h2>
//       </section>
//     </div>
//   </PageWrapper>

// const containerVariants = {
//   init: {
//     opacity: 0,
//     x: "100vw",
//   },
//   visible: {
//     opacity: 1,
//     x: "0",
//     transition: { stiffness: 100, duration: 2, type: "spring" },
//   },
// };

// const anotherVariants = {
//   initial: { x: "100px" },
//   visible: {
//     x: "0",
//     transition: { stiffness: 30, duration: 1, type: "spring" },
//   },
//   exit: {
//     x: "-500px",
//     transition: { stiffness: 350, duration: 3, type: "spring" },
//   },
// };
