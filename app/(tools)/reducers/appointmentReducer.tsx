import { AppState } from "../context/interfaces";
import { AppointmentState } from "../modal/modalComponents/modalAppointment/appointmentState";
import dataPoliklinik from "@/app/(tools)/data/data_poliklinik.json";
import dataDokter from "@/app/(tools)/data/data_dokter.json";

interface OpenModalAction {
  type: string;
  payload?: any;
}
export const appointmentReducer = (
  state: AppointmentState,
  action: OpenModalAction
) => {
  if (action.type === "SET_CATEGORY") {
    const searchCategory = action.payload.category;
    const searchKeyword = "";
    return {
      ...state,
      searchCategory,
      searchKeyword,
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
  if (action.type === "SET_KEYWORD") {
    const searchKeyword = action.payload.keywordInput;

    return {
      ...state,
      searchKeyword,
    };
  }
  return state;
};
