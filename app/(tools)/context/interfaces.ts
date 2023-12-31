import {
  DoctorType,
  FacilitySanityType,
  FacilityType,
  InpatientType,
  LabItemType,
  PaketLabType,
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
  editable: boolean;
  editAlert: boolean;
  token: string | null;
  admin: {
    name: string;
    email: string;
    password: string;
  };
}

export interface PatientState {
  // user: UserType;
  // verification_number: number;
  patient: PatientType;
  allPatients: PatientType[];
  scheduleAppointments: ScheduledType[] | null;
  selectedScheduleAppointment: ScheduledType | null;
}

export interface HospitalState {
  dataDoctor: DoctorType[];
  selectedDoctor: DoctorType | null;
  dataFacility: FacilitySanityType[];
  selectedFacility: FacilitySanityType | null;
  dataLabSatuan: LabItemType[] | [];
  selectedLabSatuan: LabItemType | null;
  dataPaket: PaketLabType[] | [];
  selectedPaket: PaketLabType | null;
  dataInpatient: InpatientType[] | [];
  selectedInpatient: InpatientType | null;
  dataComplete: {
    dataDoctor: DoctorType[];
    dataFacility: FacilitySanityType[];
    dataLabSatuan: LabItemType[] | [];
    dataPaket: PaketLabType[] | [];
    dataInpatient: InpatientType[] | [];
  };
}
