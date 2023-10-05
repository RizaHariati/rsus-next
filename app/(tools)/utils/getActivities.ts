import dataDoctor from "@/app/(tools)/data/data_dokter.json";
import dataLabSatuan from "@/app/(tools)/data/data_lab_satuan.json";
import dataPaketKesehatan from "@/app/(tools)/data/data_paketkesehatan.json";
import dataFacility from "@/app/(tools)/data/data_facility.json";
import { ScheduledType } from "../patientTypes";
import { DoctorType } from "../types";

export const getActivities = (schedule: ScheduledType) => {
  let doctorActivities: {
    poli: string;
    name: string;
    doctor?: DoctorType | undefined;
  } = {
    poli: "",
    name: "",
    doctor: undefined,
  };
  let testActivities: any[] = [];
  if (schedule) {
    schedule.tujuan.map((code) => {
      const findDoctor = dataDoctor.find((item) => item.id === code);
      const findLab = dataLabSatuan.find((item) => item.id === code);
      const findPaket = dataPaketKesehatan.find((item) => item.id === code);
      const findFas = dataFacility.find((item) => item.id === code);

      if (findDoctor) {
        doctorActivities = {
          poli: findDoctor.poliklinik.title,
          name: findDoctor.name,
          doctor: findDoctor,
        };
      } else {
        testActivities.push(findLab || findPaket || findFas || "");
      }
      return "";
    });
  }
  return { doctorActivities, testActivities };
};
