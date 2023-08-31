"use client";

import { useContext, useReducer, Dispatch } from "react";
import { AppContext } from "./AppContext";
import { initialState } from "./initialState";
import { appReducer } from "../reducers/appReducer";
import { AppState, PatientState } from "./interfaces";

import { getLabCartItem } from "../utils/getLabCartItem";
import { patientReducer } from "../reducers/patientReducer";
import { initialPatientState } from "./initialPatientState";
import { UserType } from "../patientTypes";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const AppProvider = ({ children }: Props) => {
  const [state, dispatch]: [AppState, Dispatch<any>] = useReducer(
    appReducer,
    initialState
  );
  const [patientState, patientDispatch]: [PatientState, Dispatch<any>] =
    useReducer(patientReducer, initialPatientState);

  const toggleMenuNavbar = (id: string | null) => {
    dispatch({ type: "TOGGLE_MENU", payload: id });
  };

  const openModal = (modalTitle: string, modalValue: any) => {
    toggleMenuNavbar(null);
    dispatch({ type: "OPEN_MODAL", payload: { modalTitle, modalValue } });
  };

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL", payload: "" });
  };

  /* ------ Memfilter dokter berdasarkan nama atau spesialisasi ----- */
  const filteringDoctor = (
    keyword: string,
    category: "spesialisasi" | "dokter",
    selected_date?: Date | undefined
  ) => {
    dispatch({
      type: "FILTER_DOCTORS",
      payload: { keyword, category, selected_date },
    });
  };

  /* ------------------ menentukan hari pemeriksaan ----------------- */
  const setDate = (date: Date) => {
    dispatch({ type: "SET_DATE", payload: { date } });
  };

  const clearDate = () => {
    dispatch({ type: "CLEAR_DATE" });
  };

  const openAlert = (alertTitle: string, alertValue: any) => {
    toggleMenuNavbar(null);
    dispatch({ type: "OPEN_ALERT", payload: { alertTitle, alertValue } });
  };

  const closeAlert = () => {
    dispatch({ type: "CLOSE_ALERT", payload: "" });
  };

  /* -------- menambah dan mengurangi  test laboratorium item ------- */
  const toggleCart = (item: any, gender: "all" | "pria" | "wanita") => {
    const newLabItem = getLabCartItem(item, gender);
    const findLabItem = state.labCart.find((labItem) => labItem.id === item.id);

    if (findLabItem) {
      dispatch({ type: "REMOVE_ITEM", payload: { id: item.id } });
    } else {
      dispatch({ type: "ADD_ITEM", payload: { newLabItem } });
    }
  };

  const clearLabCart = () => {
    dispatch({ type: "CLEAR_ITEM" });
  };

  const checkUser = (loginData: Partial<UserType>) => {
    patientDispatch({ type: "CHECK_USER", payload: loginData });
  };

  const login = (loginData: Partial<UserType>) => {
    patientDispatch({ type: "LOGIN_USER", payload: loginData });
  };

  const logout = () => {
    patientDispatch({ type: "LOGOUT_USER" });
  };
  const value = {
    patientState,
    patientDispatch,
    login,
    logout,
    checkUser,
    state,
    dispatch,
    toggleMenuNavbar,
    openModal,
    closeModal,
    filteringDoctor,
    setDate,
    clearDate,
    openAlert,
    closeAlert,
    toggleCart,
    clearLabCart,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
