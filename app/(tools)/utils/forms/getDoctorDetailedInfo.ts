import { DoctorType } from "../../types";
export const getDoctorDetailedInfo = (doctorInfo: DoctorType) => {
  const detail = [
    { id: 1, title: "Poliklinik", value: doctorInfo.poliklinik.title },
    { id: 2, title: "Pengalaman", value: `${doctorInfo.pengalaman} tahun` },
    {
      id: 3,
      title: "Telemedicine",
      value: doctorInfo.telemedicine ? "Ya" : "Tidak",
    },
    {
      id: 4,
      title: doctorInfo.biaya_telemedicine ? "Biaya Telemedicine" : null,
      value: doctorInfo.biaya_telemedicine
        ? `Rp.${doctorInfo.biaya_telemedicine.toLocaleString()}`
        : null,
    },
    {
      id: 5,
      title: "Biaya Tatap Muka",
      value: `Rp.${doctorInfo.biaya_tatapmuka.toLocaleString()}`,
    },
    {
      id: 6,
      title: "Waktu Praktik",
      value: doctorInfo.waktu,
    },
    {
      id: 7,
      title: "Jam Praktik",
      value: doctorInfo.jam,
    },
    {
      id: 8,
      title: "Hari Praktik",
      value: doctorInfo.hari,
    },
    {
      id: 9,
      title: "Kuota tatap muka per hari",
      value: doctorInfo.kuota,
    },
  ];

  return detail.filter((item) => item.title !== null);
};
