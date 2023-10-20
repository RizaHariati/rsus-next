import { FacilitySanityType, PoliklinikType } from "../types";

export const findSupportingFacility = (
  poliInfo: PoliklinikType,
  dataFacility: FacilitySanityType[]
) => {
  const findImage = dataFacility.filter((item) => {
    const findItem = item.poliklinik.find(
      (poli) => poli.toLowerCase() === poliInfo.title.toLowerCase()
    );
    return findItem;
  });
  return findImage;
};
