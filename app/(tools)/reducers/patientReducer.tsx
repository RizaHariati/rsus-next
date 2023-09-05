import { PatientState } from "../context/interfaces";

import {
  MedicalRecordDataType,
  PatientInitialValueType,
  PatientProfileType,
  ScheduledType,
} from "../patientTypes";

interface OpenModalAction {
  type: string;
  payload?: any;
}
export const patientReducer = (
  patientState: PatientState,
  action: OpenModalAction
) => {
  if (action.type === "REGISTER_USER") {
    let newPatient: any = {};
    const newPatientPersonal: PatientInitialValueType =
      action.payload.newPatientPersonal;
    Object.entries(newPatientPersonal).map(([key, values]) => {
      newPatient = { ...newPatient, [key]: values.value };

      return "";
    });

    const patientProfile: PatientProfileType = { ...newPatient };
    const allPatients: PatientProfileType[] = patientState.allPatients;
    allPatients.push(patientProfile);

    return {
      ...patientState,
      allPatients,
    };
  }
  if (action.type === "CHECK_USER") {
    const allPatients = patientState.allPatients;
    const loginData = action.payload;
    let verification_number = patientState.verification_number;
    const findPatient = allPatients.find(
      (item) => item.medical_record_number === loginData.medical_record_number
    );
    if (findPatient) {
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
    const allPatients = patientState.allPatients;
    console.log({ allPatients });
    const loginData = action.payload;
    const findPatient = allPatients.find(
      (item) => item.medical_record_number === loginData.medical_record_number
    );

    let patientProfile = patientState.patientProfile;
    if (findPatient) {
      patientProfile = findPatient;
    }
    let user = {
      ...action.payload,
      login: true,
    };

    return {
      ...patientState,
      user,
      patientProfile,
    };
  }
  if (action.type === "LOGOUT_USER") {
    let user = {
      login: false,
      password: "",
      medical_record_number: "",
    };
    const patientProfile = {
      medical_record_number: "",
      name: "",
      NIK: "",
      address: "",
      sex: true,
      birthdate: "",
      phone: "",
      register_date: "",
      password: "",
      bpjs_number: "",
    };
    const medicalRecords: MedicalRecordDataType[] = [];
    const scheduledAppointments: ScheduledType[] = [];
    return {
      ...patientState,
      user,
      patientProfile,
      medicalRecords,
      scheduledAppointments,
    };
  }

  return patientState;
};
