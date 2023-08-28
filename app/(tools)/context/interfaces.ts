import { DoctorType, FilterDoctorType } from "../types";
export interface AppState {
  menu_id: string | null;
  logged_in: boolean;
  showModal: boolean;
  modalTitle: string;
  modalValue: any;
  filtered_doctor: FilterDoctorType;
  selected_date?: Date;
}
