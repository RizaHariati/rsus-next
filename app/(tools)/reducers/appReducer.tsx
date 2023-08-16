import { AppState } from "../context/interfaces";

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

  return state;
};
