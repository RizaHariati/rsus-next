import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { toast } from "react-toastify";
import MainLogoImage from "../modal/MainLogoImage";
import { PatientType } from "../patientTypes";
import { getNotificationID } from "../utils/getNotificationID";
type CheckType = { id: number; value: string };
type Props = {};
const placehoder_values: CheckType[] = [
  { id: 0, value: "-" },
  { id: 1, value: "-" },
  { id: 2, value: "-" },
  { id: 3, value: "-" },
];
const AlertVerifikasi = (props: Props) => {
  const {
    state: { alertValue },
    patientState: { patient, allPatients },
    closeAlert,
    openAlert,
    login,
    toggleMenuNavbar,
    register,
  } = useGlobalContext();
  const verification_number = alertValue.verification_number;
  const data = alertValue.data;
  const type = alertValue.type;
  const [verified, setVerified] = useState<CheckType[]>(placehoder_values);
  const [checking, setChecking] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: CheckType,
    index: number
  ) => {
    if (!document || !typeof document) return;
    else {
      const keyword = e.target.value.slice(-1);
      let a = "";
      const newArray = verified.map((ver: CheckType, index: number) => {
        if (ver.id === item.id) {
          const newVer = { ...item, value: keyword };
          a = a + keyword;
          return newVer;
        } else {
          a = a + ver.value;
          return ver;
        }
      });

      if (a === verification_number.toString()) {
        setChecking(true);
      } else {
        setChecking(false);
      }
      setVerified(newArray);
      if (index < verified.length - 1) {
        document.getElementById(`verinput${index + 1}`)!.focus();
      }
    }
  };

  useEffect(() => {
    if (!checking) return;
    else {
      let newPatient: PatientType = patient;
      let newNotification = {
        id: "ntf-001",
        notification_code: "ncat-001",
        notification_date: new Date(),
        seen: false,
      };
      if (type === "login") {
        const findPatient: PatientType | undefined = allPatients.find(
          (item) => item.medical_record_number === data.medical_record_number
        );

        newPatient = {
          ...findPatient!,
          notifications: [
            ...findPatient!.notifications,
            {
              ...newNotification,
              id: getNotificationID(findPatient!.notifications),
            },
          ],
        };

        const loginUser = async () => {
          await login(newPatient);
          setTimeout(() => {
            closeAlert();
            toggleMenuNavbar("profile");
          }, 1000);
        };

        toast.promise(loginUser, {
          pending: "Promise is pending",
          success: "Selamat Datang di Urip Sumoharjo ",
        });
      } else if (type === "registration") {
        Object.entries(data).map(([key, values]: any) => {
          if (key === "medical_record_number") {
            newPatient = { ...newPatient, [key]: values.value };
          } else {
            newPatient = {
              ...newPatient,
              patient_profile: {
                ...newPatient["patient_profile"],
                [key]: values.value,
              },
            };
          }
          return "";
        });
        newPatient = {
          ...newPatient,
          notifications: [
            { ...newNotification, notification_code: "ncat-002" },
          ],
        };

        openAlert("registrasisukses", {
          newPatientPersonal: data,
        });
        register(newPatient);
      } else {
        console.log(type);
      }
    }

    return () => {};
  }, [checking]);

  if (!verification_number || verification_number < 1000) return <div></div>;
  else {
    return (
      <div className="modal-phone md:modal-md p-2 md:p-5 px-5 md:px-10 overflow-hidden bg-white">
        <button className="absolute top-2 right-4" onClick={() => closeAlert()}>
          <FontAwesomeIcon icon={faClose} />
        </button>
        <section className="bg-white border-none flex-center-center flex-col gap-5">
          <MainLogoImage />
          <p className="body-2 text-center">
            Silahkan masukkan empat nomor yang dikirimkan via Whatsapp
          </p>
          <div className="flex-center-center gap-2">
            {verified.map((item: CheckType, index: number) => {
              return (
                <div
                  key={index}
                  className=" text-center w-16 md:w-20 h-fit font-bold py-3"
                >
                  <input
                    id={`verinput${index}`}
                    placeholder="-"
                    value={verified[index].value}
                    onFocus={(e) => (e.currentTarget.value = "")}
                    onChange={(e) => {
                      handleChange(e, item, index);
                    }}
                    className="w-full text-center active-input text-4xl md:text-6xl h-fit"
                  />
                </div>
              );
            })}
          </div>

          <div className="w-full">
            <p className="text-right w-full">
              Masukkan angka&nbsp;
              <span className="font-bold">{verification_number}</span>
            </p>
          </div>
        </section>
      </div>
    );
  }
};

export default AlertVerifikasi;
