import { HospitalState } from "../context/interfaces";

interface OpenModalAction {
  type: string;
  payload?: any;
}
export const hospitalReducer = (
  hospitalState: HospitalState,
  action: OpenModalAction
) => {
  if (action.type === "SELECT_FACILITY") {
    const selectedFacility = action.payload.selectedFacility;
    return {
      ...hospitalState,
      selectedFacility,
    };
  }
  if (action.type === "SELECT_DOCTOR") {
    const selectedDoctor = action.payload.selectedDoctor;
    return {
      ...hospitalState,
      selectedDoctor,
    };
  }
  if (action.type === "LOAD_HOSPITAL_DATA") {
    const { dataDoctor, dataFacility } = action.payload;
    const selectedDoctor = dataDoctor[0];
    return {
      ...hospitalState,
      dataDoctor,
      dataFacility,
      selectedDoctor,
    };
  }

  return hospitalState;
};
