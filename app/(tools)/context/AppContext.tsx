import { createContext } from "react";
import { AppState, PatientState } from "./interfaces";
import { SidebarBtnType } from "../column/sidebarColumn";

import {
  ColumnAssignmentType,
  PatientType,
  ScheduleDestinationsListType,
  ScheduledType,
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
  loadingPatientScheduleDestination: (
    scheduleDestinationList: ScheduleDestinationsListType[] | null
  ) => void;
  selectPatientDestination: (
    selectedScheduleAppointment: ScheduledType | null,
    selectedScheduleDestination: ScheduleDestinationsListType | null
  ) => void;
  getWindow: (currentWindow: number) => void;
  handleShowDetail: (key: SidebarBtnType) => void;
  showDetail: SidebarBtnType;
  settingEditable: (editable: boolean) => void;
};

export const AppContext = createContext<AppContextProps>({} as AppContextProps);
