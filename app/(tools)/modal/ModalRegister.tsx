import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { ConsultationMenuTypes } from "../types";

import { patientFormInput } from "../utils/forms/patientFormInput";

type Props = {};

const ModalRegister = (props: Props) => {
  const {
    state: { modalValue },
    patientState: { patientProfile },
    closeModal,
  } = useGlobalContext();
  const consultationInfo: ConsultationMenuTypes = modalValue;

  return (
    <div className="modal-lg p-5 px-10 overflow-hidden bg-white">
      <h3 className=" col-span-2  w-full border-b border-greyBorder  font-light mb-4 bg-white">
        {consultationInfo.title}
      </h3>
      <button className="absolute top-2 right-4" onClick={() => closeModal()}>
        <FontAwesomeIcon icon={faClose} />
      </button>
      <article>
        {consultationInfo.intro.map((item: string, index: number) => {
          return (
            <p className="body-3" key={index}>
              {item}
            </p>
          );
        })}
      </article>
      <form>
        <InputTanggalDaftar />
        <article className="grid grid-cols-4 gap-2 pt-2">
          {Object.entries(patientFormInput)
            .filter(([key, _]) => key !== "register_date")
            .map(([_, values]) => {
              return (
                <div
                  key={values.id}
                  id={values.id}
                  className={
                    values.col_width
                      ? "col-span-2 sub-form group"
                      : "col-span-1 sub-form group"
                  }
                >
                  <p>{values.title}</p>
                  <input
                    placeholder={values.placeholder}
                    className="active-input"
                  />
                  <div className="active-input absolute -top-5 left-5 hidden group-hover:block group:hidden group-active:hidden">
                    contoh
                  </div>
                </div>
              );
            })}
        </article>
        <article className=" w-full flex items-center justify-end gap-3 pt-5 ">
          <button className="button-greenUrip">Hapus</button>
          <button
            className="button-greenUrip"
            onClick={() => {
              closeModal();
            }}
          >
            Daftarkan
          </button>
        </article>
      </form>
    </div>
  );
};

export default ModalRegister;

const InputTanggalDaftar = () => {
  const {
    patientState: { patientProfile },
  } = useGlobalContext();
  return (
    <article className="w-1/2 flex flex-col h-16">
      <p className="btn-3-bold">Register Date</p>
      <div className="standard-border">
        <p className="btn-3 p-2">{patientProfile.register_date}</p>
      </div>
    </article>
  );
};
