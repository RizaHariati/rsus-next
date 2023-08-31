"use client";
import React from "react";

import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen, faPerson } from "@fortawesome/free-solid-svg-icons";
import PatientProfile from "./PatientProfile";
import UserLogin from "./UserLogin";

type Props = {};

const LinkProfile = () => {
  const {
    toggleMenuNavbar,
    patientState: { user },
  } = useGlobalContext();

  return (
    <div className="relative h-full">
      {user.login && (
        <button
          id="profile"
          onClick={(e) => toggleMenuNavbar(e.currentTarget.id)}
          className="navbar-link  "
        >
          <FontAwesomeIcon icon={faPerson} className="navbar-link-icon" />
          <p className="text-link">Profil </p>
        </button>
      )}
      {!user.login && (
        <button
          id="login"
          onClick={(e) => toggleMenuNavbar(e.currentTarget.id)}
          className="navbar-link  "
        >
          <FontAwesomeIcon icon={faDoorOpen} className="navbar-link-icon" />
          <p>Login</p>
        </button>
      )}
      <PatientProfile />
      <UserLogin />
      {/* DROP MENU PROFILE */}
    </div>
  );
};

export default LinkProfile;
