import { PatientFormType } from "../../types";

export const patientFormInput: PatientFormType = {
  register_date: {
    id: "reg",
    name: " register_date",
    sample_value: "17/08/2023",
    title: "Nama Pasien",
    placeholder: "DD/MM/YYYY",
  },
  profile: {
    name: {
      id: "profile_1",
      name: "  name",
      sample_value: "Purwanto",
      title: "Nama Pasien",
      placeholder: "Nama Pasien",
    },
    NIK: {
      id: "profile_2",
      name: "  name",
      sample_value: "3327051303890004",
      title: "NIK",
      placeholder: "Nomor Induk di KTP Anda",
    },
    address: {
      id: "profile_3",
      name: "  name",
      sample_value: "Jl. Letjen Suprapto no.5",
      title: "Alamat",
      placeholder: "Alamat Pasien",
      col_width: 2,
    },
    sex: {
      id: "profile_4",
      name: "  name",
      sample_value: "Purwanto",
      title: "Jenis kelamin",
      placeholder: "pria",
    },
    birthdate: {
      id: "profile_5",
      name: "  name",
      sample_value: "13/08/1989",
      title: "Tanggal lahir",
      placeholder: "DD/MM/YYYY",
    },
    phone: {
      id: "profile_6",
      name: "  name",
      sample_value: "0812840345x83x3",
      title: "Nomor Whatsapp untuk verifikasi ",
      placeholder: "Masukkan omor Whatsapp yang aktif ",
      col_width: 2,
    },
  },
};
