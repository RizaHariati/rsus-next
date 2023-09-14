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
    patientState: { patient },
  } = useGlobalContext();

  return (
    <div className="modal-md p-10 py-5 overflow-hidden bg-white">
      <button className="absolute top-2 right-4" onClick={() => closeModal()}>
        <FontAwesomeIcon icon={faClose} />
      </button>
      <h4 className=" col-span-2 font-normal w-full border-b border-greyBorder mb-2">
        Pembayaran Test Laboratorium
      </h4>
      <section className="bg-white flex flex-col gap-2 border-none">
        <p className="text-base dark-input h-8 pt-1">
          Nomor Medical Record :{" "}
          {getMedicalRecord(patient.medical_record_number)}
        </p>
        <p className="text-base dark-input h-8 pt-1">
          Nama Subject Test : {patient.patient_profile.name}
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
  let total = 0;
  return (
    <div className="mx-auto w-full">
      <header className="grid grid-cols-6 border-b border-greyBorder py-2 w-full">
        <p>No</p>
        <p className=" col-span-3"> Nama Produk</p>
        <p className=" text-right col-span-2">Harga</p>
      </header>
      <article className="max-h-[173px] custom-scrollbar">
        {labCart.map((item: LabCartType, index) => {
          total = total + item.price;
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
      <header className="grid grid-cols-6 border-t border-greyBorder py-2 w-full pr-2">
        <p className="text-left col-span-4">total</p>
        <p className=" text-right col-span-2">Rp.{total.toLocaleString()}</p>
      </header>
    </div>
  );
};
