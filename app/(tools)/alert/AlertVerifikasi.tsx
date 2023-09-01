import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { LabItemType, PaketLabType } from "../types";
import { toast } from "react-toastify";
import Image from "next/image";
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
    closeAlert,
    login,
    toggleMenuNavbar,
  } = useGlobalContext();
  const verification_number = alertValue.verification_number;
  const loginData = alertValue.loginData;
  const [verified, setVerified] = useState<CheckType[]>(placehoder_values);
  const [checking, setChecking] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: CheckType
  ) => {
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
  };

  useEffect(() => {
    if (checking) {
      const resolveAfter3Sec = async () => {
        await login(loginData);
        setTimeout(() => {
          closeAlert();
          toggleMenuNavbar("profile");
        }, 1000);
      };

      toast.promise(resolveAfter3Sec, {
        pending: "Promise is pending",
        success: "Selamat Datang di Urip Sumoharjo ",
      });
    }
  }, [checking]);

  if (verification_number < 1000) return <div></div>;
  else {
    return (
      <div className="modal-md p-5 px-10 overflow-hidden bg-white">
        <button className="absolute top-2 right-4" onClick={() => closeAlert()}>
          <FontAwesomeIcon icon={faClose} />
        </button>
        <section className="bg-white border-none flex-center-center flex-col gap-5">
          <Image
            rel="preload"
            placeholder="empty"
            src="/images/navbar/main-logo.png"
            width={30}
            height={30}
            className=" object-covers rounded-full overflow-hidden"
            alt="main-logo"
            loading="lazy"
          />
          <p className="body-2 text-center">
            Silahkan masukkan empat nomor yang dikirimkan via Whatsapp
          </p>
          <div className="flex-center-center gap-2">
            {verified.map((item: CheckType, index: number) => {
              return (
                <div
                  key={index}
                  className=" text-center w-20 h-fit font-bold py-3"
                >
                  <input
                    placeholder="-"
                    value={verified[index].value}
                    onFocus={(e) => (e.currentTarget.value = "")}
                    onChange={(e) => {
                      handleChange(e, item);
                    }}
                    className="w-full text-center active-input text-6xl h-fit"
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
