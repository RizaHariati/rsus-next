import dataLabSatuan from "@/app/(tools)/data/data_lab_satuan.json";
import { FacilitySanityType, FacilityType, LabItemType } from "../types";

export const getCompleteTests = (dataFacility: FacilitySanityType[]) => {
  const testWithoutDoctorRef = dataFacility.filter((test) => !test.doctorref);
  let newData: LabItemType[] = dataLabSatuan;

  testWithoutDoctorRef.map((test: FacilityType) => {
    let newItem: LabItemType = {
      id: test.id,
      title: test.title,
      description: test.description,
      price: test.price,
      category: "baba",
    };
    for (let i = 0; i < test.poliklinik.length; i++) {
      const poli = test.poliklinik[i];

      if (poli.toLowerCase().includes("jantung")) {
        return (newData = [...newData, { ...newItem, category: "jantung" }]);
      } else if (poli.toLowerCase().includes("kandungan")) {
        return (newData = [...newData, { ...newItem, category: "wanita" }]);
      } else if (poli.toLowerCase().includes("paru")) {
        return (newData = [...newData, { ...newItem, category: "paru" }]);
      } else {
        return (newData = [...newData, { ...newItem, category: "special" }]);
      }
    }

    return "";
  });

  let allNewTests: { [key: string]: LabItemType[] } = {};
  newData.map((item) => {
    const newCategory = item.category?.toLowerCase()!;
    if (!allNewTests[newCategory]) {
      allNewTests[newCategory] = [item];
    } else {
      allNewTests[newCategory] = [...allNewTests[newCategory], item];
    }
  });

  return allNewTests;
};
