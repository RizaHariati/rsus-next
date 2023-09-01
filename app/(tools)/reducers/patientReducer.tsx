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
    let verification_number = patientState.verification_number;
    const findMedicalRecord = allMedicalRecords.find(
      (item) => item.medical_record_number === loginData.medical_record_number
    );
    if (findMedicalRecord) {
      verification_number = Math.floor(Math.random() * 9000 + 1000);
    } else {
      verification_number = verification_number + 1;
    }

    return {
      ...patientState,
      verification_number,
    };
  }
  if (action.type === "LOGIN_USER") {
    const allMedicalRecords = patientState.allMedicalRecords;
    const loginData = action.payload;
    const findMedicalRecord = allMedicalRecords.find(
      (item) => item.medical_record_number === loginData.medical_record_number
    );
    let patientProfile = patientState.patientProfile;
    let patient = patientState.patient;
    if (findMedicalRecord) {
      patient = findMedicalRecord;
      patientProfile = findMedicalRecord.profile;
    }
    let user = {
      ...action.payload,
      login: true,
    };

    return {
      ...patientState,
      user,
      patientProfile,
      patient,
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
