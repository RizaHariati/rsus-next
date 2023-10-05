import { PatientState } from "../context/interfaces";

import {
  NotificationType,
  PatientInitialValueType,
  PatientType,
  ScheduledType,
} from "../patientTypes";
import { addZeroString } from "../utils/addZeroString";

interface OpenModalAction {
  type: string;
  payload?: any;
}
export const patientReducer = (
  patientState: PatientState,
  action: OpenModalAction
) => {
  if (action.type === "REGISTER_USER") {
    const newPatient: PatientType = action.payload.newPatient;

    const allPatients: PatientType[] = patientState.allPatients;
    allPatients.push(newPatient);

    return {
      ...patientState,
      allPatients,
    };
  }

  if (action.type === "CHECK_USER") {
    const allPatients = patientState.allPatients;
    const loginData = action.payload;
    let verification_number =
      patientState.verification_number > 999
        ? 0
        : patientState.verification_number;
    const findPatient = allPatients.find(
      (item) =>
        item.medical_record_number === loginData.medical_record_number &&
        item.patient_profile.password === loginData.password
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
    const patient = action.payload;

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
        sex: 1,
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

  if (action.type === "ADD_SCHEDULE") {
    const newSchedule: ScheduledType = action.payload.newSchedule;

    let patient: PatientType = patientState.patient;

    patient = {
      ...patient,
      scheduled_appointments: [...patient.scheduled_appointments, newSchedule],
    };
    return {
      ...patientState,
      patient,
    };
  }
  if (action.type === "CLEAR_BACKGROUND_NOTIFICATION") {
    let patient = patientState.patient;
    let notifications = patientState.patient.notifications;
    const notificationID = action.payload.notificationID;

    notifications = notifications.map((item) => {
      if (item.id === notificationID) {
        return { ...item, seen: true };
      } else {
        return item;
      }
    });
    patient = { ...patient, notifications };

    return {
      ...patientState,
      patient,
    };
  }
  if (action.type === "DELETE_NOTIFICATION") {
    let patient = patientState.patient;
    let notifications = patientState.patient.notifications;
    const notificationID = action.payload.notificationID;

    if (notificationID === "all") {
      patient = { ...patient, notifications: [] };
    } else {
      notifications = notifications.filter((item) => {
        if (item.id !== notificationID) {
          return { ...item, seen: true };
        }
      });
      patient = { ...patient, notifications };
    }

    return {
      ...patientState,
      patient,
    };
  }
  return patientState;
};
