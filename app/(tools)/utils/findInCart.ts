import { LabCartType } from "../types";

export const findInCart = (labCart: LabCartType[], id: string) => {
  return labCart.find((item) => item.id === id);
};
