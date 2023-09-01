import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { ConsultationMenuTypes, DoctorType } from "../../types";
import { getMedicalRecord } from "../../data/sample";
import PaymentMethods from "./PaymentMethods";

type Props = {};

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
      <h3 className=" col-span-2 font-normal w-full border-b border-greyBorder">
        Pembayaran Telemedicine
      </h3>
      <section className="bg-white flex flex-col gap-3 border-none">
        <p className="body-3">
          Kami akan terlebih dahulu mengkonfirmasi jadwal dokter yang
          bersangkutan, setelah itu anda diberikan waktu 5 menit untuk membayar
          uang konsultasi
        </p>
        <div className="body-3 sub-form">
          <p className="body-3">Chat sekarang dengan: </p>
          <p className="dark-input">{doctorInfo.nama}</p>
        </div>
        <TelemedicineInfo doctorInfo={doctorInfo} />
        <PaymentMethods />
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
  const {
    patientState: { patientProfile },
  } = useGlobalContext();
  return (
    <div className=" flex flex-col gap-3">
      <div className="form-line border-b border-greyBorder">
        <p>Nama Pasien</p>
        <p>:&nbsp;{patientProfile.name}</p>
        <p>Nomor Rekam Medik </p>
        <p>:&nbsp;{getMedicalRecord(patientProfile.medical_record_number)}</p>
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
