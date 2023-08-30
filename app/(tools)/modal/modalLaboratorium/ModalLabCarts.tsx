import React, { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { LabCartType } from "../../types";
import { toast } from "react-toastify";

type Props = {};

const ModalLabCarts = (props: Props) => {
  const {
    state,
    closeModal,
    clearLabCart,
    openModal,
    state: { modalTitle },
  } = useGlobalContext();
  const labCart: LabCartType[] = state.labCart;

  return (
    <div className="modal-lg p-5 px-10 h-fit min-h-[300px] flex-center-between flex-col">
      <h3 className=" col-span-2 font-normal w-full border-b border-greyBorder">
        Pilihan Test Laboratorium
      </h3>
      <button className="absolute top-2 right-4" onClick={() => closeModal()}>
        <FontAwesomeIcon icon={faClose} />
      </button>
      <div className="w-full h-full my-auto">
        {labCart.length < 1 && (
          <div>
            <h2>Daftar Anda kosong</h2>
          </div>
        )}
        {labCart.length > 0 && (
          <div>
            <header className="grid grid-cols-12 border-b border-greyBorder py-2">
              <p>No</p>
              <p className=" col-span-3 text-left"> Nama Produk</p>
              <p className=" col-span-6"> Keterangan</p>
              <p className=" text-right col-span-2">Harga</p>
            </header>
            <article className="max-h-[400px] custom-scrollbar">
              {labCart.map((item: LabCartType, index) => {
                return (
                  <div
                    key={item.id}
                    className="grid grid-cols-12 border-b border-greyBorder py-2 "
                  >
                    <p>{index + 1}.</p>
                    <p className="text-left col-span-3">{item.title}</p>
                    <div className=" col-span-6  max-h-32  pb-3 overflow-y-scroll scrollbar-none">
                      {item.description.map((desItem, desIndex: number) => {
                        return <p key={desIndex}>{desItem}</p>;
                      })}
                    </div>
                    <p className=" text-right col-span-2">
                      Rp.{item.price.toLocaleString()}
                    </p>
                  </div>
                );
              })}
            </article>
          </div>
        )}
      </div>
      <div className="flex items-center justify-end w-full gap-3 mt-2  ">
        <button
          onClick={() => {
            clearLabCart();
            toast("Seluruh daftar sudah dihapus");
            closeModal();
          }}
          className="button-greenUrip w-fit px-3"
        >
          Hapus Daftar
        </button>
        <button
          disabled={labCart.length > 0 ? false : true}
          onClick={() => {
            if (labCart.length > 0) {
              openModal("bayarlab", {});
            }
          }}
          className={labCart.length > 0 ? "button-greenUrip" : "button-grey"}
        >
          Bayar
        </button>
      </div>
    </div>
  );
};

export default ModalLabCarts;
