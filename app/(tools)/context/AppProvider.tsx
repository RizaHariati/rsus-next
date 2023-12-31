"use client";

import {
  useContext,
  useReducer,
  Dispatch,
  useState,
  useEffect,
  useCallback,
} from "react";
import { AppContext } from "./AppContext";
import { initialState, maxWidth, minWidth } from "./initialState";
import { appReducer } from "../reducers/appReducer";
import { AppState, PatientState } from "./interfaces";
import { patientReducer } from "../reducers/patientReducer";
import { initialPatientState } from "./initialPatientState";
import { PatientType, ScheduledType } from "../patientTypes";

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

import { getLabSatuan } from "@/sanity/sanityUtils/getLabSatuan";
import { getLabPaket } from "@/sanity/sanityUtils/getLabPaket";
import { toast } from "react-toastify";

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
    let mount = true;
    if (mount) {
      const setDoctors = new Promise((resolve) => {
        console.log("start provider");
        return resolve(getDoctors());
      }).then((doctor) => doctor);
      const setFacility = new Promise((resolve) => {
        return resolve(getFacility());
      });
      const setLabSatuan = new Promise((resolve) => {
        return resolve(getLabSatuan());
      });
      const setLabPaket = new Promise((resolve) => {
        console.log("end provider");
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
      if (typeof window !== "object" || typeof window === "undefined") return;

      const windowWidth = window!.innerWidth!;

      if (windowWidth < minWidth) {
        assignColumn(OCC);
      } else if (windowWidth >= minWidth && windowWidth <= maxWidth) {
        assignColumn(OCO);
      } else {
        assignColumn(OOO);
      }
      dispatch({
        type: "SET_WINDOW",
        payload: { currentWindow: windowWidth },
      });
    }
    return () => {
      mount = false;
    };
  }, []);

  const deletePatient = (keyword: string, id: any) => {
    patientDispatch({
      type: "DELETE_PATIENT",
      payload: { keyword, id },
    });
  };

  const updatePatient = (keyword: string, newData: any) => {
    patientDispatch({
      type: "UPDATE_PATIENT",
      payload: { keyword, newData },
    });
  };

  const updateHospital = (keyword: string, newData: any[]) => {
    hospitalDispatch({
      type: "UPDATE_HOSPITAL",
      payload: { keyword, newData },
    });
  };

  const deleteHospital = (keyword: string, id: string) => {
    hospitalDispatch({
      type: "DELETE_HOSPITAL",
      payload: { keyword, id },
    });
  };

  const selectHospitalDescription = (keyword: string, selected: any) => {
    hospitalDispatch({
      type: "SELECT_DESCRIPTION",
      payload: { keyword, selected },
    });
  };

  const selectPatientDestination = (
    selectedScheduleAppointment: ScheduledType | null
  ) => {
    patientDispatch({
      type: "SELECT_PATIENT_DESTINATION",
      payload: { selectedScheduleAppointment },
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

  const settingEditAlert = () => {
    const controlId = "edit-alert-toast";
    if (!state.editable) {
      toast.info("tekan edit untuk mulai mengedit", {
        position: "top-left",
        toastId: controlId,
      });
      console.log("alert on");
      dispatch({ type: "EDIT_ALERT_ON" });
      setTimeout(() => {
        dispatch({ type: "EDIT_ALERT_OFF" });
      }, 1500);
    }
  };

  const createToken = () => {
    dispatch({ type: "CREATE_TOKEN" });
  };
  const removeToken = () => {
    dispatch({ type: "REMOVE_TOKEN" });
  };

  const value = {
    hospitalState,
    hospitalDispatch,
    selectHospitalDescription,
    updateHospital,
    deleteHospital,
    showDetail,
    handleShowDetail,
    patientState,
    updatePatient,
    deletePatient,
    patientDispatch,
    loadingPatient,
    settingEditable,
    state,
    createToken,
    removeToken,
    dispatch,
    settingEditAlert,
    toggleMenuNavbar,
    openModal,
    closeModal,
    openAlert,
    closeAlert,
    showBottomNavbar,
    handleScroll,
    assignColumn,
    getWindow,
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
