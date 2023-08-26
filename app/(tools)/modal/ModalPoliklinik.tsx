import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { DoctorType, PoliklinikType } from "../types";
import Image from "next/image";
import { findSupportingFacility } from "../utils/findSupportingFacility";
import { getDoctorPoli } from "../utils/getDoctorPoli";
import { motion } from "framer-motion";
import { enterTop } from "../framervariants/variants";
import dataConsultation from "@/app/(tools)/data/data_consultation.json";
type Props = {};

const ModalPoliklinik = (props: Props) => {
  const {
    state: { modalValue },
    closeModal,
    filteringDoctor,
    openModal,
  } = useGlobalContext();
  const poliInfo: PoliklinikType = modalValue;

  if (!poliInfo) {
    return <div></div>;
  } else {
    return (
      <div className="modal-lg p-5 px-10 overflow-hidden bg-white">
        <h3 className=" col-span-2  w-full border-b border-greyBorder  font-light mb-4 bg-white">
          {poliInfo.title}
        </h3>

        <button className="absolute top-2 right-4" onClick={() => closeModal()}>
          <FontAwesomeIcon icon={faClose} />
        </button>
        <motion.div
          variants={enterTop}
          initial="initial"
          whileInView="animate"
          className="w-full  grid grid-cols-3 gap-5 h-full body-3  "
        >
          <div className=" col-span-2 flex flex-col gap-5 w-full custom-scrollbar h-64">
            <div>
              {poliInfo.description.map((item, index) => {
                return <p key={index}>{item}</p>;
              })}
            </div>
            <FindSupportingFacility poliInfo={poliInfo} />
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
        </motion.div>
        <div className=" w-full flex items-end justify-between gap-3 pt-5 ">
          <FindSupportingDoctors poliInfo={poliInfo} />
          <div className=" flex gap-2">
            <button
              onClick={async () => {
                await filteringDoctor(poliInfo.id, "spesialisasi");
                openModal("appointment", dataConsultation[0]);
              }}
              className="button-greenUrip"
            >
              Lihat dokter
            </button>
            <button
              className="button-greenUrip"
              onClick={() => {
                closeModal();
              }}
            >
              kembali
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default ModalPoliklinik;

type FacilityProps = {
  poliInfo: PoliklinikType;
};
const FindSupportingFacility = ({ poliInfo }: FacilityProps) => {
  return (
    <div>
      {findSupportingFacility(poliInfo).length > 0 && (
        <div className="w-full ">
          <p>
            Fasilitas pendukung Poliklinik&nbsp;
            <span className="font-medium text-greenUrip">{poliInfo.title}</span>
            &nbsp; yang kini tersedia di RS Urip Sumoharjo :
          </p>
          <div className="grid grid-cols-2 gap-2">
            {findSupportingFacility(poliInfo).map((item) => {
              return (
                <div key={item.id} className="w-full flex-center-left gap-2">
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
  );
};

const FindSupportingDoctors = ({ poliInfo }: FacilityProps) => {
  return (
    <div>
      <p>
        Tim&nbsp;
        <span className="font-medium text-greenUrip">{poliInfo.title}</span>
        &nbsp; kami :
      </p>
      <div className="w-full flex gap-5 ">
        {getDoctorPoli(poliInfo.id).map((item: DoctorType, index: number) => {
          const image: string =
            item.gender === 1 ? "male-" + (index + 1) : "female-" + (index + 1);
          return (
            <div
              key={item.id}
              className="flex flex-col items-center justify-start"
            >
              <Image
                rel="preload"
                placeholder="empty"
                src={`/images/doctors/${image}.jpg`}
                alt={image}
                width={50}
                height={50}
                className="w-20 h-20 rounded-full"
                loading="lazy"
              />
              <p className="body-4 w-20 flex flex-wrap text-center">
                {item.nama}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
