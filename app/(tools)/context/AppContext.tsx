import { createContext } from "react";
import { AppState, PatientState } from "./interfaces";

import {
  AppointmentListType,
  NotificationType,
  PatientType,
  ScheduledType,
  UserType,
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

  showBottomNavbar: () => void;
  handleScroll: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
  scrollTop: boolean;
  scrollingUp: boolean;
  showFooter: boolean;
  loadingPatient: (patient: PatientType) => void;
  loadingPatientDetail: (appointmentList: AppointmentListType[] | null) => void;
};

export const AppContext = createContext<AppContextProps>({} as AppContextProps);
