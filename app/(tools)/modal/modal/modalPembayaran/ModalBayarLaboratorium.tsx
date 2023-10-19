import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { LabCartType } from "../../types";
import PaymentMethods from "./PaymentMethods";
import { getMedicalRecord } from "../../data/sample";
import { toast } from "react-toastify";
import { createScheduleDatabase } from "@/sanity/sanityUtils/createScheduleDatabase";

type Props = {};

const ModalBayarLaboratorium = (props: Props) => {
  const {
    closeModal,
    openModal,
    addingSchedule,
    clearLabCart,
    state: { modalValue },
    patientState: { patient },
  } = useGlobalContext();

  const { schedule } = modalValue;
  const handleBayar = () => {
    const promiseLaboratorium = new Promise((resolve) => {
      resolve(
        createScheduleDatabase(patient.medical_record_number, [schedule])
      );
    });
    promiseLaboratorium
      .then((res: any) => {
        const response = addingSchedule(schedule);
        return response;
      })
      .then((res) => {
        openModal("inconstruction", {});
        clearLabCart();
        return res;
      });

    toast.promise(promiseLaboratorium, {
      pending: "Menunggu pembayaran",
      success: `Jadwal test berhasil ditambahkan`,
      error: "Schedule rejected ",
    });
  };
  return (
    <div className="modal-phone md:modal-md ">
      <button className="modal-close-btn" onClick={() => closeModal()}>
        <FontAwesomeIcon icon={faClose} />
      </button>
      <h4 className="modal-title">Pembayaran Test Laboratorium</h4>
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
              handleBayar();
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
