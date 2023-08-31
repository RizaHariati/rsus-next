import { FormProfileType } from "../../patientTypes";

export const patientFormInput: FormProfileType = {
  register_date: {
    id: "reg",
    sample_value: "14/02/2003",
    title: "Tanggal pendaftaran",
    placeholder: "DD/MM/YYYY",
  },
  name: {
    id: "profile_1",
    sample_value: "Purwanto",
    title: "Nama Pasien",
    placeholder: "Nama Pasien",
  },
  NIK: {
    id: "profile_2",
    sample_value: "3327051303890004",
    title: "NIK",
    placeholder: "Nomor Induk di KTP Anda",
  },
  address: {
    id: "profile_3",
    sample_value: "Jl. Letjen Suprapto no.5",
    title: "Alamat",
    placeholder: "Alamat Pasien",
    col_width: 2,
  },
  sex: {
    id: "profile_4",
    sample_value: false,
    title: "Jenis kelamin",
    placeholder: "masukkan jenis kelamin anda",
  },
  birthdate: {
    id: "profile_5",
    sample_value: "13/08/1989",
    title: "Tanggal lahir",
    placeholder: "DD/MM/YYYY",
  },
  phone: {
    id: "profile_6",
    sample_value: "0812840345x83x3",
    title: "Nomor Whatsapp untuk verifikasi ",
    placeholder: "Masukkan nomor Whatsapp yang aktif ",
    col_width: 2,
  },
};
