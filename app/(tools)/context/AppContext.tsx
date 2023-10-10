import { createContext } from "react";
import { AppState, PatientState } from "./interfaces";

import {
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
  filteringDoctor: (
    keyword: string,
    category: "spesialisasi" | "dokter",
    pickDate?: string
  ) => void;
  setDate: (date: string) => void;
  clearDate: () => void;
  openAlert: (alertTitle: string, alertValue: any) => void;
  closeAlert: () => void;
  toggleCart: (item: any, gender: "all" | "pria" | "wanita") => void;
  clearLabCart: () => void;
  login: (loginData: Partial<UserType>) => Promise<void>;
  logout: () => void;
  register: (newPatient: PatientType) => void;
  showBottomNavbar: () => void;
  handleScroll: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
  scrollTop: boolean;
  scrollingUp: boolean;
  showFooter: boolean;
  addingSchedule: (newSchedule: ScheduledType) => void;
  addingNotification: (newNotification: NotificationType) => void;
  clearNotifBackground: (notificationID: string) => void;
  deleteNotification: (notificationID: string) => void;
};

export const AppContext = createContext<AppContextProps>({} as AppContextProps);
