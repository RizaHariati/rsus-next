import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import RegisterSuggestion from "@/app/(tools)/modal/RegisterSuggestion";
import { UserType } from "@/app/(tools)/patientTypes";
import { editMRValue } from "@/app/(tools)/utils/editMRValue";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import InputMedicalRecord from "../../InputMedicalRecord";
type Props = {};

const UserLogin = (props: Props) => {
  const {
    login,
    checkUser,
    toggleMenuNavbar,
    state: { menu_id },
  } = useGlobalContext();
  const [loginData, setLoginData] = useState<Partial<UserType>>({
    medical_record_number: "",
    password: "",
  });

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
      toggleMenuNavbar("login");
      setLoginData({
        medical_record_number: "",
        password: "",
      });
      toast.success("Login berhasil");
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
          priority
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
        <input
          placeholder="masukkan password"
          className="active-input"
          value={loginData.password}
          onChange={(e) => handleChange(e, "password")}
        />
        <RegisterSuggestion />
        <button type="submit" className="button-greenUrip ml-auto mt-2">
          Login
        </button>
      </form>
      <p className="body-3 leading-4 text-center">
        Jika Anda lupa password atau nomor rekam medis, maka anda harus datang
        ke RS Urip Sumoharjo untuk reset password
      </p>
      <p className="body-3 leading-4 text-center">
        Masukkan nomor Rekam Medis:US4234123398 dan password:password untuk test
        login
      </p>
    </div>
  );
};

export default UserLogin;
