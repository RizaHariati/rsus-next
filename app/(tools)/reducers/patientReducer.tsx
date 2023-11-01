import moment from "moment";
import { PatientState } from "../context/interfaces";

import { PatientType, ScheduledType } from "../patientTypes";

interface OpenModalAction {
  type: string;
  payload?: any;
}
export const patientReducer = (
  patientState: PatientState,
  action: OpenModalAction
) => {
  if (action.type === "LOAD_PATIENT") {
    const patient = action.payload.patient;
    return {
      ...patientState,
      patient,
    };
  }
  if (action.type === "LOAD_USER") {
    const { user } = action.payload;

    const patient = action.payload.patient;
    return {
      ...patientState,
      patient,
      user,
    };
  }
  if (action.type === "REGISTER_USER") {
    const newPatient: PatientType = action.payload.newPatient;

    const allPatients: PatientType[] = patientState.allPatients;
    allPatients.push(newPatient);

    return {
      ...patientState,
      allPatients,
    };
  }

  if (action.type === "LOGIN_USER") {
    const patient = action.payload.patient;
    const user = action.payload.user;

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
        birthdate: moment().format("YYYY-MM-DD[T]HH:mm"),
        phone: "",
        register_date: moment().format("YYYY-MM-DD[T]HH:mm"),
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

    if (patient && patient.scheduled_appointments) {
      patient = {
        ...patient,
        scheduled_appointments: [
          ...patient.scheduled_appointments,
          newSchedule,
        ],
      };
    }
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
