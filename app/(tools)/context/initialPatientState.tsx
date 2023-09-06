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
      patient_profile: {
        name: "Purwanto",
        NIK: "051303890004",
        address: "Jl. Letjen Suprapto no.5",
        sex: true,
        birthdate: "13/02/1989",
        phone: "08121234567890",
        register_date: "17/08/2023",
        password: "password",
        bpjs_number: "0001454326918",
      },
      scheduled_appointments: [],
      medical_records: [],
      notifications: [],
    },
  ],
};
