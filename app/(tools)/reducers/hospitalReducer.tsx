import { HospitalState } from "../context/interfaces";

interface OpenModalAction {
  type: string;
  payload?: any;
}
export const hospitalReducer = (
  hospitalState: HospitalState,
  action: OpenModalAction
) => {
  if (action.type === "SELECT_LAB_SATUAN") {
    const selectedLabSatuan = action.payload.selectedLabSatuan;
    return {
      ...hospitalState,
      selectedLabSatuan,
    };
  }
  if (action.type === "SELECT_LAB_PAKET") {
    const selectedPaket = action.payload.selectedPaket;
    return {
      ...hospitalState,
      selectedPaket,
    };
  }
  if (action.type === "SELECT_FACILITY") {
    const selectedFacility = action.payload.selectedFacility;
    return {
      ...hospitalState,
      selectedFacility,
    };
  }
  if (action.type === "SELECT_DOCTOR") {
    const selectedDoctor = action.payload.selectedDoctor;
    return {
      ...hospitalState,
      selectedDoctor,
    };
  }
  if (action.type === "LOAD_HOSPITAL_DATA") {
    const { dataDoctor, dataFacility, dataLabSatuan, dataPaket } =
      action.payload;
    const selectedDoctor = dataDoctor[0];
    const selectedFacility = dataFacility[0];
    const selectedLabSatuan = dataLabSatuan[0];
    const selectedPaket = dataPaket[0];
    return {
      ...hospitalState,
      dataDoctor,
      dataFacility,
      selectedDoctor,
      selectedFacility,
      dataLabSatuan,
      selectedLabSatuan,
      dataPaket,
      selectedPaket,
    };
  }

  return hospitalState;
};
