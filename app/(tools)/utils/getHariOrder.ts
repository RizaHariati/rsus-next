import dayjs from "dayjs";
import { HariType } from "../types";

export type DoctorHariType = {
  date: Date;
  kuota_terisi: number;
  id_hari: number;
};
export const getHariOrder = (doctorHari: HariType[]) => {
  const today = dayjs().day();

  let startDays: DoctorHariType[] = [];
  let endDays: DoctorHariType[] = [];
  doctorHari.forEach((item) => {
    if (item.id_hari < today) {
      const date = dayjs()
        .add(7 - today + item.id_hari, "d")
        .toDate();
      endDays.push({ ...item, date });
    } else {
      const date = dayjs()
        .add(item.id_hari - today, "d")
        .toDate();
      startDays.push({ ...item, date });
    }
    return "";
  });
  return startDays.concat(endDays);
};
