"use client";

import { useContext, useReducer, Dispatch, useState, useEffect } from "react";
import { AppContext } from "./AppContext";
import { initialState, maxWidth, minWidth } from "./initialState";
import { appReducer } from "../reducers/appReducer";
import { AppState, PatientState } from "./interfaces";
import { patientReducer } from "../reducers/patientReducer";
import { initialPatientState } from "./initialPatientState";
import {
  PatientType,
  ScheduleDestinationsListType,
  ScheduledType,
} from "../patientTypes";

import { OCC, OCO, OOO } from "../column/columnPattern";
import {
  SidebarBtnType,
  hospitalBtnDetail,
  patientBtnDetail,
} from "../column/sidebarColumnKeys";
import { ColumnAssignmentType } from "../types";
import { getDoctors } from "@/sanity/sanityUtils/getDoctors";
import { getFacility } from "@/sanity/sanityUtils/getFacility";
import { initialHospitalState } from "./initialHospitalState";
import { hospitalReducer } from "../reducers/hospitalReducer";
import { usePathname } from "next/navigation";
import {
  DoctorType,
  FacilitySanityType,
  LabItemType,
  PaketLabType,
} from "../HospitalTypes";
import { getLabSatuan } from "@/sanity/sanityUtils/getLabSatuan";
import { getLabPaket } from "@/sanity/sanityUtils/getLabPaket";
import { InpatientType } from "../HospitalTypes";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const AppProvider = ({ children }: Props) => {
  const pathName = usePathname();

  const [state, dispatch]: [AppState, Dispatch<any>] = useReducer(
    appReducer,
    initialState
  );
  const [patientState, patientDispatch]: [PatientState, Dispatch<any>] =
    useReducer(patientReducer, initialPatientState);

  const [hospitalState, hospitalDispatch] = useReducer(
    hospitalReducer,
    initialHospitalState
  );
  const [scrollTop, setScrollTop] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollingUp, setscrollingUp] = useState(true);
  const [showFooter, setShowFooter] = useState(false);
  const [showDetail, setshowDetail] = useState<SidebarBtnType>(
    pathName === "/adminhospital/" ? hospitalBtnDetail[0] : patientBtnDetail[0]
  );

  useEffect(() => {
    const setDoctors = new Promise((resolve) => {
      return resolve(getDoctors());
    }).then((doctor) => doctor);
    const setFacility = new Promise((resolve) => {
      return resolve(getFacility());
    });
    const setLabSatuan = new Promise((resolve) => {
      return resolve(getLabSatuan());
    });
    const setLabPaket = new Promise((resolve) => {
      return resolve(getLabPaket());
    });

    Promise.all([setDoctors, setFacility, setLabSatuan, setLabPaket]).then(
      ([dataDoctor, dataFacility, dataLabSatuan, dataPaket]) => {
        hospitalDispatch({
          type: "LOAD_HOSPITAL_DATA",
          payload: { dataDoctor, dataFacility, dataLabSatuan, dataPaket },
        });
      }
    );

    if (typeof window !== "object") return;
    const windowWidth = window!.innerWidth!;
    if (windowWidth < minWidth) {
      assignColumn(OCC);
    } else if (windowWidth >= minWidth && windowWidth <= maxWidth) {
      assignColumn(OCO);
    } else {
      assignColumn(OOO);
    }
    dispatch({ type: "SET_WINDOW", payload: { currentWindow: windowWidth } });
  }, []);

  const selectDoctor = (selectedDoctor: DoctorType) => {
    hospitalDispatch({ type: "SELECT_DOCTOR", payload: { selectedDoctor } });
  };

  const selectFacility = (selectedFacility: FacilitySanityType) => {
    hospitalDispatch({
      type: "SELECT_FACILITY",
      payload: { selectedFacility },
    });
  };

  const selectLabSatuan = (selectedLabSatuan: LabItemType) => {
    hospitalDispatch({
      type: "SELECT_LAB_SATUAN",
      payload: { selectedLabSatuan },
    });
  };

  const selectLabPaket = (selectedPaket: PaketLabType) => {
    hospitalDispatch({
      type: "SELECT_LAB_PAKET",
      payload: { selectedPaket },
    });
  };

  const selectInpatient = (selectedInpatient: InpatientType) => {
    hospitalDispatch({
      type: "SELECT_INPATIENT",
      payload: { selectedInpatient },
    });
  };

  const loadingPatientScheduleDestination = (
    scheduleDestinationList: ScheduleDestinationsListType[] | null
  ) => {
    patientDispatch({
      type: "LOAD_PATIENT_DESTINATION",
      payload: { scheduleDestinationList },
    });
  };

  const selectPatientDestination = (
    selectedScheduleAppointment: ScheduledType | null,
    selectedScheduleDestination: ScheduleDestinationsListType | null
  ) => {
    patientDispatch({
      type: "SELECT_PATIENT_DESTINATION",
      payload: { selectedScheduleAppointment, selectedScheduleDestination },
    });
  };
  const loadingPatient = (patient: PatientType) => {
    patientDispatch({
      type: "LOAD_PATIENT",
      payload: { patient },
    });
    return patient;
  };

  const handleShowDetail = (key: SidebarBtnType) => {
    setshowDetail(key);
  };

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

  const openAlert = (alertTitle: string, alertValue: any) => {
    toggleMenuNavbar(null);
    dispatch({ type: "OPEN_ALERT", payload: { alertTitle, alertValue } });
  };

  const closeAlert = () => {
    dispatch({ type: "CLOSE_ALERT", payload: "" });
  };

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

  const assignColumn = (columnAssignment: ColumnAssignmentType) => {
    dispatch({
      type: "COLUMN_ASSIGNMENT",
      payload: { columnAssignment },
    });
  };

  const getWindow = (currentWindow: number) => {
    dispatch({ type: "SET_WINDOW", payload: { currentWindow } });
  };

  const settingEditable = (editable: boolean) => {
    dispatch({ type: "SET_EDITABLE", payload: { editable } });
  };
  const value = {
    hospitalState,
    selectDoctor,
    selectFacility,
    selectLabSatuan,
    selectLabPaket,
    selectInpatient,
    hospitalDispatch,
    showDetail,
    handleShowDetail,
    patientState,
    patientDispatch,
    loadingPatient,
    settingEditable,
    state,
    dispatch,
    toggleMenuNavbar,
    openModal,
    closeModal,
    openAlert,
    closeAlert,
    showBottomNavbar,
    handleScroll,
    assignColumn,
    getWindow,
    loadingPatientScheduleDestination,
    selectPatientDestination,
    scrollingUp,
    scrollTop,
    showFooter,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
