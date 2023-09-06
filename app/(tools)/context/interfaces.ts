import { PatientType, UserType } from "../patientTypes";
import { FilterDoctorType, LabCartType } from "../types";
export interface AppState {
  menu_id: string | null;
  showModal: boolean;
  modalTitle: string;
  modalValue: any;
  filtered_doctor: FilterDoctorType;
  selected_date?: Date;
  showAlert: boolean;
  alertTitle: string;
  alertValue: any;
  labCart: LabCartType[];
}

export interface PatientState {
  user: UserType;
  verification_number: number;
  patient: PatientType;
  allPatients: PatientType[];
}
