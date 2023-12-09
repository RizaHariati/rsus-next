"use client";

import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../context/AppProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeLowVision } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

type Props = {};
export type AdminType = {
  id_admin: string;
  password: string;
};

const LoginForm = (props: Props) => {
  const { createToken } = useGlobalContext();
  const [loginAdmin, setLoginAdmin] = useState<AdminType>({
    id_admin: "",
    password: "",
  });
  const [showValue, setShowValue] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loginAdmin.password === "" || loginAdmin.id_admin === "") {
      toast.error("form harus diisi semua", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    if (loginAdmin.password !== "password" || loginAdmin.id_admin !== "Admin") {
      toast.error("password/id admin salah", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    } else {
      const promise = new Promise((resolve) => {
        resolve(createToken());
      });
      promise.then((res) => {
        const promise2 = new Promise((resolve) => {
          toast.success("Login berhasil, selamat bekerja Admin");
          setTimeout(() => {
            resolve(router.push("/"));
          }, 1000);
        });
        promise2.then((res2) => {
          return res2;
        });
        return res;
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    e.preventDefault();
    if (type === "password") {
      setLoginAdmin((prev) => ({
        ...prev,
        password: e.target.value,
      }));
    } else {
      setLoginAdmin((prev) => ({
        ...prev,
        id_admin: e.target.value,
      }));
    }
  };
  return (
    <div className="w-full max-w-md  h-full  flex-center-center  flex-col p-3 mx-auto">
      <div className=" w-full  h-fit  flex-center-center gap-3 mb-3 ">
        <Image
          rel="preload"
          placeholder="empty"
          src="/static/images/navbar/main-logo.png"
          width={30}
          height={30}
          className=" object-covers rounded-full overflow-hidden"
          alt="main-logo"
          loading="lazy"
        />
        <h4>LoginAdmin</h4>
      </div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className=" p-3 px-5 flex-center-center flex-col gap-2 w-full standard-border mb-3"
      >
        <div className="w-full">
          <p className="text-left w-full">ID Admin</p>
          <input
            maxLength={12}
            id="input_mr"
            placeholder="Masukkan nama Admin"
            className="active-input"
            value={loginAdmin.id_admin}
            onChange={(e) => handleChange(e, "mrnumber")}
          />
        </div>

        <p className="text-left w-full">Password</p>
        <div className="w-full inline-flex">
          <input
            autoComplete="new-password"
            maxLength={20}
            type={showValue ? "text" : "password"}
            placeholder="masukkan password Admin"
            className="active-input rounded-r-none"
            value={loginAdmin.password}
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

        <button
          type="submit"
          className="button-greenUrip mx-auto md:ml-auto mt-2"
        >
          Login
        </button>
      </form>

      <p className="text-sm leading-4 text-center mt-2 text-greyDrk">
        Masukkan ID Admin: Admin dan password: password untuk test login. Untuk
        simulasi data tidak bisa diubah.
      </p>
    </div>
  );
};

export default LoginForm;
