import {
  DoctorType,
  FacilitySanityType,
  FacilityType,
  LabItemType,
} from "../HospitalTypes";
import {
  ScheduleDestinationsListType,
  PatientType,
  ScheduledType,
  UserType,
} from "../patientTypes";
import { ColumnAssignmentType } from "../types";

export interface AppState {
  menu_id: string | null;
  showModal: boolean;
  modalTitle: string;
  modalValue: any;
  selected_date?: string;
  showAlert: boolean;
  alertTitle: string;
  alertValue: any;
  columnAssignment: ColumnAssignmentType;
  currentWindow: number;
  editable: false;
}

export interface PatientState {
  user: UserType;
  verification_number: number;
  patient: PatientType;
  allPatients: PatientType[];
  scheduleAppointments: ScheduledType[] | null;
  selectedScheduleAppointment: ScheduledType | null;
  scheduleDestinationList: ScheduleDestinationsListType[] | null;
  selectedScheduleDestination: ScheduleDestinationsListType | null;
}

export interface HospitalState {
  dataDoctor: DoctorType[];
  selectedDoctor: DoctorType | null;
  dataFacility: FacilitySanityType[];
  selectedFacility: FacilitySanityType | null;
  dataLaboratorium: [];
  selectedLaboratorium: null;
  dataPackage: [];
  selectedPackage: null;
  dataInpatient: [];
  selectedInpatient: null;
}
