import { PatientType, UserType } from "../../patientTypes";
import { getPatient } from "../../../../sanity/sanityUtils/getPatient";
import { initialPatientState } from "../../context/initialPatientState";

export const getUser = async () => {
  let patient: PatientType = initialPatientState.patient;

  return { patient };
};
