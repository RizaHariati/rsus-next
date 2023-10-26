import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { toast } from "react-toastify";
import MainLogoImage from "../modal/MainLogoImage";
import { NotificationType, PatientType, UserType } from "../patientTypes";

import { getPatient } from "@/sanity/sanityUtils/getPatient";
import { setUser } from "../utils/localData/setStorageData";
import moment from "moment";
import { postPatient } from "@/sanity/sanityUtils/postPatient";

import { PropagateLoader, RingLoader } from "react-spinners";
import Error from "next/error";
import { loadingPatient, loginUser } from "./alertVerifikasiUtils/loginUser";
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
    patientState: { patient },
    closeAlert,
    openAlert,
    login,
    toggleMenuNavbar,
    addingNotification,
  } = useGlobalContext();
  const verification_number = alertValue.verification_number;
  const data = alertValue.data;
  const type = alertValue.type;
  const [verified, setVerified] = useState<CheckType[]>(placehoder_values);
  const [checking, setChecking] = useState(false);
  const [Loading, setLoading] = useState(false);
  /* ----------------- CHECKING VERIFICATION NUMBER ----------------- */
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

  const createLoginUser = () => {
    loginUser(patient, data).then((resNotif: any) => {
      const loggingUser = new Promise((resolve, reject) => {
        if (!resNotif || resNotif.status !== 200) {
          return reject("new notification is not registered");
        } else {
          const gettingPatient = new Promise((resolve) => {
            resolve(getPatient(data.medical_record_number, data.password));
          }).then((patient: any) => {
            return loadingPatient(patient, resNotif);
          });
          return resolve(gettingPatient);
        }
      });
      loggingUser
        .then((res: any) => {
          setUser(res.user);
          return login(res.user, res.patient);
        })
        .then((res) => {
          toggleMenuNavbar("profile");
          setLoading(false);
          closeAlert();
          return res;
        });
    });

    toast.promise(loginUser(patient, data), {
      pending: "Loading data pasien..",
      success: "Selamat datang di RS Urip Sumoharjo ",
      error: "Nomor Rekam Medis/Password salah",
    });
  };

  const registerNewUser = () => {
    let newNotification = {
      id: "ntf-001",
      notification_code: "ncat-002",
      notification_date: moment().format("YYYY-MM-DD[T]HH:mm"),
      seen: false,
    };
    let newPatient: PatientType = patient;

    /* -------------- PLACING DATA INTO NEW PATIENT RECORD -------------- */
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
      notifications: [{ ...newNotification }],
    };

    const patientExist = new Promise((resolve) => {
      return resolve(getPatient(newPatient.medical_record_number, ""));
    });

    patientExist.then((res: any) => {
      if (!res) {
        closeAlert();
        return toast.error("terjadi kesalahan sistem");
      } else {
        if (res.length > 0) {
          closeAlert();
          return toast.error("Medical Record Exist");
        } else {
          const posting = new Promise((resolve) => {
            setLoading(true);
            return resolve(postPatient(newPatient));
          });
          posting
            .then((res: any) => {
              setLoading(false);
              if (res && res.status === 200) {
                openAlert("registrasisukses", {
                  newPatientPersonal: data,
                });
              } else {
                return toast.error("terjadi kesalahan teknis");
              }
            })
            .catch((err) => console.log(err));
        }
      }
    });
  };

  useEffect(() => {
    if (!checking) return;
    else {
      if (type === "login") {
        createLoginUser();
      } else if (type === "registration") {
        registerNewUser();
      } else {
        console.log(type);
      }
    }

    return () => {};
    // eslint-disable-next-line
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

          <div className="h-10 bg-white flex-center-center w-full">
            <PropagateLoader
              color="#007814"
              loading={Loading}
              size={10}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </section>
      </div>
    );
    ``;
  }
};

export default AlertVerifikasi;
