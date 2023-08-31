import dayjs from "dayjs";
import { HariType } from "../types";

export const getHariOrder = (doctorHari: HariType[]) => {
  const today = dayjs().day();

  let indexHari = today;
  if (doctorHari.length < 2) {
    return doctorHari;
  } else {
    if (
      doctorHari[0].id_hari >= today ||
      doctorHari[doctorHari.length - 1].id_hari < today
    ) {
      return doctorHari;
    } else {
      doctorHari.map((item, index) => {
        if (item.id_hari < today) {
          indexHari = index + 1;
        }
        return "";
      });

      const moveToBack = doctorHari.slice(0, indexHari);
      const moveToStart = doctorHari.slice(indexHari);

      return moveToStart.concat(moveToBack);
    }
  }
};
