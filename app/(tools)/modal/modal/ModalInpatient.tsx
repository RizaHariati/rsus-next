"use client";
import Image from "next/image";
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faClose,
  faPeopleGroup,
  faPerson,
  faRupiahSign,
  faXmarkSquare,
} from "@fortawesome/free-solid-svg-icons";

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";

import Slider, { Settings } from "react-slick";

type Props = {};

const ModalInpatient = (props: Props) => {
  const {
    state: { modalValue },
    closeModal,
  } = useGlobalContext();
  const ImgArray: string[] = modalValue["img-array"];
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <div className="modal-phone md:modal-lg ">
      <h3 className="modal-title">{modalValue.kelas}</h3>
      <button className="modal-close-btn" onClick={() => closeModal()}>
        <FontAwesomeIcon icon={faClose} />
      </button>
      <div className="w-full  grid grid-cols-1 md:grid-cols-2 gap-2 ">
        <Slider {...settings}>
          {ImgArray.map((imgItem, index) => {
            return <ImageSlide imgItem={imgItem} index={index} key={index} />;
          })}
        </Slider>
        <Info modalValue={modalValue} />
      </div>
    </div>
  );
};

export default ModalInpatient;

type itemProps = {
  item: number | string;
  icon: IconDefinition;
  text: string;
};
const InpatientItems = ({ item, icon, text }: itemProps) => {
  return (
    <div className="flex-center-left gap-2 text-greenUrip leading-5 ">
      <div className="w-6">
        <FontAwesomeIcon icon={icon} className="w-5 " />
      </div>
      <p className="btn-5 font-medium">
        {text} : {item}
      </p>
    </div>
  );
};

type ImageProps = {
  imgItem: string;
  index: number;
};
const ImageSlide = ({ imgItem, index }: ImageProps) => {
  return (
    <div className="h-fit md:h-[350px] w-full rounded-sm overflow-hidden z-0 relative">
      <Image
        rel="preload"
        placeholder="empty"
        src={`/images/inpatient/big/${imgItem}`}
        alt={imgItem.slice(0, -4)}
        width={500}
        height={350}
        loading="lazy"
        className="w-full h-auto object-center object-cover"
      />
    </div>
  );
};

type InfoProps = {
  modalValue: any;
};

const Info = ({ modalValue }: InfoProps) => {
  return (
    <div className="p-3">
      <InpatientItems
        item={modalValue.pasien}
        icon={faPeopleGroup}
        text="Jumlah pasien per ruangan "
      />
      <InpatientItems
        item={modalValue.harga}
        icon={faRupiahSign}
        text="Harga kamar/malam  "
      />
      <InpatientItems
        item=""
        icon={faXmarkSquare}
        text="tidak termasuk biaya pengobatan / pemeriksaan"
      />
      <InpatientItems item="" icon={faPerson} text="fasilitas " />
      <ul className=" grid grid-cols-1 md:grid-cols-2 pl-7">
        {modalValue.fasilitas.map((item: string, index: number) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
      <div>
        <p className="text-sm text-redBase px-0 pr-7  md:px-5 w-full text-right">
          Harga dapat berubah sewaktu-waktu, mohon cek terlebih dahulu ke RS
          Urip Sumoharjo di nomor 0811 x270 x37
        </p>
      </div>
    </div>
  );
};

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button onClick={() => onClick()} className="modal-slider-btn right-2">
      <FontAwesomeIcon icon={faChevronRight} />
    </button>
  );
};

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button onClick={() => onClick()} className="modal-slider-btn left-2">
      <FontAwesomeIcon icon={faChevronLeft} />
    </button>
  );
};
