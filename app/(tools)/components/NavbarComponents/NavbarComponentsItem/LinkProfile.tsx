"use client";
import React from "react";

import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { PatientType, PersonalItemType } from "@/app/(tools)/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen, faPerson } from "@fortawesome/free-solid-svg-icons";

type Props = {};

export const Purwanto: PatientType = {
  registered: true,
  medical_record: "US4234123398",
  profile: {
    name: { id: 1, value: "Purwanto", title: "Nama Pasien" },
    NIK: { id: 2, value: "3327051303890004", title: "NIK" },
    address: { id: 3, value: "Jl. Letjen Suprapto no.5", title: "Alamat" },
    sex: { id: 4, value: true, title: "Jenis kelamin" },
    birthdate: { id: 5, value: "13/08/1989", title: "Tanggal lahir" },
    phone: {
      id: 6,
      value: "0812840345x83x3",
      title: "Nomor Whatsapp yang aktif ",
    },
  },
  bpjs: true,
  bpjs_number: "0001454326918",
};
const LinkProfile = () => {
  const {
    toggleMenu,
    state: { menu_id, logged_in },
  } = useGlobalContext();

  return (
    <div className="relative h-full">
      {logged_in && (
        <button
          id="profile"
          onClick={(e) => toggleMenu(e.currentTarget.id)}
          className="navbar-link  "
        >
          <FontAwesomeIcon icon={faPerson} className="navbar-link-icon" />
          <p>Profil </p>
        </button>
      )}
      {!logged_in && (
        <button
          id="login"
          onClick={(e) => toggleMenu(e.currentTarget.id)}
          className="navbar-link  "
        >
          <FontAwesomeIcon icon={faDoorOpen} className="navbar-link-icon" />
          <p>Login</p>
        </button>
      )}

      {/* DROP MENU PROFILE */}
      <div
        className={
          menu_id != "profile"
            ? "profile-menu-container-hidden "
            : "profile-menu-container"
        }
      >
        <h3>Profile</h3>
        <div className="grid grid-cols-3 col-start-1 gap-2 mb-2">
          <div className="col-span-2 ">
            <div className="w-full flex flex-col">
              <p className="body-1-bold ">Nomor Rekam Medik (MR)</p>
              <p className="body-2 form-disable">US-4234-1233-98</p>
              <p className="footnote-1 mt-2">
                Nomor Rekam Medis ini akan Anda perlukan saat mendaftar untuk
                berobat nanti, karenanya harap dicatat dengan baik.
              </p>
            </div>
          </div>

          {Object.values(Purwanto.profile).map((patient: PersonalItemType) => {
            if (patient.id === 4) {
              return (
                <div key={patient.id} className="w-full flex flex-col">
                  <p className="body-2 ">{patient.title}</p>
                  <p className="body-2 form-regular">
                    {patient.value && "pria"} {!patient.value && "wanita"}
                  </p>
                </div>
              );
            } else {
              return (
                <div
                  key={patient.id}
                  className={
                    patient.id === 1
                      ? "w-full flex flex-col col-start-1"
                      : "w-full flex flex-col"
                  }
                >
                  <p className="body-2 ">{patient.title}</p>
                  <p className="body-2 form-regular">{patient.value}</p>
                </div>
              );
            }
          })}
          {Purwanto.bpjs && (
            <div className="mt-2">
              <div className="w-full flex flex-col">
                <p className="body-2 ">Nomor BPJS</p>
                <p className="body-2 form-disable">{Purwanto?.bpjs_number}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkProfile;
