import React from "react";
import { useGlobalContext } from "../context/AppProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { FacilitySanityType } from "../types";
import { sanityLoader } from "@/loader";

type Props = {};

const ModalFacility = (props: Props) => {
  const {
    state: { modalValue },
    closeModal,
  } = useGlobalContext();
  const facility: FacilitySanityType = modalValue;
  if (!facility && Object.keys(facility).length < 1) {
    return <div></div>;
  } else {
    return (
      <div className="modal-phone md:modal-lg p-5 pt-0 md:pt-5">
        <h3 className=" modal-title">{facility.title}</h3>
        <button className="modal-close-btn" onClick={() => closeModal()}>
          <FontAwesomeIcon icon={faClose} />
        </button>
        <section className="bg-white border-none grid grid-cols-1 md:grid-cols-2 w-full gap-5  ">
          <div className="w-full body-3 flex flex-col gap-5 leading-5">
            <div>
              <p className="btn-3-bold">Deskripsi Alat</p>
              <p>{facility.description}</p>
            </div>
            <div>
              <p className="btn-3-bold">Kegunaan Alat</p>
              <p>{facility.function}</p>
            </div>
            {facility.poliklinik[0].toLowerCase() !==
              facility.title.toLowerCase() && (
              <div>
                <p className="btn-3-bold">Dipakai oleh: </p>
                <ul className=" grid grid-cols-1 md:grid-cols-2 list-disc list-inside pl-5">
                  {facility.poliklinik.map((item: string, index: number) => {
                    return (
                      <li key={index} className=" -indent-5">
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
          <div className=" w-full aspect-square md:h-[400px] md:w-fit overflow-hidden rounded-sm order-first md:order-none">
            <Image
              loader={sanityLoader}
              rel="preload"
              src={facility.img.src}
              alt={facility.img.alt}
              height={400}
              width={500}
              placeholder="empty"
              className="object-center object-cover w-full h-full rounded-sm aspect-[5/4]"
              priority
            />
          </div>
        </section>
        <section className="bg-white border-none w-full flex">
          <button
            onClick={() => closeModal()}
            className="button-greenUrip ml-auto"
          >
            Tutup
          </button>
        </section>
      </div>
    );
  }
};

export default ModalFacility;
