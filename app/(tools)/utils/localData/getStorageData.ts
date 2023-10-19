import { PatientType, UserType } from "../../patientTypes";
import { getPatient } from "@/sanity/sanityUtils/getPatient";
import { initialPatientState } from "../../context/initialPatientState";

export const getUser = async () => {
  let user: UserType = initialPatientState.user;
  let patient: PatientType = initialPatientState.patient;

  const getUserFromStorage: UserType | null = localStorage.getItem("user")
    ? await JSON.parse(localStorage.getItem("user") || "")
    : "";

  if (
    getUserFromStorage &&
    getUserFromStorage.login &&
    getUserFromStorage.medical_record_number
  ) {
    const { medical_record_number, password } = getUserFromStorage;
    const { data }: any = await getPatient(medical_record_number, password);

    if (data && Object.keys(data).length > 0) {
      return { user: getUserFromStorage, patient: data };
    } else {
      return { user, patient };
    }
  } else {
    return { user, patient };
  }
};
