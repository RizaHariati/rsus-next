"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";

import { enterOpacity } from "@/app/(tools)/framervariants/variants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

type Props = {
  showModal: boolean;
  closeModal: () => void;
  dataList: any[];
  list: any[];
  addRemoveListItem: (itemList: string) => void;
};
const DescriptionModal = ({
  showModal,
  closeModal,
  dataList,
  list,
  addRemoveListItem,
}: Props) => {
  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          variants={enterOpacity}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-screen h-screen bg-black  bg-opacity-50 overflow-hidden fixed top-0 left-0 z-[50] p-3  md:p-0"
        >
          <ModalContent
            showModal={showModal}
            closeModal={closeModal}
            dataList={dataList}
            list={list}
            addRemoveListItem={addRemoveListItem}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DescriptionModal;

const ModalContent = ({
  showModal,
  closeModal,
  dataList,
  list,
  addRemoveListItem,
}: Props) => {
  return (
    <div className="modal-phone md:modal-lg">
      <button className="modal-close-btn" onClick={() => closeModal()}>
        <FontAwesomeIcon icon={faClose} />
      </button>
      <h3 className="modal-title">Daftar Item Tambahan</h3>
      <div className="w-full  grid grid-cols-1 md:grid-cols-3 gap-3 md:max-h-80 md:custom-scrollbar bgp">
        {dataList.map((itemData, index) => {
          const findItem = list.find(
            (item) => item.toLowerCase() === itemData.title.toLowerCase()
          );

          return (
            <button
              type="button"
              onClick={() => addRemoveListItem(itemData.title)}
              key={index}
              className={
                findItem
                  ? "modal-description-btn-selected"
                  : "modal-description-btn"
              }
            >
              {itemData.title}
            </button>
          );
        })}
      </div>
      <div className=" w-full flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          className="button-greenUrip"
          onClick={() => {
            closeModal();
          }}
        >
          Tutup
        </button>
      </div>
    </div>
  );
};
