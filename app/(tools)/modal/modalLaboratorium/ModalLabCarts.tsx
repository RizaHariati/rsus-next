import React, { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { LabCartType } from "../../types";
import { toast } from "react-toastify";
import { getAge } from "../../utils/getAge";
import SelectDate from "../modalAppointment/SelectDate";
import { NotificationType, ScheduledType } from "../../patientTypes";
import { getScheduleID } from "../../utils/getScheduleID";
import { getNotificationID } from "../../utils/getNotificationID";
import { checkExistingSchedule } from "../../utils/checkExistingSchedule";

type Props = {};

const ModalLabCarts = (props: Props) => {
  const {
    state,
    closeModal,
    clearLabCart,
    openModal,
    openAlert,
    state: { selected_date },
    patientState: { patient },
  } = useGlobalContext();
  const labCart: LabCartType[] = state.labCart;
  const patientProfile = patient.patient_profile;
  let total = 0;

  const handleBayarLab = () => {
    if (
      patient.medical_record_number !== "US4234123398" &&
      patient.scheduled_appointments.length > 6
    ) {
      return toast.error(
        "Anda sudah mencapai kuota pendaftaran online minggu ini"
      );
    }
    if (!selected_date) {
      openAlert("datenotselected", {});
    } else {
      const check = checkExistingSchedule(
        selected_date,
        patient.scheduled_appointments
      );

      if (!check.passChecking) {
        return toast.error(check.message);
      } else {
        const labType: string[] = labCart.map((item) => item.id);
        const newScheduleID = getScheduleID(patient.scheduled_appointments);
        if (labCart.length > 0) {
          const schedule: ScheduledType = {
            current_phone: patient.patient_profile.phone,
            schedule_id: newScheduleID,
            tujuan: labType,
            appointment_type: "test",
            scheduled_date: selected_date,
            register_date: new Date(),
            using_bpjs: false,
            nomor_antrian: 2,
          };
          openModal("bayarlab", { schedule });
        }
      }
    }
  };
  return (
    <div className="modal-phone md:modal-lg min-h-[300px] flex-center-between flex-col">
      <h3 className="modal-title">Pilihan Test Laboratorium</h3>
      <button className="modal-close-btn" onClick={() => closeModal()}>
        <FontAwesomeIcon icon={faClose} />
      </button>
      {patient.medical_record_number !== "US4234123398" &&
        patient.scheduled_appointments.length > 6 && (
          <p className=" text-redBase">
            Anda sudah mencapai kuota pendaftaran online minggu ini, anda harus
            mendaftar langsung di RS Urip Sumoharjo
          </p>
        )}
      <div className="w-full  grid grid-cols-6 gap-2 capitalize my-2">
        <div className=" col-span-full w-full flex flex-col md:col-span-2">
          <p className="body-2  ">Nomor Rekam Medis</p>
          <p className="active-input capitalize ">
            {patient.medical_record_number}
          </p>
        </div>
        <div className="w-full col-span-full">
          <SelectDate searchCategory="laboratorium" />
        </div>
        <div className=" col-span-full w-full flex flex-col col-start-1 md:col-span-2">
          <p className="body-2 text-xs">Nama</p>
          <p className="active-input capitalize ">{patientProfile.name}</p>
        </div>
        <div className=" col-span-3 md:col-span-1 w-full flex flex-col">
          <p className="body-2 text-xs">jenis Kelamin</p>
          <p className="active-input capitalize ">{patientProfile.name}</p>
        </div>
        <div className=" col-span-3 md:col-span-1 w-full flex flex-col">
          <p className="body-2 text-xs">Usia</p>
          <p className="active-input capitalize ">
            {`${getAge(patientProfile.birthdate).ageyear} thn/ ${
              getAge(patientProfile.birthdate).agemonth
            } bln`}
          </p>
        </div>
      </div>
      <div className="w-full h-full my-auto">
        {labCart.length < 1 && (
          <div>
            <h2>Daftar Anda kosong</h2>
          </div>
        )}
        {labCart.length > 0 && (
          <div>
            <header className="grid grid-cols-12 border-y border-greyBorder py-2">
              <p className="hidden md:block">No</p>
              <p className=" hidden md:block md:col-span-3 text-left">
                Nama Produk
              </p>
              <p className=" col-span-8 md:hidden text-left">
                Keterangan Produk
              </p>
              <p className="hidden md:block col-span-6"> Keterangan</p>
              <p className=" text-right col-span-4 md:col-span-2">Harga</p>
            </header>
            <article className="max-h-[200px] custom-scrollbar px-2">
              {labCart.map((item: LabCartType, index) => {
                total = total + item.price;
                return (
                  <div
                    key={item.id}
                    className="grid grid-cols-12 border-b border-greyBorder py-2 "
                  >
                    <p className="hidden md:block">{index + 1}.</p>
                    <p className="text-left col-span-full md:col-span-3 font-medium uppercase">
                      {item.title}
                    </p>

                    <div className="col-span-8 md:col-span-6  pb-3 overflow-y-scroll scrollbar-none md:col-start-auto leading-5 text-greyMed1">
                      {item.description.join(", ")}
                    </div>
                    <p className=" text-right col-span-4 md:col-span-2">
                      Rp.{item.price.toLocaleString()}
                    </p>
                  </div>
                );
              })}
            </article>
            <div className="grid grid-cols-12  py-2 border-t border-greyBorder ">
              <p className=" col-span-5 md:col-span-2 col-start-3 md:col-start-9">{`Total (${labCart.length}) item`}</p>
              <p className=" col-span-4 md:col-span-2 text-right">
                Rp. {total.toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-end w-full gap-3 mt-2 md:w-1/2 ">
        <button
          onClick={() => {
            clearLabCart();
            toast("Seluruh daftar sudah dihapus");
            closeModal();
          }}
          className="button-greenUrip w-full text-sm md:text-base p-1 md:px-3"
        >
          Hapus Daftar
        </button>
        <button
          disabled={labCart.length > 0 ? false : true}
          onClick={() => {
            handleBayarLab();
          }}
          className={
            labCart.length > 0
              ? "button-greenUrip w-full text-sm md:text-base p-1"
              : "button-grey w-full text-sm md:text-base p-1"
          }
        >
          Bayar
        </button>
      </div>
    </div>
  );
};

export default ModalLabCarts;
