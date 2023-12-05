import { PatientState } from "../context/interfaces";
import { PatientType } from "../patientTypes";

interface OpenModalAction {
  type: string;
  payload?: any;
}
export const patientReducer = (
  patientState: PatientState,
  action: OpenModalAction
) => {
  if (action.type === "LOAD_PATIENT") {
    const patient: PatientType = action.payload.patient;
    const scheduleAppointments = patient.scheduled_appointments;
    const selectedScheduleAppointment = scheduleAppointments[0];
    return {
      ...patientState,
      patient,
      scheduleAppointments,
      selectedScheduleAppointment,
    };
  }

  if (action.type === "SELECT_PATIENT_DESTINATION") {
    const { selectedScheduleAppointment } = action.payload;

    return {
      ...patientState,
      selectedScheduleAppointment,
    };
  }

  return patientState;
};
