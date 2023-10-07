import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { patientFormInput } from "../../utils/forms/patientFormInput";
import InputRegisterDate from "./InputRegisterDate";
import InputSex from "./InputSex";
import InputBirthDate from "./InputBirthDate";
import InputFormatReguler from "./InputFormatReguler";
import { toast } from "react-toastify";
import dataAppointment from "@/app/(tools)/data/data_appointment.json";
import { PatientInitialValueType } from "../../patientTypes";
import moment from "moment";

type Props = {};
export const getNumber = () => {
  let newMedicalRecordNumber = Math.floor(
    Math.random() * 9000000000 + 1000000000
  );
  return newMedicalRecordNumber;
};

const ModalRegister = (props: Props) => {
  const initialPatient: PatientInitialValueType = {
    medical_record_number: {
      value: "US" + getNumber(),
      error: false,
    },
    register_date: {
      value: moment().format("YYYY-MM-DD"),
      error: false,
    },
    name: { value: "", error: false },
    NIK: { value: "", error: false },
    address: { value: "", error: false },
    sex: { value: 1, error: false },
    birthdate: { value: "", error: false },
    phone: { value: "", error: false },
    password: { value: "", error: false },
    bpjs_number: { value: "", error: false },
  };

  const { state, closeModal, openModal } = useGlobalContext();
  const [newPatientPersonal, setNewPatientPersonal] =
    useState<PatientInitialValueType>(
      state.modalValue.newPatientPersonal
        ? state.modalValue.newPatientPersonal
        : initialPatient
    );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let patientObject = newPatientPersonal;
    Object.entries(newPatientPersonal).map(([key, entryValue]) => {
      if (key === "password" || key === "bpjs_number") {
        patientObject = {
          ...patientObject,
          [key]: { ...entryValue, error: false },
        };
      } else {
        if (!entryValue.value) {
          patientObject = {
            ...patientObject,
            [key]: { ...entryValue, error: true },
          };
        } else {
          patientObject = { ...patientObject, [key]: { ...entryValue } };
        }
      }
    });

    const findError = Object.values(patientObject).find((item) => item.error);
    const findEmptyValue = Object.entries(patientObject).find(
      ([key, values]) => {
        if (key === "password" || key === "bpjs_number" || key === "sex") {
          return;
        } else {
          return !values.value;
        }
      }
    );
    if (findEmptyValue) {
      if (!findError) {
        return;
      } else {
        return toast.error("semua kolom harus diisi", {
          position: "top-center",
        });
      }
    } else {
      if (
        newPatientPersonal.NIK.value.length < 10 ||
        newPatientPersonal.phone.value.length < 10
      ) {
        return toast.error("nomor terlalu pendek");
      }
      openModal("registerpassword", { newPatientPersonal });
      setNewPatientPersonal(initialPatient);
    }
    setNewPatientPersonal(initialPatient);
  };

  const handlePatientChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    patientKey: string
  ) => {
    e.preventDefault();
    if (
      patientKey === "phone" ||
      patientKey === "NIK" ||
      patientKey === "bpjs_number"
    ) {
      if (e.target.value.length > 14) return;
    }
    let newData = {
      ...newPatientPersonal,
      [patientKey]: { value: e.target.value, error: false },
    };
    setNewPatientPersonal(newData);
  };

  return (
    <div className="modal-phone md:h-fit md:modal-lg p-3  md:px-10 pt-0  md:rounded-sm ">
      <h3 className=" modal-title ">
        {dataAppointment[2].title}
        {/* dataAppointment[2] adalah data untuk menu registrasi */}
      </h3>
      <button className="modal-close-btn" onClick={() => closeModal()}>
        <FontAwesomeIcon icon={faClose} />
      </button>
      <article className="bg-white">
        {dataAppointment[2].intro.map((item: string, index: number) => {
          return (
            <p className="body-3" key={index}>
              {item}
            </p>
          );
        })}
      </article>
      <form className="w-full mt-2 " onSubmit={(e) => handleSubmit(e)}>
        <InputRegisterDate />

        <article className="grid grid-cols-4 gap-x-2 pt-2 w-full bg-white">
          {Object.entries(patientFormInput).map(([key, values]) => {
            if (key === "sex") {
              return (
                <InputSex
                  key={values.id}
                  newPatientPersonal={newPatientPersonal}
                  setNewPatientPersonal={setNewPatientPersonal}
                />
              );
            } else if (key === "birthdate") {
              return (
                <InputBirthDate
                  key={values.id}
                  values={values}
                  newPatientPersonal={newPatientPersonal}
                  setNewPatientPersonal={setNewPatientPersonal}
                />
              );
            } else {
              const [patientKey, patientValue] = Object.entries(
                newPatientPersonal
              ).find(([item, _]) => item === key)!;

              return (
                <InputFormatReguler
                  key={values.id}
                  newPatientPersonal={newPatientPersonal}
                  values={values}
                  patientKey={patientKey}
                  patientValue={patientValue}
                  handlePatientChange={handlePatientChange}
                />
              );
            }
          })}
        </article>
        <article className=" w-full flex items-center justify-end gap-3 pt-2 md:pt-5 bg-white ">
          <button
            type="button"
            onClick={() => setNewPatientPersonal(initialPatient)}
            className="button-greenUrip"
          >
            Hapus
          </button>
          <button className="button-greenUrip" type="submit">
            Daftarkan
          </button>
        </article>
      </form>
    </div>
  );
};

export default ModalRegister;
