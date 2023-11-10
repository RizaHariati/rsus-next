import moment from "moment";
import {
  sampleNotifications,
  sampleProfile,
  sampleSchedule,
} from "../data/sample";
import { PatientState } from "./interfaces";
export const initialPatientState: PatientState = {
  user: {
    login: false,
    password: "",
    medical_record_number: "",
  },
  patient: {
    medical_record_number: "US4234123398",
    patient_profile: sampleProfile,
    scheduled_appointments: sampleSchedule,
    medical_records: [],
    notifications: sampleNotifications,
  },
  // patient: {
  //   medical_record_number: "",
  //   patient_profile: {
  //     name: "",
  //     NIK: "",
  //     address: "",
  //     sex: 1,
  //     birthdate: moment().format("YYYY-MM-DD[T]HH:mm"),
  //     phone: "",
  //     register_date: moment().format("YYYY-MM-DD[T]HH:mm"),
  //     password: "",
  //     bpjs_number: "",
  //   },
  //   scheduled_appointments: [],
  //   medical_records: [],
  //   notifications: [],
  // },

  verification_number: 0,
  allPatients: [
    {
      medical_record_number: "US4234123398",
      patient_profile: sampleProfile,
      scheduled_appointments: sampleSchedule,
      medical_records: [],
      notifications: sampleNotifications,
    },
  ],
  scheduleAppointments: sampleSchedule,
  selectedScheduleAppointment: sampleSchedule[0],
  scheduleDestinationList: null,
  selectedScheduleDestination: null,
};
