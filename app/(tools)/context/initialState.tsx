import moment from "moment";
import { AppState } from "./interfaces";
import { OCC, OCO, OOO } from "../column/columnPattern";
export const maxWidth = 1024;
export const minWidth = 768;
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
  columnAssignment:
    (typeof window === "object" && window?.innerWidth < minWidth
      ? OCC
      : (typeof window === "object" && window?.innerWidth) >=
        (typeof window === "object" &&
          minWidth &&
          window?.innerWidth <= maxWidth)
      ? OCO
      : OOO) || maxWidth,
  currentWindow: typeof window === "object" ? window.innerWidth : maxWidth,
  editable: false,
};
