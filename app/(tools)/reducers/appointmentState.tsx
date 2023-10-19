import { PoliklinikType } from "../types";

export interface AppointmentState {
  searchCategory: "spesialisasi" | "dokter";
  pickDate?: Date | undefined;
  searchKeyword: string;
  specializationList: PoliklinikType[];
}

export const appointmentState: AppointmentState = {
  searchCategory: "spesialisasi",

  searchKeyword: "",
  specializationList: [],
};
