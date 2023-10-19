import Image from "next/image";
import React from "react";
import dataBed from "@/app/(tools)/data/data_inap.json";
import { InpatientType } from "@/app/(tools)/types";

import { useGlobalContext } from "@/app/(tools)/context/AppProvider";

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className="page-main-container ">
      <section className="h-1/2 md:h-2/3 w-full overflow-hidden relative rounded-b-lg md:rounded-b-none ">
        <div
          key="background"
          className=" bg-stone-500 bg-opacity-70 mix-blend-multiply w-full absolute h-full right-0 top-0 z-10 animate-pulse"
        ></div>
        <div
          key="main-image"
          className="absolute w-full h-full right-0 z-0 object-cover"
        ></div>
        <h1
          key="title"
          className="absolute z-20 bottom-8 md:top-2/3 right-0 md:right-16 text-white text-center md:text-right font-regular md:text-[40px] md:tracking-[15px] w-full md:w-1/2 drop-shadow-md shadow-black animate-pulse"
        >
          Fasilitas Rawat Inap
        </h1>
      </section>

      <section
        id="one"
        className=" bg-greyLit h-fit w-full z-0 pt-5 md:pt-14  mx-auto pb-[150px] px-2"
      >
        <h4>
          Jam besuk : Pagi Pukul 11.00 - 12.00 Wib || Sore Pukul 17.00 - 18.00
          Wib
        </h4>
        <p className=" w-full md:max-w-4xl body-2 text-greyDrk text-center  font-light z-20 mx-auto">
          Untuk pendaftaran rawat inap dan pemesanan kamar silahkan menghubungi
          <span> 0811 x270 x37</span>
        </p>

        <ImageGallery />
      </section>
    </div>
  );
};

export default Loading;

const ImageGallery = () => {
  return (
    <div className="w-full max-w-6xl grid grid-cols-4 mx-auto  mt-4 gap-2 p-0 md:p-5">
      {dataBed.map((item: InpatientType, index) => {
        return (
          <div
            id={item.kelas}
            key={index}
            className=" col-span-2 md:col-span-1 standard-border cursor-pointer opacity-100 relative  hover:opacity-70 h-52 overflow-hidden z-0 animate-pulse"
          >
            <div className="w-full h-32 overflow-hidden"></div>

            <div className="w-8 h-8 rounded-full overflow-hidden absolute z-10 top-2 left-2">
              <Image
                src={`/images/navbar/main-logo.png`}
                alt="main-logo"
                width={40}
                height={40}
                loading="lazy"
                className="object-center object-cover h-full w-full "
              />
            </div>
            <div className="p-2 w-full ">
              <h5 className="font-normal">{item.kelas}</h5>

              <p className="border rounded-sm w-fit p-1 px-2 mx-auto md:ml-auto">
                Rp. {item.harga}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
