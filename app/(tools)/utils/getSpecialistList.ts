import dataDokter from "@/app/(tools)/data/data_dokter.json";

export const getSpecialistList = () => {
  let specialistList: any[] = [];
  const specialist = dataDokter.map((item) => {
    const poliklinik: string = item.poliklinik.toString();
    // if (specialistList[poliklinik]) {
    // }
    return "";
  });
};
