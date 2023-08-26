import { AppState } from "../context/interfaces";
import dataDoctor from "@/app/(tools)/data/data_dokter.json";
import { DoctorType } from "../types";
import dayjs from "dayjs";

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
    let filtered_doctor: {
      category: "spesialisasi" | "dokter";
      value: DoctorType[];
    } = { category: "spesialisasi", value: [] };

    return {
      ...state,
      showModal: true,
      modalTitle,
      modalValue,
      filtered_doctor,
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
    const modal = state.modalTitle;
    const category: "spesialisasi" | "dokter" = action.payload.category;
    const keyword = action.payload.keyword;
    const pickDate = action.payload.pickDate;
    const selectData =
      modal === "telemedicine"
        ? dataDoctor.filter((item) => item.telemedicine)
        : dataDoctor;
    let filtered_doctor: {
      category: "spesialisasi" | "dokter";
      value: DoctorType[];
    } = {
      category: "spesialisasi",
      value: [],
    };

    if (category === "spesialisasi") {
      const filterDoctor: DoctorType[] = selectData.filter(
        (item) => item.poliklinik.poli_id === keyword
      );
      if (filterDoctor.length > 0) {
        filtered_doctor = { category, value: filterDoctor };
      }
    } else {
      const filterDoctor = selectData.filter((item) =>
        item.nama.toLowerCase().includes(keyword.toLowerCase())
      );
      if (filterDoctor.length > 0) {
        filtered_doctor = { category, value: filterDoctor };
      }
    }
    if (pickDate) {
      const filterByPickDate = filtered_doctor.value;
      const getDay = dayjs(pickDate).day();
      const hari = getDay === 0 ? 7 : getDay;
      const finalFilter = filterByPickDate.filter((item) =>
        item.hari.find((itemhari) => itemhari === hari)
      );
      filtered_doctor = { category, value: finalFilter };
    }
    return {
      ...state,
      filtered_doctor,
    };
  }
  return state;
};
