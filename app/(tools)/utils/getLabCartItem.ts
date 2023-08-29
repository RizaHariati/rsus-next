import { LabCartType, LaboratoriumType, PemeriksaanType } from "../types";

export const getLabCartItem = (item: any) => {
  let newLabItem: LabCartType;
  if (item.id.includes("lab")) {
    let data: string[] = [];
    data.push(item.description);
    newLabItem = {
      id: item.id,
      title: item.title,
      description: data,
      price: item.price,
    };
  } else {
    let data: string[] = [];
    item.pemeriksaan.map((pemeriksaan: PemeriksaanType) => {
      data.push(pemeriksaan.title);
      return "";
    });
    item.laboratorium.map((lab: LaboratoriumType) => {
      data.push(lab.title);
      return "";
    });

    newLabItem = {
      id: item.id,
      title: item.title,
      description: data,
      price: item.price,
    };
  }
  return newLabItem;
};
