import { PaketLabType } from "../types";
import dataLabSatuan from "@/app/(tools)/data/data_lab_satuan.json";

export const getLabGender = (
  paketLab: PaketLabType,
  gender: "pria" | "wanita"
) => {
  const newLab = paketLab.laboratorium.filter((item) => {
    const dataLab = dataLabSatuan.find((labItem) => {
      return (
        labItem.id === item.id &&
        labItem.category.toLowerCase() !==
          (gender === "wanita" ? "pria" : "wanita")
      );
    });
    return dataLab;
  });
  return newLab;
};
