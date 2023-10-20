import { DoctorType } from "../types";
export const getDoctorPoli = (poliId: string, dataDoctor: DoctorType[]) => {
  let dokter = [];
  dokter = dataDoctor.filter((item: DoctorType) => {
    return item.poliklinik.poli_id === poliId;
  });
  return dokter;
};
