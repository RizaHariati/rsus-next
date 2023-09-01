import { PatientState } from "./interfaces";
export const initialPatientState: PatientState = {
  user: {
    login: false,
    password: "",
    medical_record_number: "",
  },

  verification_number: 0,
  patientProfile: {
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
  },
  medicalRecords: [],
  scheduledAppointments: [],
  allPatients: [
    {
      medical_record_number: "US4234123398",
      name: "Purwanto",
      NIK: "3327051303890004",
      address: "Jl. Letjen Suprapto no.5",
      sex: true,
      birthdate: "13/08/1989",
      phone: "08121234567890",
      register_date: "17/08/2023",
      password: "password",
      bpjs_number: "0001454326918",
    },
  ],
};
