import { createContext } from "react";
import { AppState, HospitalState, PatientState } from "./interfaces";
import { SidebarBtnType } from "../column/sidebarColumnKeys";

import {
  PatientType,
  ScheduleDestinationsListType,
  ScheduledType,
} from "../patientTypes";
import { ColumnAssignmentType } from "../types";
import { DoctorType, FacilitySanityType, LabItemType } from "../HospitalTypes";

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
  selectDoctor: (doctor: DoctorType) => void;
  selectFacility: (selectedFacility: FacilitySanityType) => void;
  selectLabSatuan: (selectedLabSatuan: LabItemType) => void;
};

export const AppContext = createContext<AppContextProps>({} as AppContextProps);
