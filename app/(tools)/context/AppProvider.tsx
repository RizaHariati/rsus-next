"use client";

import { useContext, useReducer, Dispatch } from "react";
import { AppContext } from "./AppContext";
import { initialState } from "./initialState";
import { appReducer } from "../reducers/appReducer";
import { AppState } from "./interfaces";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const AppProvider = ({ children }: Props) => {
  const [state, dispatch]: [AppState, Dispatch<any>] = useReducer(
    appReducer,
    initialState
  );

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

  const value = {
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
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
