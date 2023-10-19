import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { AppointmentMenuTypes, DoctorType } from "../types";
import Image from "next/image";
import { getDoctorDetailedInfo } from "../utils/forms/getDoctorDetailedInfo";

type Props = {};

const ModalDoctorDetail = (props: Props) => {
  const {
    state: { modalValue },
    patientState: { user },
    openModal,
    openAlert,
  } = useGlobalContext();
  const doctorInfo: DoctorType = modalValue.doctorInfo;
  const image: string = modalValue.image;
  const appointmentInfo: AppointmentMenuTypes = modalValue.appointmentInfo;

  if (!doctorInfo || !image) return <div></div>;
  else {
    return (
      <div className="modal-phone md:modal-md p-3 md:px-10 overflow-hidden bg-white ">
        <button
          className="absolute top-2 right-4"
          onClick={() => openModal(appointmentInfo.modal, appointmentInfo)}
        >
          <FontAwesomeIcon icon={faClose} />
        </button>
        <article className="flex-center-between flex-col w-full gap-3 bg-white">
          <div className=" aspect-square w-32 h-auto mx-auto relative">
            <Image
              rel="preload"
              placeholder="empty"
              src={`/images/doctors/${image}.jpg`}
              alt={image}
              width={100}
              height={100}
              className="w-auto h-full rounded-sm object-cover object-center"
              loading="lazy"
            />
            <Image
              rel="preload"
              placeholder="empty"
              src={`/images/navbar/main-logo.png`}
              alt="main-logo"
              width={30}
              height={30}
              className="w-10 h-auto rounded-full object-cover object-center absolute bottom-0 -right-5"
              loading="lazy"
            />
          </div>
          <div className="w-full border-t border-greyBorder ">
            <p className="body-1-bold tracking-normal">
              {doctorInfo?.name}&nbsp;
              {doctorInfo.telemedicine ? (
                doctorInfo.sedang_online ? (
                  <span className=" text-greenUrip body-3">
                    &nbsp;sedang online
                  </span>
                ) : (
                  <span className=" text-greyMed2 body-3">
                    &nbsp;sedang offline
                  </span>
                )
              ) : null}
            </p>
            <div className=" w-full">
              {getDoctorDetailedInfo(doctorInfo).map((item) => {
                return (
                  <div key={item.id} className="w-full grid grid-cols-2">
                    <p>{item.title}</p>
                    <p>: {item.value}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </article>
        <article className=" w-full flex-center-center gap-3 pt-5 bg-white ">
          {doctorInfo.telemedicine ? (
            <button
              disabled={doctorInfo.sedang_online ? false : true}
              onClick={() => {
                if (user.login) {
                  openModal("chattelemedicine", {
                    doctorInfo,
                    appointmentInfo,
                  });
                } else {
                  openAlert("notlogin", {});
                }
              }}
              className={
                doctorInfo.sedang_online ? "button-greenUrip" : "button-grey"
              }
            >
              Telemedicine
            </button>
          ) : (
            <button
              onClick={() => openModal(appointmentInfo.modal, appointmentInfo)}
              className="button-greenUrip"
            >
              kembali
            </button>
          )}
          <button
            onClick={() => {
              //check login
              if (user.login) {
                openModal("tatapmuka", { doctorInfo, appointmentInfo });
              } else {
                openAlert("notlogin", {});
              }
            }}
            className="button-greenUrip"
          >
            Tatap Muka
          </button>
        </article>
      </div>
    );
  }
};

export default ModalDoctorDetail;
