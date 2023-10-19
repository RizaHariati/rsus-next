import { getPatientData } from "./getPatientData";

export async function patientData(
  type: string,
  medicalRecordNumber: string,
  password?: string
) {
  if (type === "getPatientWithPassword" && password) {
    return getPatientData(medicalRecordNumber, password);
  } else {
    return;
  }
}
