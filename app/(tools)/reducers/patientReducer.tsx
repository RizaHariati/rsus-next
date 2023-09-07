import { PatientState } from "../context/interfaces";

import { PatientInitialValueType, PatientType } from "../patientTypes";

interface OpenModalAction {
  type: string;
  payload?: any;
}
export const patientReducer = (
  patientState: PatientState,
  action: OpenModalAction
) => {
  if (action.type === "REGISTER_USER") {
    let patient: PatientType = {
      medical_record_number: "",
      patient_profile: {
        name: "",
        NIK: "",
        address: "",
        sex: true,
        birthdate: new Date(),
        phone: "",
        register_date: new Date(),
        password: "",
        bpjs_number: "",
      },
      scheduled_appointments: [],
      medical_records: [],
      notifications: [],
    };
    const newPatientPersonal: PatientInitialValueType =
      action.payload.newPatientPersonal;
    Object.entries(newPatientPersonal).map(([key, values]) => {
      if (key === "medical_record_number") {
        patient = { ...patient, [key]: values.value };
      } else {
        patient = {
          ...patient,
          patient_profile: {
            ...patient["patient_profile"],
            [key]: values.value,
          },
        };
      }
      return "";
    });
    const allPatients: PatientType[] = patientState.allPatients;
    allPatients.push(patient);

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
    const loginData = action.payload;

    const findPatient = allPatients.find(
      (item) => item.medical_record_number === loginData.medical_record_number
    );

    let patient = patientState.patient;
    if (findPatient) {
      patient = findPatient;
    }
    let user = {
      ...action.payload,
      login: true,
    };

    return {
      ...patientState,
      user,
      patient,
    };
  }

  if (action.type === "LOGOUT_USER") {
    let user = {
      login: false,
      password: "",
      medical_record_number: "",
    };
    let patient = {
      medical_record_number: "",
      patient_profile: {
        name: "",
        NIK: "",
        address: "",
        sex: true,
        birthdate: new Date(),
        phone: "",
        register_date: new Date(),
        password: "",
        bpjs_number: "",
      },
      scheduled_appointments: [],
      medical_records: [],
      notifications: [],
    };

    return {
      ...patientState,
      user,
      patient,
    };
  }

  return patientState;
};
