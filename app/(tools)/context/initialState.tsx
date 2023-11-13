import moment from "moment";
import { AppState } from "./interfaces";
import { OCC, OCO, OOO } from "../column/columnPattern";
export const maxWidth = 1024;
export const minWidth = 768;

export const initialColumn =
  (typeof window === "object" && window?.innerWidth < minWidth
    ? OCC
    : (typeof window === "object" && window?.innerWidth) >=
      (typeof window === "object" && minWidth && window?.innerWidth <= maxWidth)
    ? OCO
    : OOO) || maxWidth;
export const initialState: AppState = {
  menu_id: null,
  showModal: false,
  modalTitle: "",
  modalValue: {},
  selected_date: moment().format("YYYY-MM-DD[T]HH:mm"),
  showAlert: false,
  alertTitle: "",
  alertValue: {},
  columnAssignment: initialColumn,
  currentWindow: typeof window === "object" ? window.innerWidth : maxWidth,
  editable: false,
};
