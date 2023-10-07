import { UserType, PatientType } from "../../patientTypes";

export const setUser = (user: UserType, patient: PatientType) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("patient", JSON.stringify(patient));
};

export const setPatient = (patient: PatientType) => {
  localStorage.setItem("patient", JSON.stringify(patient));
};
