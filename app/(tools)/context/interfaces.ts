import { PatientProfileType, PatientType, UserType } from "../patientTypes";
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
  user_checked: { medical_record: string; password: string; checked: boolean };
  verification_number: number;
  patient: PatientType;
  patientProfile: PatientProfileType;
  allMedicalRecords: PatientType[];
}
