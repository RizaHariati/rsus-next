"use client";
import React from "react";

import { useGlobalContext } from "@/app/(tools)/context/AppProvider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen, faPerson } from "@fortawesome/free-solid-svg-icons";
import {
  getMedicalRecord,
  samplePatient,
} from "@/app/(tools)/utils/forms/samplePatient";
import { patientFormInput } from "@/app/(tools)/utils/forms/patientFormInput";

type Props = {};

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
        <h3>Profil Pasien</h3>
        <div className="grid grid-cols-3 col-start-1 gap-2 mb-2">
          <div className="w-full flex flex-col col-span-2">
            <p className="body-1-bold ">Nomor Rekam Medik (MR)</p>
            {samplePatient.medical_record && (
              <p className="body-2 form-disable">
                {getMedicalRecord(samplePatient.medical_record)}
              </p>
            )}
            <p className="footnote-1 mt-2">
              Nomor Rekam Medis ini akan Anda perlukan saat mendaftar untuk
              berobat nanti, karenanya harap dicatat dengan baik.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 col-start-1 gap-2 mb-2">
          {Object.entries(patientFormInput).map(([patientKey, patient]) => {
            return (
              <div
                key={patient.id}
                className={
                  patient.id === "profil_1"
                    ? "w-full flex flex-col"
                    : "w-full flex flex-col"
                }
              >
                <p className="body-2 ">{patient.title}</p>
                <p className="body-2 form-regular">
                  {typeof samplePatient.profile[patientKey] === "string"
                    ? samplePatient.profile[patientKey]
                    : !samplePatient.profile[patientKey]
                    ? "wanita"
                    : "pria"}
                </p>
              </div>
            );
          })}
          {samplePatient.bpjs && (
            <div className="mt-2">
              <div className="w-full flex flex-col">
                <p className="body-2 ">Nomor BPJS</p>
                <p className="body-2 form-disable">
                  {samplePatient?.bpjs_number}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkProfile;
