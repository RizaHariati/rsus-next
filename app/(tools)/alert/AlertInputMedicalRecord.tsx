import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";

import MainLogoImage from "../modal/MainLogoImage";
import { UserType } from "../patientTypes";
import { toast } from "react-toastify";
import { getPatient } from "@/sanity/sanityUtils/getPatient";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {};
const AlertInputMedicalRecord = (props: Props) => {
  const {
    closeAlert,
    loadingPatient,
    patientState: { patient },
  } = useGlobalContext();
  const [loginData, setLoginData] = useState<Partial<UserType>>({
    medical_record_number: "",
    password: "admin",
  });

  const Route = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loginData.medical_record_number === "") {
      toast.error("form harus diisi semua", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    } else if (loginData.medical_record_number!.length < 12) {
      toast.error("Nomor rekam medis minimal 12 karakter", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    } else {
      const checkingPatient = new Promise((resolve) => {
        return resolve(getPatient(loginData.medical_record_number!, "admin"));
      }).then((res: any) => {
        if (!res) {
          closeAlert();
          toast.error("terjadi kesalahan sistem");
        } else {
          const patientExist = new Promise((resolve, reject) => {
            if (Object.keys(res).length < 1) {
              return reject("nomor rekam medis salah");
            } else {
              return resolve(loadingPatient(res));
            }
          }).then((patientRes: any) => {
            if (patientRes.medical_record_number) {
              closeAlert();
              Route.push("/adminpatient");
              return patientRes;
            }
            return res;
          });

          return patientExist;
        }
      });

      toast.promise(checkingPatient, {
        pending: "Mengecek database...",
        success: "Data pasien disajikan",
        error: "Nomor Rekam Medis/Password salah",
      });
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setLoginData((prev) => ({
      ...prev,
      medical_record_number: e.target.value,
    }));
  };

  return (
    <div className="modal-phone md:modal-md p-5 px-10 md:overflow-hidden bg-white">
      <button className="absolute top-2 right-4" onClick={() => closeAlert()}>
        <FontAwesomeIcon icon={faClose} />
      </button>
      <section className="bg-white border-none flex-center-center flex-col gap-5">
        <MainLogoImage />
        <p className="body-2-bold text-center capitalize">
          Masukkan Nomor Rekam Medis Pasien
        </p>

        {patient?.medical_record_number && (
          <Link
            href="/adminpatient/"
            className="btn-base"
            onClick={() => closeAlert()}
          >
            <p className="body-2-bold text-center capitalize">
              {`Teruskan patient ${patient.patient_profile.name}`}
            </p>
          </Link>
        )}
        <form onSubmit={(e) => handleSubmit(e)} className="w-full">
          <input
            maxLength={12}
            id="input_mr"
            className="admin-input h-12"
            placeholder="Nomor Rekam Medis "
            value={loginData.medical_record_number}
            onChange={(e) => handleChange(e)}
          />
          <div className="w-full flex items-center justify-end gap-2 mt-3">
            <button className="w-fit h-10  bg-greenUrip bg-opacity-90 hover:bg-opacity-100 transition-all text-white px-10 font-medium rounded-sm flex-center-center gap-2">
              <FontAwesomeIcon icon={faMagnifyingGlass} />

              <p className="text-white ">Cari</p>
            </button>
          </div>
        </form>

        <p className=" text-sm leading-4 text-center mt-2 text-greyMed1">
          Masukkan nomor Rekam Medis: US4234123398 untuk test
        </p>
      </section>
    </div>
  );
};

export default AlertInputMedicalRecord;
