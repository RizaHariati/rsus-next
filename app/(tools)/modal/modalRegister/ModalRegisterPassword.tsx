import {
  faClose,
  faEye,
  faEyeLowVision,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useGlobalContext } from "../../context/AppProvider";
import { patientFormInput } from "../../utils/forms/patientFormInput";
import { getMedicalRecord } from "../../data/sample";
import { toast } from "react-toastify";
import { PatientInitialValueType } from "../../patientTypes";

type Props = {};

const ModalRegisterPassword = (props: Props) => {
  const { state, closeModal, openAlert } = useGlobalContext();
  const [copyText, setCopyText] = useState(false);
  const newPatientPersonal: PatientInitialValueType =
    state.modalValue.newPatientPersonal;
  console.log({ registerPassword: newPatientPersonal });
  const [passwordValue, setPasswordValue] = useState({
    value1: "",
    value2: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!copyText)
      return toast.error("Klik tombol Sudah Disalin", {
        position: "top-center",
      });
    const { value1, value2 } = passwordValue;

    if (!value1 || !value2) {
      toast.error("Kedua password harus dimasukkan", {
        position: "top-center",
      });
      return;
    } else {
      if (value1 !== value2) {
        toast.error("Password tidak sama", {
          position: "top-center",
        });
        return;
      } else {
        if (value1.length < 4) {
          toast.error("password terlalu pendek", {
            position: "top-center",
          });
        } else {
          newPatientPersonal.birthdate;
          const patientPersonalData = {
            ...newPatientPersonal,
            password: {
              value: value1,
              error: false,
            },
          };
          const verification_number = Math.floor(Math.random() * 9000 + 1000);
          toast.info(
            "harap tunggu sebentar kami akan mengirimkan nomor verifikasi"
          );

          setTimeout(() => {
            openAlert("verifikasi", {
              verification_number,
              data: patientPersonalData,
              type: "registration",
            });
          }, 1200);
        }
      }
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: "value1" | "value2"
  ) => {
    e.preventDefault();
    if (id === "value1") {
      setPasswordValue((prev) => ({ ...prev, value1: e.target.value }));
    } else {
      setPasswordValue((prev) => ({
        ...prev,
        value2: e.target.value,
      }));
    }
  };
  if (!newPatientPersonal) return <div></div>;
  else {
    return (
      <div className="modal-md p-5 overflow-hidden bg-white h-fit">
        <button className="absolute top-2 right-4" onClick={() => closeModal()}>
          <FontAwesomeIcon icon={faClose} />
        </button>

        <div className="w-full flex-center-center flex-col gap-2 p-2  transition-all  m-auto">
          <h4 className="tracking-[3px]">Cek Data dan Masukkan password</h4>
          <form
            className="w-full flex flex-col gap-2"
            onSubmit={(e) => handleSubmit(e)}
          >
            <FormInput
              text="Password Anda"
              passwordValue={passwordValue}
              valueKey="value1"
              handleChange={handleChange}
            />
            <FormInput
              text="Ulangi Password"
              passwordValue={passwordValue}
              valueKey="value2"
              handleChange={handleChange}
            />

            <SalinRekamMedis copyText={copyText} setCopyText={setCopyText} />
            <DataPasien />

            <button type="submit" className="button-greenUrip mx-auto">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
};

export default ModalRegisterPassword;

type CopyProps = {
  copyText: boolean;
  setCopyText: React.Dispatch<React.SetStateAction<boolean>>;
};
const SalinRekamMedis = ({ copyText, setCopyText }: CopyProps) => {
  const { state } = useGlobalContext();
  const newPatientPersonal: PatientInitialValueType =
    state.modalValue.newPatientPersonal;
  return (
    <div className="w-full">
      <p className="body-2-bold">Nomor Rekam Medis</p>
      <p className="dark-input text-lg uppercase p-1 px-2">
        {!copyText
          ? newPatientPersonal["medical_record_number"].value
          : getMedicalRecord(newPatientPersonal["medical_record_number"].value)}
      </p>
      <div className="flex-center-between my-1">
        <p>Harap salin nomor ini untuk login nanti</p>
        <button
          onClick={() => {
            setCopyText(true);
            navigator.clipboard.writeText(
              newPatientPersonal["medical_record_number"].value
            );
          }}
          disabled={copyText ? true : false}
          className={
            copyText
              ? "button-grey w-fit text-xs p-2 py-1"
              : "button-greenUrip w-fit text-xs p-2 py-1"
          }
        >
          Sudah Disalin
        </button>
      </div>
    </div>
  );
};

const DataPasien = () => {
  const { state, openModal } = useGlobalContext();

  const newPatientPersonal: PatientInitialValueType =
    state.modalValue.newPatientPersonal;
  return (
    <>
      <div className=" standard-border p-2 w-full flex flex-col">
        {Object.entries(patientFormInput).map(([key, values]) => {
          const [_, patientValue] = Object.entries(newPatientPersonal).find(
            ([item, _]) => item === key
          )!;

          return (
            <div key={values.id} className="grid grid-cols-2">
              <p>{values.title}</p>
              {key === "sex" && (
                <p className="capitalize">
                  :&nbsp;{patientValue.value.sex ? "pria" : "wanita"}
                </p>
              )}
              {key !== "sex" && (
                <p className="capitalize">:&nbsp;{patientValue.value}</p>
              )}
            </div>
          );
        })}
        <button
          onClick={() => openModal("registration", { newPatientPersonal })}
          className="button-greenUrip w-fit text-xs p-2 py-1 ml-auto"
        >
          Perbaiki Data
        </button>
      </div>

      <p className="body-3 text-left">
        Jika data sudah benar, silahkan memasukkan password, dan kami akan
        mengirimkan nomor verifikasi ke nomor hp yang Anda daftarkan
      </p>
    </>
  );
};

type FormInputType = {
  passwordValue: {
    value1: string;
    value2: string;
  };
  valueKey: "value1" | "value2";
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: "value1" | "value2"
  ) => void;
  text: string;
};

const FormInput = ({
  passwordValue,
  handleChange,
  text,
  valueKey,
}: FormInputType) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-full">
      <p>{text}</p>
      <div className=" flex">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="masukkan password"
          className="active-input rounded-r-none"
          value={passwordValue[valueKey] || ""}
          onChange={(e) => handleChange(e, valueKey)}
        />
        <button
          onClick={() => setShowPassword(!showPassword)}
          type="button"
          className="w-10 ml-auto standard-border border rounded-l-none border-l-0 hover:bg-greyLit transition-all"
        >
          <FontAwesomeIcon icon={!showPassword ? faEye : faEyeLowVision} />
        </button>
      </div>
    </div>
  );
};
