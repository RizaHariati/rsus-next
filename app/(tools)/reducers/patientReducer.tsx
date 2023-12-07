import { initialPatientState } from "../context/initialPatientState";
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
  if (action.type === "DELETE_PATIENT") {
    const keyword = action.payload.keyword;
    const id = action.payload.id;
    let patient = patientState.patient;
    let scheduleAppointments = patient.scheduled_appointments;
    let selectedScheduleAppointment = scheduleAppointments[0];
    if (keyword === "patient_profile") {
      patient = initialPatientState.patient;
    } else if (keyword === "scheduled_appointments") {
      const newScheduleAppointments = scheduleAppointments.filter(
        (item) => item.schedule_id !== id
      );
      patient = {
        ...patient,
        scheduled_appointments: [...newScheduleAppointments],
      };

      scheduleAppointments = newScheduleAppointments;
      selectedScheduleAppointment = newScheduleAppointments[0];
    }

    return {
      ...patientState,
      patient,
      selectedScheduleAppointment,
      scheduleAppointments,
    };
  }
  if (action.type === "UPDATE_PATIENT") {
    const keyword = action.payload.keyword;
    const newData = action.payload.newData;

    let patient = patientState.patient;
    let scheduleAppointments = patient.scheduled_appointments;
    let selectedScheduleAppointment = scheduleAppointments[0];

    if (keyword === "patient_profile") {
      patient = { ...patient, patient_profile: { ...newData } };
    } else if (keyword === "scheduled_appointments") {
      const newSchedule = patient.scheduled_appointments.map((item) => {
        if (item.schedule_id === newData.schedule_id) {
          return newData;
        } else {
          return item;
        }
      });
      patient = { ...patient, scheduled_appointments: [...newSchedule] };
      scheduleAppointments = newSchedule;
      selectedScheduleAppointment = newData;
    }
    return {
      ...patientState,
      patient,
      selectedScheduleAppointment,
      scheduleAppointments,
    };
  }
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
