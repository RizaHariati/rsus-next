import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCircleCheck,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { ConsultationMenuTypes, DoctorType } from "../types";
import { samplePatient } from "../utils/forms/samplePatient";
import Image from "next/image";

type Props = {};
const paymentMethod = [
  {
    id: 1,
    title: "Internet Banking BCA",
    img: "BCA",
    selected: false,
  },
  {
    id: 2,
    title: "GoPay",
    img: "Gopay",
    selected: true,
  },
];
const ModalBayarTelemedicine = (props: Props) => {
  const {
    state: { modalValue },
    openModal,
  } = useGlobalContext();
  const doctorInfo: DoctorType = modalValue.doctorInfo;
  const consultationInfo: ConsultationMenuTypes = modalValue.consultationInfo;

  return (
    <div className="modal-md p-10 py-5 overflow-hidden bg-white">
      <button
        className="absolute top-2 right-4"
        onClick={() => openModal(consultationInfo.modal, consultationInfo)}
      >
        <FontAwesomeIcon icon={faClose} />
      </button>
      <section className="bg-white flex flex-col gap-3 border-none">
        <p className="body-3">
          Kami akan terlebih dahulu mengkonfirmasi jadwal dokter yang
          bersangkutan, setelah itu anda diberikan waktu 5 menit untuk membayar
          uang konsultasi
        </p>
        <div className="body-2 sub-form">
          <p>Chat sekarang dengan: </p>
          <p className="dark-input">{doctorInfo.nama}</p>
        </div>
        <TelemedicineInfo doctorInfo={doctorInfo} />
        <div className=" standard-border p-2">
          {paymentMethod.map((item) => {
            return (
              <button className="w-full flex-center-between gap-2 border-white standard-border p-2 hover:border-greyBorder transition-all cursor-pointer hover:bg-greyLit">
                <Image
                  rel="preload"
                  placeholder="empty"
                  src={`/images/icons/consultation-icons/${item.img}.jpg`}
                  alt={item.img}
                  width={70}
                  height={40}
                  className="w-auto h-full rounded-sm object-cover object-center"
                  loading="lazy"
                />
                <p className="text-left mr-auto">{item.title}</p>
                <FontAwesomeIcon
                  className={item.selected ? "text-greenUrip" : "text-greyMed1"}
                  icon={item.selected ? faCircleCheck : faCircle}
                />
              </button>
            );
          })}
        </div>
        <div className="w-full flex-center-center">
          <button
            onClick={() => openModal("inconstruction", {})}
            className="button-greenUrip w-fit mx-auto px-3"
          >
            Bayar sekarang
          </button>
        </div>
      </section>
    </div>
  );
};

export default ModalBayarTelemedicine;

type PatientProps = {
  doctorInfo: DoctorType;
};
const TelemedicineInfo = ({ doctorInfo }: PatientProps) => {
  return (
    <div className=" flex flex-col gap-3">
      <div className="form-line border-b border-greyBorder">
        <p>Nama Pasien</p>
        <p>:&nbsp;{samplePatient.profile.name}</p>
        <p>Nomor Rekam Medik </p>
        <p>:&nbsp;{samplePatient.medical_record}</p>
      </div>

      <div className="form-line border-b border-greyBorder">
        <p>Biaya Telemedicine</p>
        <p>:&nbsp;Rp.{doctorInfo.biaya_telemedicine!.toLocaleString()}</p>
        <p>Biaya Administrasi</p>
        <p>:&nbsp;Rp.&nbsp;&nbsp;{(1999).toLocaleString()}</p>
      </div>
      <div className="form-line">
        <p>Total yang harus dibayar</p>
        <p>
          :&nbsp;Rp.{(doctorInfo.biaya_telemedicine! + 1999).toLocaleString()}
        </p>
      </div>
    </div>
  );
};
