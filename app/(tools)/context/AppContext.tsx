import { createContext } from "react";
import { AppState, PatientState } from "./interfaces";
import { PatientInitialValueType, UserType } from "../patientTypes";

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
    pickDate?: Date | undefined
  ) => void;
  setDate: (date: Date) => void;
  clearDate: () => void;
  openAlert: (alertTitle: string, alertValue: any) => void;
  closeAlert: () => void;
  toggleCart: (item: any, gender: "all" | "pria" | "wanita") => void;
  clearLabCart: () => void;
  login: (loginData: Partial<UserType>) => Promise<void>;
  checkUser: (loginData: Partial<UserType>) => void;
  logout: () => void;
  register: (newPatientPersonal: PatientInitialValueType) => void;
};

export const AppContext = createContext<AppContextProps>({} as AppContextProps);
