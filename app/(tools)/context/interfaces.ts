import {
  DoctorType,
  FilterDoctorType,
  LabCartType,
  LabItemType,
  PaketLabType,
} from "../types";
export interface AppState {
  menu_id: string | null;
  logged_in: boolean;
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
