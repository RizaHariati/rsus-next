import { createContext } from "react";
import { AppState, PatientState } from "./interfaces";
import { SidebarBtnType } from "../column/sidebarColumn";

import {
  AppointmentListType,
  ColumnAssignmentType,
  PatientType,
} from "../patientTypes";

export type AppContextProps = {
  patientState: PatientState;
  patientDispatch: ({ type }: { type: string; payload?: any }) => void;
  state: AppState;
  dispatch: ({ type }: { type: string; payload?: any }) => void;
  toggleMenuNavbar: (id: string | null) => void;
  openModal: (title: string, value: any) => void;
  closeModal: () => void;
  openAlert: (alertTitle: string, alertValue: any) => void;
  closeAlert: () => void;
  assignColumn: (columnAssignment: ColumnAssignmentType) => void;
  showBottomNavbar: () => void;
  handleScroll: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
  scrollTop: boolean;
  scrollingUp: boolean;
  showFooter: boolean;
  loadingPatient: (patient: PatientType) => void;
  loadingPatientDetail: (appointmentList: AppointmentListType[] | null) => void;
  getWindow: (currentWindow: number) => void;
  handleShowTujuan: (tujuan: string | null) => void;
  handleShowDetail: (key: SidebarBtnType) => void;
  showTujuan: string | null;
  showDetail: SidebarBtnType;
  settingEditable: (editable: boolean) => void;
};

export const AppContext = createContext<AppContextProps>({} as AppContextProps);
