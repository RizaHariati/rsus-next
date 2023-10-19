import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type Props = {};

const Keranjang = (props: Props) => {
  const { openModal } = useGlobalContext();
  return (
    <button
      onClick={() => {
        openModal("keranjang", {});
      }}
      className=" fixed top-14 top16 md:top-16 right-3 md:right-10 animate-pulse flex-center-center  gap-2 z-50 text-greenUrip standard-border p-2"
    >
      <FontAwesomeIcon icon={faCartShopping} className="h-5" />
      <p className="hidden md:block btn-2-bold">Lihat keranjang</p>
    </button>
  );
};

export default Keranjang;
