import React from "react";
import { useGlobalContext } from "../context/AppProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

type Props = {};

const ModalFacility = (props: Props) => {
  const {
    state: { modalValue },
    closeModal,
  } = useGlobalContext();
  return (
    <div className="modal-lg p-5">
      <h3 className=" col-span-2 font-normal mb-2 ">{modalValue.title}</h3>
      <button className="absolute top-2 right-4" onClick={() => closeModal()}>
        <FontAwesomeIcon icon={faClose} />
      </button>
      <div className="grid grid-cols-2 w-full gap-5 ">
        <div className="w-full body-3 flex flex-col gap-5 leading-5">
          <div>
            <p className="btn-3-bold">Deskripsi Alat</p>
            <p>{modalValue.description}</p>
          </div>
          <div>
            <p className="btn-3-bold">Kegunaan Alat</p>
            <p>{modalValue.function}</p>
          </div>
          <div>
            <p className="btn-3-bold">Dipakai oleh: </p>
            <ul className=" grid grid-cols-2 list-disc list-inside pl-5">
              {modalValue.poliklinik.map((item: string, index: number) => {
                return (
                  <li key={index} className=" -indent-5">
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className=" h-[400px] w-auto overflow-hidden rounded-sm">
          <Image
            src={`/images/pelayanan-fasilitas/${modalValue.img}.jpg`}
            alt={modalValue.img}
            height={400}
            width={500}
            className="object-center object-cover w-auto h-[400px] rounded-sm"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default ModalFacility;
