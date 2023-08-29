import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { LabItemType, PaketLabType } from "../types";

type Props = {};
const AlertLabLogin = (props: Props) => {
  const {
    state: { modalValue },
    closeAlert,
    openModal,
    toggleCart,
  } = useGlobalContext();

  const labItem: LabItemType = modalValue.labItem;

  return (
    <div className="modal-md p-5 px-10 overflow-hidden bg-white">
      <button className="absolute top-2 right-4" onClick={() => closeAlert()}>
        <FontAwesomeIcon icon={faClose} />
      </button>
      <section className="bg-white border-none flex-center-center flex-col gap-5">
        <p className="body-2 text-center">
          Anda belum login, apakah Anda ingin melanjutkan sebagai tamu atau
          login dulu?
        </p>
        <div className="w-full flex-center-center gap-2">
          <button
            onClick={() => {
              closeAlert();
              toggleCart(labItem);
              openModal("keranjang", {});
            }}
            className="button-greenUrip w-full"
          >
            Sebagai Tamu
          </button>
          <button
            onClick={() => {
              closeAlert();
            }}
            className="button-greenUrip w-full"
          >
            {" "}
            Login Dulu
          </button>
        </div>
      </section>
    </div>
  );
};

export default AlertLabLogin;
