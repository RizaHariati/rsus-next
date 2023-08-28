import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
type Props = {};

const ModalLabCarts = (props: Props) => {
  const {
    state: { modalValue },
    closeModal,
    openModal,
  } = useGlobalContext();
  return (
    <div className="modal-lg p-5 px-10">
      <h3 className=" col-span-2 font-normal w-full border-b border-greyBorder">
        Pilihan Lab Anda
      </h3>
      <button className="absolute top-2 right-4" onClick={() => closeModal()}>
        <FontAwesomeIcon icon={faClose} />
      </button>
    </div>
  );
};

export default ModalLabCarts;
