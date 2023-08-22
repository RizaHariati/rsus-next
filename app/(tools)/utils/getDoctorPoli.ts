import dataDokter from "@/app/(tools)/data/data_dokter.json";
import { DoctorType } from "../types";
export const getDoctorPoli = (poliId: string) => {
  let dokter = [];
  dokter = dataDokter.filter((item: DoctorType) => {
    return item.poliklinik.poli_id === poliId;
  });
  return dokter;
};
