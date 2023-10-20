import moment from "moment";
import { AppState } from "./interfaces";

export const initialState: AppState = {
  menu_id: null,
  showModal: false,
  modalTitle: "",
  modalValue: {},
  filtered_doctor: { category: "spesialisasi", value: [], keyword: "" },
  selected_date: moment().format("YYYY-MM-DD[T]HH:mm"),
  showAlert: false,
  alertTitle: "",
  alertValue: {},
  labCart: [],
  dataDoctor: [],
  dataFacility: [],
};
