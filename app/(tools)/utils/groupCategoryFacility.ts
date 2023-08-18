import { CategoryFacilityType, FacilityType } from "../types";

export const groupCategoryFacility = (dataFacility: FacilityType[]) => {
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
