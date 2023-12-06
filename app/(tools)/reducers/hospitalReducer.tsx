import { HospitalState } from "../context/interfaces";

interface OpenModalAction {
  type: string;
  payload?: any;
}
export const hospitalReducer = (
  hospitalState: HospitalState,
  action: OpenModalAction
) => {
  if (action.type === "SELECT_DESCRIPTION") {
    const keyword = action.payload.keyword;
    const selected = action.payload.selected;

    switch (keyword) {
      case "doctor":
        const selectedDoctor = selected;
        return { ...hospitalState, selectedDoctor };

      case "facility":
        const selectedFacility = selected;
        return { ...hospitalState, selectedFacility };

      case "lab_satuan":
        const selectedLabSatuan = selected;

        return { ...hospitalState, selectedLabSatuan };

      case "lab_paket":
        const selectedPaket = selected;
        return { ...hospitalState, selectedPaket };
      case "inpatient":
        const selectedInpatient = selected;
        return { ...hospitalState, selectedInpatient };
      default:
        return { ...hospitalState };
    }
  }
  if (action.type === "UPDATE_HOSPITAL") {
    const newData = action.payload.newData;
    const keyword = action.payload.keyword;
    const updatingData = (data: any[], newData: any) => {
      const newUpdatedData = data.map((item) => {
        if (item.id === newData.id) return newData;
        else return item;
      });
      return newUpdatedData;
    };

    switch (keyword) {
      case "doctor":
        const dataDoctor = updatingData(hospitalState.dataDoctor, newData);
        const selectedDoctor = newData;
        return { ...hospitalState, selectedDoctor, dataDoctor };

      case "facility":
        const dataFacility = updatingData(hospitalState.dataDoctor, newData);
        const selectedFacility = newData;
        return { ...hospitalState, selectedFacility, dataFacility };

      case "lab_satuan":
        const dataLabSatuan = updatingData(
          hospitalState.dataLabSatuan,
          newData
        );
        const selectedLabSatuan = newData;
        return { ...hospitalState, selectedLabSatuan, dataLabSatuan };

      case "lab_paket":
        const dataPaket = updatingData(hospitalState.dataPaket, newData);
        const selectedPaket = newData;
        return { ...hospitalState, selectedPaket, dataPaket };

      case "inpatient":
        const dataInpatient = updatingData(
          hospitalState.dataInpatient,
          newData
        );
        const selectedInpatient = newData;
        return { ...hospitalState, selectedInpatient, dataInpatient };
      default:
        return { ...hospitalState };
    }
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
      selectedDoctor,
      dataFacility,
      selectedFacility,
      dataLabSatuan,
      selectedLabSatuan,
      dataPaket,
      selectedPaket,
    };
  }

  return hospitalState;
};
