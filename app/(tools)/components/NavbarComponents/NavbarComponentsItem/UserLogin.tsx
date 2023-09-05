import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import RegisterSuggestion from "@/app/(tools)/modal/RegisterSuggestion";
import { UserType } from "@/app/(tools)/patientTypes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import InputMedicalRecord from "../../InputMedicalRecord";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeLowVision } from "@fortawesome/free-solid-svg-icons";
type Props = {};

const UserLogin = (props: Props) => {
  const {
    checkUser,
    toggleMenuNavbar,
    openAlert,
    state: { menu_id },
    patientState: { verification_number },
  } = useGlobalContext();
  const [loginData, setLoginData] = useState<Partial<UserType>>({
    medical_record_number: "",
    password: "",
  });
  const [showValue, setShowValue] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loginData.password === "" || loginData.medical_record_number === "") {
      toast.error("form harus diisi semua", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    } else if (loginData.medical_record_number!.length < 12) {
      toast.error("Nomor rekam medis tidak sesuai format", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    } else {
      checkUser(loginData);
    }
  };

  useEffect(() => {
    if (loginData.password !== "" && loginData.medical_record_number !== "") {
      if (verification_number < 1000) {
        if (verification_number < 10) {
          toast.error(
            "Tidak ditemukan pasien dengan nomor dan password tersebut",
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
        } else if (verification_number >= 10) {
          toggleMenuNavbar(null);
          toast.error(
            "Anda sudah terlalu banyak memasukkan data yang salah, harap reload kembali",
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
        }
      } else {
        toast.info(
          "harap tunggu sebentar kami akan mengirimkan nomor verifikasi"
        );
        setTimeout(() => {
          openAlert("verifikasi", {
            verification_number,
            data: loginData,
            type: "login",
          });
        }, 1200);
      }
    }
    setLoginData({
      medical_record_number: "",
      password: "",
    });
  }, [verification_number]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    e.preventDefault();
    if (type === "password") {
      setLoginData((prev) => ({
        ...prev,
        password: e.target.value,
      }));
    } else {
      const a = e.target.value;
      let newvalue = "";
      for (let i = 0; i < a.length; i++) {
        const element = a[i];
        if (element !== "-") {
          newvalue = newvalue + element;
        }
      }

      setLoginData((prev) => ({
        ...prev,
        medical_record_number:
          newvalue.length > 12
            ? newvalue.toUpperCase().slice(0, -1)
            : newvalue.toUpperCase(),
      }));
    }
  };

  return (
    <div
      className={
        menu_id != "login"
          ? "login-menu-container-hidden  "
          : "login-menu-container"
      }
    >
      <div className="w-full flex-center-center gap-3 mb-3">
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
        <h4>Login Form</h4>
      </div>

      <form
        onSubmit={(e) => handleSubmit(e)}
        className=" p-3 px-5 flex-center-center flex-col gap-2 w-full standard-border mb-3"
      >
        <InputMedicalRecord
          medical_record_number={loginData.medical_record_number || ""}
          handleChange={handleChange}
        />

        <p className="text-left w-full">Password</p>
        <div className="w-full inline-flex">
          <input
            type={showValue ? "text" : "password"}
            placeholder="masukkan password"
            className="active-input rounded-r-none"
            value={loginData.password}
            onChange={(e) => handleChange(e, "password")}
          />
          <button
            type="button"
            onClick={() => setShowValue(!showValue)}
            className="active-input w-10 hover:bg-greyLit rounded-l-none"
          >
            <FontAwesomeIcon icon={showValue ? faEyeLowVision : faEye} />
          </button>
        </div>
        <RegisterSuggestion />
        <button type="submit" className="button-greenUrip ml-auto mt-2">
          Login
        </button>
      </form>
      <p className="body-3 leading-4 text-center text-greyDrk">
        Jika Anda lupa password atau nomor rekam medis, maka anda harus datang
        ke RS Urip Sumoharjo untuk reset password
      </p>
      <p className="body-3 leading-4 text-center mt-2 text-black">
        Masukkan nomor Rekam Medis:US4234123398 dan password:password untuk test
        login
      </p>
    </div>
  );
};

export default UserLogin;
