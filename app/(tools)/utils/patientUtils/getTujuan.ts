import { getFacility } from "@/sanity/sanityUtils/getFacility";
import { getDoctors } from "../../../../sanity/sanityUtils/getDoctors";
import dataPaketKesehatan from "@/app/(tools)/data/data_paketkesehatan.json";
import dataLabSatuan from "@/app/(tools)/data/data_lab_satuan.json";

export const getTujuan = async (code: string) => {
  const codeTujuan = code.slice(0, 3);

  if (codeTujuan === "fas") {
    const res = await getFacility(code);
    return res[0];
  } else if (codeTujuan === "dr_") {
    const res = await getDoctors(code);
    return res[0];
  } else if (codeTujuan === "pak") {
    return dataPaketKesehatan.find((item) => item.id === code);
  } else {
    return dataLabSatuan.find((item) => item.id === code);
  }
};
