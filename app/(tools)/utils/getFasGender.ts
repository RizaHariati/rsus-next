import { PaketLabType } from "../types";
import dataFacility from "@/app/(tools)/data/data_facility.json";
export const getFasGender = (
  paketLab: PaketLabType,
  gender: "pria" | "wanita"
) => {
  const newFas = paketLab.pemeriksaan.filter((item) => {
    if (item.id.includes("std")) return item;
    const dataPemeriksaan = dataFacility.find(
      (facilityItem) =>
        facilityItem.id === item.id &&
        facilityItem.category.toLowerCase() !==
          (gender === "pria" ? "wanita" : "pria")
    );
    return dataPemeriksaan;
  });
  return newFas;
};
