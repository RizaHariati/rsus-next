import { AppState } from "../context/interfaces";
import dataDoctor from "@/app/(tools)/data/data_dokter.json";
import { DoctorType } from "../types";
import dataDokter from "@/app/(tools)/data/data_dokter.json";

interface OpenModalAction {
  type: string;
  payload?: any;
}
export const appReducer = (state: AppState, action: OpenModalAction) => {
  if (action.type === "TOGGLE_MENU") {
    let menu_id = state.menu_id;

    if (state.menu_id === action.payload) {
      menu_id = null;
    } else {
      menu_id = action.payload;
    }

    return {
      ...state,
      menu_id,
    };
  }
  if (action.type === "OPEN_MODAL") {
    const { modalTitle, modalValue } = action.payload;
    return {
      ...state,
      showModal: true,
      modalTitle,
      modalValue,
    };
  }
  if (action.type === "CLOSE_MODAL") {
    return {
      ...state,
      showModal: false,
      modalTitle: "",
      modalValue: {},
    };
  }
  if (action.type === "FILTER_DOCTORS") {
    const category: "spesialisasi" | "dokter" = action.payload.category;
    const keyword = action.payload.keyword;
    let filtered_doctor: {
      category: "spesialisasi" | "dokter";
      value: DoctorType[];
    } = { category: "spesialisasi", value: [] };

    if (category === "spesialisasi") {
      const filter: DoctorType[] = dataDoctor.filter(
        (item) => item.poliklinik.poli_id === keyword
      );
      if (filter.length > 0) {
        filtered_doctor = { category, value: filter };
      }
    } else {
      const filter = dataDoctor.filter((item) =>
        item.nama.toLowerCase().includes(keyword.toLowerCase())
      );
      if (filter.length > 0) {
        filtered_doctor = { category, value: filter };
      }
    }
    return {
      ...state,
      filtered_doctor,
    };
  }
  return state;
};
