import { FormProfileType } from "../../patientTypes";

export const patientFormInput: FormProfileType = {
  name: {
    id: "profile_1",
    title: "Nama Pasien",
    placeholder: "Nama Pasien",
  },
  NIK: {
    id: "profile_2",
    title: "NIK",
    placeholder: "Nomor Induk di KTP Anda",
  },
  address: {
    id: "profile_3",
    title: "Alamat",
    placeholder: "Alamat Pasien",
    col_width: 2,
  },
  sex: {
    id: "profile_4",
    title: "Jenis kelamin",
    placeholder: "masukkan jenis kelamin anda",
  },
  birthdate: {
    id: "profile_5",
    title: "Tanggal lahir",
    placeholder: "DD/MM/YYYY",
  },
  phone: {
    id: "profile_6",
    title: "Nomor Whatsapp untuk verifikasi ",
    placeholder: "Masukkan nomor Whatsapp yang aktif ",
    col_width: 2,
  },
};
