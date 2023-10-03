"use client";

import React from "react";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faPeopleGroup,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { ScheduledType } from "@/app/(tools)/patientTypes";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import dataDokter from "@/app/(tools)/data/data_dokter.json";
import dataPaketKesehatan from "@/app/(tools)/data/data_paketkesehatan.json";
import dataFacility from "@/app/(tools)/data/data_facility.json";
import dataLabSatuan from "@/app/(tools)/data/data_lab_satuan.json";
import { faQq } from "@fortawesome/free-brands-svg-icons";

type Props = {};

const NavLinkSchedule = () => {
  const {
    toggleMenuNavbar,
    state: { menu_id },
    patientState: { user, patient },
  } = useGlobalContext();
  return (
    <div className="relative h-full ">
      <button
        type="button"
        id="jadwal"
        onClick={(e) => {
          if (!user.login) {
            toast.error("Anda harus login terlebih dahulu");
          } else {
            if (patient.scheduled_appointments.length < 1) {
              return toast.info("Anda belum menjadwalkan kegiatan apapun");
            } else {
              toggleMenuNavbar(e.currentTarget.id);
            }
          }
        }}
        className="navbar-link  "
      >
        <FontAwesomeIcon icon={faPeopleGroup} className="navbar-link-icon" />
        <p
          className={
            patient.scheduled_appointments.length > 0
              ? "text-link font-bold"
              : "text-link"
          }
        >
          Jadwal
        </p>
      </button>

      {/* DROP MENU JADWAL */}
      {user.login && (
        <div
          className={
            menu_id != "jadwal"
              ? "jadwal-menu-container-hidden "
              : "jadwal-menu-container "
          }
        >
          <MenuJadwalContent />
        </div>
      )}
    </div>
  );
};

export default NavLinkSchedule;

export const MenuJadwalContent = () => {
  const {
    patientState: { patient },
  } = useGlobalContext();

  const schedule: ScheduledType[] = patient.scheduled_appointments;
  faQq;
  return (
    <div className=" h-fit max-h-[400px] overflow-y-scroll scrollbar-none flex flex-col gap-2">
      <h4>Jadwal Anda</h4>
      {schedule
        .slice()
        .reverse()
        .map((scheduleItem) => {
          const detailSchedule = getScheduleType(
            scheduleItem.appointment_type,
            scheduleItem.tujuan
          );
          if (scheduleItem.appointment_type === "telemedicine") {
            return (
              <div key={scheduleItem.schedule_id} className="menu-alert">
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  className="menu-icon text-blue-700"
                />
                <p>
                  Anda terjadwal untuk melakukan {detailSchedule.type}&nbsp;
                  <span className="font-bold">
                    {detailSchedule.tujuanSchedule}
                  </span>
                  &nbsp;Anda akan segera dihubungi lewat WhatApp. Harap anda
                  bersiap-siap
                </p>
              </div>
            );
          } else {
            if (scheduleItem.scheduled_date > new Date()) {
              return (
                <div key={scheduleItem.schedule_id} className="menu-alert">
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    className="menu-icon text-blue-700"
                  />
                  <p>
                    Anda terjadwal untuk melakukan {detailSchedule.type}&nbsp;
                    <span className="font-bold">
                      {detailSchedule.tujuanSchedule}
                    </span>
                    &nbsp;untuk tanggal&nbsp;
                    {dayjs(scheduleItem.scheduled_date).format(
                      "DD MMMM YYYY [jam] HH:mm"
                    )}
                  </p>
                </div>
              );
            } else {
              return (
                <div key={scheduleItem.schedule_id} className="menu-alert">
                  <FontAwesomeIcon
                    icon={faTriangleExclamation}
                    className="menu-icon text-greenUrip "
                  />
                  <p>
                    Hari ini Anda memiliki jadwal {detailSchedule.type}&nbsp;
                    <span className="font-bold">
                      {detailSchedule.tujuanSchedule}
                    </span>
                    . nomor Antrian anda adalah : {scheduleItem.nomor_antrian}.
                    Jangan lupa untuk melunasi pembayaran 1 jam sebelum jadwal.
                  </p>
                </div>
              );
            }
          }
        })}
    </div>
  );
};
const getScheduleType = (appointment_type: string, tujuan: string[]) => {
  const translateType =
    appointment_type === "tatap_muka" ? "tatap muka" : "telemedicine";
  let type =
    appointment_type !== "test" ? `konsultasi ${translateType}` : `test `;
  let tujuanSchedule = "";
  if (appointment_type !== "test") {
    const findDoctor = dataDokter.find((item) => item.id === tujuan[0])!;

    tujuanSchedule = `dengan ${findDoctor.name} dari Poli ${findDoctor.poliklinik.title}`;
  } else {
    tujuanSchedule = tujuan
      .map((itemTujuan) => {
        const findPaket = dataPaketKesehatan.find(
          (item) => item.id === itemTujuan
        );
        const findFas = dataFacility.find((item) => item.id === itemTujuan);
        const findLab = dataLabSatuan.find((item) => item.id === itemTujuan);
        if (findPaket) return findPaket.title;
        else if (findFas) return findFas?.title;
        else if (findLab) return findLab.title;
        else return "";
      })
      .join(", ");
  }
  return { type, tujuanSchedule };
};
