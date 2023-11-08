import { AppState } from "../context/interfaces";
import { DoctorType, FilterDoctorType, LabCartType } from "../types";
import moment from "moment";
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
    let selected_date;
    return {
      ...state,
      showModal: false,
      modalTitle: "",
      modalValue: {},
      selected_date,
    };
  }

  if (action.type === "COLUMN_ASSIGNMENT") {
    const columnAssignment = action.payload.columnAssignment;
    return {
      ...state,
      columnAssignment,
    };
  }

  if (action.type === "SET_WINDOW") {
    const currentWindow = action.payload.currentWindow;

    return {
      ...state,
      currentWindow,
    };
  }
  return state;
};
