import { HospitalState } from "./interfaces";
import dataLabSatuan from "@/app/(tools)/data/data_lab_satuan.json";

export const initialHospitalState: HospitalState = {
  dataDoctor: [],
  selectedDoctor: null,
  dataFacility: [],
  selectedFacility: null,
  dataLabSatuan: [],
  selectedLabSatuan: null,
  dataPackage: [],
  selectedPackage: null,
  dataInpatient: [],
  selectedInpatient: null,
};
