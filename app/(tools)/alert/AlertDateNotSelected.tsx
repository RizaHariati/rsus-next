import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import MainLogoImage from "../modal/MainLogoImage";
import dayjs from "dayjs";

type Props = {};
const AlertDateNotSelected = (props: Props) => {
  const {
    state: { selected_date },
    patientState: { user },
    closeAlert,

    openModal,
    toggleMenuNavbar,
    setDate,
  } = useGlobalContext();
  const handleSelectingDate = () => {
    const randomNumber = Math.floor(Math.random() * 6 + 1);
    const promiseDate = new Promise((resolve) => {
      closeAlert();
      resolve(openModal("keranjang", {}));
      setDate(dayjs().add(randomNumber, "d").toDate());
    });
    promiseDate;
  };

  return (
    <div className="modal-phone md:modal-md  overflow-hidden bg-white">
      <button className="absolute top-2 right-4" onClick={() => closeAlert()}>
        <FontAwesomeIcon icon={faClose} />
      </button>
      <section className="bg-white border-none flex-center-center flex-col gap-5">
        <MainLogoImage />
        <p className="body-2 text-center">
          Anda belum memilih tanggal, silahkan memilih, atau kami akan
          memilihkan tanggal untuk anda dalam 7 hari ke depan
        </p>
        <div className="w-full flex-center-center gap-2">
          <button
            onClick={() => {
              closeAlert();
              openModal("keranjang", {});
            }}
            className="button-greenUrip w-full text-sm md:text-base"
          >
            Pilih sendiri
          </button>
          <button
            onClick={() => {
              handleSelectingDate();
            }}
            className="button-greenUrip w-full text-sm md:text-base"
          >
            Pilihkan
          </button>
        </div>
      </section>
    </div>
  );
};

export default AlertDateNotSelected;
