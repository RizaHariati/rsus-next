import {
  ScheduleDestinationsListType,
  ColumnAssignmentType,
  PatientType,
  ScheduledType,
  UserType,
} from "../patientTypes";
import {
  FilterDoctorType,
  LabCartType,
  DoctorType,
  FacilitySanityType,
} from "../types";

export interface AppState {
  menu_id: string | null;
  showModal: boolean;
  modalTitle: string;
  modalValue: any;
  filtered_doctor: FilterDoctorType;
  selected_date?: string;
  showAlert: boolean;
  alertTitle: string;
  alertValue: any;
  labCart: LabCartType[];
  dataDoctor: DoctorType[];
  dataFacility: FacilitySanityType[];
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
