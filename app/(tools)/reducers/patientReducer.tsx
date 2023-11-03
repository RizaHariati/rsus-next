import { PatientState } from "../context/interfaces";

interface OpenModalAction {
  type: string;
  payload?: any;
}
export const patientReducer = (
  patientState: PatientState,
  action: OpenModalAction
) => {
  if (action.type === "LOAD_PATIENT") {
    const patient = action.payload.patient;
    return {
      ...patientState,
      patient,
    };
  }

  if (action.type === "LOAD_PATIENT_DETAIL") {
    const appointmentList = action.payload.appointmentList;
    return {
      ...patientState,
      appointmentList,
    };
  }

  return patientState;
};
