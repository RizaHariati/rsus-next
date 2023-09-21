import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import MainLogoImage from "../modal/MainLogoImage";

type Props = {};
const AlertNotLogin = (props: Props) => {
  const {
    patientState: { user },
    closeAlert,
    closeModal,
    toggleMenuNavbar,
  } = useGlobalContext();

  return (
    <div className="modal-phone md:modal-md  overflow-hidden bg-white">
      <button className="absolute top-2 right-4" onClick={() => closeAlert()}>
        <FontAwesomeIcon icon={faClose} />
      </button>
      <section className="bg-white border-none flex-center-center flex-col gap-5">
        <MainLogoImage />
        <p className="body-2 text-center">
          Anda belum login, silahkan login terlebih dahulu
        </p>
        <div className="w-full flex-center-center gap-2">
          <button
            onClick={() => {
              closeAlert();
            }}
            className="button-greenUrip w-full"
          >
            Batal
          </button>
          <button
            onClick={() => {
              closeAlert();
              closeModal();
              if (!user.login) {
                toggleMenuNavbar("login");
              }
            }}
            className="button-greenUrip w-full"
          >
            Login Dulu
          </button>
        </div>
      </section>
    </div>
  );
};

export default AlertNotLogin;
