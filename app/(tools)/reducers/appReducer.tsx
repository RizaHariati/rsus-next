import { AppState } from "../context/interfaces";
import dataDoctor from "@/app/(tools)/data/data_dokter.json";
import { DoctorType, FilterDoctorType } from "../types";
import dayjs from "dayjs";

interface OpenModalAction {
  type: string;
  payload?: any;
}
export const appReducer = (state: AppState, action: OpenModalAction) => {
  if (action.type === "OPEN_ALERT") {
    const { alertTitle, alertValue } = action.payload;

    return {
      ...state,
      showAlert: true,
      alertTitle,
      alertValue,
    };
  }

  if (action.type === "CLOSE_ALERT") {
    return {
      ...state,
      showAlert: false,
      alertTitle: "",
      alertValue: {},
    };
  }
  if (action.type === "SET_DATE") {
    const selected_date = action.payload.date;
    return { ...state, selected_date };
  }

  if (action.type === "CLEAR_DATE") {
    let selected_date;
    return { ...state, selected_date };
  }
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
    let selected_date;
    return {
      ...state,
      showModal: false,
      modalTitle: "",
      modalValue: {},
      selected_date,
    };
  }

  if (action.type === "FILTER_DOCTORS") {
    const modal = state.modalTitle;
    const category: "spesialisasi" | "dokter" = action.payload.category;
    const keyword = action.payload.keyword;
    const selected_date = action.payload.selected_date;
    const selectData =
      modal === "telemedicine"
        ? dataDoctor.filter((item) => item.telemedicine)
        : dataDoctor;
    let filtered_doctor: FilterDoctorType = {
      category: "spesialisasi",
      value: [],
      keyword,
    };

    if (category === "spesialisasi") {
      const filterDoctor: DoctorType[] = selectData.filter(
        (item) => item.poliklinik.poli_id === keyword
      );
      if (filterDoctor.length > 0) {
        filtered_doctor = { category, value: filterDoctor, keyword };
      }
    } else {
      const filterDoctor = selectData.filter((item) =>
        item.nama.toLowerCase().includes(keyword.toLowerCase())
      );
      if (filterDoctor.length > 0) {
        filtered_doctor = { category, value: filterDoctor, keyword };
      }
    }
    if (selected_date) {
      const filterByPickDate = filtered_doctor.value;
      const getDay = dayjs(selected_date).day();
      const hari = getDay === 0 ? 7 : getDay;
      const finalFilter = filterByPickDate.filter((item) =>
        item.hari.find(
          (itemhari) =>
            itemhari.id_hari === hari && itemhari.kuota_terisi < item.kuota
        )
      );
      filtered_doctor = { category, value: finalFilter, keyword };
    }
    return {
      ...state,
      filtered_doctor,
    };
  }
  return state;
};
