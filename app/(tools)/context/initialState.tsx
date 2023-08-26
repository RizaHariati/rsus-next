import { AppState } from "./interfaces";
import dataDoctor from "@/app/(tools)/data/data_dokter.json";

export const initialState: AppState = {
  menu_id: "home",
  logged_in: true,
  showModal: false,
  modalTitle: "",
  modalValue: {},
  filtered_doctor: { category: "spesialisasi", value: dataDoctor },
};
