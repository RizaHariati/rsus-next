import React, { useState } from "react";

import dataFacility from "@/app/(tools)/data/data_facility.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { sliderVariants } from "../framervariants/slidervariants";
import { LabItemType, PoliklinikType } from "../types";
import Image from "next/image";
import { findSupportingFacility } from "../utils/findSupportingFacility";
type Props = {};

const ModalPoliklinik = (props: Props) => {
  const {
    state: { modalValue },
    closeModal,
    openModal,
  } = useGlobalContext();
  const poliInfo: PoliklinikType = modalValue;

  if (!poliInfo) {
    return <div></div>;
  } else {
    return (
      <div className="modal-lg p-5 px-10">
        <h3 className=" col-span-2  w-full border-b border-greyBorder  font-light mb-4">
          {poliInfo.title}
        </h3>

        <button className="absolute top-2 right-4" onClick={() => closeModal()}>
          <FontAwesomeIcon icon={faClose} />
        </button>
        <div className="w-full  grid grid-cols-3 gap-5 h-full body-3">
          <div className=" col-span-2 flex flex-col gap-2 w-full">
            <div>
              {poliInfo.description.map((item, index) => {
                return <p key={index}>{item}</p>;
              })}
            </div>
            <div>
              {findSupportingFacility(poliInfo).length > 0 && (
                <div className="w-full ">
                  <p>
                    Fasilitas pendukung Poliklinik&nbsp;
                    <span className="font-medium text-greenUrip">
                      {poliInfo.title}
                    </span>
                    &nbsp; yang kini tersedia di RS Urip Sumoharjo :
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {findSupportingFacility(poliInfo).map((item) => {
                      return (
                        <div
                          key={item.id}
                          className="w-full flex-center-left gap-2"
                        >
                          <Image
                            rel="preload"
                            placeholder="empty"
                            src={`/images/pelayanan-fasilitas/small/${item.img}.jpg`}
                            alt={item.img}
                            width={30}
                            height={30}
                            className="object-center object-cover w-10 h-10 standard-border overflow-hidden "
                            loading="lazy"
                          />
                          <p className="text-left mr-auto">{item.title}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <div>
              <p>
                Tim&nbsp;
                <span className="font-medium text-greenUrip">
                  {poliInfo.title}
                </span>
                &nbsp; kami :
              </p>
              <div></div>
            </div>
          </div>
          <div>
            <Image
              rel="preload"
              placeholder="empty"
              src={
                findSupportingFacility(poliInfo).length > 0
                  ? `/images/pelayanan-fasilitas/${
                      findSupportingFacility(poliInfo)[0].img
                    }.jpg`
                  : `/images/pelayanan-fasilitas/lab-pcr.jpg`
              }
              alt="lab-pcr"
              width={400}
              height={400}
              className="object-center object-cover w-auto h-full mx-auto"
              loading="lazy"
            />
          </div>
        </div>
        <div className=" w-full flex items-center justify-end gap-3 pt-5 ">
          <button className="button-greenUrip">Pilih</button>
          <button
            className="button-greenUrip"
            onClick={() => {
              closeModal();
            }}
          >
            Batal
          </button>
        </div>
      </div>
    );
  }
};

export default ModalPoliklinik;
