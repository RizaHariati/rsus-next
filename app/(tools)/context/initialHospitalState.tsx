import { HospitalState } from "./interfaces";
import dataInpatient from "../data/data_inap.json";
export const initialHospitalState: HospitalState = {
  dataDoctor: [],
  selectedDoctor: null,
  dataFacility: [],
  selectedFacility: null,
  dataLabSatuan: [],
  selectedLabSatuan: null,
  dataPaket: [],
  selectedPaket: null,
  dataInpatient: dataInpatient,
  selectedInpatient: dataInpatient[0],
  dataComplete: {
    dataDoctor: [],
    dataFacility: [],
    dataLabSatuan: [],
    dataPaket: [],
    dataInpatient: dataInpatient,
  },
};
