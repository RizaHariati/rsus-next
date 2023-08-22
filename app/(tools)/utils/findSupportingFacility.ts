import dataFacility from "@/app/(tools)/data/data_facility.json";

import { PoliklinikType } from "../types";

export const findSupportingFacility = (poliInfo: PoliklinikType) => {
  const findImage = dataFacility.filter((item) => {
    const findItem = item.poliklinik.find(
      (poli) => poli.toLowerCase() === poliInfo.title.toLowerCase()
    );
    return findItem;
  });
  return findImage;
};
