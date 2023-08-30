import { LabCartType, LaboratoriumType, PemeriksaanType } from "../types";

export const getLabCartItem = (
  item: any,
  gender: "all" | "pria" | "wanita"
) => {
  let newLabItem: LabCartType;
  if (item.id.includes("lab") || item.id.includes("fas")) {
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
    let priceResult = 0;
    let genderResult = "";
    item.pemeriksaan.map((pemeriksaan: PemeriksaanType) => {
      data.push(pemeriksaan.title);
      return "";
    });
    item.laboratorium.map((lab: LaboratoriumType) => {
      data.push(lab.title);
      return "";
    });
    const priceArray = Object.keys(item.price);

    priceArray.map((itemPrice) => {
      if (item.price[itemPrice].type === gender) {
        priceResult = item.price[itemPrice].value;
        genderResult = gender !== "all" ? "(" + gender + ")" : "";
      }
      return "";
    });

    newLabItem = {
      id: item.id,
      title: item.title + genderResult,
      description: data,
      price: priceResult!,
    };
  }
  return newLabItem;
};
