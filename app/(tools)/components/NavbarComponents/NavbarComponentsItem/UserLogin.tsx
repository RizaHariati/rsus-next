import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import RegisterSuggestion from "@/app/(tools)/modal/RegisterSuggestion";
import { UserType } from "@/app/(tools)/patientTypes";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import InputMedicalRecord from "../../InputMedicalRecord";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeLowVision } from "@fortawesome/free-solid-svg-icons";
import { getPatients } from "@/sanity/sanityUtils/getPatients";
type Props = {};

const UserLogin = (props: Props) => {
  const {
    state: { menu_id },
  } = useGlobalContext();
  return (
    <div
      className={
        menu_id != "login"
          ? "login-menu-container-hidden  "
          : "login-menu-container"
      }
    >
      <LoginFormContent />
    </div>
  );
};

export default UserLogin;

export const LoginFormContent = () => {
  const { openAlert } = useGlobalContext();
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
      toast.error("Nomor rekam medis minimal 12 karakter", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    } else {
      const checkingPatient = new Promise((resolve) => {
        resolve(
          getPatients(loginData.medical_record_number, loginData.password)
        );
      });
      checkingPatient.then((res) => {
        if (!res || Object.keys(res).length < 1) {
          toast.error("Nomor Rekam Medis/Password salah", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          const verification_number = Math.floor(Math.random() * 9000 + 1000);
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

          setLoginData({
            medical_record_number: "",
            password: "",
          });
        }
      });
    }
  };

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
      setLoginData((prev) => ({
        ...prev,
        medical_record_number: e.target.value,
      }));
    }
  };
  return (
    <>
      <div className="w-full flex-center-center gap-3 mb-3 ">
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
            autoComplete="new-password"
            maxLength={20}
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
        <RegisterSuggestion setLoginData={setLoginData} />
        <button
          type="submit"
          className="button-greenUrip mx-auto md:ml-auto mt-2"
        >
          Login
        </button>
      </form>
      <p className="body-3 leading-4 text-center text-greyDrk">
        Jika Anda lupa password atau nomor rekam medis, maka anda harus datang
        ke RS Urip Sumoharjo untuk reset password
      </p>
      <p className="body-3 leading-4 text-center mt-2 text-black">
        Masukkan nomor Rekam Medis: US4234123398 dan password: password untuk
        test login
      </p>
    </>
  );
};
