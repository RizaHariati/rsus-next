import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { AppointmentMenuTypes, DoctorType } from "../../types";
import { getMedicalRecord } from "../../data/sample";
import PaymentMethods from "./PaymentMethods";
import { getScheduleID } from "../../utils/getScheduleID";
import { ScheduledType, NotificationType } from "../../patientTypes";
import { getNotificationID } from "../../utils/getNotificationID";
import { toast } from "react-toastify";
import moment from "moment";

type Props = {};

const ModalBayarTelemedicine = (props: Props) => {
  const {
    state: { modalValue },
    openModal,
    patientState: { patient },
    addingSchedule,
  } = useGlobalContext();
  const doctorInfo: DoctorType = modalValue.doctorInfo;
  const appointmentInfo: AppointmentMenuTypes = modalValue.appointmentInfo;

  const handleTelemedicine = async () => {
    const newScheduleID = getScheduleID(patient.scheduled_appointments);
    const schedule: ScheduledType = {
      current_phone: patient.patient_profile.phone,
      schedule_id: newScheduleID,
      tujuan: [doctorInfo.id],
      appointment_type: "telemedicine",
      scheduled_date: moment().format("YYYY-MM-DD[T]HH:mm"),
      register_date: moment().format("YYYY-MM-DD[T]HH:mm"),
      using_bpjs: false,
      nomor_antrian: 0,
    };

    const promiseTelemedicine = new Promise((resolve) => {
      addingSchedule(schedule);

      /* -------------- REPLACE THIS WITH SETTING TO SANITY ------------- */
      // setPatient({
      //   ...patient,
      //   scheduled_appointments: [...patient.scheduled_appointments, schedule],
      // });
      setTimeout(() => {
        resolve(openModal("inconstruction", {}));
      }, 1500);
    });

    toast.promise(promiseTelemedicine, {
      pending: "Menunggu pembayaran",
      success: `Jadwal Telemedicine dengan ${doctorInfo.name} berhasil ditambahkan`,
      error: "Schedule rejected ",
    });
  };

  return (
    <div className="modal-phone md:modal-md overflow-hidden bg-white">
      <button
        className="modal-close-btn"
        onClick={() => openModal(appointmentInfo.modal, appointmentInfo)}
      >
        <FontAwesomeIcon icon={faClose} />
      </button>
      <h3 className="modal-title">Pembayaran Telemedicine</h3>
      <section className="bg-white flex flex-col gap-2 border-none">
        <p className="body-3">
          Kami akan terlebih dahulu mengkonfirmasi jadwal dokter yang
          bersangkutan, setelah itu anda diberikan waktu 5 menit untuk membayar
          uang konsultasi
        </p>
        <div className="body-3 sub-form">
          <p className="body-3">Chat sekarang dengan: </p>
          <p className="dark-input">{doctorInfo.name}</p>
        </div>
        <TelemedicineInfo doctorInfo={doctorInfo} />
        <PaymentMethods />
        <div className="w-full flex-center-center">
          <button
            onClick={() => handleTelemedicine()}
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
    patientState: { patient },
  } = useGlobalContext();
  return (
    <div className=" flex flex-col gap-2">
      <div className="form-line border-b border-greyBorder">
        <p>Nama Pasien</p>
        <p>:&nbsp;{patient.patient_profile.name}</p>
        <p>Nomor Rekam Medik </p>
        <p>:&nbsp;{getMedicalRecord(patient.medical_record_number)}</p>
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
