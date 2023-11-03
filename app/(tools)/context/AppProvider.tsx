"use client";

import { useContext, useReducer, Dispatch, useState, useEffect } from "react";
import { AppContext } from "./AppContext";
import { initialState } from "./initialState";
import { appReducer } from "../reducers/appReducer";
import { AppState, PatientState } from "./interfaces";
import { patientReducer } from "../reducers/patientReducer";
import { initialPatientState } from "./initialPatientState";
import { AppointmentListType, PatientType } from "../patientTypes";
import { UserType } from "../patientTypes";

import { getDoctors } from "../../../sanity/sanityUtils/getDoctors";
import { getFacility } from "../../../sanity/sanityUtils/getFacility";

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

  useEffect(() => {
    let mountItem = true;
    if (mountItem) {
    }
    return () => {
      mountItem = false;
    };
    // eslint-disable-next-line
  }, []);

  const toggleMenuNavbar = (id: string | null) => {
    dispatch({ type: "TOGGLE_MENU", payload: id });
    dispatch({ type: "CLOSE_MODAL", payload: "" });
  };

  const openModal = (modalTitle: string, modalValue: any) => {
    toggleMenuNavbar(null);
    dispatch({ type: "OPEN_MODAL", payload: { modalTitle, modalValue } });
  };

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL", payload: "" });
  };

  /* ------------------ menentukan hari pemeriksaan ----------------- */

  const openAlert = (alertTitle: string, alertValue: any) => {
    toggleMenuNavbar(null);
    dispatch({ type: "OPEN_ALERT", payload: { alertTitle, alertValue } });
  };

  const closeAlert = () => {
    dispatch({ type: "CLOSE_ALERT", payload: "" });
  };

  /* -------- menambah dan mengurangi  test laboratorium item ------- */

  const showBottomNavbar = () => {
    setShowFooter(true);
    setScrollTop(false);
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

  const loadingPatient = (patient: PatientType) => {
    patientDispatch({
      type: "LOAD_PATIENT",
      payload: { patient },
    });
    return patient;
  };

  const loadingPatientDetail = (
    appointmentList: AppointmentListType[] | null
  ) => {
    patientDispatch({
      type: "LOAD_PATIENT_DETAIL",
      payload: { appointmentList },
    });
  };
  const value = {
    patientState,
    patientDispatch,
    loadingPatient,
    loadingPatientDetail,
    state,
    dispatch,
    toggleMenuNavbar,
    openModal,
    closeModal,
    openAlert,
    closeAlert,
    showBottomNavbar,
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
