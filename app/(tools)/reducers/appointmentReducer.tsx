import { AppState } from "../context/interfaces";
import { AppointmentState } from "../modal/modalComponents/modalAppointment/appointmentState";
import dataPoliklinik from "@/app/(tools)/data/data_poliklinik.json";

interface OpenModalAction {
  type: string;
  payload?: any;
}
export const appointmentReducer = (
  state: AppointmentState,
  action: OpenModalAction
) => {
  if (action.type === "SET_SPESIALISASI") {
    const searchCategory = action.payload;
    return {
      ...state,
      searchCategory,
    };
  }
  if (action.type === "GET_SPESIALISASI_LIST") {
    const searchKeyword = action.payload.keywordInput;
    const specializationList = dataPoliklinik.filter((item) =>
      item.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    return {
      ...state,
      searchKeyword,
      specializationList,
    };
  }

  return state;
};
