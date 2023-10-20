import { FacilitySanityType, PaketLabType } from "../types";
export const getFasGender = (
  paketLab: PaketLabType,
  gender: "pria" | "wanita",
  dataFacility: FacilitySanityType[]
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
