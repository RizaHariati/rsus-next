import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { ConsultationMenuTypes } from "../types";
import { patientFormInput } from "../utils/forms/patientFormInput";
import dayjs from "dayjs";
import InputRegisterDate from "./modalRegister/InputRegisterDate";
import InputSex from "./modalRegister/InputSex";
import InputBirthDate from "./modalRegister/InputBirthDate";
import InputFormatReguler from "./modalRegister/InputFormatReguler";
import { toast } from "react-toastify";
import ConsultationMenu from "../components/PageComponents/consultation/ConsultationMenu";
import ConsultationOptions from "../components/PageComponents/poliklinik/ConsultationOptions";
import dataConsultation from "@/app/(tools)/data/data_consultation.json";

export type PatientInitialValueType = {
  [key: string]: { value: any; error: boolean };
};
type Props = {};
const initialPatient: PatientInitialValueType = {
  medical_record_number: {
    value: "US" + Math.floor(Math.random() * 9000000000 + 1000000000),
    error: false,
  },
  register_date: { value: dayjs().format("DD/MM/YYYY"), error: false },
  name: { value: "", error: false },
  NIK: { value: "", error: false },
  address: { value: "", error: false },
  sex: { value: true, error: false },
  birthdate: { value: "", error: false },
  phone: { value: "", error: false },
  password: { value: "", error: false },
  bpjs_number: { value: "", error: false },
};

const ModalRegister = (props: Props) => {
  const { state, closeModal, openModal } = useGlobalContext();
  const [newPatientPersonal, setNewPatientPersonal] =
    useState<PatientInitialValueType>(
      state.modalValue.newPatientPersonal
        ? state.modalValue.newPatientPersonal
        : initialPatient
    );

  useEffect(() => {}, [newPatientPersonal]);

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
    console.log(patientObject);
    const findError = Object.values(patientObject).find((item) => item.error);
    const findEmptyValue = Object.entries(patientObject).find(
      ([key, values]) => {
        if (key === "password" || key === "bpjs_number") {
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
        toast.error("semua kolom harus diisi", { position: "top-center" });
      }
    } else {
      openModal("registerpassword", { newPatientPersonal });
    }
    setNewPatientPersonal(patientObject);
  };
  const handlePatientChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    patientKey: string
  ) => {
    e.preventDefault();

    let newData = {
      ...newPatientPersonal,
      [patientKey]: { value: e.target.value, error: false },
    };
    setNewPatientPersonal(newData);
  };

  return (
    <div className="modal-lg p-5 px-10 overflow-hidden bg-white">
      <h3 className=" col-span-2  w-full border-b border-greyBorder  font-light mb-4 bg-white">
        {dataConsultation[2].title}
        {/* dataConsultation[2] adalah data untuk menu registrasi */}
      </h3>
      <button className="absolute top-2 right-4" onClick={() => closeModal()}>
        <FontAwesomeIcon icon={faClose} />
      </button>
      <article>
        {dataConsultation[2].intro.map((item: string, index: number) => {
          return (
            <p className="body-3" key={index}>
              {item}
            </p>
          );
        })}
      </article>
      <form className="w-full mt-3" onSubmit={(e) => handleSubmit(e)}>
        <InputRegisterDate />
        bpjs_number
        <article className="grid grid-cols-4 gap-x-2 pt-2 w-full">
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
        <article className=" w-full flex items-center justify-end gap-3 pt-5 ">
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
