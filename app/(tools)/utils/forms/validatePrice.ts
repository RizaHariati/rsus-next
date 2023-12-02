import { toast } from "react-toastify";

export const validatePrice = (value: number, maxValue: number) => {
  let flag = false;
  const roundup = Math.round(value / 500) * 500;
  if (roundup > maxValue) {
    toast.info(`nilai maksimal adalah Rp.${maxValue.toLocaleString()}`);
    flag = true;
  }
  return { roundup, flag };
};
