import { sampleNotifications, sampleProfile } from "../data/sample";
import { PatientState } from "./interfaces";
export const initialPatientState: PatientState = {
  user: {
    login: false,
    password: "",
    medical_record_number: "",
  },

  patient: {
    medical_record_number: "",
    patient_profile: {
      name: "",
      NIK: "",
      address: "",
      sex: true,
      birthdate: "",
      phone: "",
      register_date: "",
      password: "",
      bpjs_number: "",
    },
    scheduled_appointments: [],
    medical_records: [],
    notifications: [],
  },

  verification_number: 0,
  allPatients: [
    {
      medical_record_number: "US4234123398",
      patient_profile: sampleProfile,
      scheduled_appointments: [],
      medical_records: [],
      notifications: sampleNotifications,
    },
  ],
};
