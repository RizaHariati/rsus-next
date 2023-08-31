import { PatientState } from "../context/interfaces";
import { LabCartType } from "../types";
import { appReducer } from "./appReducer";

interface OpenModalAction {
  type: string;
  payload?: any;
}
export const patientReducer = (
  patientState: PatientState,
  action: OpenModalAction
) => {
  if (action.type === "CHECK_USER") {
    const allMedicalRecords = patientState.allMedicalRecords;
    const loginData = action.payload;
    console.log(loginData);

    return {
      ...patientState,
    };
  }
  if (action.type === "LOGIN_USER") {
    let user = {
      ...action.payload,
      login: true,
    };

    return {
      ...patientState,
      user,
    };
  }
  if (action.type === "LOGOUT_USER") {
    let user = {
      login: false,
      password: "",
      medical_record_number: "",
    };

    let patientProfile = {
      name: "",
      NIK: "",
      address: "",
      sex: true,
      birthdate: "",
      phone: "",
    };

    let patient = {
      register_date: "",
      medical_record_number: "",
      password: "",
      profile: {
        name: "",
        NIK: "",
        address: "",
        sex: true,
        birthdate: "",
        phone: "",
      },
      bpjs: true,
      bpjs_number: "",
      schedule: [],
    };
    return {
      ...patientState,
      user,
      patientProfile,
      patient,
    };
  }

  return patientState;
};
