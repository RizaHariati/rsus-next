import { createContext } from "react";
import { AppState, HospitalState, PatientState } from "./interfaces";
import { SidebarBtnType } from "../column/sidebarColumnKeys";

import { PatientType, ScheduledType } from "../patientTypes";
import { ColumnAssignmentType } from "../types";

export type AppContextProps = {
  hospitalState: HospitalState;
  hospitalDispatch: ({ type }: { type: string; payload?: any }) => void;
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
  selectPatientDestination: (
    selectedScheduleAppointment: ScheduledType | null
  ) => void;
  getWindow: (currentWindow: number) => void;
  handleShowDetail: (key: SidebarBtnType) => void;
  showDetail: SidebarBtnType;
  settingEditable: (editable: boolean) => void;
  updateHospital: (keyword: string, newData: any[]) => void;
  deleteHospital: (keyword: string, id: string) => void;
  selectHospitalDescription: (keyword: string, selected: any) => void;
  updatePatient: (keyword: string, id: any) => void;
  deletePatient: (keyword: string, id: any) => void;
};

export const AppContext = createContext<AppContextProps>({} as AppContextProps);
