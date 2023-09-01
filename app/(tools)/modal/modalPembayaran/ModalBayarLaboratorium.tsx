import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { LabCartType } from "../../types";
import PaymentMethods from "./PaymentMethods";
import { getMedicalRecord } from "../../data/sample";

type Props = {};

const ModalBayarLaboratorium = (props: Props) => {
  const {
    closeModal,
    openModal,
    clearLabCart,
    patientState: { patientProfile },
  } = useGlobalContext();

  return (
    <div className="modal-md p-10 py-5 overflow-hidden bg-white">
      <button className="absolute top-2 right-4" onClick={() => closeModal()}>
        <FontAwesomeIcon icon={faClose} />
      </button>
      <h3 className=" col-span-2 font-normal w-full border-b border-greyBorder">
        Pembayaran Test Laboratorium
      </h3>
      <section className="bg-white flex flex-col gap-3 border-none">
        <p className="text-base dark-input">
          Nomor Medical Record :{" "}
          {getMedicalRecord(patientProfile.medical_record_number)}
        </p>
        <p className="text-base dark-input">
          Nama Subject Test : {patientProfile.name}
        </p>

        <LabCartList />
        <PaymentMethods />
        <div className="w-full flex-center-center">
          <button
            onClick={() => {
              clearLabCart();
              openModal("inconstruction", {});
            }}
            className="button-greenUrip w-fit mx-auto px-3"
          >
            Bayar sekarang
          </button>
        </div>
      </section>
    </div>
  );
};

export default ModalBayarLaboratorium;

const LabCartList = () => {
  const { state } = useGlobalContext();
  const labCart: LabCartType[] = state.labCart;
  return (
    <div className="mx-auto w-full">
      <header className="grid grid-cols-6 border-b border-greyBorder py-2 w-full">
        <p>No</p>
        <p className=" col-span-3"> Nama Produk</p>
        <p className=" text-right col-span-2">Harga</p>
      </header>
      <article className="max-h-[173px] custom-scrollbar">
        {labCart.map((item: LabCartType, index) => {
          return (
            <div
              key={item.id}
              className="grid grid-cols-6 border-b border-greyBorder py-2 w-full"
            >
              <p>{index + 1}.</p>
              <p className="text-left col-span-3">{item.title}</p>

              <p className=" text-right col-span-2">
                Rp.{item.price.toLocaleString()}
              </p>
            </div>
          );
        })}
      </article>
    </div>
  );
};
