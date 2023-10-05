import { PatientType, UserType } from "../../patientTypes";

export const getUser = () => {
  let user: UserType = {
    login: false,
    password: "",
    medical_record_number: "",
  };
  let patient: PatientType = {
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

  const getUserFromStorage: UserType = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")?.toString() || "")
    : user;
  const getPatientFromStorage: UserType = localStorage.getItem("patient")
    ? JSON.parse(localStorage.getItem("patient")?.toString() || "")
    : patient;

  return { user: getUserFromStorage, patient: getPatientFromStorage };
};
