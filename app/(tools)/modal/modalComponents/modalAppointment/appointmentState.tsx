import { DoctorType, PoliklinikType } from "../../../types";

export interface AppointmentState {
  searchCategory: "spesialisasi" | "dokter";
  keyword: string;
  searchKeyword: string;
  specializationList: PoliklinikType[];
}

export const appointmentState: AppointmentState = {
  searchCategory: "spesialisasi",
  keyword: "",
  searchKeyword: "",
  specializationList: [],
};
