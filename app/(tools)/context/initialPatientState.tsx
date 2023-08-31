import { PatientState } from "./interfaces";
export const initialPatientState: PatientState = {
  user: {
    login: false,
    password: "",
    medical_record_number: "",
  },
  user_checked: { medical_record: "", password: "", checked: false },
  verification_number: 0,
  patientProfile: {
    name: "",
    NIK: "",
    address: "",
    sex: true,
    birthdate: "",
    phone: "",
  },

  patient: {
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
  },
  allMedicalRecords: [
    {
      register_date: "17/08/2023",
      medical_record_number: "US4234123398",
      password: "password",
      bpjs: true,
      bpjs_number: "0001454326918",
      profile: {
        name: "Purwanto",
        NIK: "3327051303890004",
        address: "Jl. Letjen Suprapto no.5",
        sex: true,
        birthdate: "13/08/1989",
        phone: "08121234567890",
      },
    },
  ],
};
