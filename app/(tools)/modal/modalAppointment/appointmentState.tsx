import { DoctorType, PoliklinikType } from "../../types";

export interface AppointmentState {
  searchCategory: "spesialisasi" | "dokter";

  searchKeyword: string;
  specializationList: PoliklinikType[];
}

export const appointmentState: AppointmentState = {
  searchCategory: "spesialisasi",

  searchKeyword: "",
  specializationList: [],
};
