import {
  CategoryFacilityType,
  FacilityType,
  FacilitySanityType,
} from "../types";

export const groupCategoryFacility = (dataFacility: FacilitySanityType[]) => {
  let newData: CategoryFacilityType = {};
  const data = dataFacility.map((item) => {
    const category: string = item.category;
    if (!newData[category]) {
      newData[category] = [item];
    } else {
      newData[category] = [...newData[category], item];
    }

    return "";
  });
  return newData;
};
