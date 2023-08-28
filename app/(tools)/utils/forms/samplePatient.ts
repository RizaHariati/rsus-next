import { PatientType } from "../../types";

export const samplePatient: PatientType = {
  login: false,
  registered: true,
  register_date: "17/08/2023",
  medical_record: "US4234123398",
  bpjs: true,
  bpjs_number: "0001454326918",
  profile: {
    name: "Purwanto",
    NIK: "3327051303890004",
    address: "Jl. Letjen Suprapto no.5",
    sex: true,
    birthdate: "13/08/1989",
    phone: "08121234567890",
  },
};

export const getMedicalRecord = (medical_record: string) => {
  if (medical_record.length < 12) return "wrong number format";
  const number1 = medical_record.slice(0, 2);
  const number2 = medical_record.slice(2, 6);
  const number3 = medical_record.slice(6, 10);
  const number4 = medical_record.slice(10, 12);
  return `${number1}-${number2}-${number3}-${number4}`;
};
