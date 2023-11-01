import { PatientType, UserType } from "../../patientTypes";
import { getPatient } from "../../../../sanity/sanityUtils/getPatient";
import { initialPatientState } from "../../context/initialPatientState";

export const getUser = async () => {
  let user: UserType = initialPatientState.user;
  let patient: PatientType = initialPatientState.patient;

  return { user, patient };
};
