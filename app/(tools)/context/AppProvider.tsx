"use client";

import { useContext, useReducer, Dispatch, useState } from "react";
import { AppContext } from "./AppContext";
import { initialState } from "./initialState";
import { appReducer } from "../reducers/appReducer";
import { AppState, PatientState } from "./interfaces";

import { getLabCartItem } from "../utils/getLabCartItem";
import { patientReducer } from "../reducers/patientReducer";
import { initialPatientState } from "./initialPatientState";
import { PatientInitialValueType, UserType } from "../patientTypes";

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
  const [scrollTop, setScrollTop] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollingUp, setscrollingUp] = useState(true);
  const [showFooter, setShowFooter] = useState(false);
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

  const login = async (loginData: Partial<UserType>) => {
    await patientDispatch({ type: "LOGIN_USER", payload: loginData });
  };

  const logout = () => {
    patientDispatch({ type: "LOGOUT_USER" });
    dispatch({ type: "CLOSE_MODAL", payload: "" });
  };

  const register = (newPatientPersonal: PatientInitialValueType) => {
    patientDispatch({ type: "REGISTER_USER", payload: { newPatientPersonal } });
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    e.currentTarget.scrollTop;
    const top = e.currentTarget.scrollTop;
    const scrollHeight = e.currentTarget.scrollHeight;
    const pageHeight = e.currentTarget.clientHeight;

    if (top > scrollHeight - pageHeight - 100) {
      setShowFooter(true);
    } else {
      setShowFooter(false);
    }
    setScrollPosition(top);
    setscrollingUp(top < scrollPosition);
    if (top > 120) {
      setScrollTop(true);
    } else {
      setScrollTop(false);
    }
    if (scrollingUp) {
      toggleMenuNavbar(null);
    }
  };
  const value = {
    patientState,
    patientDispatch,
    login,
    logout,
    checkUser,
    register,
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
    handleScroll,
    scrollingUp,
    scrollTop,
    showFooter,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
